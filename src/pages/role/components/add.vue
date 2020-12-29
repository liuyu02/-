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
  :default-checked-keys="[1]"
  :props="defaultProps"
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
import {successalert} from "../../../utils/alert.js"
import {reqRoleAdd, reqRoleDetail, reqRoleUpdate,reqMenuList} from "../../../utils//http.js"
export default {
  props:["info"],
   data(){
   return {
     user:{
       rolename:"",
       menus: [],
       status:1
     },
        defaultProps: {
          children: 'children',
          label: 'title'
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
     console.log(this.$refs.tree.getCheckedKeys());
     this.user.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
    reqRoleAdd(this.user).then(res=>{
          console.log(res)
          if(res.data.code==200){
            successalert(res.data.msg)
            this.cancel();
            this.empty();
            this.$emit("init")
          } 
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
          this.user=res.data.list
          this.user.id=id
        }
      })
  },
  update(){
    reqRoleUpdate(this.user).then(res=>{
    if(res.data.code=200){
      successalert(res.data.msg)
      this.cancel()
      this.empty()
      this.$emit("init")
    }
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