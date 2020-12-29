<template>
  <div>
      
      <el-dialog title="编辑菜单"   :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
     {{attrsArr}}
         <el-form-item label="规格属性" label-width="80px"
        v-for="(item,index) in attrsArr"
        :key="index"
        >
          <div class="line">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button type="primary" class="line-btn" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" class="line-btn" v-else @click="delAttr(index)" >删除</el-button>
          </div>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2" ></el-switch>
        </el-form-item>
      </el-form>
      {{user}}
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" >取 消</el-button>
        <el-button type="primary" @click="add" >添 加</el-button>
        <el-button type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import{ mapActions,mapGetters} from "vuex"
import{ reqSpecsAdd , reqSpecsDetail, reqSpecsUpdate} from "../../../utils/http.js"
import {successalert} from "../../../utils/alert.js"
export default {
    props:["info"],
   data(){
       return {
           user:{
               specsname:"",
               attrs:"",
               status:1
           },
           attrsArr:[
               {value:""}
           ]

       }
   },
   computed:{
       ...mapGetters({

       })
   },

   methods:{
       ...mapActions({
           reqList:"specs/reqList",
           reqTotal:"specs/reqTotal",
       }),
       cancel(){
        //    this.info.isshow=false
       },
       addAttr(){
           this.attrsArr.push({value:""})
       },
       delAttr(index){
           this.attrsArr.splice(index,1)
       },
       empty(){
           this.user={
                specsname:"",
               attrs:"",
               status:1
           },
           this.attrsArr=[
               {valuse:""}
           ]
       },
       add(){
           this.user.attrs=JSON.stringify(this.attrsArr.map(item=>item.value))
         reqSpescAdd(this.user).then(res=>{
             if (res.data.code==200) {
                 this.cancel();
                 this.empty();
                 successalert(res.data.msg);
                 this.reqList()
                 this.reqTotal()
             }
         })
       }
   }
}
</script>

<style scoped >
.line{
  display: flex;
}
.line-btn{
  width: auto;
}
.line-ipt{
  flex: 1;
}
</style>