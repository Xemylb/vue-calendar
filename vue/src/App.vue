<template>
  <div id="app">
    <main class="main">
      <!--<img src="./assets/logo.png">-->
      <router-view/>
    </main>
    <vue-particles color="#dedede"></vue-particles>
  </div>

</template>

<script>
    import headerComponent from './components/header'
    import footerComponent from './components/footer'
    import 'bootstrap/dist/css/bootstrap.css'

export default {
  name: 'App',
    components:{
        headerComponent,footerComponent
    },
    created(){
        console.log(this.$moment);
    }
}
</script>

<style lang="sass">
  @import 'main'
</style>
