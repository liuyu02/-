<template>
  <div class="form">
    
    <el-dialog title="添加" :visible.sync="info.isshow" >
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid">
            <el-option value="" label="--请选择--" disabled></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
          </el-select>
        </el-form-item>

     <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option value="" label="--请选择--" disabled></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
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

        
        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
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
          <el-select v-model="user.specsid">
            <el-option value="" label="--请选择--" disabled></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
          </el-select>
        </el-form-item>

          <el-form-item label="商品属性" label-width="100px">
          <el-select v-model="user.specsattr">
            <el-option value="" label="--请选择--" disabled></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
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
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary">添 加</el-button>
        <el-button type="primary" >修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
 props:["info"],
 data(){
     return {
         user:{
             first_cateid:"",
             second_cateid:"",
             goosname:"",
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
     }
 },
 methods:{
     cancel(){
         this.info.isshow=false
     },
     changeImg(e){
      let file=e.target.files[0];
      this.imgUrl=URL.createObjectURL(file);
      this.user.img=file;
     }
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