<template>
    <transition name="modal" :duration="{ enter: 0, leave: 300 }">
        <div class="modal">
            <div class="modal__mask" @click="close"></div>
            <div class="modal__container">
                <span class="modal__close" @click="close"><font-awesome-icon icon="plus"/></span>
                <div class="modal__header">
                    <h3 class="modal__header-title text_dark-blue">
                        <img v-show="google" src="../../assets/img/google.png" class="modal__header-img img-fluid" alt="google">
                        {{customizeDate}}
                    </h3>
                </div>
                <div class="modal__body" v-if="eventType === 'create'">
                    <div class="modal__control">
                        <label><b>Название события<span class="text_red">*</span></b></label>
                        <input v-model="title" type="text" class="modal__input modal__control-item">
                        <p class="text_red modal__error" v-show="error">{{errorText}}</p>
                    </div>
                    <div class="modal__control">
                        <label><b>Описание события</b></label>
                        <textarea v-model="text" class="modal__textarea modal__control-item"></textarea>
                    </div>
                </div>
                <div class="modal__body" v-else>
                    <div class="modal__control" v-show="!eventOnEdit">
                        <h4 class="modal__control-title">Название события</h4>
                        <p class="modal__control-text">{{title}}</p>
                    </div>
                    <div class="modal__control" v-show="eventOnEdit">
                        <label><b>Дата</b></label>
                        <masked-input class="modal__input modal__control-item" v-model.trim="inputDate"
                                      placeholder-char="_" mask="11-11-1111,11:11" placeholder="Дата: 12-12-2018,12:30*"/>
                    </div>
                    <div class="modal__control" v-show="eventOnEdit">
                        <label><b>Название события<span class="text_red">*</span></b></label>
                        <input v-model.trim="title" type="text" class="modal__input modal__control-item">
                        <p class="text_red modal__error" v-show="error">{{errorText}}</p>
                    </div>

                    <div class="modal__control" v-show="!eventOnEdit && text">
                        <h4 class="modal__control-title">Описание события</h4>
                        <p class="modal__control-text">{{text}}</p>
                    </div>

                    <div class="modal__control" v-show="eventOnEdit">
                        <label><b>Описание события</b></label>
                        <textarea v-model.trim="text" class="modal__textarea modal__control-item"></textarea>
                    </div>
                </div>
                <div class="modal__footer" v-if="eventType === 'create'">
                    <button class="btn btn_blue-outline modal__btn" @click.capture="addEvent">Создать событие</button>
                </div>
                <div class="modal__footer" v-else>
                    <button class="btn btn_blue-outline modal__btn" @click.capture="eventOnEdit = !eventOnEdit"
                            v-show="!eventOnEdit">Редактировать
                    </button>
                    <button class="btn btn_red-outline modal__btn" @click.capture="deleteEvent" v-show="!eventOnEdit">
                        Удалить
                    </button>
                    <button class="btn btn_blue-outline modal__btn" @click.capture="editEvent" v-show="eventOnEdit">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>


    </transition>
</template>

<script>
    import maskedInput from 'vue-masked-input'
    export default {
        name: "event-modal",
        components: {maskedInput},
        props: {
            modalData:{
                eventType: String,
                date: String,
                dateFormat: String,
                dayData:{
                    id: String,
                    title: String,
                    text: String,
                    google: Boolean
                }
            }
        },
        mounted(){
            this.date = this.$moment(this.modalData.date).format();
            this.inputDate = this.$moment(this.date).format(this.inputDateFormat);
        },
        computed:{
            customizeDate() {
                return this.$moment(this.date).format("DD MMMM YYYY, LT")
            },
        },
        data() {
            return {
                date: '',
                inputDate:'',
                id: this.modalData.dayData.id,
                eventType: this.modalData.eventType,
                title: this.modalData.dayData.title,
                text: this.modalData.dayData.text,
                google: this.modalData.dayData.google,
                eventOnEdit: false,
                error: false,
                errorText: 'Название не должно быть пустым',
                inputDateFormat: 'DD-MM-YYYY,LT'
            }
        },
        methods: {
            close: function () {
                this.$emit('close');
                this.clearData();
            },
            clearData() {
                this.title = '';
                this.text = '';
                this.date = '';
            },
            addEvent: function () {
                if (this.validate()) {
                    this.$emit('addEvent', {
                        title: this.title,
                        text: this.text
                    });
                    this.close();
                }
            },
            editEvent: function () {
                if (this.validate()) {
                    this.eventOnEdit = !this.eventOnEdit;
                    this.date = this.$moment(this.inputDate, this.inputDateFormat).format();
                    this.$emit('editEvent', {
                        id: this.id,
                        date: this.date,
                        title: this.title,
                        text: this.text,
                        google: this.google
                    });
                }
            },
            deleteEvent: function () {
                this.close();
                this.$emit('deleteEvent', this.id);
            },

            validate() {
                if (!this.title) {
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 2000);
                    return false;
                }
                if(!this.$moment(this.inputDate, this.inputDateFormat).isValid()){
                    return false;
                }
                this.error = false;
                return true
            }
        }
    }
</script>

<style lang="sass" scoped>
    @import "event-modal"
</style>