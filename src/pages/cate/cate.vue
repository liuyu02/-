<template>
 <div class="box">
  
    <el-button type="primary" @click="willAdd" >添加</el-button>


    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    
    <v-add :info="info" @init="init" :list="list" ref="add" ></v-add>
  </div>
</template>

<script>
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
import {reqRolelist,reqMenuList,reqCateList} from "../../utils/http.js"
export default {
 components: {
    vList,
    vAdd
  },
  data(){
    return {
      info:{
      isshow:false,
      isadd:true
    },
    list:[]
    }
  },
  methods:{
    willAdd(){
      this.info.isshow=true;
      this.info.isadd=true
    },
    init(){
reqCateList({istree:true}).then(res=>{
    console.log(res);
  if ((res.data.code==200)) {
    this.list =res.data.list;
    
  }
})
    },
    edit(id){
      this.info.isshow=true;
      this.info.isadd=false
      this.$refs.add.getOne(id)
    },
  },
  mounted(){
    this.init();
  }
}
</script>

<style scoped>
.box{
  margin-top:20px;
}
</style>