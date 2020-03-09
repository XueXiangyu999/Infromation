<template >
<!-- 人员信息管理 -->
<div id="information_main">
  <div id="information_head"><img src="..\..\assets\img\information\xiugai.png" style="height:100%;margin-bottom:-2px;"><span>修改用户信息</span>
  <p id="information_home" @click="gohome" @mouseover="mouseOver" @mouseleave="mouseLeave" :class="{gohome_over:weather}" style="display:block;float:right;margin-top:-2px;margin-right:50px;">首页>></p>
  </div>
  <div style="wight:100%;padding-left:40px;">
    <p id="information_form_top">【基本信息】<span style="color:red">*可修改电话和邮箱，如有其它错误请联系管理员</span></p>
    <div style="border: solid 2px black;margin: 0 auto;width:1200px;padding:0 50px;">
      <table id="information">
        <tr class="information_first_tr">
          <td class="information_first_td information_td">姓名:</td>
          <td class="information_middle_td information_td" colspan="2"><p  class="information_table_input" id="inf_name">{{user.name}}</p></td>
          <td class="information_middle_td information_td">学工号：</td>
          <td class="information_middle_td information_td" colspan="2"><p  class="information_table_input" id="inf_username">{{user.username}}</p></td>   
          <td class="information_middle_td information_td">性别：</td>
          <td class="information_middle_td information_td">
            <select id="sex">
              <option value="man">男</option>
              <option value="woman">女</option>
            </select>
          </td>
          <td class="information_middle_td information_td" rowspan="3">
            <el-upload
            name="image"
            class="avatar-uploader"
            action="http://47.95.246.40:8080/file/uploadImage"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="header">
            <img v-if="user.imageUrl" :src="user.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </td>
          <!-- 上传图片 -->
        </tr>
        <tr class="information_tr">
          <td class="information_first_td information_td">所属学校：</td>
          <td class="information_middle_td information_td" colspan="2">华北电力大学（保定）</td>
          <td class="information_middle_td information_td">所属院系:</td>
          <td class="information_middle_td information_td" colspan="2"><p class="information_table_input" id="">计算机系</p></td>
          <td class="information_middle_td information_td">身份：</td>
          <td class="information_middle_td information_td">
            <select id="usertype">
              <option value="0">学生</option>
              <option value="1">教师</option>
            </option>
            </select>
          </td>
        </tr>
        <tr class="information_tr">
          <td class="information_first_td information_td">电话:</td>
          <td class="information_middle_td information_td" colspan="2"><p contenteditable="true" class="information_table_input" id="inf_phone">{{user.phone}}</p></td>
          <td class="information_middle_td information_td">邮箱：</td>
          <td class="information_middle_td information_td" colspan="2"><p contenteditable="true" class="information_table_input" id="inf_email">{{user.email}}</p></td>
          <td class="information_middle_td information_td">入校时间：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id="">{{user.grade}}</p></td>
        </tr>
        <tr class="information_tr information_student"><!---->
          <td class="information_first_td information_td">行政班级：</td>
          <td class="information_middle_td information_td" colspan="2"><p  class="information_table_input" id="inf_xzclass">计算机</p></td>
          <td class="information_middle_td information_td">专业班级：</td>
          <td class="information_middle_td information_td" colspan="2"><p  class="information_table_input" id="inf_zyclass">计科1701</p></td>
          <td class="information_middle_td information_td">政治面貌：</td>
          <td class="information_middle_td information_td" colspan="2"><p  class="information_table_input" id="">共青团员</p></td>
        </tr>
        <tr class="information_tr information_teacher"><!---->
          <td class="information_first_td information_td">所属部门:</td>
          <td class="information_middle_td information_td" colspan="2">  
            <select id="bumen">
              <option value="0">计算机系领导</option>
              <option value="1">系办公室</option>
              <option value="2">系党委学生工作办公室</option>
              <option value="3">计算机科学与技术教研室</option>
              <option value="4">软件工程教研室</option>
              <option value="5">网络工程教研室</option>
              <option value="6">信息安全教研室</option>
            </select>
          </td> 
          <td class="information_middle_td information_td">职务：</td>
          <td class="information_middle_td information_td">  
            <select id="post">
              <option value="0">系主任</option>
              <option value="1">系副主任</option>
              <option value="2">室主任</option>
              <option value="3">党支部书记</option>
              <option value="4">党委委员</option>
              <option value="5">无</option>
            </select>
          </td>         
          <td class="information_middle_td information_td">党派：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id="">共产党</p></td>
          <td class="information_middle_td information_td">是否硕导：</td>
          <td class="information_middle_td information_td">
            <select id="y_or_n">
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </td>
          
        </tr>
        <tr class="information_tr information_teacher"><!---->
          <td class="information_first_td information_td">研究方向:</td>
          <td class="information_middle_td information_td" colspan="2"><p  class="information_table_input" id=""></p></td>
          <td class="information_middle_td information_td">学位：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id="">博士</p></td>
          <td class="information_middle_td information_td">职称：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id=""></p></td>
          <td class="information_middle_td information_td">社会兼职：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id=""></p></td> 
        </tr>
        <tr class="information_tr information_teacher"><!---->
          <td class="information_first_td information_td" colspan="9" style="height:40px;font-size:0.8em">请填写学位及相应毕业院校、专业以及毕业时间，没有可不填</td>
        </tr>
        <tr class="information_tr information_teacher"><!---->
          <td class="information_first_td information_td">学位：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id="">学士</p></td>
          <td class="information_middle_td information_td">毕业学校</td>
          <td class="information_middle_td information_td" colspan="2"><p  class="information_table_input" id=""></p></td>
          <td class="information_middle_td information_td">专业：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id=""></p></td>
          <td class="information_middle_td information_td">毕业时间：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id=""></p></td>
        </tr>
        <tr class="information_tr information_teacher"><!---->
          <td class="information_first_td information_td">学位：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id="">硕士</p></td>
          <td class="information_middle_td information_td">毕业学校</td>
          <td class="information_middle_td information_td" colspan="2"><p  class="information_table_input" id=""></p></td>
          <td class="information_middle_td information_td">专业：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id=""></p></td>
          <td class="information_middle_td information_td">毕业时间：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id=""></p></td>
        </tr>
        <tr class="information_tr information_teacher"><!---->
          <td class="information_first_td information_td">学位：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id="">博士</p></td>
          <td class="information_middle_td information_td">毕业学校</td>
          <td class="information_middle_td information_td" colspan="2"><p  class="information_table_input" id=""></p></td>
          <td class="information_middle_td information_td">专业：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id=""></p></td>
          <td class="information_middle_td information_td">毕业时间：</td>
          <td class="information_middle_td information_td"><p  class="information_table_input" id=""></p></td>
        </tr>
        <!-- <tr class="information_tr information_teacher" >
          <td class="information_first_td information_td" style="line-height:1.5em;height:150px;">上课<br/>时间</td>
          <td class="information_middle_td information_td" colspan="8"><p  class="information_table_input" id=""></p></td>
        </tr>
        <tr class="information_tr information_teacher" >
          <td class="information_first_td information_td" style="line-height:1.5em;height:150px;">安排<br/>实验<br/>的<br/>时间</td>
          <td class="information_middle_td information_td" colspan="8"><p  class="information_table_input" id=""></p></td>
        </tr>
        <tr class="information_tr information_teacher" >
          <td class="information_first_td information_td" style="line-height:1.5em;height:150px;">计划<br/>安排<br/>实验<br/>的<br/>时间</td>
          <td class="information_middle_td information_td" colspan="8"><p  class="information_table_input" id=""></p></td>
        </tr> -->
      </table>
    </div>
    <button id="information_enter" @click="tijiao">确认提交</button>
  </div>
</div>
    
</template>

<script>
var user={
        username:'',
        name:'',
        phone:'',
        userType:'',
        gread:'',
        email:'',
        imageUrl:'',
      }



$(document).ready(function(){
  
  $("#usertype").change(function(){
  var change=this.value;
  if(change=="0"){
    $('.information_teacher').css('background-color','rgba(255, 255, 184,0.5)');
    $('.information_student').css('background-color','rgba(255, 255, 184,0)');
    // $('.information_teacher').children('td').children('p').removeAttr('contenteditable');
    // $('.information_student').children('td').children('p').attr('contenteditable','true');
  } else {
    $('.information_teacher').css('background-color','rgba(255, 255, 184,0)');
    $('.information_student').css('background-color','rgba(255, 255, 184,0.5)');
    // $('.information_student').children('td').children('p').removeAttr('contenteditable');
    // $('.information_teacher').children('td').children('p').attr('contenteditable','true');
  }})

});

export default {
  name:'informatiom',
    data(){
        return {
          weather:false,
          user,
          header:{'Authorization':this.$store.state.user.Authorization}
        }
    },
    methods:{
        gohome(){                                   //首页路由
          this.$router.push('/');                 
        },
        mouseOver(){                                //光标聚焦样式改变
          this.weather=true;
        },
        mouseLeave(){
          this.weather=false;
        },
         handleAvatarSuccess(res, file) {
        this.user.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },


        tijiao(){
          var params={
            "id":this.$store.state.user.id,
            "email":$("#inf_email").text(),
            "phone":$("#inf_phone").text(),
          }

          var Authorization=this.$store.state.user.Authorization
          if(params.email &&params.phone){
          $.ajax({
            url:sessionStorage.getItem('path')+':8080/userManagement/updateUserMsg',
            data : params, 
            dataType: "json",
            type : "post",
            headers:{'Authorization':Authorization},
            success:function (msg) {
              console.log(msg)
              alert("修改成功")
            },
            error : function(){
                alert('服务器错误');
            }
          })
          }
          else{
            if(params.phone=="" ||params.phone==null){
              this.$message.error('请填写电话');
            }
            else{
              if(params.email=="" ||params.email==null){
              this.$message.error('请填写邮箱');
            }
            }
          }
        }

    },
    mounted:function(){
      this.$store.commit('loginStatus',sessionStorage.getItem("isLogin"));
      if(sessionStorage.getItem("isLogin")==0){
      this.$router.push('/login');
      }
      var header=this.$store.state.user.Authorization
      var params={uid:this.$store.state.user.id}
      $.ajax({
                url : sessionStorage.getItem('path')+':8080/userManagement/getAllMsg',   
                data : params,
                async : false,
                dataType: "json",
                type : "post",
                headers:{'Authorization':header},
                success : function(msg) {
                     console.log(msg)
                     user.imageUrl=sessionStorage.getItem('path')+':8080'+msg.basic.image
                    user.username=msg.basic.userName
                    user.name=msg.basic.name
                    // user.sex=msg.basuc.sex
                    user.phone=msg.basic.phone
                    user.userType=msg.basic.userType
                    // user.grade=msg.detail.grade
                    user.email=msg.basic.email
                    user.time=msg.basic.time

                    if(user.userType==1){  //学生
                      $("#usertype").val(0)
                      $('.information_teacher').css('background-color','rgba(255, 255, 184,0.5)');
                      $('.information_student').css('background-color','rgba(255, 255, 184,0)');
                      // $('.information_teacher').children('td').children('p').removeAttr('contenteditable');
                      // $('.information_student').children('td').children('p').attr('contenteditable','true');


                      user.xz_class=msg.basic.xz_class
                      user.zy_class=msg.basic.zy_class
                      user.zzmm=msg.basic.zzmm
                    }
                    else{  //教师
                       $("#usertype").val(1) 
                       $('.information_teacher').css('background-color','rgba(255, 255, 184,0)');
                        $('.information_student').css('background-color','rgba(255, 255, 184,0.5)');
                        // $('.information_student').children('td').children('p').removeAttr('contenteditable');
                        // $('.information_teacher').children('td').children('p').attr('contenteditable','true');


                        user.ssbm=msg.basic.ssbm
                        user.zw=msg.basic.zw
                        user.dp=msg.basic.dp
                        user.sd=msg.basic.sd
                        user.yjfx=msg.basic.yjfx
                        user.xw=msg.basic.xw
                        user.zc=msg.basic.zc
                        user.jz=msg.basic.jz
                        user.xs_school=msg.basic.xs_school
                        user.xs_zy=msg.basic.xs_zy
                        user.xs_time=msg.basic.xs_time
                        user.ss_school=msg.basic.ss_school
                        user.ss_zy=msg.basic.ss_zy
                        user.ss_time=msg.basic.ss_time
                        user.bs_school=msg.basic.bs_school
                        user.bs_zy=msg.basic.bs_zy
                        user.bs_time=msg.basic.bs_time
                    }
                },
                error : function(){
                    alert('服务器错误');
                }
            });
    },
}

</script>

<style>
/* 返回首页光标移动样式 */
.gohome_over{
    cursor: pointer;
    text-decoration: underline;
    color: red;
}
#information_main{
  width: 100%;
  background: rgba(255, 255, 255,0.85);
  text-align: left;
  overflow: auto;
}
/* 页面头部 */
#information_head{
  height: 16px;
  padding-left: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: solid 2px rgba(182, 182, 182, 0.85)
}
#information_head span{
  display: inline-block;
  padding-left: 10px;
}
/* 表格 */
#information{
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
  margin: 20px auto;
  font-size: 1.2em;
  text-align: center;
}
/* 输入栏 */
.information_table_input{
  outline: none;
}
/* 表格每一行 */
.information_tr{
  border-bottom: solid 3px #ccc;  
}
/* 表格每一格 */
.information_td{
  line-height: 1.1em;
}
/* 表格第一行 */
.information_first_tr{
  border-top: solid 3px #ccc;
  border-bottom: solid 3px #ccc;
  border-left: solid 1px #ccc;
  border-right: solid 1px #ccc;
}
/* 表格第一列 */
.information_first_td{
  border-right: solid 2px #ccc;
  border-left: solid 2px #ccc;
}
/* 表格中间列 */
.information_middle_td{
  border-right: solid 2px #ccc;
}
/* 选项栏 */
#usertype,#sex,#y_or_n,#post{
  font-size: 0.8em;
  outline: none;
  border: solid 1px #ccc;
  height: 30px;
  width: 100px;;
}
#bumen{
  font-size: 0.8em;
  outline: none;
  border: solid 1px #ccc;
  height: 30px;
  width: 200px;;
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
    border-color: #409EFF;
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
#information_enter{
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
