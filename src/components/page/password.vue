<template>
<!-- 修改密码界面 -->
    <div id="password_main">
        <!-- <p id="password_home" @click="gohome" @mouseover="mouseOver" @mouseleave="mouseLeave" :class="{gohome_over:weather}">首页>></p> -->
        <p id="password_main_top">修改密码</p>
        <form name="password_form" method="" action="" style="margin-left:20px;">
            <p class="password_p"><span style="letter-spacing:1em;">&nbsp;</span>原密码：
            <input type="password" id="old_password" style="outline: none;" minlength="6" maxlength="20" required="required"></p>
            <p class="password_p"><span style="letter-spacing:1em;">&nbsp;</span>新密码：
            <input type="password" id="new_password" style="outline: none;" minlength="6" maxlength="20" required="required"></p>
            <p class="password_p">&nbsp;确认密码：
            <input type="password" id="repeat_password" style="outline: none;" minlength="6" maxlength="20" required="required"></p>
            <p id="ps_error" class="password_error"></p>
            <p id="ps_success"><img src="..\..\assets\img\login\success.png" style="width:16px;margin-right:5px;margin-bottom:-2px;">修改成功</p>
            <button type="button" id="password_button" @click="xiugai">确认修改</button>
        </form>
    </div>
</template>

<script>
$(document).ready(function(){

});
export default {
    name:'password',
    data(){
        return {
            // weather:false,
        }
    },
    methods:{
        // gohome(){
        //     this.$router.push('/');                 //首页路由
        // },
        mouseOver(){                                //光标聚焦样式改变
            this.weather=true;
        },
        mouseLeave(){
            this.weather=false;
        },
        xiugai(){
            var id=this.$store.state.user.id
            var params={
                "password":$('#new_password').val(),
                "originalPassword":$('#old_password').val(),
                };
            var Authorization=this.$store.state.user.Authorization
            if($('#new_password').val() && $('#old_password').val() && $('#repeat_password').val()){
                if($('#new_password').val()==$('#repeat_password').val()){
                    $.ajax({
                        url:sessionStorage.getItem('path')+'/userManagement/changePassword',
                        data:params,
                        dataType: "json",
                        type : "post",
                        headers:{'Authorization':Authorization},
                        success : function(msg){
                            console.log(msg)
                            if(msg.status==false && msg.msg=="原密码不正确，请重试"){
                            $('#ps_error').text(msg.msg)   
                            }
                            else{
                                alert("修改成功")
                            }
                        },
                        error : function(){
                            alert('服务器错误');
                        }
                    })
                }
                else{
                    $('#ps_error').text('*两次密码不一样')
                }
            }
            else{
                if($('#old_password').val()=='')
                {
                     $('#ps_error').text('*请输入原密码')
                }
                else{
                    if($('#new_password').val()=='')
                    {
                        $('#ps_error').text('*请输入新密码')
                    }
                    else{
                        if($('#repeat_password').val()=='')
                        {
                            $('#ps_error').text('*请确认密码')
                        }
                    }
                }
            }
        }
    },
    mounted:function(){
    this.$store.commit('loginStatus',sessionStorage.getItem('isLogin'));
    if(this.$store.state.user.isLogin==0){
        this.$router.push('/login');
    }
    },
}
</script>

<style>
#password_main{
    margin:200px auto;
    padding: 50px 30px;
    width: 600px;
    background-color: rgba(250, 250, 250,0.9);
}
/* 返回首页 */
/* #password_home{
    width: 70px;
    margin-top: -30px;
} */
/* 返回首页光标移动样式 */
/* .gohome_over{
    cursor: pointer;
    text-decoration: underline;
    color: red;
} */
/* 头部文字 */
#password_main_top{
    margin: 0 auto;
    width: 90%;
    padding-bottom: 20px;
    border-bottom: solid 2px #ccc;
    font-size: 2em;
}
/* 填写栏 */
.password_p{
    margin-left: -40px;
}
/* 红字注释 */
.password_zhushi{
    margin-left: 10px;
    font-size: 0.8em;
    color: red;
}
/* 错误提示 */
.password_error{
    padding-left: 20px;
    margin-left: 10px;
    font-size: 0.8em;
    color: red;

}
/* 修改成功 */
#ps_success{
    display: none;
}
/* 确认修改按钮 */
#password_button{
    letter-spacing: 0.5em;
    margin-left: 40px;
    padding: 5px 30px;
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
