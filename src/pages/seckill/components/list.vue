<template>
 <div class="box">
    <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children'}">
    <el-table-column prop="title" label="活动名称" width="180"></el-table-column>
     <el-table-column label="状态" width="230">
      <template slot-scope="scope">
         <el-button type="primary" v-if="scope.row.status==1" >启用</el-button>
       <el-button type="primary" v-else>禁用</el-button>
      </template>
    </el-table-column>
     <el-table-column  prop="name" label="操作" >
 <template slot-scope="scope">
         <el-button type="primary" @click="edit(scope.row.id)" >编辑</el-button>
       <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {mapActions ,mapGetters} from "vuex";
import {reqSeckillDel} from "../../../utils/http.js";
import {successalert} from "../../../utils/alert.js"
export default {
data(){
    return{};
},
computed:{
   ...mapGetters({
     list:"seckill/list",
   })
 },
 methods:{
   ...mapActions({
     reqList:"seckill/reqList",
   }),
   del(id){
     this.$confirm("你确定删除么？","提示",{
       confirmButtonText:"删除",
       cancelButtonText:"取消",
       type:"warning"
     }).then(()=>{
       reqSeckillDel({id:id}).then(res=>{
         if(res.data.code==200){
           successalert(res.data.msg);
           this.reqList();
         }
     });
     }).catch(()=>{
     
     })
 },
 edit(id){
  this.$emit("edit",id)
 }

 },
 mounted(){
   this.reqList();
 }
}
</script>

<style>

</style>