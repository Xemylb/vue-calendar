<template>
  <div id="app">
    <headerComponent/>
    <main class="main">
      <img src="./assets/logo.png">
      <router-view/>
    </main>

     <footerComponent/>
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

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

</style>
