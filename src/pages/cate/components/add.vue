<template>
   <div class="form">
    
    <el-dialog :title="info.isadd?'添加分类':'编辑分类'" :visible.sync="info.isshow" >
      <el-form :model="user">
        <el-form-item label="上级分类" label-width="100px">
          <el-select v-model="user.pid">
            <el-option value="" label="--请选择--" disabled></el-option>
            <el-option :value="0" label="顶级分类"></el-option>
            
            <el-option v-for="item in list" :key="item.id" :value="item.id" :label="item.catename"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="user.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px" v-if="user.pid!==0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {reqCateAdd,reqCateDetail,reqCateUpdate} from "../../../utils/http.js"
import {successalert,lossalert} from "../../../utils/alert.js"
import path from "path"
export default {
    props:["info","list"],
data() {
    return {
      imgUrl: "",
      user: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      }
    };
  },
  mounted(){},
  methods:{
      changeImg2(e){
          let file=e.raw;
          this.imgUrl=URL.createObjectURL(file)
          this.user.img=file;
      },
      cancel(){
          if(!this.info.isadd){
              this.empty();
          }
          this.info.isshow=false;
      },
      empty(){
          this.imgUrl="";
          this.user={
         pid: "",
        catename: "",
        img: null,
        status: 1
          }
      },
      add(){
          reqCateAdd(this.user).then(res=>{
            console.log(res);
              if(res.data.code==200){
                  successalert(res.data.msg);
                  this.cancel();
                  this.empty();
                  this.$emit("init");
              }
          })
      },
      getOne(id){
          reqCateDetail({id:id}).then(res=>{
              if(res.data.code==200){
                  this.user=res.data.list;
                  this.user.id=id;
                  this.imgUrl=this.$pre+this.user.img;
              }
          })
      },
      update(){
          reqCateUpdate(this.user).then(res=>{
              if(res.data.code==200){
                  successalert(res.data.msg);
                  this.cancel();
                  this.empty();
                  this.$emit("init");
              }
          })
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