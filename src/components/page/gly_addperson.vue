<template>
    <div id="addperson_main">
        <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="添加教师" name="first">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学工号" prop="userName">
                    <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" prop="pass">
                    <el-input v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm1('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="添加学生" name="second">
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="userName">
                    <el-input v-model="ruleForm.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" prop="pass">
                    <el-input v-model="ruleForm.pass"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm2('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="上传文件" name="third">
            <div id="std_qingjia_muban">
                <img src="..\..\assets\img\qingjia\excel-iocn.png" style="float:left;width:100px;margin-top:10px;display:inline_block">
                <p style="width:120px;float:left;">教师文件上传</p>
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-remove="beforeRemove"
                accept=".xls,.xlsx">
                <el-button size="mini" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
                </el-upload>
            </div>
            <div id="std_qingjia_muban">
                <img src="..\..\assets\img\qingjia\excel-iocn.png" style="float:left;width:100px;margin-top:10px;display:inline_block">
                <p style="width:120px;float:left;">学生文件上传</p>
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :before-remove="beforeRemove"
                accept=".xls,.xlsx">
                <el-button size="mini" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
                </el-upload>
                </div>
        </el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
export default {
    data() {
        var checkname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        }
         else {
              callback();
            }
      };
      var checkuserName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('学工号不能为空'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var checkpass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } 
        else {
          callback();
        }
      };
      return {
          
        activeName: 'first',
        ruleForm: {
          name: '',
          userName: '',
          pass: ''
        },
        rules: {
          name: [
            { validator: checkname, trigger: 'blur' }
          ],
          userName: [
            { validator: checkuserName, trigger: 'blur' }
          ],
          pass: [
            { validator: checkpass, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
        beforeRemove(file) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
        submitForm1(formName) {           //添加教师
        this.$refs[formName].validate((valid) => {
          if (valid) {
              var params=this.ruleForm
              console.log(params)
             var Authorization=this.$store.state.user.Authorization
            $.ajax({
                    url:'http://47.95.246.40:8081/getAllUser',
                    dataType: "json",
                    data:params,
                    type : "post",
                    headers:{'Authorization':Authorization},
                    success : function(msg){
                        console.log(msg)    
                    },
                    error : function(){
                        alert('服务器错误');
                    }
                })
          } else {
            return false;
          }
        });
      },
       submitForm2(formName) {            //添加学生
        this.$refs[formName].validate((valid) => {
          if (valid) {
              var params=this.ruleForm
              console.log(params)
             var Authorization=this.$store.state.user.Authorization
            $.ajax({
                    url:'http://47.95.246.40:8081/getAllUser',
                    dataType: "json",
                    data:params,
                    type : "post",
                    headers:{'Authorization':Authorization},
                    success : function(msg){
                        console.log(msg)    
                    },
                    error : function(){
                        alert('服务器错误');
                    }
                })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted:function(){
    this.$store.commit('loginStatus',sessionStorage.getItem('isLogin'))
    if(this.$store.state.user.isLogin==0){
        this.$router.push('/login');
    }
    }
}
</script>

<style>
/* #addperson_main{
    background-color: rgba(255, 255, 255,0.9);
    margin-left: 15%;
    margin-top: 3%;
    width: 70%;
    min-width: 700px;
    text-align: left;
    padding: 20px 40px;
} */
#std_qingjia_muban{
    margin: 40px auto;
    width: 240px;
    height: 110px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .14);
}
</style>
