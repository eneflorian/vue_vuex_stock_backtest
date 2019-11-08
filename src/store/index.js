import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  state: {
    sending: 0,
    adminasset: {
      navitebalance: 0,
      balances: []
    },
    Indexnumber: -1,
    table: '',
    result: 0,
    calculating: 0,
    csv: 0,
    spinner: false,
    account:[],
    payaccount:[],
    withdrawaccount: [],
    snackmsg: null,
    intervalTime: 30,
    publicKey: null,
    privateKey: null,
    lang: 'en',
    nativeBalance: [],
    nativeMax: [],
    balances: [],
    ratios: ['usd_to_euro', 'usd_to_gbp', 'gbp_to_euro', 'xlm_to_usd', 'xlm_to_gbp', 'xlm_to_euro'],
    issuers: [],
    orderBook: [],
    assetVals: [],
    assetPrices: [],
    maxes: [],
    isloading: false,
    exchangePairs: [],
    robotStatus: false,
    offers: [],
    offerLocks: [],
  },
  mutations: {
    setaccountspecial(state, status) {
      state.account[status.index].status = status.stat
    },
    setIndexnumber(state, status) {
      state.Indexnumber = status
    },
    async setexchangePairs(state, status) {
      let results = []
      state.exchangePairs = []
      state.exchangePairs.push('XLM')
      for ( const balance of status.balance) {
        state.exchangePairs.push(balance.asset_code + '/' + balance.issuer)
      }
    },
    storeReset(state) {
      state.sending = 0;
      state.adminasset = {
        navitebalance: 0,
        balances: []
      }
      state.Indexnumber = -1
      state.table = '',
      state.result = 0,
      state.calculating = 0,
      state.csv = 0,
      state.spinner = false,
      state.account = [],
      state.payaccount = [],
      state.withdrawaccount = []
    },
    setWithdrawaccountclosed(state, status) {
      state.withdrawaccount[status.index].closed = status.closed
    },
    setWithdrawaccountspecial(state, status) {
      state.withdrawaccount[status.index].status = status.stat
    },
    setIndexnumber(state, status) {
      state.Indexnumber = status
    },
    async setexchangePairs(state, status) {
      let results = []
      state.exchangePairs = []
      state.exchangePairs.push('XLM')
      for ( const balance of status.balance) {
        state.exchangePairs.push(balance.asset_code + '/' + balance.issuer)
      }
    },
    setWithdrawaccount(state, status) {
      state.withdrawaccount = status
    },
    setSending(state, status) {
      state.sending = status
    },
    setAdminasset(state, status) {
      state.adminasset = status
    },
    setTable(state, status) {
      state.table = status
    },
    setResult(state, status) {
      state.result = status;
    },
    setPayaccountStatus(state, status) {
      state.payaccount[status.index].status = status.info
    },
    setAccountWSD(state, status) {
      state.account[status.index].wsd_due = status.wsd
      state.account[status.index]['balances'] = status.balances
    },
    setCalculating(state, status) {
      state.calculating = status
    },
    setPayaccount(state, status) {
      state.payaccount = status
    },
    setAccount(state, status) {
      state.account = status
    },
    setCsv(state, status) {
      state.csv = status
    },
    setSpinner(state, status) {
      state.spinner = status
    },
    intervalTime(state, intervalTime) {
      state.intervalTime = intervalTime;
    },
    updatePublicKey(state, publicKey) {
      // window.Sconsole(['update publicKey']);
      state.publicKey = publicKey;
    },
    updatePrivateKey(state, privateKey) {
      // window.Sconsole(['update privateKey']);
      state.privateKey = privateKey;
    },
    updateSnackmsg(state, msg) {
      // window.Sconsole(['update snackmsg']);
      state.snackmsg = msg;
    },
    updateLang(state, lang) {
      // window.Sconsole(['update lang']);
      state.lang = lang;
    },
    updateNativeBalance(state, nativeBalance) {
      // window.Sconsole(['update native balances']);
      state.nativeBalance = nativeBalance;
    },
    updateNativeMax(state, nativeMax) {
      // window.Sconsole(['update native max']);
      state.nativeMax = nativeMax;
    },
    // removeTrustline(state, code, issuer) {
    //   // state.balances.forEach({})
    // },
    updateIsloading(state, status) {
      state.isloading = status;
    },
    clearExchangePairs(state) {
      state.exchangePairs = [];
    },
    addExchangePairs(state, pair) {
      state.exchangePairs.push(pair);
    },
    updateExchangePairs(state, pair) {
      const tmp = state.exchangePairs.filter((val) => {
        if (val.skey === pair.skey || val.skey === pair.skey2) {
          return true;
        }
        return false;
      });
      if (tmp.length === 0) {
        state.exchangePairs.push(pair);
      }
    },
    updateExchangePairOrder(state, data) {
      state.exchangePairs.filter((val, index) => {
        if (val.skey === data.skey) {
          // buy order
          if (data.flag === 0) {
            state.exchangePairs[index].buy_time = data.buy_time;
            state.exchangePairs[index].buy_ratio = data.buy_ratio;
          } else { // sell order
            state.exchangePairs[index].sell_time = data.sell_time;
            state.exchangePairs[index].sell_ratio = data.sell_ratio;
          }
          return true;
        }
        return false;
      });
    },
    removeExchangePair(state, skey) {
      const tmp = state.exchangePairs.filter((val) => {
        if (val.skey !== skey) {
          return true;
        }
        return false;
      });
      state.exchangePairs = tmp;
    },
    updateRobotStatus(state, status) {
      state.robotStatus = status;
    }
  },
  getters: {
    getIndexnumber(state) {
      return state.Indexnumber
    },
    getWithdrawaccount(state) {
      return state.withdrawaccount
    },
    getSending(state) {
      return state.sending
    },
    getAdminasset(state) {
      return state.adminasset
    },
    getTable(state) {
      return state.table
    },
    getPayaccount(state) {
      return state.payaccount
    },
    getResult(state) {
      return state.result
    },
    getCalculating(state) {
      return state.calculating
    },
    getAccount(state) {
      return state.account
    },
    getCsv(state) {
      return state.csv
    },
    getSpinner(state) {
      return state.spinner
    },
    intervalTime(state) {
      return state.intervalTime;
    },
    publicKey(state) {
      return state.publicKey;
    },
    privateKey(state) {
      return state.privateKey;
    },
    lang(state) {
      return state.lang;
    },
    nativeBalance(state) {
      return state.nativeBalance;
    },
    nativeMax(state) {
      return state.nativeMax;
    },
    balances(state) {
      return state.balances;
    },
    exchangePairs(state) {
      return state.exchangePairs;
    },
    // exchangePairsSelector(state) {
    //   const res = [];
    //   state.exchangePairs.forEach((pair) => {
    //     res.push({
    //       skey: `${pair.baseAsset}|${pair.baseIssuer}_${pair.counterAsset}|${pair.counterIssuer}`,
    //       text: `[${pair.baseAsset}] ${pair.baseIssuer} / [${pair.counterAsset}] ${pair.counterIssuer}`,
    //     });
    //   });
    //   return res;
    // },
    robotStatus(state) {
      return state.robotStatus;
    }
  },
});
