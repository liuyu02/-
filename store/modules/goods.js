import {reqGoodsList,reqGoodsCount} from "../../src/utils/http.js"

let state={
    list:[],
    total:0,
    size:2,
    page:1
};

let mutations={
    changeList(state,arr){
        state.list=arr;
    },
    changeTotal(state,num){
        state.total=num;
    },
    changePage(state,num){
        state.page=num;
    }
};
 let getters={
list(state){
    return state.list
},
total(state){
    return state.total
},
size(state){
    return state.size
}
};

let actions={
    reqList(context,bool){
        let params=bool?{}:{page:context.state.page,size:context.state.size} 
     reqGoodsList(params).then(res=>{
             if(res.data.code==200){
                 if(res.data.list.length===0&&context.state.page>1){
                     context.commit("changePage",context.state.page-1)
                     context.dispatch("reqList")
                     return;
                 }

             }
     })
        
    },
    reqTotal(context){
        reqGoodsCount().then(res=>{
            if(res.data.code==200){
                context.commit("changeTotal",res.data.list[0].total)
            }
        })
    },
    changePage(context,num){
        context.commit("changePage",num)
        context.dispatch("reqList")
    }
}
export default{
    state,mutations,getters,actions,
    namespaced:true
}