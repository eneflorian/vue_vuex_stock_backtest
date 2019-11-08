const StellarSdk=require('stellar-sdk');
StellarSdk.Network.usePublicNetwork();
// StellarSdk.Network.useTestNetwork();
const serverUrl = 'https://horizon.stellar.org'
// const serverUrl = 'https://horizon-testnet.stellar.org'
const server = new StellarSdk.Server(serverUrl)
let STORE = ''
let PRICE = ''
let issuingKeys = ''
let sendissuer = ''

export default {

  MergeAccounts: async function (store) {
    STORE = store
    console.log('-------------------------------')
    //Sending all coin to admin
    let privatekey = STORE.getters.privateKey
    let publickey = STORE.getters.publicKey
    let accounts = STORE.getters.getAccount


    let indexnumber = STORE.getters.getIndexnumber

    for ( var i = indexnumber ; i >= 0 ; i--) {
      let account = accounts[i]
      let sendingaccount = ''
      await server.loadAccount(account.publickey)
      .then((resp) => {
        sendingaccount = resp
      }).catch(async (error) => {
        console.log('--------------------error-------------')
        let status = {
          index: i,
          stat: 'Done!'
        }
        await STORE.commit('setIndexnumber',i.toString())
        await STORE.commit('setaccountspecial', status)
      })
      if (sendingaccount === '') continue;
      let issuing_keys = await StellarSdk.Keypair.fromSecret(account.privatekey);
      let Native_amount = ''

      for ( const eachB of sendingaccount.balances) {
        await this.sleep(100);
        if (eachB.asset_type === 'native'){ 
          Native_amount = eachB.balance
          continue
        }

        let send_issuer = await new StellarSdk.Asset(eachB.asset_code, eachB.asset_issuer);
        
        if (eachB.balance === '0' || parseFloat(eachB.balance) <= 0){
          //remove trustline
          var transaction = await new StellarSdk.TransactionBuilder(sendingaccount)
          .addOperation(StellarSdk.Operation.changeTrust({ 
            asset: send_issuer, 
            limit: '0'
          }))
          .build();
          await transaction.sign(issuing_keys);
          await server.submitTransaction(transaction)
          .then(() => {
            console.log('---successfully deleted trustline------')
          }).catch(async(error) => {
            console.log('---------------error in deleting trustline--------')
          })
          let status = {
            index: i,
            stat: 'Done!'
          }
          await STORE.commit('setIndexnumber',i.toString())
          await STORE.commit('setaccountspecial', status)
          continue
        }
        var transaction = await new StellarSdk.TransactionBuilder(sendingaccount)
        .addOperation(StellarSdk.Operation.payment({
          destination: publickey,
          asset: send_issuer,
          amount: (parseFloat(eachB.balance).toFixed(6)).toString()
        }))
        .build();
        await transaction.sign(issuing_keys);
        await server.submitTransaction(transaction)
        .then(async(response) => {
          console.log('---successfully sent------')
          //remove trustline
          transaction = await new StellarSdk.TransactionBuilder(sendingaccount)
          .addOperation(StellarSdk.Operation.changeTrust({ 
            asset: send_issuer, 
            limit: '0'
          }))
          .build();
          await transaction.sign(issuing_keys);
          await server.submitTransaction(transaction)
          .then(() => {
            console.log('---successfully deleted trustline------')
          }).catch(async(error) => {
            console.log('---------------error in deleting trustline--------')
          })
        }).catch(async(error) => {
          console.log('---------------error in deleting11--------')
        })
      }
      //sending native amount
      console.log('-------------native amount---------------')
      console.log(Native_amount)
      if (Native_amount === '0' || parseFloat(Native_amount) <= 0){
        let status = {
          index: i,
          stat: 'Done!'
        }
        await STORE.commit('setIndexnumber',i.toString())
        await STORE.commit('setaccountspecial', status)
        continue
      } else {
        var send_issuer1 = await new StellarSdk.Asset.native()
        var transaction = await new StellarSdk.TransactionBuilder(sendingaccount)
        // .addOperation(StellarSdk.Operation.payment({
        //   destination: publickey,
        //   asset: send_issuer1,
        //   amount: parseFloat(Native_amount).toFixed(7).toString()
        // }))
        .addOperation(StellarSdk.Operation.accountMerge({
          destination: publickey,
        }))
        .build();
        await transaction.sign(issuing_keys);
        await server.submitTransaction(transaction)
        .then(async(response) => {
          console.log('---successfully sent native------')
        }).catch((error) => {
          console.log('---error in sending native------')
        })
      }
      let status = {
        index: i,
        stat: 'Done!'
      }
      await STORE.commit('setIndexnumber',i.toString())
      await STORE.commit('setaccountspecial', status)
    }
    STORE.commit('setSpinner', false)
  },

  Sendcoin: async function (store, trust, amount) {
    STORE = store;
    let code = trust.split('/')[0]
    let issuer = trust.split('/')[1]
    let send_issuer = ''
    let publickey = STORE.getters.publicKey
    let privatekey = STORE.getters.privateKey
    let sendingaccount = await server.loadAccount(publickey)
    let issuing_keys = await StellarSdk.Keypair.fromSecret(privatekey);
    if(code !== 'XLM') send_issuer = await new StellarSdk.Asset(code, issuer);
    else send_issuer = await new StellarSdk.Asset.native()

    let accounts = STORE.getters.getAccount
    console.log('----------trust----------------')
    console.log(trust)
    console.log('-------------accounts----------')
    console.log(accounts)
    let indexnumber = STORE.getters.getIndexnumber

    for ( var i = indexnumber ; i >= 0 ; i--) {
      await this.sleep(50);
      var account = accounts[i]
      console.log('-------index---------')

      var transaction = await new StellarSdk.TransactionBuilder(sendingaccount)
      .addOperation(StellarSdk.Operation.payment({
        destination: account.publickey,
        asset: send_issuer,
        amount: parseFloat(amount).toFixed(7).toString()
      }))
      .build();
      await transaction.sign(issuing_keys);
      await server.submitTransaction(transaction)
      .then(async(response) => {
        console.log('success')
        await STORE.commit('setIndexnumber',i.toString())
        let status = {
          index: i,
          stat: 'Done!'
        }
        await STORE.commit('setaccountspecial', status)
        }).catch(async(error) => {
          console.log('error')
          await STORE.commit('setIndexnumber',i.toString())
          let status = {
            index: i,
            stat: 'Unexpected!'
          }
          await STORE.commit('setaccountspecial', status)
      })
    }
    STORE.commit('setSpinner', false)
  },
  Addtrustline: async function (store, trust) {
    STORE = store
    let code = trust.split('/')[0]
    let issuer = trust.split('/')[1]
    let send_issuer = ''
    if(code !== 'XLM') send_issuer = await new StellarSdk.Asset(code, issuer);
    else send_issuer = await new StellarSdk.Asset.native()

    let accounts = STORE.getters.getAccount
    console.log('----------trust----------------')
    console.log(trust)
    console.log('-------------accounts----------')
    console.log(accounts)
    let indexnumber = STORE.getters.getIndexnumber

    for ( var i = indexnumber ; i >= 0 ; i--) {
      await this.sleep(50);
      var account = accounts[i]
      let issuing_keys = await StellarSdk.Keypair.fromSecret(account.privatekey);
      let sendingaccount = await server.loadAccount(account.publickey)
      console.log('-------index---------')

      var transaction = await new StellarSdk.TransactionBuilder(sendingaccount)
      .addOperation(StellarSdk.Operation.changeTrust({ asset: send_issuer }))
      .build();
      await transaction.sign(issuing_keys);
      await server.submitTransaction(transaction)
      .then(async(response) => {
        console.log('success')
        await STORE.commit('setIndexnumber',i.toString())
        let status = {
          index: i,
          stat: 'Done!'
        }
        await STORE.commit('setaccountspecial', status)
      }).catch(async(error) => {
        console.log('error')
        await STORE.commit('setIndexnumber',i.toString())
        let status = {
          index: i,
          stat: 'Unexpected!'
        }
        await STORE.commit('setaccountspecial', status)
      })
    }
    STORE.commit('setSpinner', false)
  },

  generateKeypair: function (privateKey, cb, cbErr) {
    let res = null;
    try {
      res = StellarSdk.Keypair.fromSecret(privateKey);
    } catch (err) {
      cbErr(err);
    }
    if (res) {
      cb(res);
    }
  },
  getAdminasset: async function(store) {
    STORE = store
    let publickey = STORE.getters.publicKey
    console.log('--------public-key-----------')
    console.log(publickey)
    await server.loadAccount(publickey)
      .then((account_info) => {
        STORE.commit('updateSnackmsg', 'success');
        STORE.commit('setSpinner', false)
        console.log('------------------------')
        console.log(account_info)
        let navite_balance = 0;
        let Balance = []
        for ( const balance of account_info.balances) {
          if (balance.asset_type === 'native') {
            navite_balance = balance.balance
          } else {
            Balance.push({
              asset_code: balance.asset_code,
              balance: balance.balance,
              issuer: balance.asset_issuer
            })
          }
        }
        let status = {
          navitebalance: navite_balance,
          balance: Balance
        }
        console.log('---------------status---------------')
        console.log(status)
        STORE.commit('setAdminasset', status)
        STORE.commit('setexchangePairs', status)
      }).catch((error) => {
        STORE.commit('setSpinner', false)
        store.commit('updateSnackmsg', 'Unexpected error happened while loading admin asset!')
      })
  },
  GenerateAccount: async function(store, gnumber) {
    STORE = store
    let Account = []
    for ( var i = 0 ; i < gnumber ; i++) {
      var pair = await StellarSdk.Keypair.random();
      let account = {
        privatekey: pair.secret(),
        publickey: pair.publicKey(),
        token: '',
        status: ''
      }
      await Account.push(account)
    }
    console.log('-------------------generateaccount-----------------')
    console.log(Account)
    STORE.commit('setAccount', Account)
  },
  sleep: function(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e8; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  },
};
