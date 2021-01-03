<template>
  <div>
      
      <el-dialog title="编辑菜单"   :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="80px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel" >取 消</el-button>
        <el-button type="primary" @click="add" >添 加</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import{ mapActions,mapGetters} from "vuex"
import{ reqSpecsAdd , reqSpecsDetail, reqSpecsUpdate} from "../../../utils/http.js"
import {lossalert, successalert} from "../../../utils/alert.js"
export default {
    props:["info"],
   data(){
       return {
           user:{
               specsname:"",
               attrs:"[]",
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
           this.info.isshow=false;
           
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
               attrs:"[]",
               status:1
           },
           this.attrsArr=[
               {value:""}
           ]
       },
       add(){
         this.checkProps().then(()=>{
      this.user.attrs=JSON.stringify(this.attrsArr.map(item=>item.value))
         reqSpecsAdd(this.user).then(res=>{
             if (res.data.code==200) {
                this.cancel()
                 this.empty();
                 successalert(res.data.msg);
                 this.reqList()
                 this.reqTotal()
             }
         })
         })
          
       },
       getOne(id){
         reqSpecsDetail({id:id}).then(res=>{
           if (res.data.code==200) {
             this.user=res.data.list[0]
             this.user.attrs=JSON.parse(this.user.attrs);
             this.attrsArr=this.user.attrs.map(item=>({value:item}))
             
           }
         })
       },
       update(){
         this.user.attrs=JSON.stringify(this.attrsArr.map(item=>item.value))
         reqSpecsUpdate(this.user).then(res=>{
           if (res.data.code==200) {
             successalert(res.data.msg);
              this.cancel();
              this.empty();
              this.reqList()
           }
         })
       },
       checkProps(){
         return new Promise((resolve,reject)=>{
           if(this.user.specsname===""){
            lossalert("名称不能为空");
             return;
           }
           if(this.attrsArr.some(item=>item.value==="")){
             lossalert("属性不能为空");
             return;
           }
           resolve()
         })
       }
   },
   mounted(){}
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