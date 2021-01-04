<template>
  <div class="box">
     <el-button type="primary" @click="willadd" >添加</el-button>
    <v-list  @edit="edit"   ></v-list>
    <v-add :info="info" ref="add"></v-add>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
components:{vList,vAdd},
data(){
  return {
    info:{
      isshow:false,
      isadd:true
    }
  }
},
computed:{
    ...mapGetters({
      list:"seckill/list"
    })
  },
methods:{
  ...mapActions({
    reqList:"seckillList"
  }),
  willadd(){
    this.info.isshow=true;
    this.info.isadd=true
  },
  edit(id){
    this.info.isshow=true;
    this.info.isadd=false
    this.$refs.add.getOne(id);
  }
}  
}
</script>

<style scoped>
.box{
margin-top: 20px;
}
</style>