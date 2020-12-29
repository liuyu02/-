<template>
  <div class="login">
   <div class="con">
       <h3>登录</h3>
       <div class="int"><el-input v-model="user.name" placeholder="请输入账号" clearable></el-input></div>
       <div class="int"> <el-input v-model="user.password" placeholder="请输入密码"></el-input></div>
       <div class="center"><el-button type="primary" @click="login">登录</el-button></div>
   </div>
  </div>
</template>

<script>
export default {
 data(){
    return {
      user:{
        name:"",
        password:""
      }
    }
  },
  methods:{
    //登录
   login(){
       this.$router.push("/")
   }
    
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