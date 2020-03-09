<template>
  <div class="WJshangchuan">
    <h2>上传专区</h2>
    <form class="WJ_form">
      <label>选择文件：</label>
      <input type='file' name='file' style="display: none;" onchange="ye.value=value" accept="" id="file">
      <input name='ye' class="ye" onclick=file.click()>
      <label>（可选）</label>
      <br>
      <br>
      <label>文件名字：</label>
      <input name='ye1' class="ye" v-model="name">
      <label>（可选）</label>
    </form>
    <el-button type="primary" @click="updata">上传
      <i class="el-icon-upload el-icon--right"></i>
    </el-button>
  </div>
</template> 

<script>
import store from "@/vuex/store";
export default {
  store,
  methods: {
    updata() {
      let formdata = new FormData();
      formdata.append("wenjian", $("#ifile")[0].files[0]);
      formdata.append("name", name);
      this.$http
        .post("http://", formdata)
        .then(res => {
          this.$router.push({
            path: "/tch_wenjian/wenjian",
            query: { serve: this.name }
          });
        })
        .catch(res => {});
    }
  },
  data() {
    return {
      name: null
    };
  }
};
</script>

<style scoped>
/* .WJshangchuan {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 70%;
  border-radius: 10px;
  float: right;
  margin-left: 80px;
  min-width: 400px;
  min-height: 400px;
  margin-right: 80px;
  margin-top: 100px;
} */
.ye {
  width: 221.4px;
  margin-left: 20px;
  color: green;
  border: 1px solid green;
  height: 30px;
}
.WJ_form {
  margin: 0 auto;
  width: 450px;
  text-align: left;
}
.el-button {
  margin-top: 20px;
  width: 100px;
  margin-bottom: 20px;
}
</style>
