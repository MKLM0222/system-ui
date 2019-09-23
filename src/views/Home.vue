<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="5" class="logo" :class="isCollapse?'logo=collapse-width':'logo-width'"></el-col>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios"
import mock  from "@/mock/index.js"
export default {
  name:"Home",
  methods: {
    testAxios(){
      axios.get("http://localhost:8080")
      .then(function(res){
        alert(res.data)
      }).catch(function(res){
        alert(res)
      })
    },
    getUser(){
       axios.get("http://localhost:8080/user")
       .then(function(res){
         alert(JSON.stringify(res.data))
       }).catch(function(res) {
         alert(res)
       })
    },
    getMenu(){
       axios.get("http://localhost:8080/menu")
       .then(function(res){
         alert(JSON.stringify(res.data))
       }).catch(function(res) {
         alert(res)
       })
    },
  }
}
</script>
