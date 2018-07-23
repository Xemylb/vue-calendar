<template>
    <div id="app">
        <main class="main">
            <router-view/>
        </main>
        <vue-particles color="#dedede"></vue-particles>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.css'

    export default {
        /* eslint-disable */
        name: 'App',
        components: {},
    }
</script>

<style lang="sass">
    @import 'main'
</style>
