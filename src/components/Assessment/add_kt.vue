<template>
    <div class="addJC">
        <h2>课堂评价信息添加</h2>
        <table class="addTable">
            <tr>
                <td>
                    <label>系:</label>
                </td>
                <td><input type="text"></td>
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
            <tr>
                <td>
                    <label>老师:</label>
                </td>
                <td>
                    <el-select v-model="valueLS" placeholder="选择老师">
                        <el-option v-for="item in optionsLS" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </td>
                <td>
                    <label>课程:</label>
                </td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>
                    <label>评价结果:</label>
                </td>
                <td><input type="text"></td>
                <td>
                    <label>所属学期:</label>
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
export default {
  data() {
    return {
      valueXQ: null,
      valueLS: null,
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
      ],
      optionsLS: [
        {
          value: "小明",
          label: "小明"
        },
        {
          value: "小刘",
          label: "小刘"
        },
        {
          value: "小李",
          label: "小李"
        },
        {
          value: "小郑",
          label: "小郑"
        },
      ]
    };
  },
  methods: {
    submit() {
      let formdata = new FormData();
      let input = $(".addTable input");
      formdata.append("cefaculty", input[0].value);
      formdata.append("ceclass", input[3].value);
      formdata.append("ceresult", input[4].value);
      formdata.append("celab", this.valueJYS);
      formdata.append("ceinstructor", this.valueLS);
      formdata.append("ceterm", this.valueXQ);
      this.$http
        .post(this.$store.state.url+"/evaluation/insertone", formdata, {
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