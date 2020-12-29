export let state={
    userinfo:sessionStorage.getItem("userInfo")?
    JSON.parse(sessionStorage.getItem("userInfo")):{}
}
export let getters={
    userInfo(state){
        return state.userInfo
    }
}
export let mutations={
    changeUserInfo(state,obj){
        state.userInfo=obj;
        if(obj.username){
            sessionStorage.setItem("userInfo",Json.stringify(obj))
        }else{
            sessionStorage.removeItem("userInfo")
        }
    }
}