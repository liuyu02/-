<template>
  <div>
       <el-dialog  @closed="cancel"  title=编辑菜单 :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
       <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
          <el-form-item label="密码" label-width="100px">
          <el-input v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2" ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="cancel">取消</el-button>

        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { lossalert, successalert } from '../../../utils/alert.js'
import { reqMemberDetail, reqMemberEdit,reqMemberInfo} from "../../../utils/http.js"
export default {
 props:["info"],
data(){
  return {
        user:{
        uid:0,
        nickname:"",
        phone:"",
        password:"",
        status:1
    }
  }
},
methods:{
  empty(){
     this.user={
        uid:0,
        nickname:"",
        phone:"",
        password:"",
        status:1
     }
  },
    cancel(){
        this.info.isshow=false;
        this.empty()
          
        
    },
    getOne(uid){
      reqMemberDetail({uid:uid}).then(res=>{
        if(res.data.code==200){
          this.user=res.data.list
          this.user.uid=uid
        }
      })
    },
    update(){
  reqMemberEdit(this.user).then(res=>{
    if(res.data.code==200){
      successalert(res.data.msg)
      this.cancel();
      this.empty()
      this.$emit("init")
    }
  })
},
},

}
</script>

<style>

</style>