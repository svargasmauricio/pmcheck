<template>

    <AbsoluteLayout height="180" :backgroundImage="itemServico.url_img" ref="abs"
        @tap="tapItem">
        <GridLayout ref="floating" columns="20, *" rows="*, auto, 20" height="100%"
            width="100%">
            <StackLayout col="1" row="1" backgroundColor="#149bd7" class="desc-container">
                <Label :text="itemServico.descricao" class="desc" />
                <GridLayout android:columns="auto, *" ios:columns="*" v-if="when !== '*'">

                    <RadListView :items="itemServico.lstAgendaServico" 
                        layout="grid">
                        <v-template>
                            <label class="lbl-hour" :text="FormatHora(item.dthr_ini)" ></label>
                        </v-template>
                    </RadListView>
                    
                </GridLayout>
            </StackLayout>
        </GridLayout>
    </AbsoluteLayout>
    
</template>

<script lang="ts">
    
    import * as effects from "../../helpers/Effects";
    import navigation from "../../helpers/Navigation";
    import ListPickerIModal from "../control/c_ListPickerIModal.vue";

    export default {
        components:{ListPickerIModal},
        props: ["itemServico"],
        data() {
            return {
                
            }
        },
        created: function() {
            console.log(JSON.stringify(this.itemServico))
        },
        methods: {
            tapItem() {
                //this.$emit("toggle-loading");
                let view = this.$refs.abs.nativeView;
                effects.tapEffect(view).then(() => {
                    // this.$emit("viewResult", {
                    //     destination: this.destination,
                    //     when: this.when
                    // });
                    navigation.pushModal(this.$modal);
                    return this.$showModal(ListPickerIModal, {
                        props: {
                            title: 'Escolha seu Horario',
                            items: this.itemServico.lstAgendaServico,
                            parent: this
                        }
                    }).then(() => {
                        navigation.popModal();
                    });
                });
            },
            Checked(item){
                console.log(JSON.stringify(item))
                return false;
            },
            FormatData(date){
                var data_hr = date.split('T');
                return date = data_hr[0] + " " + data_hr[1]; 
            },
            FormatHora(date){
                var data_hr = date.split('T');
                return data_hr[1]; 
            },
            AtualizaLista(){
                this.$emit("viewResult");
            }
        }
    }
</script>

<style scoped>
    AbsoluteLayout {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: #003c5a;
    }

    .desc-container {
        padding: 3;
        color: white;
        opacity: 0.9;
    }

    .desc {
        font-size: 14;
        color: whitesmoke;
        font-weight: bold;
    }

    .lbl-hour{
        font-size: 10;
        margin:1;
    }
</style>
