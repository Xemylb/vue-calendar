<template>
    <h1>{{title}}</h1>
</template>

<script>
    export default {
        name: "header",
        template:'<customHeader/>',
        data(){
            return{
                title: 'Header'
            }
        }
    }
</script>

<style scoped>

</style>