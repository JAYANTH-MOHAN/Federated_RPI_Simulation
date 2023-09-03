const Block = require('./block')
const {cryptoHash} = require("../util");

class Blockchain{
constructor(){

    this.chain =[Block.genesis()];
    
}

addBlock({data}){
    const newBlock = Block.mineBlock({
        lastBlock: this.chain[this.chain.length-1],
        data
    });

    this.chain.push(newBlock);

}


static isValidChain(chain){

    if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis() ) ) return false ;

    for (let i=1; i<chain.length;i++){
        const block = chain[i];

        const actualLastHash = chain[i-1].hash;
        const lastDifficulty = chain[i-1].difficulty;

        const {timestamp , lastHash , hash ,nonce,difficulty, data} = block;

        if(lastHash !== actualLastHash) return false;


        const validatedHash = cryptoHash(timestamp , lastHash , data,nonce,difficulty);

        if(hash !== validatedHash) return false;

        if(Math.abs(lastDifficulty - difficulty) >1) return false


    }

    return true;
}


 replaceChain(chain) {

    if(this.chain.length >= chain.length){
        console.error("incoming chain must be longer");
         return ;
    }
    
    if(!Blockchain.isValidChain(chain)){
        console.error("the incoming chain must be valid");
return;

        
    }
    
        this.chain = chain;
        console.log("replacing chain with" , chain);
    







}



}

module.exports = Blockchain;