<template>
  <md-layout md-gutter class="main-box">
    <!-- <md-layout md-flex="100">
      <robot-switch></robot-switch>
    </md-layout> -->
    <md-layout md-flex="25">
      <user-input/>
    </md-layout>
    <md-layout md-flex="25">
      <robot-exchange-pair></robot-exchange-pair>
    </md-layout>
    <md-layout md-flex="50">
      <result></result>
    </md-layout>
    <md-layout md-flex="100">
      <Optimization/>
    </md-layout>
  </md-layout>
</template>

<script>
import Optimization from '@/components/common/Optimization';
import Result from '@/components/common/Result';
import UserInput from '@/components/common/UserInput';
import WalletInfo from '@/components/common/WalletInfo';
import ReceiverList from '@/components/common/ReceiverList';
// import OrderList from '@/components/common/OrderList';
import RobotSwitch from '@/components/common/RobotSwitch';

export default {
  name: 'home',
  data() {
    return {

    };
  },
  methods: {
  },
  components: {
    'Optimization': Optimization,
    'user-input': UserInput,
    'wallet-info': WalletInfo,
    'robot-exchange-pair': ReceiverList,
    // 'order-list': OrderList,
    'robot-switch': RobotSwitch,
    'result': Result
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.v-pulse {
  background-color: white !important;
}
.md-input-container {
  margin-bottom: 0px !important;
  label {
    font-size: 14px;
  }
}
.card-header {
  min-height: fit-content !important; 
  span {
    font-size: 18px !important;
  }
}
.main-box .md-layout {
  margin-top: 5px;
  padding: 10px;
}
.md-subhead {
  word-break:break-all;
}
.addr {
  width: 160px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.custom-option {
  max-width: none !important;
}
</style>
