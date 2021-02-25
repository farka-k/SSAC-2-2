from os import listdir
import os.path
import shutil
import sys
import random
import cv2 as cv
import numpy as np

filename_prefix = 'img'             #filename prefix
suffix_digits = 4                   #number of suffix digits
filename_ext='.png'
raw_sketch_path = './sketch/'   #raw sketch image
raw_wshadow_path = './shadow/'  #raw sketch with shadow
data_path = './image_data/'         #path for final data set
width=256                           #image width
height=256                          #image height


list_sketch = os.listdir(raw_sketch_path)
list_wshadow = os.listdir(raw_wshadow_path)

if not os.path.exists(data_path):
    os.mkdir(data_path)

if len(list_sketch) != len(list_wshadow):
    print('Error: set same number of files')
    print('sketch:{} , shadow:{}'.format( len(list_sketch), len(list_wshadow)) )
    print('sketch path: {}'.format(os.path.abspath(raw_sketch_path) ) )
    print('shadow path: {}'.format(os.path.abspath(raw_wshadow_path) ) )
    exit()

print('number of files: {}'.format(len(list_sketch)) )
with open('label.txt', mode='w') as f:
    for i in range( len(list_sketch) ):
        print('progress: {} / {}'.format(i+1, len(list_sketch)), end='\r')
        sel=random.randint(0,1)     #randomly select label
        
        if sel: #sel==1
            src_copy=raw_wshadow_path + list_wshadow[i]
        else:   #sel==0
            src_copy=raw_sketch_path + list_sketch[i]
        
        #image preprocessing
        img_array=[]
        img=cv.imread(src_copy)
        img=cv.resize(img, (width,height) )
        img_array.append(img)
        
        '''
            image augmentation
            0: normal   1: vertial flip
            2: horizontal flip  3: rotate 180
            4: rotate 90 clockwise
            5: horizontal flip 4
            6: rotate 90 counter clockwise
            7: horizontal flip 6
        '''
        img_hf=cv.flip(img,1)
        img_array.append(img_hf)
        
        img_vf=cv.flip(img,0)
        img_array.append(img_vf)
        
        img_hvf=cv.flip(img_hf,0)
        img_array.append(img_hvf)
        
        img_rot_clock=cv.rotate(img,cv.ROTATE_90_CLOCKWISE)
        img_array.append(img_rot_clock)
        
        img_rot_clock_hf=cv.flip(img_rot_clock,0)
        img_array.append(img_rot_clock_hf)
        
        img_rot_cclock=cv.rotate(img,cv.ROTATE_90_COUNTERCLOCKWISE)
        img_array.append(img_rot_cclock)

        img_rot_cclock_hf=cv.flip(img_rot_cclock,0)
        img_array.append(img_rot_cclock_hf)
        
        #suffix_num = str(i+1)
        #filename_suffix = '0' * ( suffix_digits - len(suffix_num) ) + suffix_num
        #dst_copy = data_path + filename_prefix + filename_suffix + filename_ext
        #shutil.copy(dst_copy,src_copy)
        for j in range(len(img_array)):
            suffix_num=str( (i*8)+j+1 )
            filename_suffix = '0' * ( suffix_digits - len(suffix_num) ) + suffix_num
            dst_copy = data_path + filename_prefix + filename_suffix + filename_ext
            cv.imwrite(dst_copy,img_array[j])
            f.write(str(sel)+'\n')      #note label to file
    print('\nDone')

os.startfile(os.path.abspath(data_path))