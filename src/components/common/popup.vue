<template>
    <div class="main">
    <div class="popup">
      <form class="Pform"><br>
        <br>
        <br>
        <label>{{title}}</label>
        <input type='file' name='file1' style="display: none;" onchange="ye1.value=value" accept=".xls,.xlsx" id="ifile1">
        <input name='ye1' class="ye" onclick=file1.click()>
        <br></form>
      <el-button type="success" @click="success">确认</el-button>
      <el-button type="danger" @click="cancel">取消</el-button>
    </div>
    <div class="shadow"></div>
    </div>
</template>
<script>
export default {
  props:['title'],
  methods:{
    success(){
      this.$emit("success",$("#ifile1")[0].files[0])
    },
    cancel(){
      this.$emit("cancel")
    }
  },
    mounted(){
    let top = document.body.clientHeight / 2 - 150;
    let left = document.body.clientWidth / 2 - 200;
    console.log(top);
    console.log(left);
    $(".popup")
      .eq(0)
      .css("top", top + "px");
    $(".popup")
      .eq(0)
      .css("left", left + "px");
    $(".shadow")
      .eq(0)
      .css("width", document.body.clientWidth);
    $(".shadow")
      .eq(0)
      .css("height", document.body.clientHeight);
    }
}
</script>
<style>
.popup {
  position: fixed;
  height: 300px;
  width: 400px;
  background-color: #dde6f2;
  border-radius: 18px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  z-index: 1500;
}
.Pform > input {
  height: 30px;
  width: 200px;
}
.popup > .el-button {
  margin: 80px 30px;
  width: 120px;
}
.shadow {
  background-color: #000;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  opacity: 0.5;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 1000;
}
</style>
