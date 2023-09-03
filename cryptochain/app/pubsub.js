const PubNub = require('pubnub');

const credentials = {
    publishKey: "pub-c-213cd7fb-cb1c-4852-8e84-4f0f3aedafd5",
    subscribeKey: "sub-c-14512774-bbb5-11eb-9c3c-fe487e55b6a4",
    secretKey: "sec-c-NmU0MWNmNmEtNWFkZi00MjY1LTg5NmItYzVhNWU4MTIxMjZh"


};
const CHANNELS = {
    TEST:'TEST',
    BLOCKCHAIN:'BLOCKCHAIN'
}
class PubSub{
    constructor({blockchain}){
        this.blockchain = blockchain;

        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({channels:Object.values(CHANNELS)});
        this.pubnub.addListener(this.listner());
    }

    listner(){

        return {
            message: (messageObject)=>{
                const {channel,message} = messageObject;
                console.log(`Message received.Channel: ${channel}.Message: ${message}`);
                const parsedMessage = JSON.parse(message);
                if(channel == CHANNELS.BLOCKCHAIN){
                    this.blockchain.replaceChain(parsedMessage);
                }

            }
        }

       
        
    }

    publish({channel , message}){
        this.pubnub.publish({ message, channel });
       

    }

    broadcastChain(){
        this.publish({
            channel:CHANNELS.BLOCKCHAIN,
            message:JSON.stringify(this.blockchain.chain)
        });
    }
}



module.exports = PubSub
