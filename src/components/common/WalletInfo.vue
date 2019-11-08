<template>
  <md-card style="width: 100%;">
    <md-card-header>
      <md-card-header-text>
        <div class="md-title">{{ $t('info', {which: $t('wallet.base')}) }}</div>
        <!-- <div class="md-subhead" v-if="walletAddress">
          {{ $t('address', {which: ''}) }}:
          <span>{{ walletAddress }}</span>
        </div> -->
      </md-card-header-text>

      <md-menu md-size="4" md-direction="bottom left">
        <md-button class="md-icon-button" md-menu-trigger>
          <md-icon>menu</md-icon>
        </md-button>
        <md-menu-content>
          <md-menu-item @click="openDialog('set_privary_key')">
            <span>{{ $t('settings', {what_to: $t('wallet.base')}) }}</span>
            <md-icon>settings</md-icon>
          </md-menu-item>
        </md-menu-content>
      </md-menu>
    </md-card-header>

    <!-- <md-card-content v-if="isMaxEditable">
      <md-button @click="saveChange" class="md-raised md-primary">
        <md-icon>save</md-icon>
      </md-button>
    </md-card-content> -->

    <md-card-content class="box1">
      <md-table md-sort-type="desc">
        <md-table-header>
          <md-table-row>
            <md-table-head>{{ 'wallet.asset' | translate }}</md-table-head>
            <md-table-head>{{ 'wallet.balance' | translate }}</md-table-head>
          </md-table-row>
        </md-table-header>
        <md-table-body>
          <md-table-row>
            <md-table-cell>
              <span>
                XLM
              </span>
            </md-table-cell>
            <md-table-cell>{{ getAdminasset['navitebalance'] }}</md-table-cell>
          </md-table-row>   
          <md-table-row v-for="(balance, index) in getAdminasset.balance" :key="index">
            <md-table-cell>
              <span>
                {{balance.asset_code + '(' + balance.issuer.substring(0,5) + '...)'}}
              </span>
            </md-table-cell>
            <md-table-cell>{{ balance.balance }}</md-table-cell>
          </md-table-row>        
        </md-table-body>
      </md-table>
    </md-card-content>

    <dialog-form
      :md-title="$t('wallet.config_your_private_key')"
      :md-ok-text="$t('done')"
      :md-cancel-text="$t('cancel')"
      :md-dialog-width="'30%'"
      @open="onOpen"
      @close="onClose"
      ref="set_privary_key">
      <md-input-container md-inline>
        <label>{{ $t('wallet.type_your_private_key') }}</label>
        <md-input type="password" v-model="walletPrivateKey"></md-input>
      </md-input-container>
    </dialog-form>
  </md-card>
</template>

<script>
import DialogForm from '@/components/common/DialogForm';
import ApiService from '@/services/ApiService'
// import Api from '@/lib/Api';
export default {
  data() {
    return {
      walletPrivateKey: null,
    };
  },
  computed: {
    getAdminasset() {
      return this.$store.getters.getAdminasset
    },
  },
  watch: {
  },
  components: {
    'dialog-form': DialogForm,
  },
  methods: {
    
    openDialog(ref) {
      this.$refs[ref].open(ref);
    },
    onOpen(ref) {
      switch (ref) {
        case 'set_privary_key': {
          break;
        }
        case 'add_trustline': {
          break;
        }
        default: {
          break;
        }
      }
      window.Sconsole(['Dialog Opened', ref]);
    },
    onClose(ref, type) {
      switch (ref) {
        case 'set_privary_key': {
          if (type === 'ok') {
            // To generate PublicKey and save to store
            this.$store.commit('setSpinner', true)
            ApiService.getAsset(this.walletPrivateKey)
            Api.generateKeypair(
              this.walletPrivateKey,
              (res) => {
                this.$store.commit('updatePublicKey', res.publicKey());
                this.$store.commit('updatePrivateKey', this.walletPrivateKey);
                Api.getAdminasset(this.$store)
              },
              () => {
                this.$store.commit('setSpinner', false)
                this.$store.commit('updateSnackmsg', 'wallet.private_key_error');
                this.walletPrivateKey = null;
              },
            );
          } else {
            this.walletPrivateKey = null;
          }
          break;
        }
        case 'add_trustline': {
          if (type === 'ok') {
          } else {
            // console
            this.assetCode = '';
            this.assetIssuer = '';
          }
          break;
        }
        default: {
          break;
        }
      }
      window.Sconsole(['Dialog Closed', ref, type]);
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
.box1 {
  height: 500px;
}
</style>
