from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os

app = Flask(__name__)

# Load your model
model = load_model('/workspaces/sih/x/plant_disease_model.h5')

def prepare_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))  # Adjust target size based on your model input
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0  # Normalization if required by your model
    return img_array

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    file = request.files['image']

    if file.filename == '':
        return jsonify({"error": "No image selected for uploading"}), 400
    
    # Save the file to a temporary location
    temp_path = "/tmp/" + file.filename
    file.save(temp_path)

    # Prepare the image for the model
    img = prepare_image(temp_path)

    # Predict using the model
    prediction = model.predict(img)
    
    # Process the prediction (assuming binary classification)
    disease_probability = prediction[0][0]
    label = "Diseased" if disease_probability > 0.5 else "Healthy"

    # Clean up the temporary file
    os.remove(temp_path)

    return jsonify({"prediction": label, "probability": float(disease_probability)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
