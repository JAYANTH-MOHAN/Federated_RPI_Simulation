const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
const Block = require('./blockchain/block');
const Blockchain = require('./blockchain');
const PubSub = require('./app/pubsub');
const yaml = require('js-yaml');
const fs   = require('fs');
const toJsonSchema = require('to-json-schema');

var validate = require('jsonschema').validate;


const app = express();
const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });


const nodeconfig = yaml.load(fs.readFileSync('../nodeconfig.yaml', 'utf8'));

const nodeName = nodeconfig.meta[0].nodeName
const nodeID = nodeconfig.meta[1].nodeID
const DEFAULT_PORT = nodeconfig.cryptochain[0].port;
const ROOT_NODE = nodeconfig.cryptochain[1].root_node;
const ROOT_NODE_ADDRESS = `http://${ROOT_NODE}:${DEFAULT_PORT}`


function getISTTime() {
    const date = new Date();
    var ISToffSet = 330; //IST is 5:30; i.e. 60*5+30 = 330 in minutes 
    offset= ISToffSet*60*1000;
    return new Date(date.getTime()+offset);

}

/*
var sampledata = {
    "data": {nodeID:nodeID,
         nodeName: nodeName,
        sensorType: "RootNode",
        sensorValue: 0,
        timestamp:getISTTime()}
    
}

const dataschema = toJsonSchema(sampledata);
*/



setTimeout(() => pubsub.broadcastChain(), 1000);
app.use(bodyParser.json());

app.get('/api/blocks', (req, res) => {
    res.json(blockchain.chain);
});



app.post('/api/mine', (req, res) => {
    const  data = req.body;
        blockchain.addBlock(data );
        pubsub.broadcastChain();
        res.redirect('/api/blocks');
    /*
    else{
        res.json([{"messege":"Please follow dataschema"} , dataschema])
    }
*/







    

    




});


const syncChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) => {

        if (!error && response.statusCode == 200) {
            const rootChain = JSON.parse(body);
            console.log('replace chain on synt with', rootChain);
            blockchain.replaceChain(rootChain);


        }
    })
}

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT == 'true') {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}


const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
    console.log(`Listining at localhost:${PORT}`)

    if (PORT !== DEFAULT_PORT) {
        syncChains();
    }

});
