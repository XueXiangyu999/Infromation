<template>
    <div class="addJC">
        <h2>课程信息添加</h2>
        <table class="addTable">
            <tr>
                <td>
                    <label>系别:</label>
                </td>
                <td><input type="text"></td>
                <td>
                    <label>课程号:</label>
                </td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>
                    <label>课程名:</label>
                </td>
                <td><input type="text"></td>
                <td>
                    <label>课程属性:</label>
                </td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>
                    <label>教材名称/版次/作者:</label>
                </td>
                <td><input type="text"></td>
                <td style="display:none">
                    <label>版次:</label>
                </td>
                <td style="display:none"><input type="text"></td>
            <!-- </tr> -->
            <!-- <tr> -->
                <td style="display:none">
                    <label>作者:</label>
                </td>
                <td style="display:none"><input type="text"></td>
                <td>
                    <label>出版社:</label>
                </td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>
                    <label>出版年月:</label>
                </td>
                <td><input type="text"></td>
                <td>
                    <label>估定价:</label>
                </td>
                <td><input type="number"></td>
            </tr>
            <tr>
                <td>
                    <label>ISBN号:</label>
                </td>
                <td><input type="text"></td>
                <td>
                    <label>规划/精品教材:</label>
                </td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>
                    <label>主讲教师:</label>
                </td>
                <td><input type="text"></td>
                <td>
                    <label>教师用书数量:</label>
                </td>
                <td><input type="number"></td>
            </tr>
            <tr>
                <td>
                    <label>班级信息:</label>
                </td>
                <td><input type="text"></td>
                <td>
                    <label>备注:</label>
                </td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>
                    <label>学期:</label>
                </td>
                <td>
                    <el-select v-model="valueXQ" placeholder="选择学期">
                        <el-option v-for="item in optionsXQ" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </td>
            </tr>
        </table>
        <el-button type="success" @click="submit">提交信息</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>

    </div>

</template>
<script>
import store from "@/vuex/store";
import qs from "qs";
export default {
  store,
  data() {
    return {
      valueXQ: null,
      optionsXQ: [
        {
          value: "2016-1",
          label: "2016 春"
        },
        {
          value: "2016-2",
          label: "2016 秋"
        },
        {
          value: "2017-1",
          label: "2017 春"
        },
        {
          value: "2017-2",
          label: "2017 秋"
        },
        {
          value: "2018-1",
          label: "2018 春"
        },
        {
          value: "2018-2",
          label: "2018 秋"
        },
        {
          value: "2019-1",
          label: "2019 春"
        },
        {
          value: "2019-2",
          label: "2019 秋"
        }
      ]
    };
  },
  methods: {
    submit() {
      let formdata = new FormData();
      let input = $(".addTable input");
      console.log(input);
      console.log(input[0].value);
      formdata.append("tbcfaculty", input[0].value);
      formdata.append("tbcclassnum", input[1].value);
      formdata.append("tbcclassname", input[2].value);
      formdata.append("tbcproperty", input[3].value);
      formdata.append("tbcname", input[4].value);
      formdata.append("tbcedition", input[5].value);
      formdata.append("tbcauthor", input[6].value);
      formdata.append("tbcpress", input[7].value);
      formdata.append("tbcdate", input[8].value);
      formdata.append("tbcprice", input[9].value);
      formdata.append("tbcisbn", input[10].value);
      formdata.append("tbcplan", input[11].value);
      formdata.append("tbcinstructor", input[12].value);
      formdata.append("tbcamount", input[13].value);
      formdata.append("tbcclassinfo", input[14].value);
      formdata.append("tbccomment", input[15].value);
      formdata.append("tbcterm", this.valueXQ);
      this.$http
        .post(this.$store.state.url+"/textbook/cinsertone", formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
          if(res.status==200){
              alert("添加成功")
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    cancel() {
      this.$router.go(-1)
    }
  },
  mounted(){
     $(".addJC").css("height", document.body.clientHeight - 50 + "px");
  }
};
</script>
<style scoped>
/* .addJC {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 78%;
  border-radius: 10px;
  float: left;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
  min-width: 800px;
} */
.addJC {
  background-color: white;
  width: 87%;
  float: right;
  margin: 0;
  border:0;
}
.addTable {
  margin: 0 auto;
  font-size: 1.2em;
}
.addTable tr {
  height: 50px;
}
.addTable input {
  text-align: center;
  height: 1.4em;
  margin-right: 30px;
  width: 280px;
  font-size: 1.1em;
}
.addTable label {
  font-size: 0.86em;
}
.addTable .el-select {
  height: 1.4em;
  margin-right: 30px;
  width: 290px;
  font-size: 1.1em;
  display: block;
}
.el-button {
  margin: 30px;
  width: 150px;
}
h2 {
  border-bottom: 2px solid #e6e6f1;
}
</style>


