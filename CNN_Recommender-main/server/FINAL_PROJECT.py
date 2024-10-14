import cv2
import numpy as np
import pandas as pd
import base64
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelBinarizer
from tensorflow import keras
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.resnet50 import ResNet50
from tensorflow.keras.applications.resnet50 import preprocess_input
from tensorflow.keras.layers import GlobalMaxPooling2D
from tensorflow.keras.applications.resnet import preprocess_input
from sklearn.metrics.pairwise import pairwise_distances

import sys

df=pd.read_csv("final.csv")
loaded_model = load_model("model.h5")
dfembedding=pd.read_csv("finalembedding.csv")
# image_file=sys.argv[1]
# image_file='uploads/15431624963283161.jpg'
from pathlib import Path
image_file=Path('Output.txt').read_text()

articleTypeLB = LabelBinarizer()
genderLB = LabelBinarizer()
baseColourLB = LabelBinarizer()
seasonLB = LabelBinarizer()
usageLB = LabelBinarizer()

articleTypeLabels = articleTypeLB.fit_transform(np.array(df['articleType'].values))
genderLabels = genderLB.fit_transform(np.array(df['gender'].values))
baseColourLabels = baseColourLB.fit_transform(np.array(df['baseColour'].values))
seasonLabels = seasonLB.fit_transform(np.array(df['season'].values))
usageLabels = usageLB.fit_transform(np.array(df['usage'].values))

IMAGE_DIMS = (60, 60, 3)

def load_image(imagePath):
    image = cv2.imread(imagePath)
    image = cv2.resize(image, (IMAGE_DIMS[1], IMAGE_DIMS[0]))
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = preprocess_input(image)
    return image

def readb64(uri):
    encoded_data = uri.split(',')[1]
    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    image = cv2.resize(image, (IMAGE_DIMS[1], IMAGE_DIMS[0]))
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = preprocess_input(image)
    return image

x=[]
# x.append(load_image(image_file))
x.append(readb64(image_file))
    
x = np.array(x, dtype="float")
idx=0
(categoryProba, genderProba, colorProba, seasonProba, styleProba) = loaded_model.predict(np.expand_dims(x[idx], axis=0))
categoryIdx = categoryProba[0].argmax()
genderIdx = genderProba[0].argmax()
colorIdx = colorProba[0].argmax()
seasonIdx = seasonProba[0].argmax()
styleIdx = styleProba[0].argmax()
categoryLabel = articleTypeLB.classes_[categoryIdx]
genderLabel = genderLB.classes_[genderIdx]
colorLabel = baseColourLB.classes_[colorIdx]
seasonLabel = seasonLB.classes_[seasonIdx]
styleLabel = usageLB.classes_[styleIdx]

catprob=categoryProba[0][categoryIdx] * 100
genderprob=genderProba[0][genderIdx] * 100
colorprob=colorProba[0][colorIdx] * 100
seasonprob= seasonProba[0][seasonIdx] * 100
styleprob=styleProba[0][styleIdx] * 100
categoryText = "Category: {} ({:.2f}%)".format(categoryLabel,catprob )
genderText = "Gender: {} ({:.2f}%)".format(genderLabel, genderprob)
colorText = "color: {} ({:.2f}%)".format(colorLabel,colorprob )
seasonText = "season: {} ({:.2f}%)".format(seasonLabel,seasonprob)
styleText = "Style: {} ({:.2f}%)".format(styleLabel,styleprob )
label=[categoryLabel,genderLabel,colorLabel,seasonLabel,styleLabel]
value=[catprob,genderprob,colorprob,seasonprob,styleprob]
result=pd.DataFrame({'label':label,"probability":value})

resnet50_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224,224, 3))
resnet50_model.trainable = False
model2 = keras.Sequential([
    resnet50_model,
    GlobalMaxPooling2D()
])

cosine_similarity = 1 - pairwise_distances(dfembedding,metric='cosine')
indices = pd.Series(range(len(df)), index=df.index)

def get_image():
    allmatch=df.loc[(df['articleType']==categoryLabel) & (df['gender']==genderLabel) & (df['baseColour']==colorLabel) &
             (df['season']==seasonLabel) & (df['usage']==styleLabel)]
    if len(allmatch)>0:
        return (allmatch['image'].iloc[0])
    else:
        match4=df.loc[(df['articleType']==categoryLabel) & (df['gender']==genderLabel) & (df['baseColour']==colorLabel) &
             (df['season']==seasonLabel)]
        if len(match4)>0:
            return (match4['image'].iloc[0])
        else:
            match3=df.loc[(df['articleType']==categoryLabel) & (df['gender']==genderLabel) & (df['baseColour']==colorLabel)]
            if len(match3)>0:
                return (match3['image'].iloc[0])
            else:
                match2=df.loc[((df['articleType']==categoryLabel) & (df['gender']==genderLabel)) |
                          ((df['articleType']==categoryLabel) & (df['baseColour']==colorLabel))]
                if len(match2)>0:
                    return (match2['image'].iloc[0])
                else:
                    match1=df.loc[((df['articleType']==categoryLabel) | (df['gender']==genderLabel)) | 
                              (df['baseColour']==colorLabel)]
                    return (match1['image'].iloc[0])
def get_recommender(idx, df, top_n = 5):
    sim_idx    = indices[idx]
    sim_scores = list(enumerate(cosine_similarity[sim_idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:top_n+1]
    idx_rec    = [i[0] for i in sim_scores]
    idx_sim    = [i[1] for i in sim_scores]
    
    return indices.iloc[idx_rec].index, idx_sim

img_path=get_image()
index=df.index[df['image']==img_path].tolist()
sim_index =index[0]
sim_indices,sim = get_recommender(sim_index, df, top_n = 5)


selected_image = img_path
similar_list = [x for x in df.loc[sim_indices, 'image']]

similar_items = []

for i in range(5):
    similar_items.append([x for x in df.iloc[sim_indices[i], : ]])

print(similar_items)
