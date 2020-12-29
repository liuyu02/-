<template>
  <div class="box">
    <v-add :info="info" ref="add"  @init="init"></v-add>
    <v-list :list="list" @init="init" @edit="edit($event)" ></v-list>
  </div>
</template>

<script>
import { reqMemberDetail ,reqMemberList } from '../../utils/http'
import vAdd from "./components/add.vue"
import vList from "./components/list.vue"
export default {
  components:{
    vAdd,
    vList
  },
  data(){
    return {
      info:{
        isshow:false
      },
      list:[]
    }
  },
  methods:{
    init(){
      reqMemberList({istree:true}).then(res=>{
        if(res.data.code==200){
          this.list=res.data.list
        }
      })
    },
    edit(uid){
   this.info.isshow=true;
   this.$refs.add.getOne(uid)
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style scoped>
.box{
  margin-top: 20px;
}

</style>