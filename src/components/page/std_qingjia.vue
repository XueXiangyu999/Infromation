<template>
  <div id="std_qingjia_main">
    <div id="std_qingjia_fenye">
      <el-tabs v-model="activeName">
        <el-tab-pane label="大假期请假" name="first">
          <div class="left_right" style="float:left">
            <p>请假填写模板：</p>
            <div id="std_qingjia_muban">
              <img src="..\..\assets\img\qingjia\excel-iocn.png" style="float:left;width:100px;margin-top:10px;display:inline_block">
              <p style="width:120px;float:left;">2019国庆请假文件模板</p>
              <el-button type="primary" size="mini" style="float:right;margin-right:25px">下载
                <i class="el-icon-download el-icon--right"></i>
              </el-button>
            </div>
          </div>
          <div style="float:right">
            <p>请假文件上传：</p>
            <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" style="width:100%">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
            </el-upload>
          </div>
        </el-tab-pane>
        <el-tab-pane label="单独请假" name="second">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="请假理由">
              <el-input type="textarea" v-model="form.liyou"></el-input>
            </el-form-item>
            <el-form-item label="离校日期">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="返校时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button @click="dele">删除</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="班长审核" name="third">
          <el-table :data="tableData" style="margin:0 auto" max-height="400px">
            <el-table-column align="center" fixed prop="date" label="提交日期" width="150">
            </el-table-column>
            <el-table-column align="center" prop="name" label="提交学生" width="150">
            </el-table-column>
            </el-table-column>
            <el-table-column align="center" prop="shenhe" label="审核状态" width="150">
            </el-table-column>
            <el-table-column align="center" label="查看" width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small">
                  <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                  下载
                </el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="审核" width="150">
              <template slot-scope="scope">
                <el-button size="small">
                  <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                  审核通过
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      form: {
        liyou: "",
        date1: "",
        date2: ""
      },
      tableData: [
        {
          date: "",
          name: "",
          shenhe: ""
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      var Authorization = this.$store.state.user.Authorization;
      console.log(this.form);
      $.ajax({
        url: "http://47.95.246.40:8081/uploadTemplate",
        data: this.form,
        dataType: "json",
        type: "post",
        processData: false,
        contentType: false,
        headers: { Authorization: Authorization },
        success: function(msg) {
          console.log(msg);
          alert("提交成功");
        },
        error: function() {
          alert("服务器错误");
        }
      });
    },
    dele() {
      (this.form.liyou = ""), (this.form.date1 = ""), (this.form.date2 = "");
    }
  },
  mounted: function() {
    this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    if (this.$store.state.user.isLogin == 0) {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
/* #std_qingjia_main {
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 78%;
  border-radius: 10px;
  float: left;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
} */
#std_qingjia_fenye {
  width: 90%;
  margin: 40px auto;
}
#std_qingjia_muban {
  width: 240px;
  height: 120px;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.22), 0 0 6px rgba(0, 0, 0, 0.14);
}
.left_right {
  width: 50%;
  height: 200px;
}
</style>
