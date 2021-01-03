import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import store from "../store"

function checkEnter(path,next,from){
  if(store.state.userInfo.menus_url.includes(path)){
    next()
  }else{
    if(from.path != "/"){
      next("/")
    }
  }
}


export let indexRoutes =[
  {
    path:"menu",
    component:()=>import("../pages/menu/menu.vue"),
    name:"菜单",
    beforeEnter(to,from,next){
      checkEnter("/menu",next,from)
     }
  },
  {
    path:"role",
    component:()=>import("../pages/role/role.vue"),
    name:"角色",
    beforeEnter(to,from,next){
      checkEnter("/role",next,from)
     }
  },
  {
    path:"manage",
    component:()=>import("../pages/manage/manage.vue"),
    name:"管理员管理",
    beforeEnter(to,from,next){
      checkEnter("/manage",next,from)
     }
  },
  {
    path:"cate",
    component:()=>import("../pages/cate/cate.vue"),
    name:"商品分类",
    beforeEnter(to,from,next){
      checkEnter("/cate",next,from)
     }
  },
  {
    path:"specs",
    component:()=>import("../pages/specs/specs.vue"),
    name:"商品规格",
    beforeEnter(to,from,next){
      checkEnter("/specs",next,from)
     }
  },
  {
    path:"goods",
    component:()=>import("../pages/goods/goods.vue"),
    name:"商品管理",
    beforeEnter(to,from,next){
      checkEnter("/goods",next,from)
     }
  },
  {
    path:"member",
    component:()=>import("../pages/member/member.vue"),
    name:"会员",
    beforeEnter(to,from,next){
      checkEnter("/member",next,from)
     }
  },
  {
    path:"banner",
    component:()=>import("../pages/banner/banner.vue"),
    name:"轮播图管理",
    beforeEnter(to,from,next){
      checkEnter("/banner",next,from)
     }
  },
  {
    path:"seckill",
    component:()=>import("../pages/seckill/seckill.vue"),
    name:"秒杀活动",
    beforeEnter(to,from,next){
      checkEnter("/seckill",next,from)
     }
    
  },
]
let router= new Router({
  routes: [
    {
        path:"/login",
        component: ()=>import("../pages/login/login.vue")
    },
    {
       path:"/",
       component: ()=>import("../pages/index/index.vue"),
       children:[
         {
           path:"",
           component:()=>import("../pages/home/home.vue")
         },
      ...indexRoutes
       ]

   },
]
})
// 登录拦截
router.beforeEach((to,from,next)=>{
  
  if(to.path==="/login"){
    next()
    return
  }
  // 判断
if(store.state.userInfo.id){
  next()
  return;
}
next("/login")
})
export default router