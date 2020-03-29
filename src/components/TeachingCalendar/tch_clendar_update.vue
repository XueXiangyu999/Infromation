<template>
  <div id="clendar_main">
    <div style="margin-left:10%">
      <h2>上传 {{month}} 月日历：</h2>
      <h3>模板下载：</h3>
      <div id="clendar_muban">
        <img
          src="..\..\assets\img\yuekao\word-iocn.png"
          style="float:left;width:100px;margin-top:10px;display:inline_block"
        />
        <p style="width:120px;float:left;font-size:1.2em;margin-left:20px">日历模板</p>
        <el-button
          type="primary"
          size="mini"
          style="float:right;margin-right:40px"
          @click="download()"
        >
          下载
          <i class="el-icon-download el-icon--right"></i>
        </el-button>
      </div>
    </div>
    <div style="margin-left:10%">
      <h3>上传日历：</h3>
      <div v-if="status==0">
        <el-steps :space="200" :active="1" finish-status="success">
          <el-step title="未提交" status="error"></el-step>
          <el-step title="待审核"></el-step>
          <el-step title="待定"></el-step>
        </el-steps>
      </div>
      <div v-if="status==1">
        <el-steps :space="200" :active="2" finish-status="success">
          <el-step title="已提交"></el-step>
          <el-step title="待审核"></el-step>
          <el-step title="待定"></el-step>
        </el-steps>
      </div>
      <div v-if="status==2">
        <el-steps :space="200" :active="3" finish-status="success">
          <el-step title="已提交"></el-step>
          <el-step title="待审核"></el-step>
          <el-step title="已通过"></el-step>
        </el-steps>
      </div>
      <div v-if="status==3">
        <el-steps :space="200" :active="3" finish-status="success">
          <el-step title="已提交"></el-step>
          <el-step title="待审核"></el-step>
          <el-step title="未通过"  status="error"></el-step>
        </el-steps>
      </div>
      <p style="font-size:13px;">
        <strong>状态：</strong>
        <el-tag type="danger" effect="dark" size="mini" v-if="status==0">未提交</el-tag>
        <el-tag type="warning" effect="dark" size="mini" v-if="status==1">待审核</el-tag>
        <el-tag type="success" effect="dark" size="mini" v-if="status==2">已通过</el-tag>
        <el-tag type="danger" effect="dark" size="mini" v-if="status==3">未通过</el-tag>
        <el-upload
          style="display:inline-block; margin-left:30px"
          v-if="status==0||status==1||status==3"
          class="upload-demo"
          :action="path+'/calendar/updateCalendar'"
          :data="data"
          :headers="header"
          :on-success="update_success"
          :on-error="update_error"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-upload style="display:inline-block; margin-left:30px" v-else class="upload-demo" disabled>
          <el-button size="small" type="primary" disabled>点击上传</el-button>
        </el-upload>
      </p>
      <p style="font-size:13px;" v-if="status==2||status==1||status==3">
        <strong>历史文件：{{fileName}}</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      month: "",
      path: sessionStorage.getItem("path"),
      status: "",
      data: {},
      header: {},
      fileName: ""
    };
  },
  methods: {
    download() {
      window.location.href =
        sessionStorage.getItem("path") + "/calendar/downloadTemplate";
    },
    update_success() {
      this.$message({
        showClose: true,
        message: "上传成功",
        type: "success"
      });
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        url: sessionStorage.getItem("path") + "/calendar/getCurrentCalendar",
        dataType: "json",
        type: "post",
        async: false,
        headers: { Authorization: Authorization },
        success: function(msg) {
          window.status = msg.status;
          window.id = msg.id;
          window.fileName = msg.fileName;
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.fileName = fileName;
      this.status = status;
      this.data = {
        id: id
      };
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
    var myDate = new Date();
    this.month = myDate.getMonth() + 1;
    var Authorization = this.$store.state.user.Authorization;
    $.ajax({
      url: sessionStorage.getItem("path") + "/calendar/getCurrentCalendar",
      dataType: "json",
      type: "post",
      async: false,
      headers: { Authorization: Authorization },
      success: function(msg) {
        console.log(msg);
        window.status = msg.status;
        window.id = msg.id;
        window.fileName = msg.fileName;
      },
      error: function() {
        alert("服务器错误");
      }
    });
    this.fileName = fileName;
    this.status = status;
    this.data = {
      id: id
    };
    this.header = {
      Authorization: Authorization
    };
  }
};
</script>

<style>
#clendar_main {
  /* padding-top: 3%;
  padding-left: 5%;
  padding-bottom: 30px; */
  background-color: rgba(255, 255, 255, 0.9);
  /* margin-left: 25%;
  margin-top: 3%; */
  text-align: left;
}
#clendar_muban {
  width: 240px;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22), 0 0 6px rgba(0, 0, 0, 0.14);
}
.el-upload-dragger {
  width: 300px;
}
</style>
