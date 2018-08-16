<template>
    <div class="fast-create">
        <div class="fast-create__caption" @click="toggle" v-show="show"></div>
        <button class="btn_darkblue-outline btn fast-create__btn" @click="toggle">Быстрое создание</button>
        <button class="btn btn_blue fast-create__btn-mobile" v-bind:class="{show: show}" @click="toggle">
            <font-awesome-icon icon="plus"/>
        </button>
        <transition name="slide-fade">
            <div class="fast-create__modal" v-if="show">
                <span class="fast-create__caret"><font-awesome-icon icon="caret-up"/></span>
                <span class="fast-create__close" @click="toggle"><font-awesome-icon icon="plus"/> </span>
                <div class="fast-create__control">
                    <masked-input class="fast-create__event-date fast-create__input" v-model.trim="date"
                                  placeholder-char="_" mask="11-11-1111,11:11" placeholder="Дата: 12-12-2018,12:30*"/>
                    <p class="text_red fast-create__error" v-show="errors.date.flag">{{errors.date.text}}</p>
                </div>
                <div class="fast-create__control">
                    <input type="text" class="fast-create__event-title fast-create__input" @keyup.enter="addEvent"
                           v-model.trim="title" placeholder="Название события*">
                    <p class="text_red fast-create__error" v-show="errors.title.flag">{{errors.title.text}}</p>
                </div>
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
        props: {
            dateFormat: String
        },
        data() {
            return {
                title: '',
                date: '',
                show: false,
                errors: {
                    title: {
                        flag: false,
                        text: 'Введите название события'
                    },
                    date: {
                        flag: false,
                        text: 'Неверная дата'
                    }

                }
            }
        },
        methods: {
            toggle() {
                this.show = !this.show;
                this.clear()
            },
            clear() {
                this.date = '';
                this.title = '';
            },
            addEvent() {
                if (this.validate()) {
                    let event = {
                        date: this.$moment(this.date, 'DD-MM-YYYY, LT').format(),
                        title: this.title,
                        text: '',
                        time: ''
                    };
                    this.$store.dispatch('addEvent', event);
                    this.toggle();
                }
            },
            validate() {
                let localeFormat = 'DD-MM-YYYY,LT';
                let validDate = this.$moment(this.date, localeFormat).isValid();

                if (!validDate || !this.title) {
                    if (!this.title) {
                        this.showError('title');
                    }
                    if (!validDate) {
                        this.showError('date');
                    }
                    return false;
                }
                return true;
            },
            showError(flag) {
                let errorsDelay = 1500;
                if (flag === 'title') {
                    this.errors.title.flag = true;
                }
                if (flag === 'date') {
                    this.errors.date.flag = true;
                }
                setTimeout(() => {
                    this.errors.date.flag = false;
                    this.errors.title.flag = false;
                }, errorsDelay);
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import 'fast-create'
</style>