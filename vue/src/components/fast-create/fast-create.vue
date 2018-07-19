<template>
    <div class="fast-create">
        <div class="btn_darkblue-outline btn fast-create__btn" @click="toggle">Быстрое создание</div>
        <transition name="fade">
            <div class="fast-create__modal" v-show="show">
                <span class="fast-create__caret"><font-awesome-icon icon="caret-up"/></span>
                <span class="fast-create__close" @click="toggle"><font-awesome-icon icon="plus"/> </span>
                <masked-input class="fast-create__event-date fast-create__input"  v-model.trim="date" placeholder-char="_" mask="11-11-1111" placeholder="Дата: 12-12-2018*"/>
                <input type="text" class="fast-create__event-title fast-create__input" @keyup.enter="addEvent" v-model.trim="title" placeholder="Название события*" >
                <button type="submit" class="btn btn_darkblue fast-create__submit" @click="addEvent">Создать</button>
            </div>
        </transition>

    </div>
</template>

<script>
    import maskedInput from 'vue-masked-input'
    export default {
        name: "fast-create",
        components: {maskedInput},
        data (){
            return{
                title: '',
                date: '',
                show: false
            }
        },
        methods:{
            toggle(){
                this.show = !this.show;
                this.clear()
            },
            clear(){
                this.date = '';
                this.title = '';
            },
            addEvent(){
                let event = {
                    date: this.date,
                    title: this.title,
                    text: '',
                };
                this.$store.dispatch('addEvent', event);
                this.toggle();
            },
        }
    }
</script>

<style lang="sass" scoped>
    @import 'fast-create'
</style>