<template>
  <div class="addJC">
    <h2>{{clubName}}</h2>
    <div id="WangEditor"></div>
    <table class="addTable">
      <tr>
        <td>
          <label>预算:</label>
        </td>
        <td>
          <input type="text">
        </td>
        <td>
          <label>学期:</label>
        </td>
        <td>
          <input type="text">
        </td>
      </tr>
    </table>
    <el-button type="success" @click="submit">提交/修改信息</el-button>
    <el-button type="danger" @click="cancel">取消</el-button>
    <div class="clone"></div>
  </div>
</template>
<script>
import store from "@/vuex/store";
import Myhtml from "@/components/common/Myhtml";
import qs from "qs";
import WangEditor from "wangeditor"
export default {
  store,
  components:{
    Myhtml,
  },
  data() {
    return {
      clubName: "Dre@mtech",
      editor:null,
    };
  },
  methods: {
    submit() {
      let formdata = new FormData();
      let input = $(".addTable input");
      let textarea = $("textarea");
      formdata.append("cname", this.clubName);
      formdata.append("cbudget", input[0].value);
      formdata.append("cplan", textarea[0].value);
      formdata.append("cterm", input[1].value);
      console.log(this.$route.query.text);
      if (this.$route.query.text != 0) {
        formdata.append("cid", this.$route.query.text);
        this.$http
          .post(this.$store.state.url + "/club/updateone", formdata, {
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
      } else {
        this.$http
          .post(this.$store.state.url + "/club/insertone", formdata, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              alert("提交成功");
            }
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    cancel() {
      // this.$router.go(-1);
      $(".clone").eq(0).html(this.editor.txt.html())
    }
  },
  mounted() {
    // let that = this;
    this.editor = new WangEditor("#WangEditor"); //这个地方传入div元素的id 需要加#号
    // 配置 onchange 事件
    this.editor.change = function() {
      // 这里是change 不是官方文档中的 onchange
      // 编辑区域内容变化时，实时打印出当前内容
      console.log(this.txt.html());
    };
    this.editor.create(); // 生成编辑器
    this.editor.txt.html("<p>输入内容...</p>"); //注意：这个地方是txt  不是官方文档中的$txt

    if (this.$route.query.params) {
      console.log("success");
    } else {
      console.log("false");
    }
    this.$http
      .get(this.$store.state.url + "/club/findbynum", {
        params: {
          cpnum: "201701001123",
          cpid: this.$route.query.text
        }
      })
      .then(res => {
        console.log(res.data[0]);
        this.clubName = res.headers.clubname;
        if (this.$route.query.text) {
          let input = $(".addTable input");
          let textarea = $("textarea");
          input[0].value = res.data[0].cbudget;
          input[1].value = res.data[0].cterm;
          textarea[0].value = res.data[0].cplan;
        } else {
          console.log("false");
        }
      })
      .catch(res => {
        console.log(res);
      });
  }
};
</script>
<style scoped>
/* .addJC {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 78%;
  min-width: 800px;
  border-radius: 10px;
  float: left;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
} */
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
  width: 320px;
  font-size: 1.1em;
}
.addTable label {
  font-size: 0.86em;
}
.el-button {
  margin: 30px;
  width: 150px;
}
.addTable textarea {
  display: block;
  width: 720px;
  height: 280px;
  font-size: 1.4em;
}
h2 {
  border-bottom: 2px solid #e6e6f1;
}
#WangEditor{
  width: 100%;
  height: 400px;
  text-align: left
}
</style>