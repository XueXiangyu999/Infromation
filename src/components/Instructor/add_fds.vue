<template>
  <div class="addJC">
    <h2>社团信息添加</h2>
    <table class="addTable">
      <tr>
        <td>
          <label>社团名称:</label>
        </td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <td>
          <label>活动计划:</label>
        </td>
        <td><textarea  cols="30" rows="10"></textarea></td>
      </tr>
      <tr>
        <td>
          <label>预算:</label>
        </td>
        <td><input type="text"></td>
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
      return{}
  },
  methods: {
    submit() {
      let formdata = new FormData();
      let input = $(".addTable input");
      let textarea=$('textarea')
      // console.log(textarea)
      // console.log(input);
      // console.log(input[0].value);
      // console.log(input[1].value)
      // console.log(textarea[0].value)
      formdata.append("cname", input[0].value);
      formdata.append("cbudget", input[1].value);
      formdata.append("cplan", textarea[0].value);
      this.$http
        .post(
          this.$store.state.url+"insertone",
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data"
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
     $(".addJC").css("height", document.body.clientHeight - 50 + "px");
  }
  
};
</script>
<style scoped>
/* .addJC {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 70%;
  border-radius: 10px;
  float: right;
  margin-left: 80px;
  min-width: 400px;
  min-height: 400px;
  margin-right: 80px;
  margin-top: 100px;
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
.addTable input {
  height: 1.4em;
  margin-right: 30px;
  font-size: 1.1em;
  width: 220px;
}
.addTable .el-select{
  margin-right: 30px;
 width: 220px;
  font-size: 1.1em;
}
.addTable textarea{
  display: block;  
  width:220px;
  height: 120px;
  font-size: 1.4em
}
.el-button {
  margin: 30px;
  width: 150px;
}
</style>