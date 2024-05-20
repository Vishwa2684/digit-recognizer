import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt
import os
os.environ['PYTHONIOENCODING'] = 'utf-8'

# We are importing it because MNIST is a dataset which consists of a lot of handWritten digits

(train_img,train_labels),(test_img,test_labels) = tf.keras.datasets.mnist.load_data()

# Adding a grayscale layer to image
# Make all values between 0 and 1 so that u can fit them in neural network
train_img =train_img.reshape((60000,28,28,1)).astype('float32')/255
test_img = test_img.reshape((10000,28,28,1)).astype('float32')/255

# In this approach i flatten pixels of image to 1d array and feed it to my ANN
train_flattened = train_img.reshape(len(train_img),28*28)
test_flattened = test_img.reshape(len(test_img),28*28)


model = tf.keras.Sequential([
    # input layer
    tf.keras.layers.Dense(784,activation='sigmoid'),
    # output layer
    tf.keras.layers.Dense(10,activation='softmax')
    ])

model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),loss='sparse_categorical_crossentropy',metrics=['accuracy'])

history = model.fit(x=train_flattened , y=train_labels ,epochs=5, batch_size=32,)
model.save('ann.h5')
