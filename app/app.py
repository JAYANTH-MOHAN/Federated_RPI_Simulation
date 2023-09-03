import time

from config import meta,cryptochain
from utils import getISTTime
from database import put_data
from readsensors import get_temp_hum,get_moisture_state

if __name__ == "__main__":
    nodeName = meta[0]["nodeName"]
    nodeID = meta[1]["nodeID"]

    temp,hum = get_temp_hum()
    iswater = get_moisture_state()
    print(temp,hum,iswater)

data = {
    "data": {"nodeID":nodeID,
         "nodeName": nodeName,
        "sensorType": "RootNode",
        "sensorValue": [temp,hum,iswater],
        "timestamp":getISTTime()}
}

if __name__ == "__main__":
	while(True):

		put_data(data)
		time.sleep(3)


