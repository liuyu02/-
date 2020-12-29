<template>
  <div class="login">
   <div class="con">
       <h3>登录</h3>
       <div class="int"><el-input v-model="user.name" :rules="rules" placeholder="请输入账号" clearable></el-input></div>
       <div class="int"> <el-input v-model="user.password" placeholder="请输入密码" clearable show-password></el-input></div>
       <div class="center"><el-button type="primary" @click="login">登录</el-button></div>
   </div>
  </div>
</template>

<script>
import{mapActions} from "vuex"
import{reqLogin} from  "../../utils/http.js"

export default {
 data(){
    return {
      user:{
        name:"",
        password:""
      },
      rules:{
        name:[
          {required:true,message:"请输入账号",trigger:"blur"},
          {min:2,max:8,message:"长度在2到8个字符",trigger:"blur"}
        ],
        password:[
          {required:true,methods:"请输入密码",trigger:"blur"},
          {min:3 ,max:6,message:"长度在3到6个字符",trigger:"blur"}
        ]
      }
    }
  },
  methods:{
    ...mapActions({
      changeUser:"changeUser"
    }),
    login(){
      reqLogin(this.user).then(res=>{
        if (res.data.code===200){
          this.changeUser(res.data.list)
          this.$router.push('/')
          
        }
      })
    }
  //  login(){
  //      this.$router.push("/")
  //  }
    
  }
}
</script>

<style scoped>
h3{
    text-align: center;
    font-size: 20px;
}
.login{
    width: 100vw;
    height: 100vh;
  background:linear-gradient(to right,#553544,#433A52,#303D60); 
}
.con{
 width: 400px;
 background: #ffffff;
 padding: 20px;
 position: fixed;
 left: 50%;
 top: 50%;
 transform: translate(-50%,-50%);
}
.int{
    margin: 10px;
}
.center{
    text-align: center;
}
</style>