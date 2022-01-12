"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const newPair = new web3_js_1.Keypair();
const publicKey = new web3_js_1.PublicKey(newPair.publicKey).toString();
const secretKey = newPair.secretKey;
const getWalletBalance = async () => {
    try {
        const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"), "confirmed");
        const myWallet = web3_js_1.Keypair.fromSecretKey(secretKey);
        const walletBalance = await connection.getBalance(new web3_js_1.PublicKey(myWallet.publicKey));
        console.log(`=> For wallet address ${publicKey}`);
        console.log(`   Wallet balance: ${walletBalance / web3_js_1.LAMPORTS_PER_SOL}SOL`);
    }
    catch (err) {
        console.log(err);
    }
};
const airDropSol = async () => {
    try {
        const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)("devnet"), "confirmed");
        const walletKeyPair = web3_js_1.Keypair.fromSecretKey(secretKey);
        console.log(`-- Airdropping 2 SOL --`);
        const fromAirDropSignature = await connection.requestAirdrop(new web3_js_1.PublicKey(walletKeyPair.publicKey), 2 * web3_js_1.LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirDropSignature);
    }
    catch (err) {
        console.log(err);
    }
};
const driverFunction = async () => {
    await getWalletBalance();
    await airDropSol();
    await getWalletBalance();
};
driverFunction();
//# sourceMappingURL=index.js.map