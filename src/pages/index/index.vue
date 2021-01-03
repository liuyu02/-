<template>
  <div>
    <div>
    <el-container class="index">
      <el-aside width="200px">
         <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#20222A"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router>
        <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

        <div v-for="item in userInfo.menus" :key="item.id">
            <el-menu-item v-if="!item.children" :index="item.url">{{item.title}}</el-menu-item>
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
    </el-menu>
      </el-aside>
      <el-container>


        <el-header>
         <div class="bbq"> <span >
            {{userInfo.username}}
           
          </span>
           <i class="el-icon-setting"></i>
           <el-button type="danger" @click="logout">退出登录</el-button></div>
        </el-header>

        
        <el-main>
           <el-breadcrumb separator="/" v-if="$route.name">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
    </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from "vuex"
export default {
  computed:{
    ...mapGetters({
        userInfo:"userInfo"
    })
  },
methods:{
...mapActions({
  changeUser:"changeUser"
}),
logout(){
  this.changeUser({})
  this.$router.replace("/login")
}
},
mouted(){}
}
</script>

<style scoped>
.index {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.bbq{
  float: right;
  margin-top: 10px;
}
</style>