<template>
     <transition name="modal">
         <div class="modal-wrapper">
             <div class="modal-mask" @click="close"></div>
            <div class="modal-container">
                <span class="modal__close" @click="close"><font-awesome-icon icon="plus" /></span>
             <div class="modal-header">
                 <h3 class="modal__header-title text_dark-blue">{{custumizeDate(date)}}</h3>
             </div>

             <div class="modal-body">
                 <div class="modal__control">
                     <label ><b>Название события</b></label>
                     <input v-model="title" type="text" class="modal__input modal__control-item">
                 </div>
                 <div class="modal__control">
                     <label><b>Описание события</b></label>
                     <textarea v-model="text"  class="modal__textarea modal__control-item"></textarea>
                 </div>

             </div>

             <div class="modal-footer" v-if="eventType === 'create'">
                 <button class="btn btn_blue-outline modal__btn" @click.capture="addEvent" >Создать</button>
             </div>
                <div class="modal-footer"  v-else>
                    <button class="btn btn_red-outline modal__btn" @click.capture="deleteEvent">Удалить</button>
                    <button class="btn btn_blue-outline modal__btn" @click.capture="editEvent">Редактировать</button>
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
                // this.clearData();
            },
            clearData(){
                this.title = '' ;
                this.text = '';
                this.date = '';
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
            },
            deleteEvent:function(){
                this.close();
                this.$emit('deleteEvent', this.id);
            },
            custumizeDate(date){
                return this.$moment(date, this.dateFormat).format("DD MMMM YYYY")
            }
        }
    }
</script>

<style lang="sass" scoped>
@import "event-modal"
</style>