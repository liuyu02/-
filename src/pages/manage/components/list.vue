<template>
  <div class="box">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>

      <el-table-column prop="username" label="用户名" width="230">
      </el-table-column>
     <el-table-column prop="rolename" label="所属角色" width="230">
      </el-table-column>
      <el-table-column label="状态" width="320">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="335">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.uid)" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {reqMenuDel,reqRoleDel,reqManageDel,reqManageDetail, reqManageUpdate,} from "../../../utils/http.js";
import { successalert, lossalert } from "../../../utils/alert.js";
export default {
  props: ["list"],
  data() {
    return {};
  },
  methods: {
    del(uid) {
      this.$confirm("你确定删除么？","提示",{
       confirmButtonText:"删除",
       cancelButtonText:"取消",
       type:"warning"
     }).then(()=>{
        reqManageDel({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.$emit("init");
        }
      });
     })
     
    },
    
    edit(uid){
    this.$emit("edit",uid)
    }
  },
};
</script>


<style scoped>
img{
  width: 80px;
  height: 80px;
}
</style>