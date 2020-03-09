<template>
  <div class="xuefen">
    <h2>学分文件上传</h2>
    <i style="color:red">请注意上传excel的格式必须与规定的excel的格式相同</i>
    <form name="fileinfo" class="XF_form" enctype="multipart/form-data" v-loading="loading">
      <h4 class="title">上传模板</h4>
      <label>计科:</label>
      <!-- <input type="file" name="file" accept=".xls,.xlsx"  style="display: none;"/> -->
      <!-- <input type="submit" value="提交" @click="Update" /> -->
      <input type='file' name='file1' style="display: none;" onchange="ye1.value=value" accept=".xls,.xlsx" id="ifile1">
      <input name='ye1' class="ye" onclick=file1.click()>
      <label>最低选修学分:</label>
      <input type="number" class="minxf" v-model="value1">
      <br>
      <br>
      <label>信安:</label>
      <input type='file' name='file2' style="display: none;" onchange="ye2.value=value" accept=".xls,.xlsx" id="ifile2">
      <input name='ye2' class="ye" onclick=file2.click()> 
      <label>最低选修学分:</label>
      <input type="number" class="minxf" v-model="value2">
      <br>
      <br>
      <label>软工:</label>
      <!-- <input type="file" name="file" accept=".xls,.xlsx"  style="display: none;"/> -->
      <!-- <input type="submit" value="提交" @click="Update" /> -->
      <input type='file' name='file3' style="display: none;" onchange="ye3.value=value" accept=".xls,.xlsx" id="ifile3">
      <input name='ye3' class="ye" onclick=file3.click()>
      <label>最低选修学分:</label>
      <input type="number" class="minxf" v-model="value3">
      <br>
      <br>
      <label>网络:</label>
      <!-- <input type="file" name="file" accept=".xls,.xlsx"  style="display: none;"/> -->
      <!-- <input type="submit" value="提交" @click="Update" /> -->
      <input type='file' name='file4' style="display: none;" onchange="ye4.value=value" accept=".xls,.xlsx" id="ifile4">
      <input name='ye4' class="ye" onclick=file4.click()>
      <label>最低选修学分:</label>
      <input type="number" class="minxf" v-model="value4">
      <br>
      <br>
      <br>
      <h4 class="title">上传目标文件</h4>
      <label>文件:</label>
      <!-- <input type="file" name="file" accept=".xls,.xlsx"  style="display: none;"/> -->
      <!-- <input type="submit" value="提交" @click="Update" /> -->
      <input type='file' name='file' style="display: none;" onchange="ye.value=value" accept=".xls,.xlsx" id="ifile">
      <input name='ye' class="ye" onclick=file.click()>
      <br>
      <!-- <input type='button' value="选择文件" onclick=file.click() style="border: 1px solid green;"> -->
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
  name: "xuefen",
  data() {
    return {
      loading: false,
      options1: [
        {
          value: "1-1",
          label: "2019"
        },
        {
          value: "1-2",
          label: "2018"
        },
        {
          value: "1-3",
          label: "2017"
        },
        {
          value: "1-4",
          label: "2016"
        }
      ],
      options2: [
        {
          value: "2-1",
          label: "计算机科学与技术"
        },
        {
          value: "2-2",
          label: "网络工程"
        },
        {
          value: "2-3",
          label: "信息安全"
        },
        {
          value: "2-4",
          label: "软件工程"
        },
        {
          value: "2-5",
          label: "人工智能实验班"
        }
      ],
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    };
  },
  mounted() {},
  methods: {
    updata() {
      var formData = new FormData();
      // console.log(this.value1);
      // console.log($("#ifile1"));
      // console.log(formData);
      formData.append("files", $("#ifile")[0].files[0]);
      formData.append("files", $("#ifile1")[0].files[0]);
      formData.append("files", $("#ifile2")[0].files[0]);
      formData.append("files", $("#ifile3")[0].files[0]);
      formData.append("files", $("#ifile4")[0].files[0]);
      formData.append("value1", this.value1);
      formData.append("value2", this.value2);
      formData.append("value3", this.value3);
      formData.append("value4", this.value4);

      // console.log($("#ifile1")[0].files[0]);
      // console.log(formData);
      // console.log(formData.get("moban1"));
      this.loading = true;
      var _this = this;

      // formData.append("nianji", this.value1);
      // formData.append("zhuanye", this.value2);
      // console.log($("#ifile")[0].files[0]);
      // console.log($(".XF_form"));

      // console.log(formData);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: sessionStorage.Authorization
          // responseType:"blob"
        }
      }; //添加请求头
      this.$http
        .post(this.$store.state.url + "gradverify/upload", formData, config)
        .then(response => {
          console.log("111");
          console.log(response);
          this.loading = false;
          // const data = response.data;
          var a = document.createElement("a");
          console.log(a)
          // const blob = new Blob([data]); 
          // const blobUrl = window.URL.createObjectURL(blob);
          a.style.display = "none";
          a.download = "results.xls";
          a.href = this.$store.state.url + "gradverify/download";
          a.click();
        })
        .catch(error => {});

      //   var xmlhttp;
      //   if (window.XMLHttpRequest) {
      //     // code for IE7+, Firefox, Chrome, Opera, Safari
      //     xmlhttp = new XMLHttpRequest();
      //   } else {
      //     // code for IE6, IE5
      //     xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      //   }
      //   xmlhttp.onreadystatechange = function() {
      //     if (xmlhttp.readyState == 0) {
      //       console.log(0);
      //       console.log(xmlhttp.status);
      //     }
      //     if (xmlhttp.readyState == 1) {
      //       console.log(1);
      //       console.log(xmlhttp.status);
      //     }
      //     if (xmlhttp.readyState == 2) {
      //       console.log(2);
      //       console.log(xmlhttp.status);
      //     }
      //     if (xmlhttp.readyState == 3) {
      //       console.log(xmlhttp.status);
      //     }
      //     if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      //       alert("上传成功");
      //       _this.loading = false;
      //       xmlhttp.onload = function() {
      //         const data = xmlhttp.response;
      //         const a = document.createElement("a");
      //         const blob = new Blob([data]);
      //         const blobUrl = window.URL.createObjectURL(blob);
      //         a.style.display = "none";
      //         a.download = "results.xls";
      //         a.href = blobUrl;
      //         a.click();
      //       };

      //       console.log(xmlhttp.status);
      //       console.log("success");
      //     }
      //   };
      //   // xmlhttp.open("post", "http://192.168.199.117:8080/upload", true);
      //   xmlhttp.open("post", this.$store.state.url +"gradverify/upload", true);
      //   xmlhttp.responseType = "blob";
      //   // xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      //   xmlhttp.setRequestHeader("Authorization",sessionStorage.Authorization)
      //   xmlhttp.setRequestHeader("Content-Type", "multipart/form-data");

      //   xmlhttp.send(formData);
      // }
    }
  }
};
</script>
<style scoped>
/* .xuefen {
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
.xuefen {
  background-color: white;
  width: 87%;
  float: right;
  margin: 0;
  border: 0;
}
.XF_select {
  margin-left: 20px;
}
.XF_form {
  display: block;
}
label {
  font-size: 0.9em;
}
.ye {
  width: 321.4px;
  margin-left: 20px;
  color: green;
  border: 1px solid green;
  height: 30px;
  margin-right: 50px;
}
.minxf {
  height: 30px;
  width: 60px;
  margin-left: 20px;
  border: 1px solid green;
  border-radius: 5px;
  text-align: center;
}
.el-button {
  margin-top: 20px;
  width: 100px;
  margin-bottom: 20px;
}
.title {
  background-color: #e2e2e2;
  padding: 10px;
  text-align: left;
}
</style>
 