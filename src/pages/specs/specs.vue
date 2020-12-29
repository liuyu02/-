<template>
  <div class="app">
    <el-button   type="primary" @click="willadd" >添加</el-button>
      <v-list ></v-list>
      <v-add  :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex"
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
 components:{
   vAdd,
   vList
 },
 data(){
  return {
     info:{
      isshow:false
   }
  }
 },
 computed:{
   ...mapGetters({
     list:"cate/list"
   })
 },
 methods:{
   ...mapActions({
     reqList:"cate/list"
   }),
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