from fastapi import FastAPI
import tensorflow as tf
import cv2
import base64
from requests import Request
from io import BytesIO
from PIL import Image
import numpy as np
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

CNN = tf.keras.models.load_model('./cnn.h5')
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
    "https://mnistpred.netlify.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Request(BaseModel):
    image:str


@app.get('/')
async def root():
    return {'message':"Hi"}

@app.post('/predict')
async def pred(request: Request):
        try:
            # Parse JSON from request body
            body = request.image
            # image_base64 = body['image']  # Extract the base64 image string

            # Decode base64 image to binary
            image_data = base64.b64decode(body.split(",")[1])  # Skip the 'data:image/png;base64,' part
            image = Image.open(BytesIO(image_data))  # Convert to PIL Image

            # Convert PIL image to NumPy array and preprocess it
            img_array = np.array(image)
            
            img_array = cv2.cvtColor(img_array,cv2.COLOR_RGBA2GRAY)
            img_array = 255-cv2.resize(img_array,(28,28))

            img_array = np.expand_dims(img_array.reshape(28,28,1),axis=0)
            predictions = CNN.predict(img_array).tolist()[0]

            return predictions
        except Exception as e:
            return {"Error":f"{e.args[0]}"}
