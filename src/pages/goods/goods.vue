<template>
   <div class="app">
    <el-button   type="primary" @click="willadd" >添加</el-button>
      <v-list></v-list>
      <v-add :info="info"></v-add>
  </div>
</template>

<script>
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
  components:{
    vList,
    vAdd
  },
  data(){
    return {
      info:{
        isshow:true
      }
    }
  },
  methods:{
    willadd(){
      this.info.isshow=true
    }
  }
}
</script>

<style scoped>
.app{
  margin-top: 20px;
}
</style>