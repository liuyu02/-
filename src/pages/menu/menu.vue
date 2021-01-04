<template>
  <div class="app">
    <el-button   type="primary" @click="willAdd" >添加</el-button>
      <v-list :list="list" @edit="edit($event)" @init="init"></v-list>
      <v-add :info="info" @init="init" :list="list" ref="add"></v-add>
  </div>

</template>
<script>
import vList from "./components/list.vue"
import vAdd from "./components/add.vue"
import {reqMenuList} from "../../utils/http.js"
export default {
  components:{
   vList,
   vAdd 
  },
 data(){
   return {
   list:[],
   info:{
      isshow:false,
      isadd:true
   },
   
   }
 },
  methods:{
    willAdd(){
  this.info.isshow=true;
 this.info.isadd=true
},

init(){
  reqMenuList().then(res=>{
    if (res.data.code==200){
      this.list=res.data.list
    }
  })
},
edit(id){
  this.info.isshow=true;
  this.info.isadd=false;
  this.$refs.add.getOne(id)
}
  } ,
  mounted(){
    this.init()
  } 
}
</script>

<style scoped>
.app{
  margin-top: 20px;
}
</style>