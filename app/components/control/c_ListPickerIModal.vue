<template>
    <GridLayout rows="auto, *, auto">
        <GridLayout columns="*" row="0" class="lpi-titlebar">
            <Label class="h2" :text="title" col="1" verticalAlignment="center" />
        </GridLayout>
        <ListView for="item in items" row="1" @itemTap="itemTap"
            separatorColor="#4682B4">
            <v-template >
                <Label :text="FormatData(item.dthr_ini)" class="lpi-list-item" />
            </v-template>
        </ListView>
        <GridLayout columns="*, auto, *" rows="auto" row="2" class="lpi-bottombar">
            <Button class="fa lpi-close-button" @tap="closeModal" col="1">Fechar</Button>
        </GridLayout>
    </GridLayout>
</template>

<script>
    import * as application from "application";
    import * as http from "http";
    import {
        AndroidApplication,
        AndroidActivityBackPressedEventData
    } from "application";
    import {
        isAndroid
    } from "platform";

    export default {
        data() {
            return {

            }
        },
        methods: {
            itemTap(event) {
                this.MarcaAgenda(event.item)
            },
            closeModal() {
                this.$modal.close();
            },
            FormatData(date){
                var data_hr = date.split('T');
                return date = data_hr[0] + " " + data_hr[1]; 
            },
            FormatHora(date){
                var data_hr = date.split('T');
                return data_hr[1]; 
            },
            MarcaAgenda(itemAgenda){
                var url = this.$url_api + "/Servico/ConfAgenda";
                var ConfirmacaoAgendaServico = {};
                ConfirmacaoAgendaServico.agendaServico = itemAgenda;
                ConfirmacaoAgendaServico.usuario = "MOBILE";
                var _self = this;

                return http.request({
                    url: url,
                    method: "POST",
                    headers: { "content-type": "application/json" } ,
                    content: JSON.stringify(ConfirmacaoAgendaServico)
                }).then(response => {
                    _self.parent.AtualizaLista();
                    alert('Horario Confirmado!');
                    _self.$modal.close();
                }, error => {return false;});
                
            }, 
        },
        mounted() {
            if (isAndroid) {
                this.androidhook = application.android.once(
                    AndroidApplication.activityBackPressedEvent,
                    data => {
                        this.$modal.close();
                        data.cancel = true; // prevents default back button behavior
                    }
                );
            }
        },
        props: {
            title: String,
            items: Array,
            parent: Object
        },
        name: "ListPickerIModal"
    };
</script>

<style scoped>
    .lpi-titlebar {
        color: white;
        background-color: #4682B4;
        font-size: 15;
        padding: 5;
    }

    .h2 {
        padding: 0;
        padding-left: 20;
        margin: 0;
        color: white;
    }

    .lpi-list-item {
        font-size: 16;
        padding: 10 20;
        width: 100%;
    }

    .lpi-list-item.even {
        background-color: #e0f6ff;
    }

    .lpi-list-separator {
        background-color: #4682B4;
        height: 5;
        width: 100%;
    }

    .lpi-bottombar {
        color: white;
        background-color: #4682B4;
        text-align: right;
    }

    .lpi-close-button {
        background-color: #4682B4;
        height: 40;
        color: white;
        border-color: transparent;
        border-width: 1;
    }
</style>