import numpy as np
import cv2
import os

IMG_DIR = 'Dataset/sign2text_data/massey_split/grayscale/train/y/'
count=0
for img in os.listdir(IMG_DIR):
        img_array = cv2.imread(os.path.join(IMG_DIR,img), cv2.IMREAD_GRAYSCALE)

        # width = 28
        # height = 28
        # dim = (width, height)

        # resized = cv2.resize(img_array, dim, interpolation= cv2.INTER_AREA)

        # img_array = (resized.flatten())

        # img_array  = img_array.reshape(-1, 1).T

        # print(img_array)

        # with open('output_test.csv', 'ab') as f:

        #     np.savetxt(f, img_array, delimiter=",")
        count +=1
print(count)