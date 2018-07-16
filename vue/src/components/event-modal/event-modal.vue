<template>
     <transition name="modal">
         <div class="modal-wrapper">
             <div class="modal-mask" @click="close"></div>
            <div class="modal-container">
             <div class="modal-header">
                 <h3 class="modal__header-title"> Дата: {{date}}</h3>
             </div>

             <div class="modal-body">
                 <div class="modal__control">
                     <label for="event_name"><b>Название события</b></label>
                     <input v-model="title" v-bind:id="event_name" type="text" class="modal__input modal__control-item">
                 </div>
                 <div class="modal__control">
                     <label for="event_text"><b>Описание события</b></label>
                     <textarea v-model="text" v-bind:id="event_text" class="modal__textarea modal__control-item"></textarea>
                 </div>

             </div>

             <div class="modal-footer" v-if="eventType === 'create'">
                 <button class="btn btn-success modal__btn" @click.capture="addEvent" >Создать</button>
             </div>
                <div class="modal-footer"  v-else>
                    <button class="btn btn-danger modal__btn" @click.capture="close">Удалить</button>
                    <button class="btn btn-info modal__btn" @click.capture="editEvent">Редактировать</button>
                </div>
            </div>
         </div>


      </transition>
</template>

<script>
    export default {
        name: "event-modal",
        props:['modalData'],
        data() {
            return {
                date: this.modalData.date,
                id: this.modalData.dayData.id,
                eventType: this.modalData.eventType,
                title: this.modalData.dayData.title,
                text: this.modalData.dayData.text,
            }
        },
        methods: {
            close: function() {
                // генерируем событие 'remove' и передаём id элемента
                this.$emit('close');
                this.clearData();
            },
            clearData(){
                this.title = '' ;
                this.text = '';
            },
            addEvent: function() {
                // генерируем событие 'remove' и передаём id элемента
                this.$emit('addEvent', {
                    title: this.title,
                    text: this.text
                });
                this.close();
            },
            editEvent: function() {
                this.$emit('editEvent', {
                    id: this.id,
                    title: this.title,
                    text: this.text
                });
                this.close();
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "event-modal"
</style>