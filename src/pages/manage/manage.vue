<template>
  <div class="app">
    <el-button   type="primary" @click="willadd" >添加</el-button>
      <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
      <v-add :info="info"    @init="init" :list="list" ref="add"></v-add>

      <el-pagination
    layout="prev, pager, next"
    :total="total"
    :page-size="pageSize"
    @current-change="changePage"
    >
  </el-pagination>
  </div>

</template>

<script>
import { reqManageList,reqMenulist, reqRolelist, reqManagelist, reqManageCount, reqManageUpdate  } from '../../utils/http'
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
  components:{
   vAdd,
   vList
 },
  data(){
    return{
      info:{
        isshow:false,
        isadd:true
      },
      list:[],
      pageSize:2,
      total:0,
      page:1
    }
  },
 
 methods:{
     willadd(){
   this.info.isshow=true;
   this.info.isadd=true;
 },
 init(){
  //  reqManageList({page:1,size:50}).then(res=>{
  //    if(res.data.code==200){
  //      this.list=res.data.list;
  //    }
  //  })
   this.getTotal();
   this.getList();
 },
 edit(id){
   this.info.isshow=true
   this.info.isadd=false
    this.$refs.add.getOne(id)
 },
//  请求总数
 getTotal(){
  reqManageCount().then(res=>{
    if (res.data.code==200) {
      this.total=res.data.list[0].total
    }
  })
 },
 getList(){
   reqManageList({page:this.page,size:this.pageSize}).then(res=>{
     if(res.data.code==200){
       if (res.data.list.length==0&&this.page>1) {
         this.page--
         this.getList()
         return
       }
       this.list=res.data.list
     }
   })
 },
 changePage(e){
   this.page=e;

   this.getList()
 }
},
mounted(){
  this.init();
}
 }

</script>

<style scoped>
.app{
  margin-top: 20px;
}
</style>