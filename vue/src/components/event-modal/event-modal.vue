<template>
    <transition name="modal" :duration="{ enter: 0, leave: 300 }">
        <div class="modal__wrapper">

            <div class="modal__mask" @click="close"></div>
            <div class="modal__container">
                <span class="modal__close" @click="close"><font-awesome-icon icon="plus"/></span>
                <div class="modal__header">
                    <h3 class="modal__header-title text_dark-blue">
                        <img v-show="google" src="../../assets/google.png" class="modal__header-img img-fluid" alt="google">
                        {{customizeDate(date)}}
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
                    <div class="modal__control" v-show="!eventOnEdit && text">
                        <h4 class="modal__control-title">Описание события</h4>
                        <p class="modal__control-text">{{text}}</p>
                    </div>
                    <div class="modal__control" v-show="eventOnEdit">
                        <label><b>Название события<span class="text_red">*</span></b></label>
                        <input v-model.trim="title" type="text" class="modal__input modal__control-item">
                        <p class="text_red modal__error" v-show="error">{{errorText}}</p>
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
    export default {
        name: "event-modal",
        props: ['modalData'],
        data() {
            return {
                date: this.modalData.date,
                id: this.modalData.dayData.id,
                eventType: this.modalData.eventType,
                title: this.modalData.dayData.title,
                text: this.modalData.dayData.text,
                dateFormat: this.modalData.dateFormat,
                google: this.modalData.dayData.google,
                eventOnEdit: false,
                error: false,
                errorText: 'Название не должно быть пустым'
            }
        },
        methods: {
            close: function () {
                // генерируем событие 'remove' и передаём id элемента
                this.$emit('close');
                this.clearData();
            },
            clearData() {
                this.title = '';
                this.text = '';
                this.date = '';
            },
            addEvent: function () {
                // генерируем событие 'remove' и передаём id элемента
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
                    this.$emit('editEvent', {
                        id: this.id,
                        title: this.title,
                        text: this.text
                    });
                }
            },
            deleteEvent: function () {
                this.close();
                this.$emit('deleteEvent', this.id);
            },
            customizeDate(date) {
                return this.$moment(date, this.dateFormat).format("DD MMMM YYYY")
            },
            validate() {
                if (!this.title) {
                    this.error = true;
                    setTimeout(() => {
                        this.error = false;
                    }, 2000);
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