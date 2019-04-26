<template>
    <Page backgroundSpanUnderStatusBar="true"
           androidStatusBarBackground="#4682B4">
        <ActionBar :title="msg" />

        <GridLayout columns="*" rows="*">
            <List  col="0" row="0"></List>
        </GridLayout>
    </Page>
</template>

<script lang="ts">
    import List from './agenda/List.vue'

  export default {
    components:{List},
    data() {
      return {
        msg: 'Agende seu serviço'
      }
    },
    
  }
</script>

<style scoped>
    ActionBar {
        background: linear-gradient(#4682B4, #149bd7);
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
