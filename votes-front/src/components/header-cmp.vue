<script>
export default{
  created(){
    const dir = this.local === 'he' ? 'rtl' : 'ltr'
    document.body.dir = dir
  },
  computed:{
    local(){
      return this.$i18n.locale
    }
  },
  methods:{
    changeLocal(){
      this.$i18n.locale = this.$i18n.locale === 'he' ? 'en' : 'he'
      localStorage.getItem("local")
      localStorage.setItem("local", this.$i18n.locale)
    }
  },
  watch:{
    local(){
      const dir = this.local === 'he' ? 'rtl' : 'ltr'
      document.body.dir = dir
    }
  }
}
</script>


<template>
  <div class="header">
    <router-link class="link" to="/un-votes/">{{$t('List of countries')}}</router-link>
    <router-link class="link" to="/un-votes/charts">{{$t('Summary charts')}}</router-link>
    <router-link class="link" to="/un-votes/about">{{$t('About')}}</router-link>
    <button @click="changeLocal">{{$t('trnslate')}}</button>
  </div>
</template>

<style scoped>
.header {
  height: 50px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: #fff;

  box-shadow: 0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  display: flex;
  align-items: center;
  padding-inline-start: 50px;
}
.link{
    font-size: 18px;
}
.link:not(:last-child){
    border-inline-end: 1px solid black;
    padding-inline-end: 10px;
    margin-inline-end: 10px;
}
@media (max-width: 960px){
    .header {
      padding-inline-start: 10px;
    }    
}

</style>
