<template>
  <div>
    <el-dialog :title="info.isadd?'添加菜单':'编辑菜单'" :visible.sync="info.isshow">
  <el-form :model="user">
   <el-form-item label="菜单名称" label-width="100px">
 <el-input v-model="user.rolename" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="角色权限" label-width="100px">
 <el-tree
  :data="menulist"
  show-checkbox
  ref="tree"
  node-key="id"
  :props="{children: 'children',label: 'title'}"
  >
</el-tree>

  </el-form-item>
   <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2" ></el-switch>
        </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancel" >取 消</el-button>
    <el-button type="primary" @click="add" v-if="info.isadd">添加 </el-button>
    <el-button type="primary" @click="update" v-else>修改 </el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import {lossalert, successalert} from "../../../utils/alert.js"
import {reqRoleAdd, reqRoleDetail, reqRoleUpdate,reqMenuList} from "../../../utils//http.js"
export default {
  props:["info","list"],
   data(){
   return {
     user:{
       rolename:"",
       menus: [],
       status:1
     },
        menulist:[]
   }
 },
  methods:{
    cancel(){
      this.info.isshow=false;
      if(!this.info.isadd){
        this.empty()
      }
    },
  add(){
    this.checkProps().then(res=>{
      this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
    reqRoleAdd(this.user).then(res=>{
          if(res.data.code==200){
            successalert(res.data.msg)
            this.cancel();
            this.empty();
            this.$emit("init")
          } 
    })
    })
     
  },
  empty(){
    this.user={
       rolename:"",
       menus:[],
       status:1
    };
  },
  getOne(id){
      reqRoleDetail({id:id}).then(res=>{
        if(res.data.code==200){
          
          res.data.list.menus = JSON.parse(res.data.list.menus)
          this.user=res.data.list
          console.log(this.$refs.tree)
          // this.menulist = this.user.menus
          console.log(this.user)
          this.$refs.tree.setCheckedKeys(this.user.menus)
          this.user.id=id
        }
      })
  },
  update(){
     this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
    reqRoleUpdate(this.user).then(res=>{
    if(res.data.code=200){
      successalert(res.data.msg)
      this.cancel()
      this.empty()
      this.$emit("init")
       if (this.user.id == this.userInfo.roleid) {
            this.changeUser({});
            this.$router.push("/login");
            return;
          }
    }
    })
  },
  checkProps(){
    return new Promise((resolve,reject)=>{
      if(this.user.rolename===""){
        lossalert("菜单名称不能为空");
        return;
      }

      // if(this.user.menus.length === 0){
      //   lossalert("请选择权限");
      //   return;
      // }
      resolve();
    })
  }
  },

 mounted(){
   reqMenuList().then(res=>{
    if (res.data.code==200){
      console.log("获取成功",res)
      console.log(res.data.list)
      this.menulist=res.data.list
    }
  })
 }

}
</script>

<style>

</style>