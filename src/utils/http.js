import axios from "axios"
import qs from "qs"
import Vue from "vue"

// 开发环境
let baseUrl = "/api"
Vue.prototype.$pre = "http://localhost:3000"

// 打包
// let baseUrl=""
// Vue.prototype.$pre=""

axios.interceptors.response.use(res => {
    console.group("本次请求地址是：" + res.config.url)
    console.log(res)
    console.groupEnd()
    if (res.data.code!== 200) {
        lossalert(res.data.msg)
    }
    return res
})
// -------------------------------- 上传图片文件---------------------------------------------------
function dataToFormData(user){
    let data=new FormData()
    for(let i in user){
        data.append(i,user[i])
    }
    return data
}

// -------------------------------- 菜单管理---------------------------------------------------
export const reqMenuAdd = (user) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "post",
        data: qs.stringify(user)
    })
};

export let reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        params: {
            istree: true
        }
    })
};
export let  reqMenuDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/menudelete",
        method:"post",
        data:qs.stringify(obj)
    })
};
export let reqMenuDetail=(obj)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        params:obj
    })
};
export let reqMenuUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/menuedit",
        method:"post",
        data:qs.stringify(user)
    })
}

// -------------------------------- 角色管理---------------------------------------------------

export let reqRoleAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/roleadd",
        method:"post",
        data:qs.stringify(user)
    })

}

export let reqRolelist=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"get",
        params:{}
    })
}

export let reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+"/api/roledelete",
        method:"post",
        data:id
    })
}
export let reqRoleDetail=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"get",
        params: id
    })
}
export let reqRoleUpdate=(user)=>{
    return axios({
   url:baseUrl+"/api/roleedit",
   method:"post",
   data:qs.stringify(user)
    })
}
// -------------------------------- 管理员管理---------------------------------------------------
export let reqManageAdd=(user)=>{
    return axios({
    url:baseUrl+"/api/useradd",
    method:"post",
    data:qs.stringify(user)

    })
    
}
// 列表
export let reqManageList=(obj)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"get",
        params: obj
    })
}
// 修改
export let reqManageUpdate=(user)=>{
    return axios({
         url:baseUrl+"/api/useredit",
         method:"post",
         data:qs.stringify(user)
    })
}
// 详情
export let reqManageDetail=(user)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"get",
        params:user
    })
}
// 删除
export let reqManageDel=(user)=>{
    return axios ({
        url:baseUrl+"/api/userdelete",
        method:"post",
        data:qs.stringify(user)
    })
}
// 总数
export let reqManageCount=()=>{
    return axios({
        url:baseUrl+"/api/usercount",
        method:"get"
    })
}
// -------------------------------- 商品分类---------------------------------------------------
export let reqCateAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/cateadd",
        method:"post",
        data:dataToFormData(user)
    })
}

// 列表

export let reqCateList=(p)=>{
     return axios({
         url:baseUrl+"/api/catelist",
         method:"get",
         params:p
     })
}
// 详情

export let reqCateDetail=(user)=>{
         return axios({
             url:baseUrl+"/api/cateinfo",
             method:"get",
             params:user
         })
}
// 修改

export let reqCateUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/cateedit",
        method:"post",
        data:dataToFormData(user)
    })
}

// 删除

export let reqCateDel=(user)=>{
    return axios({
        url:baseUrl+"/api/catedelete",
        method:"post",
        data:qs.stringify(user)
    })

}


// -------------------------------- 会员管理---------------------------------------------------
// 列表
export let reqMemberList=(obj)=>{
    return axios({
        url:baseUrl+"/api/memberlist",
        method:"get",
        params:obj
    })
}


// 获取
export let reqMemberDetail=(obj)=>{
   return axios  ({
       url:baseUrl+"/api/memberinfo",
       method:"get",
       params:obj
   })
}
// 修改

export let reqMemberEdit=(user)=>{
    return axios ({
         url:baseUrl+"/api/memberedit",
         method:"post",
         data:qs.stringify(user)
    })
}

// -------------------------------- 轮播图管理---------------------------------------------------

// 添加
export let reqBannerAdd=(user)=>{
    return axios({
        url:baseUrl+"/api/banneradd",
        method:"post",
        data:dataToFormData(user)
    })
}
// 列表
export let reqBannerList=(obj)=>{
    return axios({
        url:baseUrl+"/api/bannerlist",
        method:"get",
        params:obj
    })
}
//  获取 
export let reqBannerDetail=(obj)=>{
    return axios({
        url:baseUrl+"/api/bannerinfo",
        method:"get",
        params:obj
    })
}
// 修改
export let reqBannerUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/banneredit",
        method:"post",
        data:dataToFormData(user)
    })
}
// 删除

export let reqBannerDel=(obj)=>{
    return axios({
        url:baseUrl+"/api/bannerdelete",
        method:"post",
        data:obj
    })

}

// -------------------------------- 商品规格---------------------------------------------------

// 添加
export let reqSpecsAdd =(user)=>{
    return axios ({
        url:baseUrl+"/api/specsadd",
        method:"post",
        data:qs.stringify(user),
    })
}


// 分页
export let reqSpecsList=(p)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:"get",
        params:p
    })
}
// 获取详情
export let reqSpecsDetail=(user)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"get",
        params:user
    })
}
// 修改
export let reqSpecsUpdate=(user)=>{
    return axios({
        url:baseUrl+"/api/specsedit",
        method:"post",
        data:user
    })
}

// 删除
export let reqSpecsDel=(user)=>{
    return axios({
        url:baseUrl+"/api/specsdelete",
        method:"post",
        data:qs.stringify(user)
    })
}

// 总页
export let reqSpecsCount =()=>{
    return axios({
        url:baseUrl+"/api/specscount",
       
        
    })
}









// -------------------------------- 商品管理---------------------------------------------------







// -------------------------------- 秒杀活动---------------------------------------------------