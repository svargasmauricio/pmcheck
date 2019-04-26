<template>

    <StackLayout>
        <RadListView pullToRefresh="true" 
            @pullToRefreshInitiated="onPullToRefreshInitiated" :items="lstServicos" layout="grid" itemHeight="180">
            <v-template>
                <ResultsItem :itemServico="item"
                    @viewResult="viewResult" @toggle-loading="$emit('toggle-loading')" />
            </v-template>
        </RadListView>
    </StackLayout>

</template>

<script lang="ts">
    import * as http from "http";

    import ResultsItem from './ResultsItem.vue'

  export default {
      components: {ResultsItem},
    data() {
      return {
        lstServicos: [],
      }
    },
    created: function() {
        this.AtualizaLista();
        
    },
    methods: {
        AtualizaLista(args){
            var _self = this;
            var url = this.$url_api + "/Servico/GetDisponivel";

            return http.getJSON(url).then(result => {
                console.log(result)

                _self.lstServicos = result.lstServicos;  
                var listView = args.object;                               
                listView.notifyPullToRefreshFinished();  
            }, err => {
                console.log(err);
            })

        },
        onPullToRefreshInitiated(args){
            this.AtualizaLista(args);
        },
        FormatData(date){
            var data_hr = date.split('T');
            return date = data_hr[0] + " " + data_hr[1]; 
        },

        viewResult(){
            this.AtualizaLista();
        }

    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .btn-marcar{
        background: green;
        color: white;
    }

    .btn-desmarcar{
        background: lightgray; 
    }
</style>
