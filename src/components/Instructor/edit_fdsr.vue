<template>
    <div class="editFDB">
        <h2>社团人事信息添加</h2>
        <table class="addTable">
            <tr>
                <td>
                    <label>社团名称:</label>
                </td>
                <td><input type="text"></td>
                <td><label>负责人:</label></td>
                <td><input type="text"></td>
            </tr>
            <tr>
                <td>
                    <label>负责人学号:</label>
                </td>
                <td><input type="text"></td>
                 <td>
                    <label>社团描述:</label>
                </td>
                <td><input type="text"></td>
            </tr>
        </table>
        <el-button type="success" @click='updata'>提交信息</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>

    </div>

</template>
<script>
import store from "@/vuex/store";
export default {
  store,
      methods: {
    updata() {
      let formdata = new FormData();
      let input = $(".addTable input");
      console.log(input);
      console.log(input[0].value);
      console.log(this.$route.query.text.cpid)
      formdata.append("cpid", this.$route.query.text.cpid);
      formdata.append("cpclub", input[0].value);
      formdata.append("cpname", input[1].value);
      formdata.append("cpnum", input[2].value);
      this.$http
        .post(this.$store.state.url+"updateprincipal", formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
          if(res.status==200){
              alert("修改成功")
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
    mounted() {
    let object = this.$route.query.text;
    console.log(object)
    let input = $(".addTable input");
    input[0].value = object.name;
    input[1].value = object.cpname;
    input[2].value = object.cpnum;
    input[3].value = object.description;

  $(".editFDB").css("height", document.body.clientHeight - 50 + "px");
  }
};
</script>
<style scoped>
/* .editFDB {
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
.editFDB {
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