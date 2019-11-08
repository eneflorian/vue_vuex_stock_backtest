<template>
  <md-layout>
   <md-card style="width: 100%; height: fit-content;">
      <md-toolbar :md-elevation="1" class="card-header">
        <span class="md-title" style="margin-right:20px;">Csv File Processing</span>
        <PulseLoader v-if="getSpinner" style="display: inline-block;"></PulseLoader>
      </md-toolbar>
      <md-layout md-gutter class="main-box">
        
        <RobotSwitch></RobotSwitch>
        
        <!-- <md-layout md-flex="100">
          <md-layout>
            <md-card-header-text>
              <div class="md-title" style="display: inline-block; font-size: 15px;">Processing Status...</div>
              <div class="md-title" style="display: inline-block">{{getPublickey}}</div>
              <PulseLoader v-if="getSpinner" style="display: inline-block;color: #2196f3 !important;"></PulseLoader>
            </md-card-header-text>
          </md-layout>
        </md-layout> -->
      </md-layout>
    </md-card>
  </md-layout> 
</template>

<script>
import { PulseLoader } from 'vue-spinner/dist/vue-spinner.min.js'
import RobotSwitch from '@/components/common/RobotSwitch';
export default {
  data() {
    return {
    };
  },
  components: {
    'PulseLoader': PulseLoader,
    'RobotSwitch': RobotSwitch
  },
  computed: {
    getPublickey() {
      return this.$store.getters.publicKey
    },
    getIndexnumber() {
      return this.$store.getters.getIndexnumber
    },
    getSpinner() {
      return this.$store.getters.getSpinner;
    },
    getAccount() {
      return this.$store.getters.getAccount
    },
  },
  watch: {
  },
  methods: {
  },
  
  mounted() {
  },
};
</script>
<style scoped>
.box1 {
  height: 500px;
}
.v-pulse {
  background-color: #2196f3 !important;
}
</style>
