<template>
  <div class="box">
    <el-table
    :data="list"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    :tree-props="{children: 'children'}">
    <el-table-column prop="id" label="菜单编号" width="100"></el-table-column>
    <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
    <el-table-column prop="icon" label="菜单图标"  width="180">
      <template slot-scope="scope">
        <i :class="scope.row.icon"></i>
      </template>
    </el-table-column>
     <el-table-column prop="url" label="菜单地址" width="265"></el-table-column>
     <el-table-column label="状态" width="230">
      <template slot-scope="scope">
         <el-button type="primary" v-if="scope.row.status==1" >启用</el-button>
       <el-button type="primary" v-else>禁用</el-button>
      </template>
    </el-table-column>
     <el-table-column  prop="name" label="操作" width="340">
 <template slot-scope="scope">
         <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
       <el-button type="danger" @click="del(scope.row.id)" >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import { lossalert, successalert } from '../../../utils/alert.js'
import {reqMenuDel ,reqMenuDetail} from "../../../utils/http.js"
export default {
  props:["list"],


  methods:{
  del(id){
     this.$confirm("你确定删除么？","提示",{
       confirmButtonText:"删除",
       cancelButtonText:"取消",
       type:"warning"
     }).then(()=>{
       reqMenuDel({id:id}).then(res=>{
        
         if(res.data.code==200){
           successalert(res.data.msg)
           this.$emit("init")
         }
       });
     }).catch(()=>{
     
     })
 },
 edit(id){
   this.$emit("edit",id)
 }
}
}


 
</script>

<style scoped>
.box{
  margin-top: 20px;
}
</style>