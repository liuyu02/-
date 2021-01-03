<template>
  <div class="app">
      <el-button   type="primary" @click="willadd">添加</el-button>
      <v-adds :info="info"  ref="add"  @init="init"></v-adds>
      <v-lists :list="list" @init="init" @edit="edit($event)"></v-lists>
  </div>
</template>

<script>
import vAdds from "./components/add.vue"
import vLists from "./components/list.vue"
import {reqRolelist} from "../../utils/http.js"
export default {
   components:{
     vAdds,
     vLists
   },
   data(){
     return{
       list:[],
       info:{
       isshow:false,
       isadd:true,
       }
       
     }
   },
   methods:{
     willadd(){
       this.info.isshow=true,
       this.info.isadd=true
     },
     init(){
       console.log(124);
       reqRolelist().then(res=>{
         if(res.data.code==200){
           console.log(res)
           this.list=res.data.list
         }
       })
     },
     edit(id){
       this.info.isshow=true;
       this.info.isadd=false;
       this.$refs.add.getOne(id)
     }
   },
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