<template>
  <div class="form">
    
    <el-dialog title="添加" :visible.sync="info.isshow" @opened="opened" >
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option 
            v-for="item in cateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

     <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option value="" label="--请选择--" disabled></el-option>
            <el-option 
            v-for="item in secondCateList"
            :key="item.id"
            :label="item.catename"
            :value="item.id"  
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price" autocomplete="off"></el-input>
        </el-form-item>

        
        <el-form-item label="图片" label-width="100px" >
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

  <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpecsId">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option
            v-for="item in specsList"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
             ></el-option>
          </el-select>
        </el-form-item>

          <el-form-item label="商品属性" label-width="100px">
          <el-select v-model="user.specsattr" multiple>
            <el-option value label="--请选择--" disabled></el-option>
            <el-option 
            v-for="item in showSpecsAttr"
            :key="item"
            :label="item"
            :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

   <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>

           <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>



        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
 <el-form-item label="商品描述" label-width="100px">
          <div id="editor" v-if="info.isshow"></div>
        </el-form-item>

      </el-form>
{{user}}
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">添 加</el-button>
        <el-button type="primary"  @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import A from "wangeditor"
import { reqGoodsAdd,reqGoodsList,reqGoodsDetail, reqCateList,reqGoodsUpdate} from "../../../utils/http"
import {mapActions ,mapGetters } from  "vuex"
import {successalert} from "../../../utils/alert.js"

export default {
 props:["info"],
 data(){
     return {
       imgUrl:"",
         user:{
             first_cateid:"",
             second_cateid:"",
             goodsname:"",
             price:"",
             market_price:"",
             img:null,
             description:"",
             specsid:"",
             specsattr: [],
             isnew:1,
             ishot:1,
             status:1
         },

      secondCateList:[],
      showSpecsAttr:[]   
     }
 },
 computed:{
   ...mapGetters({
     cateList:"cate/list",
     specsList:"specs/list",
     
   }),
   
 },
 methods:{
   ...mapActions({
     reqCateList:"cate/reqList",
     reqSpecsList:"specs/reqList",
     reqList:"goods/reqList",
     reqTOtal:"goods/reqTOtal"

   }),
   changeFirstCateId(){
     this.user.second_cateid="";
     this.getSecondList();
   },
   getSecondList(){
     reqCateList({pid:this.user.first_cateid}).then(res=>{
       if(res.data.code==200){
         this.secondCateList=res.data.list;
       }
     })
     },
     changeSpecsId(){
       this.user.specsattr=[];
       this.getShowSpecsAttr();
     },
     getShowSpecsAttr() {
     
      let obj = this.specsList.find(item => item.id == this.user.specsid); 
      this.showSpecsAttr = obj ? obj.attrs : [];
    },
     add(){
     this.user.description=this.editor.txt.html();
     console.log(this.user)
     let data={
       ...this.user,
       specsattr: JSON.stringify(this.user.specsattr)
     };
     reqGoodsAdd(data).then(res=>{
      if(res.data.code==200){
        successalert(res.data.msg)
        this.cancel()
        this.empty()
        this.reqList();
        this.reqTOtal();
      }
     })
   },
   empty(){
      this.imgUrl=""
  this.user={
             first_cateid:"",
             second_cateid:"",
             goodsname:"",
             price:"",
             market_price:"",
             img:null,
             description:"",
             specsid:0,
             specsattr:[],
             isnew:1,
             ishot:1,
             status:1
}
   },
     cancel(){
         this.info.isshow=false
     },
     changeImg(e){
      let file=e.raw;
      this.imgUrl=URL.createObjectURL(file);
      this.user.img=file;
     },
     opened(){
       this.editor=new A("#editor")
       this.editor.create();
       this.editor.txt.html(this.user.description)
     },
     getOne(id){
       reqGoodsDetail({id:id}).then(res=>{
             if(res.data.code==200){
               this.user=res.data.list;
               this.getSecondList();
               this.imgUrl=this.$pre+this.user.img;
               this.getShowSpecsAttr();
               this.user.specsattr=JSON.parse(this.user.specsattr);
               this.user.id=id;
               if(this.editor){
                 this.editor.txt.html(this.user.description)
               }
             }
       })
     },

     update(){
       this.user.description=this.editor.txt.html()
       let data={
         ...this.user,
         specsattr: JSON.stringify(this.user.specsattr)
       };
       reqGoodsUpdate(data).then(res=>{
     if(res.data.code==200){
       this.cancel();
       this.empty();
       successalert(res.data.msg);
       this.reqList();
     }
       })
     }
   },
   
   
     mounted(){
   if(this.cateList.length==0){
     
     this.reqCateList();
   }
   
   this.reqSpecsList(true);
 }
 }
 

</script>

<style scoped lang="stylus">
.form >>>.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>