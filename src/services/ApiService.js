import Api from '@/services/Api'

export default {
  getAsset(asset) {
    return Api().post('getAsset', {'asset': asset})
  },
  importAccount(stock) {
    return Api().post('importAccount', {'type': stock})
  },
  ExportAccount(account) {
    return Api().post('ExportAccount', {'account': account})
  },
  BackTesting(data) {
    return Api().post('BackTesting', {'data': data})
  },
  getResult() {
    return Api().get('getResult')
  },
  getAccountValue(data) {
    return Api().post('getAccountValue', {'data': data})
  },
  RunOptimizationAlgorithm(data) {
    return Api().post('RunOptimizationAlgorithm', {'data': data})
  }
}
