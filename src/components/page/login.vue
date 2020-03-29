<template>
    <!-- 登录界面 -->
    <div id="login_background">
        <div id="login_main">
            <p id="login_main_top">用户登录</p>
            <div class="login"><img src="..\..\assets\img\login\zhanghao.png" class="login_logo"><input type="text" name="userName" id="userName" class="login_putin" placeholder="账号" maxlength="12" required="required"></div>
            <div class="login"><img src="..\..\assets\img\login\mima.png" class="login_logo"><input type="password" name="password" id="password" class="login_putin" placeholder="密码" minlength="6" required="required"></div><br/>
            <p id="login_error"></p>
            <button id="login_button" @mouseover="mouseOver" @mouseleave="mouseLeave" :style="login" @click="denglu">登录</button>
            <p id="login_zhushi">注：账号为
                <span>学工号</span>或
                <span>学号</span>
            </p>
        </div>
    </div>
</template>

<script>
import store from "@/vuex/store";
import CryptoJS from "crypto-js";
var login_zt = 0;
var username = "";
var id = "";
var name = "";
var userType = "";
var Authorization = "";
$(document).ready(function() {});

export default {
  store,
  name: "login",
  data() {
    return {
      login: ""
    };
  },
  methods: {
    encrypt(word) {
      var key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b");
      var srcs = CryptoJS.enc.Utf8.parse(word);
      var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    },
    // 登录按钮移入移出事件
    mouseOver() {
      this.login = "background-color:#4d9fe7";
    },
    mouseLeave() {
      this.login = "background-color:#428bca";
    },
    sendAjax() {
      var params = {
        userName: $("#userName").val(),
        // password: this.encrypt($("#password").val())
        password: $("#password").val()
      };
      console.log(params)
      $.ajax({
        url: this.$store.state.url + "authority/Login", //登陆接口
        data: params,
        dataType: "json",
        async: false,
        type: "post",
        success: function(msg) {
          console.log(msg);
          if (msg.code == 200) {
            login_zt = 1;
            username = $("#userName").val();
            id = msg.msg.id;
            name = msg.msg.name;
            userType = msg.msg.userType;
            Authorization = msg.Authorization;
          }
          if (msg.msg == "用户不存在" && msg.code == 300) {
            //账号错误
            $("#login_error").text(msg.msg);
          }
          if (msg.msg == "用户密码错误" && msg.code == 300) {
            //密码错误
            $("#login_error").text(msg.msg);
          }
        },
        error: function() {
          alert("服务器错误");
          // parent.document.location.href = "/";
          // parent.tb_remove();
        }
      });
    },
    denglu() {
      if ($("#userName").val() && $("#password").val()) {
        this.sendAjax();
        // this.$store.commit('changeUserLogin',login_zt);
        // this.$store.commit('changeUserName',username);
        if (login_zt) {
          //登陆成功
          sessionStorage.setItem("userName", username);
          sessionStorage.setItem("isLogin", login_zt);
          sessionStorage.setItem("id", id);
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("userType", userType);
          sessionStorage.setItem("Authorization", Authorization);
          this.$router.push("/");
        }
      } else {
        if ($("#userName").val() == "") {
          $("#login_error").text("用户名不能为空");
        } else {
          $("#login_error").text("请填写密码");
        }
      }
    }
  },
  mounted: function() {
    sessionStorage.setItem("path", "http://47.95.246.40:8080");
    //已登录直接进入主界面
    this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    // alert(this.$store.state.user.isLogin)
    if (this.$store.state.user.isLogin == 1) {
      this.$router.push("/");
    }
    this.li = $(".list li");
  }
};
</script>

<style>
#login_background {
  width: 100%;
  height: 100%;
  /* min-width: 468px; */
  background-image: url(..\..\assets\img\login\login-bg1.png);
  background-size: 100% 100%;
}
#login_main {
  position: absolute;
  left: 55%;
  top: 20%;
  width: 300px;
  height: 340px;
  background-color: white;
}
#login_main_top {
  font-weight: bold;
  font-size: 2em;
  margin-bottom: 10px;
}
.login {
  margin-top: 15px;
  display: inline-block;
  height: 25px;
}
/* 账号密码logo */
.login_logo {
  border: black solid 1px;
  height: 26px;
  display: inline-block;
  background-color: rgb(233, 233, 233);
}
/* 账号密码输入栏 */
.login_putin {
  width: 150px;
  outline: none;
  border: black solid 1px;
  border-left: 0;
  padding-left: 10px;
  height: 24px;
  position: relative;
  top: -10px;
}
/* 错误提示 */
#login_error {
  padding: 0;
  margin-bottom: -5px;
  color: red;
  font-size: 0.8em;
}
/* 登录按钮 */
#login_button {
  letter-spacing: 0.5em;
  margin-top: 15px;
  width: 195.8px;
  padding: 5px 2px;
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
/* 注释 */
#login_zhushi {
  font-size: 0.8em;
}
#login_zhushi span {
  color: #003cff;
  font-weight: bold;
}
</style>