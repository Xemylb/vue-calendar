<template>
    <div class="calendar__search">
        <input type="text" class="calendar__search-input" placeholder="Найти событие">
        <button class="btn btn-outline-info calendar__search-submit"><font-awesome-icon icon="search" /> </button>
    </div>
</template>

<script>
    export default {
        name: "search",
        data(){
            return{
                title: 'Header'
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "search"
</style>