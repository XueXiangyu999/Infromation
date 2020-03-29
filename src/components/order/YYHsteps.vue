<template>
  <div class="Steps">
    <el-steps :active="active" finish-status="success" class="step">
      <el-step title="选择会议室"></el-step>
      <el-step title="提交申请"></el-step>
      <el-step title="等待审核"></el-step>
    </el-steps>
    <div v-if="active==0">
      <h2>选择你要预约的会议室</h2>
      <el-select v-model="labChoice" placeholder="选择会议室" class="labChoice">
        <el-option v-for="(term,index) in labsName" :key="index" :value="index" :label="term"></el-option>
      </el-select>
      <el-button @click="next()">下一步</el-button>
    </div>
    <div v-if="active==1">
      <h2>请填写您的预约信息</h2>
      <table class="yuyueText">
        <tr>
          <td>预约人数:</td>
          <td>
            <el-input v-model="number" type="number" placeholder="请输入内容"></el-input>
          </td>
          <td>预约时间:</td>
          <td>
            <el-date-picker v-model="date" type="datetime" value-format='yyyy-MM-dd HH:mm' format="yyyy-MM-dd HH:mm" placeholder="选择预约时间">
            </el-date-picker>
          </td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>备注:</td>
          <td>
            <el-input style="width:300%" type="textarea" :rows="4" placeholder="请输入内容" v-model="note">
            </el-input>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <el-button type="success" style="float:left;margin:10px 20px 30px 40px" @click="next">立即提交</el-button>
      <!-- <el-button type="" style="float:left;margin-top:10px" @click="reset">重置</el-button> -->
    </div>
    <div v-if="active==2">
      <p style="margin-top:30px;color:red;font-size:1.5em">您的预约已成功提交,请等侯管理员处理</p> 
    </div>
  </div>

</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      number: null,
      date: null,
      note: null,
      active: 0,
      details: {
        name: "235453423",
        className: "计科1507",
        personNum: "45",
        teacher: "林建",
        free_num: "159",
        all_equip: "200"
      },
      equits: ["软件工程、测试"],
      Experiments: ["设计研究性"],
      title: {
        time: "2019--2020",
        term: "二",
        lab: "软件会议室"
      },
      TBth: [
        {
          text: "课时",
          width: ""
        },
        {
          text: "周一",
          width: ""
        },
        {
          text: "周二",
          width: ""
        },
        {
          text: "周三",
          width: ""
        },
        {
          text: "周四",
          width: ""
        },
        {
          text: "周五",
          width: ""
        },
        {
          text: "周六",
          width: ""
        }
      ],
      TBtr: [
        [
          {
            text: "第一大节"
          },
          {
            text: "",
            color: "",
            type: 0,
            name: "",
            className: "计科1507",
            teacher: "林建",
            personNum: "45",
            free_num: "159",
            all_equip: "200"
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          }
        ],
        [
          {
            text: "第二大节"
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          }
        ],
        [
          {
            text: "第三大节"
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          }
        ],
        [
          {
            text: "第四大节"
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          }
        ],
        [
          {
            text: "第五大节"
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 0
          }
        ]
      ],
      Toptions: [],
      weeks: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21
      ],
      Select_week: 1,
      labs: [],
      labsName: [],
      labChoice: null,
      timeChoice: null,
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/json"
        }
      }
    };
  },

  methods: {
    setcolor() {
      for (let i = 0; i < 5; i++) {
        for (let j = 1; j < 7; j++) {
          let num = i * 7 + j;
          let choice = i + 1 + "" + j;
          $(".KBmain")
            .eq(num)
            .unbind("mouseover");
          $(".KBmain")
            .eq(num)
            .unbind("mouseout");
          switch (this.TBtr[i][j].type) {
            case 0:
              this.TBtr[i][j].text = "可预约";
              var _this = this;
              $(".KBmain")
                .eq(num)
                .css("color", "#94ef84");
              $(".KBmain")
                .eq(num)
                .click(choice, function(event) {
                  console.log(event);
                  _this.timeChoice = event.data;
                });
              $(".KBmain")
                .eq(num)
                .click(this.next);

              break;
            case 1:
              this.TBtr[i][j].text = "已有通过预约，未满";
              $(".KBmain")
                .eq(num)
                .css({ "background-color": "#dddddd", color: "#ff8037" });
              $(".KBmain")
                .eq(num)
                .click(choice, function(event) {
                  console.log(event);
                  _this.timeChoice = event.data;
                });
              $(".KBmain")
                .eq(num)
                .click(this.next);
              break;
            case 2:
              this.TBtr[i][j].text = "不可预约或未满";
              $(".KBmain")
                .eq(num)
                .css({ "background-color": "#d2d2d2", color: "red" });
              break;
          }

          if (this.TBtr[i][j].type != 0) {
            $(".KBmain")
              .eq(num)
              .mouseover(function() {
                this.details = this.TBtr[i][j];
                $(".YYdetails").css("display", "block");
                $(".KBmain")
                  .eq(num)
                  .append($(".YYdetails").eq(0));
              });
            $(".KBmain")
              .eq(num)
              .mouseout(function() {
                // $('.KBmain').eq(num).remove($('.YYdetails').eq(0))
                $(".YYdetails").css("display", "none");
              });
          }
        }
      }
      console.log(this.TBtr);
    },
    reset() {
      this.input[0] = null;
      this.input[7] = null;
      this.input[2] = null;
      this.input[3] = null;
      this.input[6] = null;
      this.input[8] = null;
    },
    next() {
      console.log(this.timeChoice);
      if (this.active == 0 && this.labChoice === null) {
        alert("请选择你要预约的会议室");
        return;
      }
      if (this.active == 0) {
        this.title.lab = this.labs[this.labChoice].name;
        console.log(this.title);
      }
      if (this.active == 1) {
        let myDate = new Date();
        console.log(this.date);
        if (this.number != null && this.note != null && this.date != null) {
          if (this.$route.query.room_id == null) {
            this.$http
              .post(
                this.$store.state.url + "appointment/room",
                // JSON.stringify({
                JSON.stringify({
                  book_time: this.date,
                  //   book_time: "string",
                  // id: "12",
                  number: Number(this.number),
                  status: 0,
                  remark: this.note,
                  room_id: this.labs[this.labChoice].id,
                  room_name: this.labs[this.labChoice].name,
                  //   status: 0,
                  // teacher_id: "00182",
                  time:
                    myDate.getFullYear().toString() +
                    "-" +
                    (myDate.getMonth() + 1).toString() +
                    "-" +
                    myDate.getDate().toString()
                }),
                this.config
              )
              .then(res => {
                console.log(res);
                if (res.data.code == 0) {
                  alert(res.data.msg);
                  return;
                }
              })
              .catch(res => {
                console.log(res);
                return;
              });
          } else {
            this.$http
              .put(
                this.$store.state.url + "appointment/room",
                // JSON.stringify({
                JSON.stringify({
                  book_time: this.date,
                  //   book_time: "string",
                  // id: "12",
                  number: Number(this.number),
                  status: 0,
                  remark: this.note,
                  room_id: this.labs[this.labChoice].id,
                  room_name: this.labs[this.labChoice].name,
                  //   status: 0,
                  // teacher_id: "00182",
                  time:
                    myDate.getFullYear().toString() +
                    "-" +
                    (myDate.getMonth() + 1).toString() +
                    "-" +
                    myDate.getDate().toString()
                }),
               this.config
              )
              .then(res => {
                console.log(res);
                if (res.data.code == 0) {
                  alert(res.data.msg);
                  return;
                }
              })
              .catch(res => {
                console.log(res);
                return;
              });
          }
        } else {
          alert("请填写完整的预约信息");
          return;
        }
      }
      if (this.active++ > 2) this.active = 0;
    },
    GetBooksByWeek(week) {
      console.log(week);
      this.$http
        .get(this.$store.state.url + "appointment/book/common/" + week,this.config)
        .then(res => {
          console.log(res.data);
          for (let i = 0; i < 5; i++) {
            for (let j = 1; j < 7; j++) {
              this.TBtr[i][j] = {
                text: "",
                color: "",
                type: 0,
                name: "",
                className: "",
                // teacher: "",
                personNum: 0,
                free_num: this.labs[this.labChoice].stu_num,
                all_equip: this.labs[this.labChoice].equip_num
              };
            }
          }
          for (let i = 0; i < res.data.length; i++) {
            let numX = res.data[i].book_time.slice(0, 1) - 1;
            let numY = res.data[i].book_time.slice(1);
            console.log(numX);
            console.log(numY);
            this.TBtr[numX][numY].type = 1;
            this.TBtr[numX][numY].free_num =
              this.TBtr[numX][numY].free_num - res.data[i].stu_num;
            this.TBtr[numX][numY].personNum = res.data[i].stu_num;
            this.TBtr[numX][numY].name = res.data[i].course_name;
          }

          var _this = this;

          // console.log(this.TBtr);
          // this.setcolor();
          for (let i = 0; i < 5; i++) {
            for (let j = 1; j < 7; j++) {
              let num = i * 7 + j;
              let choice = i + 1 + "" + j;
              $(".KBmain")
                .eq(num)
                .unbind("mouseover");
              $(".KBmain")
                .eq(num)
                .unbind("mouseout");
              $(".KBmain")
                .eq(num)
                .unbind("click");
              switch (this.TBtr[i][j].type) {
                case 0:
                  this.TBtr[i][j].text = "可预约";

                  $(".KBmain")
                    .eq(num)
                    .css({ "background-color": "white", color: "#94ef84" });
                  $(".KBmain")
                    .eq(num)
                    .click(choice, function(event) {
                      console.log(event);
                      _this.timeChoice = event.data;
                    });
                  $(".KBmain")
                    .eq(num)
                    .click(this.next);

                  break;
                case 1:
                  this.TBtr[i][j].text = "已有通过预约，未满";
                  $(".KBmain")
                    .eq(num)
                    .css({ "background-color": "#dddddd", color: "#ff8037" });
                  $(".KBmain")
                    .eq(num)
                    .click(choice, function(event) {
                      console.log(event);
                      _this.timeChoice = event.data;
                    });
                  $(".KBmain")
                    .eq(num)
                    .click(this.next);
                  break;
                case 2:
                  this.TBtr[i][j].text = "不可预约或已满";
                  $(".KBmain")
                    .eq(num)
                    .css({ "background-color": "#d2d2d2", color: "red" });
                  break;
              }
              if (this.TBtr[i][j].type != 0) {
                $(".KBmain")
                  .eq(num)
                  .mouseover(function() {
                    _this.details = _this.TBtr[i][j];
                    $(".YYdetails").css("display", "block");
                    $(".KBmain")
                      .eq(num)
                      .append($(".YYdetails").eq(0));
                  });
                $(".KBmain")
                  .eq(num)
                  .mouseout(function() {
                    // $('.KBmain').eq(num).remove($('.YYdetails').eq(0))
                    $(".YYdetails").css("display", "none");
                  });
              }
            }
          }
          console.log(this.TBtr);
          let name2 = JSON.parse(JSON.stringify(this.TBtr));
          //执行完业务代码后
          this.TBtr = name2;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  mounted() {
    this.config.headers.Authorization=sessionStorage.Authorization;
    sessionStorage.setItem("nowActive", this.$route.query.opt);
    this.$http
      .get(this.$store.state.url + "appointment/Rbook",this.config)
      .then(res => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.labs.push(res.data[i]);
          this.labsName.push(res.data[i].name);

          // this.labChoice=this.$route.query.room_id
        }
        if (this.$route.query != null) {
          console.log(this.$route.query);
          this.note = this.$route.query.remark;
          this.number = this.$route.query.number;
          this.date = new Date(this.$route.query.book_time);
          this.labs.forEach((Element, index) => {
            console.log(Element.id);
            if (this.$route.query.room_id == Element.id) {
              this.labChoice = index;
            }
          });
        }
      })
      .catch(res => {
        console.log(res);
      });
    if (this.$route.query != null) {
      console.log(this.$route.query);
      this.note = this.$route.query.remark;
      this.number = this.$route.query.number;
      this.date = new Date(this.$route.query.book_time);

      // this.labChoice=this.$route.query.room_id
    }
  }
};
</script>

<style scoped>
/* .Steps {
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0.98;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 78%;
  border-radius: 10px;
  float: left;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
} */
/* .Steps {
  background-color: white;
  width: 87%;
  height: 100%;
  float: right;
  margin: 0;
  border: 0;
} */
.Steps >>> .el-step__icon {
  display: block !important;
}
.step {
  width: 80%;
  margin: 5px auto;
}
p {
  padding: 0;
  margin: 0;
}
.labChoice {
  width: 25%;
  border: 1px solid black;
}
/* .YYkebiao {
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0.98;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 78%;
  border-radius: 10px;
  float: left;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px; */
/* } */
.YYtable {
  width: 95%;
  border-spacing: 0;
  margin: 0 auto;
  margin-bottom: 30px;
}
.KBheader {
  background-color: #f5f5f5;
  width: 14.2%;
  height: 40px;
  border: 1px solid #e7e7e7;
}
.KBmain {
  position: relative;
  font-size: 0.9em;
  height: 80px;
  border: 1px solid #e7e7e7;
}
.KBmain > p {
  cursor: pointer;
}
.selectYY {
  width: 60px;
}
h3 {
  margin-bottom: 10px;
}
.WeekSpan {
  margin-left: 10px;
  float: left;
  z-index: 100;
  margin-bottom: 5px;
}
.CTT {
  float: left;
  height: 35px;
  margin-left: 20px;
}
.TimePosition {
  font-size: 0.9em;
  float: right;
  margin-right: 10px;
  margin-top: 10px;
}

.YYdetails {
  font-size: 0.9em;
  color: white;
  background-color: gray;
  text-align: left;
  border-radius: 10px;
  width: 200px;
  display: none;
  position: absolute;
  left: 50%;
  z-index: 100;
  opacity: 0.9;
}
.YYdetails > p {
  padding: 4px;
}
.yuyueText {
  /* margin: 0 auto; */
  width: 70%;
}
.yuyueText tr {
  height: 60px;
}
.yuyueText >>> .el-input {
  /* margin-left: 5px;
  margin-right: 30px; */
  width: 100%;
}
.yuyueText >>> .el-select {
  width: 100%;
}
.yuyueText >>> .el-select > .el-input {
  margin: 0;
}
</style>
