<template>
  <div>
    <el-dialog :title="info.isadd?'添加管理员':'编辑管理员'" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="100px">
          <el-select v-model="user.roleid" placeholder="请选择">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in rolelist"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" label-width="100px">
          <el-input autocomplete="off" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input
            placeholder="请输入密码"
            v-model="user.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">添加</el-button>
          <el-button type="primary" @click="update">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {reqRoleAdd, reqMenuDetail, reqMenuUpdate, reqMenulist, reqRoleDetail, reqRoleUpdate, reqRolelist, reqManageAdd, reqManageDetail, reqManageUpdate} from "../../../utils/http.js";
import { successalert } from "../../../utils/alert.js";
export default {
  props: ["info","list"],
  data() {
    return {
      user: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rolelist: [],
    };
  },
  methods: {
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    add() {
      reqManageAdd(this.user).then(res => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init")
        }
      });
    },
    getOne(id){
      reqManageDetail({uid:id}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list
          this.user.password=""
        }
      })
    },
    update(){
      reqManageUpdate(this.user).then(res=>{
        if(res.data.code=200){
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          this.$emit("init");
        }
      })
    }
  },
  mounted() {
    reqRolelist().then((res) => {
      if (res.data.code == 200) {
        this.rolelist = res.data.list;
      }
    });
  },
};
</script>

<style>
</style>