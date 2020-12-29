<template>
  <div class="box">
    <el-button type="primary" @click="willadd"  >添加</el-button>
    <v-add  :info="info" :list="list" @init="init" ref="add"></v-add>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
  </div>
</template>

<script>
import { reqBannerAdd,reqBannerList } from '../../utils/http'
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
  components:{
   vAdd,
   vList
  },
  data(){
    return{
        info:{
      isshow:false,
      isadd:true
    },
    list:[]
    }
  },
  methods:{
  willadd(){
    this.info.isshow=true;
  },
  init(){
    reqBannerList({istree:true}).then(res=>{
       if((res.data.code==200)){
         this.list=res.data.list
      
       }
    })
  },
  edit(id){
    this.info.isshow=true;
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