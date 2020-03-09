<template>
  <div class="addJC">
    <h2>课程信息添加</h2>
    <table class="addTable">
      <tr>
        <td>
          <label>课程号:</label>
        </td>
        <td><input type="text"></td>
        <td>
          <label>课程名:</label>
        </td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>
          <label>属性:</label>
        </td>
        <td><input type="text"></td>
        <td>
          <label>教材名称/版次/作者:</label>
        </td>
        <td><input type="text"></td>
      </tr>
      <tr style="display:none"> 
        <td>
          <label>版次:</label>
        </td>
        <td><input type="text"></td>
        <td>
          <label>作者:</label>
        </td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>
          <label>出版社:</label>
        </td>
        <td><input type="text"></td>
        <td>
          <label>出版年月:</label>
        </td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>
          <label>估定价:</label>
        </td>
        <td><input type="number"></td>
        <td>
          <label>ISBN号:</label>
        </td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>
          <label>规划/精品教材:</label>
        </td>
        <td><input type="text"></td>
        <td>
          <label>教师签名:</label>
        </td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>
          <label>开课单位:</label>
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
        <td>
          <label>教研室:</label>
        </td>
        <td>
          <el-select v-model="valueJYS" placeholder="选择教研室">
            <el-option v-for="item in optionsJYS" :key="item.value" :label="item.label" :value="item.value">
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
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      valueXQ: null,
      valueJYS: null,
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
      ],
      optionsJYS: [
        {
          value: "计算机科学与技术教研室",
          label: "计算机科学与技术教研室"
        },
        {
          value: "软件教研室",
          label: "软件教研室"
        },
        {
          value: "网络工程教研室",
          label: "网络工程教研室"
        },
        {
          value:"信息安全教研室",
          label: "信息安全教研室"
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

      formdata.append("tbmclassnum", input[0].value);
      formdata.append("tbmclassname", input[1].value);
      formdata.append("tbmproperty", input[2].value);
      formdata.append("tbmbookname", input[3].value);
      formdata.append("tbmedition", input[4].value);
      formdata.append("tbmauthor", input[5].value);
      formdata.append("tbmpress", input[6].value);
      formdata.append("tbmdate", input[7].value);
      formdata.append("tbmprice", input[8].value);
      formdata.append("tbmisbn", input[9].value);
      formdata.append("tbmplan", input[10].value);
      formdata.append("tbmsignature", input[11].value);
      formdata.append("tbmunit", input[12].value);
      formdata.append("tbmlab", this.valueJYS);
      formdata.append("tbmterm", this.valueXQ);
      this.$http
        .post(
          this.$store.state.url+"textbook/insertone",
          formdata,
          // qs.stringify({
          //   tbmclassnum: input[0].value,
          //   tbmclassname: input[1].value,
          //   tbmproperty: input[2].value,
          //   tbmbookname: input[3].value,
          //   tbmedition: input[4].value,
          //   tbmauthor: input[5].value,
          //   tbmpress: input[6].value,
          //   tbmdate: input[7].value,
          //   tbmprice: input[8].value,
          //   tbmisbn: input[9].value,
          //   tbmplan: input[10].value,
          //   tbmsignature: input[11].value,
          //   tbmunit: input[12].value,
          //   tbmlab: input[13].value
          // }),
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization":sessionStorage.Authorization,
            }
          }
        )
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            alert("提交成功");
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
    this.config.headers.Authorization = sessionStorage.Authorization;
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
  min-width: 800px;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
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
.addTable tr{
  height: 50px;
}
.addTable input {
  text-align: center;
  height: 1.4em;
  margin-right: 30px;
  width: 280px;
  font-size: 1.1em;
}
.addTable label{
  font-size: 0.86em;
}
.addTable .el-select{
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
h2{
  border-bottom: 2px solid #e6e6f1
}
</style>


