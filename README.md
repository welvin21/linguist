# linguist  
Empowering the mute through AI

### Description

Inspiration In this era of the new-normal, people around the world are forced to do remote work and online video conferences are undeniably important in achieving work-from-home success. Through this perspective, our project focuses on the deaf and mute community who are rendered helpless in these situations where their only means of communicating is through typing. Our project aims to empower this rather large portion of the world population, which is forecasted to increase up to 900 million people by 2050 (WHO, https://about.almentor.net/about/the-deaf-and-mute/).

### What it does 

This project serves as an extension to conventional video conference software, which utilizes image classification and word predictions to provide real-time captions which can be further converted into audio signals. This will enable the deaf and mute community to present and be understandable in online video conferences.

### How we built it 

An image classification model is trained with the MNIST sign-language database using Tensorflow in a python Jupyter notebook. The model is converted into a TensorflowJs compatible model and stored in an Express server with a React.js frontend that utilizes a webcam with a bounding box to input a stream of images and a textbox to show the predicted letters and words.

### Accomplishment 

Model works with some level of precision and we managed to extract information from a bounding box in a webcam and feed it to our own self-trained from scratch image classification model.

Demo video: [click here](https://youtu.be/nW0x3oxRiFk)
