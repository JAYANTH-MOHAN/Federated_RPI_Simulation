
#Methods to interact with already running Cryptochain
#Cryptochain runs on localhost port 3030.
#Methods to query and get response must be implemented.

import requests
from config import meta,cryptochain
from json import dumps
from utils import json_serial


port = cryptochain['port']
localchain = f"http://localhost:{port}/api"

def get_all_blocks():
    x = requests.get(f"{localchain}/blocks")
    return x

def put_data(data):
    response = requests.post(f"{localchain}/mine", json=data)
    if response.status_code==200:
        print("Done",response.text)
    else:
        print(response.text)


def get_data():

    all_blocks = get_all_blocks()
    print(all_blocks.text)


if __name__=="__main__":
    print(cryptochain['port'])
    
  

    get_data()
