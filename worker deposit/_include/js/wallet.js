class Wallet{
    constructor(){
        this.wallet = "";
        this.pk = "";
    }
    setWallet(wallet){
        this.wallet = wallet;

    }
    setPrivateKey(pk){
         this.pk = pk;
    }

    /**
     *
     * @param w3 {Web3}
     * @param message {String}
     */
    signMessage(w3, message){
        return w3.eth.accounts.sign(message, this.pk).signature;
    }
}