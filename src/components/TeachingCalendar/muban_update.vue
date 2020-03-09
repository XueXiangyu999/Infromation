<template>
  <div id="clendar_main">
    <h3>上传教学日历模板：</h3>
    <el-form ref="form" :model="form" label-width="90px">
      <el-form-item label="点击上传：">
        <el-upload
          class="upload-demo"
          :action="action"
          :show-file-list="false"
          :on-success="update_success"
          :on-error="update_error"
          :headers="header"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="模板名称：">{{form.name}}</el-form-item>
      <el-form-item label="上传时间：">{{form.date}}</el-form-item>
      <el-form-item label="查看：">
        <el-link
          v-if="form.name!=''"
          type="primary"
          :underline="false"
          :href="path+'/calendar/downloadTemplate'"
        >下载</el-link>
        <el-link v-else type="primary" :underline="false" disabled>下载</el-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
var user={
  name:'',
  update_time:'',
}
export default {
  data() {
    return {
      header: {},
      action: sessionStorage.getItem("path") + "/calendar/admin/uploadTemplate",
      path: sessionStorage.getItem("path"),
      form: {
        name: "",
        date: ""
      }
    };
  },
  methods: {
    update_success() {
      this.$message({
        showClose: true,
        message: "上传成功",
        type: "success"
      });
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        url: sessionStorage.getItem("path") + "/calendar/admin/getTemplate",
        dataType: "json",
        type: "post",
        async: false,
        headers: { Authorization: Authorization },
        success: function(msg) {
          user = $.extend(true, [], msg);
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.form.name = user.name;
      this.form.date = user.update_time.substring(0, 10);
    },
    update_error() {
      this.$message({
        showClose: true,
        message: "上传失败，请重试",
        type: "error"
      });
    }
  },
  mounted: function() {
    this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    if (sessionStorage.getItem("isLogin") == 0) {
      this.$router.push("/login");
    }
    this.header = { Authorization: this.$store.state.user.Authorization };
    var Authorization = this.$store.state.user.Authorization;
    $.ajax({
      url: sessionStorage.getItem("path") + "/calendar/admin/getTemplate",
      dataType: "json",
      type: "post",
      async: false,
      headers: { Authorization: Authorization },
      success: function(msg) {

        user = $.extend(true, [], msg);
      },
      error: function() {
        alert("服务器错误");
      }
    });
    this.form.name = user.name;
    this.form.date = user.update_time.substring(0, 10);
  }
};
</script>

<style>
#clendar_main {
  padding-top: 3%;
  padding-left: 5%;
  padding-bottom: 30px;
  background-color: rgb(255, 255, 255);
  margin-left: 25%;
  margin-top: 3%;
  text-align: left;
}
</style>
