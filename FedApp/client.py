from flask import Flask
from config import meta,cryptochain
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn import metrics
from sklearn.linear_model import LogisticRegression


nodeName = meta[0]["nodeName"]
nodeID = meta[1]["nodeID"]

#IF nodeID = 1 load ex.npy else if nodeID = 2 load mod.npy

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/start-federation")
def start_fed():
    if nodeID==1:
        data = np.load("../Ex.npy")
    elif nodeID==2:
        data = np.load("../Mod.npy")
    print(data)
    X = data[:,0:2]
    Y = data[:,2]
    X_train, X_test, Y_train, Y_test = train_test_split(X,Y, test_size=0.30,random_state=101)

    
    logmodel = LogisticRegression()
    logmodel.fit(X_train,Y_train)
    predictions = logmodel.predict(X_test)

    accu = metrics.accuracy_score(Y_test, predictions)
    class_repo = classification_report(Y_test,predictions)
    coeffs = logmodel.coef_ 
    inter = logmodel.intercept_


    return {"coef": coeffs.tolist() , "intercept": inter.tolist() , "accuracy":accu, "classification_report":  class_repo }
    
if __name__ == "__main__":
    app.run(debug=True)