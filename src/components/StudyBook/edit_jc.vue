<template>
  <div class="editJC">
    <h2>课程信息修改</h2>
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
    <el-button type="success" @click='updata'>提交信息</el-button>
    <el-button type="danger" @click='cancel'>取消</el-button>

  </div>

</template>
<script>
import store from "@/vuex/store";
export default {
  store,
  data() {
    return {
      tabledata: null,
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
          value: "软件工程教研室",
          label: "软件工程教研室"
        },
        {
          value: "网络工程教研室",
          label: "网络工程教研室"
        },
        {
          value: "信息安全教研室",
          label: "信息安全教研室"
        }
      ]
    };
  },
  methods: {
    updata() {
      let formdata = new FormData();
      let input = $(".addTable input");
      console.log(input);
      console.log(input[0].value);
      console.log(this.$route.query.text);
      formdata.append("tbmid", this.$route.query.text);
      formdata.append("tbmclassnum", input[0].value);
      formdata.append("tbmclassname", input[1].value);
      formdata.append("tbmproperty", input[2].value);
      formdata.append("tbmbookname", input[3].value);
      // formdata.append("tbmedition", input[4].value);
      // formdata.append("tbmauthor", input[5].value);
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
        .post(this.$store.state.url + "textbook/updateone", formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            alert("修改成功");
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  mounted() {
    // console.log(this.$route.query.text);
    this.$http
      .get(this.$store.state.url + "/textbook/edit", {
        params: {
          id: this.$route.query.text
        }
      })
      .then(res => {
        console.log(res.data);
        let object = res.data[0];
        let input = $(".addTable input");
        console.log(object)
        input[0].value = object.tbmclassnum;
        input[1].value = object.tbmclassname;
        input[2].value = object.tbmproperty;
        input[3].value = object.tbmbookname;
        input[4].value = object.tbmedition;
        input[5].value = object.tbmauthor;
        input[6].value = object.tbmpress;
        input[7].value = object.tbmdate;
        input[8].value = object.tbmprice;
        input[9].value = object.tbmisbn;
        input[10].value = object.tbmplan;
        input[11].value = object.tbmsignature;
        input[12].value = object.tbmunit;
        this.valueJYS = object.tbmlab;
        this.valueXQ = object.tbmterm;
      })
      .catch(res => {
        console.log(res);
      });
      $(".editJC").css("height", document.body.clientHeight - 50 + "px");
  }
};
</script>
<style scoped>
/* .editJC {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px #0000001a;
  width: 78%;
  border-radius: 10px;
  float: left;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
  min-width: 800px;
} */
.editJC {
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