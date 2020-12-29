<template>
  <div>
    <el-table :data="list" style="width: 100%" border>
      <el-table-column prop="id" label="用户编号" width="180"> </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180"> </el-table-column>
      <el-table-column prop="phone" label="手机号" width="320"> </el-table-column>
      <el-table-column label="状态" width="280">
      <template slot-scope="scope">
         <el-button type="primary" v-if="scope.row.status==1" >启用</el-button>
       <el-button type="danger" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column  prop="name" label="操作" width="340">
 <template slot-scope="scope">
         <el-button type="primary" @click="edit(scope.row.id)" >编辑</el-button>
      
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
props:["list"],
methods:{
  edit(uid){
    this.$emit("edit",uid)
  }
}


}
   
;
</script>

<style>
</style>