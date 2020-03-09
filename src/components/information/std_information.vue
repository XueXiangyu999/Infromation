<template >
  <!-- 人员信息管理 -->
  <div id="information_main">
    <div id="information_head">
      <img src="..\..\assets\img\information\xiugai.png" style="height:100%;margin-bottom:-2px;" />
      <span>修改用户信息</span>
      <p
        id="information_home"
        @click="gohome"
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
        :class="{gohome_over:weather}"
        style="display:block;float:right;margin-top:-2px;margin-right:50px;"
      >首页>></p>
    </div>
    <div style="wight:100%;padding-left:40px;">
      <p id="information_form_top">
        【基本信息】
        <span style="color:red">*可修改电话和邮箱，如有其它错误请联系管理员</span>
      </p>
      <div style="border: solid 2px black;margin: 0 auto;width:1200px;padding:0 50px;">
        <table id="information">
          <tr class="information_first_tr">
            <td class="information_first_td information_td">姓名:</td>
            <td class="information_middle_td information_td" colspan="2">
              <p class="information_table_input" id="inf_name">{{user.basic.name}}</p>
            </td>
            <td class="information_middle_td information_td">学号：</td>
            <td class="information_middle_td information_td" colspan="2">
              <p class="information_table_input" id="inf_username">{{user.basic.userName}}</p>
            </td>
            <td class="information_middle_td information_td">身份：</td>
            <td class="information_middle_td information_td">
              <p class="information_table_input">学生</p>
            </td>
            <td class="information_middle_td information_td" rowspan="3">
              <el-upload
                name="image"
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :headers="header"
              >
                <img v-if="user.imageUrl" :src="user.imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </td>
            <!-- 上传图片 -->
          </tr>
          <tr class="information_tr">
            <td class="information_first_td information_td">所属学校：</td>
            <td class="information_middle_td information_td" colspan="2">华北电力大学（保定）</td>
            <td class="information_middle_td information_td">所属院系:</td>
            <td class="information_middle_td information_td" colspan="2">
              <p class="information_table_input">计算机系</p>
            </td>
            <td class="information_middle_td information_td">入校时间：</td>
            <td class="information_middle_td information_td">
              <p class="information_table_input">{{user.detail.grade}}</p>
            </td>
          </tr>
          <tr class="information_tr">
            <td class="information_first_td information_td">电话:</td>
            <td class="information_middle_td information_td" colspan="3">
              <p
                contenteditable="true"
                class="information_table_input"
                id="inf_phone"
              >{{user.basic.phone}}</p>
            </td>
            <td class="information_middle_td information_td">邮箱：</td>
            <td class="information_middle_td information_td" colspan="3">
              <p
                contenteditable="true"
                class="information_table_input"
                id="inf_email"
              >{{user.basic.email}}</p>
            </td>
          </tr>
          <tr class="information_tr information_student">
            <!---->
            <td class="information_first_td information_td">行政班级：</td>
            <td class="information_middle_td information_td" colspan="3">
              <p class="information_table_input" id="inf_xzclass">{{user.detail.nature_class_name}}</p>
            </td>
            <td class="information_middle_td information_td">专业班级：</td>
            <td class="information_middle_td information_td" colspan="3">
              <p class="information_table_input" id="inf_zyclass">{{user.detail.major_class_name}}</p>
            </td>
          </tr>
        </table>
      </div>
      <button id="information_enter" @click="tijiao">确认提交</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "informatiom",
  data() {
    return {
      weather: false,
      user: {
        basic: {
          name: "",
          username: "",
          phone: "",
          email: ""
        },
        detail: {
          classMsg: {
            grade: "",
            majorClass: "",
            natureClass: ""
          }
        }
      },
      header: { Authorization: this.$store.state.user.Authorization },
      action: sessionStorage.getItem("path") + "/userManagement/uploadImage"
    };
  },
  methods: {
    gohome() {
      //首页路由
      this.$router.push("/");
    },
    mouseOver() {
      //光标聚焦样式改变
      this.weather = true;
    },
    mouseLeave() {
      this.weather = false;
    },
    handleAvatarSuccess(res, file) {
      var header = this.$store.state.user.Authorization;
      var params = { uid: parseInt(this.$store.state.user.id) };
      $.ajax({
        url: sessionStorage.getItem("path") + "/userManagement/getAllMsg",
        data: params,
        async: false,
        dataType: "json",
        type: "post",
        headers: { Authorization: header },
        success: function(msg) {
          console.log(msg);
          window.user = $.extend(true, [], msg);
          user.imageUrl = sessionStorage.getItem("path") + msg.basic.image;
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.user = $.extend(true, [], user);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    tijiao() {
      var params = {
        id: this.$store.state.user.id,
        email: $("#inf_email").text(),
        phone: $("#inf_phone").text()
      };

      var Authorization = this.$store.state.user.Authorization;
      if (params.email && params.phone) {
        $.ajax({
          url: sessionStorage.getItem("path") + "/userManagement/updateUserMsg",
          data: params,
          dataType: "json",
          type: "post",
          headers: { Authorization: Authorization },
          success: function(msg) {
            console.log(msg);
            alert("修改成功");
          },
          error: function() {
            alert("服务器错误");
          }
        });
      } else {
        if (params.phone == "" || params.phone == null) {
          this.$message.error("请填写电话");
        } else {
          if (params.email == "" || params.email == null) {
            this.$message.error("请填写邮箱");
          }
        }
      }
    }
  },
  created: function() {
    this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    if (sessionStorage.getItem("isLogin") == 0) {
      this.$router.push("/login");
    }
    var header = this.$store.state.user.Authorization;
    var params = { uid: parseInt(this.$store.state.user.id) };
    $.ajax({
      url: sessionStorage.getItem("path") + "/userManagement/getAllMsg",
      data: params,
      async: false,
      dataType: "json",
      type: "post",
      headers: { Authorization: header },
      success: function(msg) {
        console.log(msg);
        window.user = $.extend(true, [], msg);
        user.imageUrl = sessionStorage.getItem("path") + msg.basic.image;
      },
      error: function() {
        alert("服务器错误");
      }
    });
  },
  mounted() {
    this.user = $.extend(true, [], user);
  }
};
</script>

<style>
/* 返回首页光标移动样式 */
.gohome_over {
  cursor: pointer;
  text-decoration: underline;
  color: red;
}
#information_main {
  height: 93.6%;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
  text-align: left;
  overflow: auto;
}
/* 页面头部 */
#information_head {
  height: 16px;
  padding-left: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: solid 2px rgba(182, 182, 182, 0.85);
}
#information_head span {
  display: inline-block;
  padding-left: 10px;
}
/* 表格 */
#information {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin: 20px auto;
  font-size: 1.2em;
  text-align: center;
}
/* 输入栏 */
.information_table_input {
  outline: none;
}
/* 表格每一行 */
.information_tr {
  border-bottom: solid 3px #ccc;
}
/* 表格每一格 */
.information_td {
  line-height: 1.1em;
}
/* 表格第一行 */
.information_first_tr {
  border-top: solid 3px #ccc;
  border-bottom: solid 3px #ccc;
  border-left: solid 1px #ccc;
  border-right: solid 1px #ccc;
}
/* 表格第一列 */
.information_first_td {
  border-right: solid 2px #ccc;
  border-left: solid 2px #ccc;
}
/* 表格中间列 */
.information_middle_td {
  border-right: solid 2px #ccc;
}
/* 选项栏 */
#usertype,
#sex,
#y_or_n,
#post {
  font-size: 0.8em;
  outline: none;
  border: solid 1px #ccc;
  height: 30px;
  width: 100px;
}
#bumen {
  font-size: 0.8em;
  outline: none;
  border: solid 1px #ccc;
  height: 30px;
  width: 200px;
}
/* 照片 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 129.8px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 129.8px;
  height: 178px;
  display: block;
}
/* 提交按钮 */
#information_enter {
  font-size: 1em;
  margin: 20px auto;
  margin-bottom: 40px;
  margin-left: 45%;
  letter-spacing: 0.5em;
  width: 200px;
  padding: 7px 2px;
  background-color: #428bca;
  border-color: #357ebd;
  color: #fff;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px; /* future proofing */
  -khtml-border-radius: 5px; /* for old Konqueror browsers */
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
}
</style>
