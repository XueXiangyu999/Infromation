<template>
  <div class="addYYS">
    <h2>{{title}}</h2>
    <h4 class="title">会议室信息</h4>
    <table class="addTable">
      <tr>
        <td>
          <label>会议室名称:</label>
        </td>
        <td><input type="text"></td>
        <td>
          <label>会议室地点:</label>
        </td>
        <td><input type="text"></td>
      </tr>
      <tr>
        <label>会议室容量:</label>
        </td>
        <td><input type="number"></td>
      </tr>
      <tr>
        <td>
          <label>实验室守则:</label>
        </td>
        <td class="father">
          <textarea cols="30" rows="10"></textarea>
        </td>
      </tr>
    </table>
    <el-button type="success" @click="submit">提交信息</el-button>
    <el-button type="danger" @click="cancel">返回</el-button>

  </div>

</template>
<script>
import store from "@/vuex/store";
export default {
  store,
  data() {
    return {
      title: "新建会议室",
      sid: null,
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/json"
        }
      }
    };
  },
  methods: {
    submit() {
      let formdata = new FormData();
      let input = $(".addTable input");
      let textarea = $("textarea");
      if (this.$route.query.text == null) {
        this.$http
          .post(
            this.$store.state.url + "appointment/manager/room",
            JSON.stringify({
              name: input[0].value,
              number: input[2].value,
              place: input[1].value,
              rule: textarea[0].value
            }),
            this.config
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
      } else {
        this.$http
          .put(
            this.$store.state.url + "appointment/manager/room",
            JSON.stringify({
              name: input[0].value,
              number: input[2].value,
              place: input[1].value,
              rule: textarea[0].value
            }),
            this.config
          )
          .then(res => {
            console.log(res);
            if (res.status == 200 || res.data.code == 1) {
              alert("提交成功");
            }
          })
          .catch(res => {
            console.log(res);
          });
      }
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.config.headers.Authorization = sessionStorage.Authorization;

    console.log(this.$route.query.text);
    if (this.$route.query.text != null) {
      console.log(this.$route.query.text);
      let object = this.$route.query.text;
      let textarea = $("textarea");
      let input = $(".addTable input");
      input[0].value = object.name;
      input[1].value = object.place;
      // input[2].value = object.equip_name;
      // input[3].value = object.equip_num;
      input[2].value = object.number;
      this.sid = object.id;
      textarea[0].value = object.rule;
    } else {
      this.sid = 7;
    }
    $(".addYYS").css("height", document.body.clientHeight - 50 + "px");
  }
};
</script>
<style scoped>
/* .addYYS {
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
.addYYS {
  background-color: white;
  width: 87%;
  float: right;
  margin: 0;
  border: 0;
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
  line-height: 50px;
}
.addTable .el-select {
  height: 1.4em;
  margin-right: 30px;
  width: 290px;
  font-size: 1.1em;
  display: block;
}
.el-button {
  margin: 50px;
  width: 150px;
}
h2 {
  border-bottom: 2px solid #e6e6f1;
}
.father {
  position: relative;
}
.addTable textarea {
  display: block;
  position: absolute;
  width: 520px;
  height: 80px;
  top: 0px;
  font-size: 1.4em;
}
.title {
  background-color: #e2e2e2;
  padding: 10px;
  text-align: left;
}
</style>