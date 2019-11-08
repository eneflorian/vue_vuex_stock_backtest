<template>
  <div>
    <md-toolbar>
      <!-- <md-button class="md-icon-button" v-on:click="toggleLeftSidenav">
        <md-icon>menu</md-icon>
      </md-button> -->
      <h2 class="md-title site-title" style="text-align: center; margin: 0 auto;">{{ 'site_title' | translate }}</h2>
      <md-spinner :md-size="40" md-indeterminate class="md-warn" v-if="isloading"></md-spinner>
    </md-toolbar>
    <!-- <md-progress class="md-warn" :md-progress="progress"></md-progress> -->
    <md-sidenav class="md-left" ref="leftSidenav" @open="open('Left')" @close="close('Left')">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">{{ 'site_title' | translate }}</h3>
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item>
          <router-link to="/">{{ 'home' | translate }}</router-link>
        </md-list-item>
        <md-list-item>
          <span>v{{ version }}</span>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script>
export default {
  props: {
    version: String,
  },
  data() {
    return {
      lang: this.$store.getters.lang,
      backupConfig: '<p></p>',
      configStr: '',
      // progress: 0,
    };
  },
  watch: {
    lang(val) {
      this.$i18n.set(val);
      this.$store.commit('updateLang', val);
    },
  },
  computed: {
    isloading() {
      return this.$store.getters.isloading;
    },
  },
  methods: {
    toggleLeftSidenav() {
      this.$refs.leftSidenav.toggle();
    },
    open(ref) {
      window.Sconsole(['open:', ref]);
    },
    close(ref) {
      window.Sconsole(['close', ref]);
    },
    reset() {
      window.localStorage.vuex = null;
      window.location.reload();
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
  .site-title a {
    color: #fff !important;
    text-decoration: none !important;
  }
  .site-title a:hover {
    color: #fff !important;
    text-decoration: none !important;
  }
  .custom_a {
    color: #000 !important;
    text-decoration: none !important;
  }
</style>
