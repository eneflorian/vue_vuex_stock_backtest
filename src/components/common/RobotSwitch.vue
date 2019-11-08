<template>
    <md-layout  md-flex="100" class="csv-processing">
      <md-button  v-bind:disabled="getDiable('VIX')" @click="importAccount('VIX')" v-bind:class="getClass('VIX')" :md-ripple="true">Import VIX</md-button>
      <md-button  v-bind:disabled="getDiable('VX1')" @click="importAccount('VX1')" v-bind:class="getClass('VX1')" :md-ripple="true">Import VX1</md-button>
      <md-button  v-bind:disabled="getDiable('VX2')" @click="importAccount('VX2')" v-bind:class="getClass('VX2')" :md-ripple="true">Import VX2</md-button>
      <md-button  v-bind:disabled="getDiable('VXX')" @click="importAccount('VXX')" v-bind:class="getClass('VXX')" :md-ripple="true">Import VXX</md-button>
      <md-button v-bind:disabled="getRun()"  @click="importAccount('Calculating.Please see the server console...')" v-bind:class="getStatusRun()" :md-ripple="true">RUN</md-button>
      <!-- <md-button v-bind:disabled="getExport()"  @click="importAccount('Mongo')" v-bind:class="getClass('Mongo')" :md-ripple="false">Export Mongodb</md-button> -->
      <md-button v-bind:disabled="getExport()"  @click="importAccount('Export')" v-bind:class="getClass('Export')" :md-ripple="false">Export Result.Csv</md-button>
      <md-button v-bind:disabled="getWorkingResult()"  @click="importAccount('WorkingResult')" v-bind:class="getClass('WorkingResult')" :md-ripple="false">Export WorkingResult.Csv</md-button>
      <md-button @click="importAccount('BackTest')" class="md-raised" :md-ripple="false">Export BackTest.Csv</md-button>
      <md-button @click="importAccount('Summary')" class="md-raised" :md-ripple="false">Export Summary.Csv</md-button>
    </md-layout>
</template>

<script>
  import ApiService from '@/services/ApiService'
  import DialogForm from '@/components/common/DialogForm';
  // import Api from '@/lib/Api'
  export default {
    name: 'robot-switch',
    props: {
    },
    data() {
      return {
        Status: {
          'VIX': false,
          'VX1': false,
          'VX2': false,
          'VXX': false,
          'Calculating.Please see the server console...': false,
          'Export': false,
          'Mongo': false,
          'WorkingResult': false
        },
        selectedPair: '',
        generateAccountNumber: 1,
        sendAmount:1,
        assetCode: '',
        assetIssuer: ''
      };
    },
    components: {
      'dialog-form': DialogForm,
    },
    computed: {
      exchangePairs() {
        return this.$store.getters.exchangePairs
      },
    },

    methods: {
      getDiable(stock) {
        return this.Status[stock]
      },

      getWorkingResult() {
        if (this.Status['WorkingResult'] === true) return true;
      },

      getExport() {
        if (this.Status['Export'] === true) return true;
        return this.Status['Calculating.Please see the server console...'] === true ? false: true
      },

      getStatusRun() {
        return this.Status['Calculating.Please see the server console...'] === true ?
          'md-raised success':'md-raised'
      },

      getClass(type) {
        if (this.Status[type] === true) {
          return 'md-raised success'
        }
        else return 'md-raised'
      },

      getRun() {
        if (this.Status['Calculating.Please see the server console...'] === true) return true;
        
        if (this.Status['VIX'] === true && this.Status['VX1'] == true &&
          this.Status['VX2'] === true && this.Status['VXX'] === true)
          return false
        
        else return true
      },

       ExportAccount() {
        ApiService.ExportAccount(this.$store.getters.getAccount)
        .then((response) => {
           if (response.data.success) {
              this.$store.commit('updateSnackmsg', "Successfully saved in account.csv!");
            } else {
              this.$store.commit('updateSnackmsg', 'Unexpected Error Occured! You may be opend pay.csv files...');
            }
        }).catch((error) => {
          this.$store.commit('updateSnackmsg', 'Unexpected Error Occured!');
        }) 
      },
      importAccount(stock) {
        let origin = stock
        this.$store.commit('setSpinner', true)
        this.$store.commit('updatePublicKey', stock);
        if (stock === 'Mongo') {
           this.$store.commit('updatePublicKey', 'Saving...Please see the server console...');
        }
        if (stock === 'WorkingResult') {
          stock = stock + '-' + this.$store.getters.nativeBalance + '-' + this.$store.getters.getIndexnumber
        }
        ApiService.importAccount(stock)
          .then((response) => {
            this.$store.commit('setSpinner', false)
            this.$store.commit('updatePublicKey', 'Done');
            if (response.data.success) {
              this.Status[origin] = true
              this.$store.commit('updateSnackmsg', "Success");
              // this.$store.commit('setAccount', response.data.data)
            } else {
              this.$store.commit('updateSnackmsg', response.data.error);
            }
          }).catch((error) => {
            this.$store.commit('updateSnackmsg', error);
          })
      },
    },
    mounted(){
    }
  };
</script>

<style scoped>
.csv-processing {
  display: flex;
  flex-direction: column;
}
.success {
  color: #2196f3 !important;
}
</style>
