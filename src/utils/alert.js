import Vue from "vue"

 let vv=new Vue ()

 export let successalert=(msg)=>{
        vv.$message({
            message:msg,
            type:"success"
        });
 }

 export let lossalert=(msg)=>{
     vv.$message({
         message:msg,
         type:"warning"
     });
 }