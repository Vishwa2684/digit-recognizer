import tensorflow as tf
import numpy as np
# Load the dataset
(train_imgs,train_labels),(test_imgs,test_labels) = tf.keras.datasets.mnist.load_data()

# Adding a channel to image and normalizing all the pixels of image
train_imgs=train_imgs.reshape((-1,28,28,1)).astype('float32')/255.0
test_imgs=test_imgs.reshape((-1,28,28,1)).astype('float32')/255.0

CNN = tf.keras.Sequential([
    tf.keras.layers.Conv2D(input_shape = (28,28,1),strides=(3,3),kernel_size=3,filters=32,activation='relu'),
    tf.keras.layers.MaxPool2D(pool_size=2),
    tf.keras.layers.Conv2D(kernel_size=3,filters=32,activation='relu'),
    tf.keras.layers.MaxPool2D(pool_size=2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(10,activation='softmax')
])




CNN.compile(optimizer=tf.keras.optimizers.SGD(learning_rate=1e-3,momentum=0.9),loss='sparse_categorical_crossentropy',metrics=['accuracy'])

history = CNN.fit(x=train_imgs,y=train_labels,epochs=5,validation_data=(test_imgs,test_labels))

CNN.save('cnn.h5')