<template>
  <div class="form">
    <el-dialog @closed="cancel" :title="info.isadd? '添加菜单':'编辑菜单'" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" label-width="100px">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changetime"
            value-format="timestamp"
          >

          </el-date-picker>
        </el-form-item>

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
          <el-select v-model="user.second_cateid"  @change="changeSecondGoodsId">
            <el-option
              value=""
              label="--请选择--"
              disabled
            ></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option value="" label="--请选择--" disabled></el-option>
            <el-option
              v-for="item in threeGoodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
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
import {
  reqSeckillAdd,
  reqSeckillList,
  reqSeckillDetail,
  reqCateList,
  reqSeckillUpdate,
  reqGoodsList,
} from "../../../utils/http";
import { mapActions, mapGetters } from "vuex";
import { successalert, lossalert } from "../../../utils/alert.js";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondCateList: [],
      threeGoodsList: [],
      value1: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",
      reqList: "seckill/reqList",
    }),
    add(){
     reqSeckillAdd(this.user).then(res=>{
         if(res.data.code==200){
           successalert(res.data.msg)
           this.cancel();
           this.empty();
           this.reqList()
         }
   })
    },
    empty(){
        this.user={
           title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
        },
        this.secondCateList=[];
      this.threeGoodsList=[];
    },
    cancel() {
      this.info.isshow = false;
      if(!this.info.isadd){
        this.empty()

      }
    },
    changeFirstCateId() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqCateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    changeSecondGoodsId() {
      this.user.goodsid = "";
      this.getThreeList();
    },
    getThreeList() {
      reqGoodsList({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        if ((res.data.code = 200)) {
          this.threeGoodsList = res.data.list;
        }
      });
    },
    changetime(){
     this.user.begintime=this.value1[0];
     this.user.endtime=this.value1[1];
    },

     getOne(id){
       reqSeckillDetail({id:id}).then(res=>{
             if(res.data.code==200){
               this.user=res.data.list;
               this.getSecondList();
               this.getThreeList();
               this.user.id=id;
              this.value1=[ this.user.begintime,this.user.endtime];
             }
       })
     },
   update(){
       reqSeckillUpdate(this.user).then(res=>{
     if(res.data.code==200){
       this.cancel();
       this.empty();
       successalert(res.data.msg);
       this.reqList();
     }
       })
     },
  },
   mounted(){
   if(this.cateList.length==0){
     this.reqCateList();
   }
   
  
 }
};
</script>

<style scoped>
</style>