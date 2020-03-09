<template>

  <div class="Steps">
    <el-steps :active="active" finish-status="success" class="step">
      <el-step title="选择实验室"></el-step>
      <el-step title="选择时间"></el-step>
      <el-step title="提交申请"></el-step>
      <el-step title="等待审核"></el-step>
    </el-steps>
    <div v-if="active==0">
      <h2>选择你要预约的实验室</h2>
      <el-select v-model="labChoice" placeholder="选择实验室" class="labChoice">
        <el-option v-for="(term,index) in labsName" :key="index" :value="index" :label="term"></el-option>
      </el-select>
      <el-button @click="next()">下一步</el-button>
    </div>
    <div v-if="active==1">
      <div class="YYkebiao">
        <h2>{{title.time}}学年 第{{title.term}}学期 {{title.lab}} 实验预约表</h2>
        <span class="WeekSpan">第
          <el-select class="selectYY" v-model="Select_week" @change='GetBooksByWeek(Select_week)'>
            <el-option v-for="week in weeks" :key="week" :value="week" :label="week"></el-option>
          </el-select>
          周
        </span>
        <span class="TimePosition">日期： {{1}} 至 {{1}} 实验地点：{{labs[labChoice].place}} 实验室容量：{{labs[labChoice].stu_num}}</span>
        <!-- <el-button class="CTT" @click="Create_TimeTable" type="success">生成课表</el-button> -->
        <table class="YYtable">
          <tr>
            <th class="KBheader" v-for="th in TBth">
              <p>{{th.text}}</p>
            </th>
          </tr>
          <tr v-for="tr in TBtr">
            <th class="KBmain" v-for="td in tr">
              <p>{{td.text}}</p>
            </th>
          </tr>
        </table>
        <div class="YYdetails">
          <!-- <p>实验课程名称：{{details.name}}</p> -->
          <!-- <p>专业班级：{{details.className}}</p> -->
          <p>人数：{{details.personNum}}</p>
          <!-- <p>指导教师：{{details.teacher}}</p> -->
          <p>剩余可预约人数{{details.free_num}}</p>
          <p>总实验设备数：{{details.all_equip}}</p>
        </div>
      </div>
    </div>
    <div v-if="active==2">
      <h2>请填写您的预约信息</h2>
      <table class="yuyueText">
        <tr>
          <td>课程名称:</td>
          <td>
            <el-input v-model="input[0]" placeholder="请输入内容"></el-input>
          </td>
          <td>专业班级:</td>
          <td>
            <el-input v-model="input[7]" placeholder="请输入内容"></el-input>
          </td>
          <td>设备数量:</td>
          <td>
            <el-input v-model="input[2]" type="number" placeholder="请输入内容"></el-input>
          </td>
        </tr>
        <tr>
          <td>实验人数:</td>
          <td>
            <el-input v-model="input[3]" type="number" placeholder="请输入内容"></el-input>
          </td>
          <td>实验类型:</td>
          <td>
            <!-- <el-input v-model="input[6]" placeholder="请输入内容"></el-input> -->
            <el-select v-model="input[6]" placeholder="选择设备">
              <el-option v-for="term in Experiments" :key="term" :value="term" :label="term"></el-option>
            </el-select>
          </td>

          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>备注:</td>
          <td>
            <el-input style="width:340%" type="textarea" :rows="4" placeholder="请输入内容" v-model="input[8]">
            </el-input>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
      <el-button type="success" style="float:left;margin:10px 20px 30px 40px" @click="next">立即提交</el-button>
      <el-button type="" style="float:left;margin-top:10px" @click="reset">重置</el-button>
    </div>
    <div v-if="active==3"></div>
  </div>

</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      input: [null, null, null, null, null, null, null, null, null],
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
        lab: "软件实验室"
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
        alert("请选择你要预约的实验室");
        return;
      }
      if (this.active == 0) {
        this.title.lab = this.labs[this.labChoice].name;
        console.log(this.title);
      }
      // if(this.active==2&&this.input.indexOf(null)!=-1){
      //   alert("请检查是否有没填的信息")
      //   return;
      // }
      if (this.active == 2) {
        var myDate = new Date();
        console.log("timeChoice=" + this.timeChoice);
        console.log(
          "freeNum=" +
            this.TBtr[this.timeChoice.slice(0, 1) - 1][this.timeChoice.slice(1)]
              .free_num
        );
        let freeNum = this.TBtr[this.timeChoice.slice(0, 1) - 1][
          this.timeChoice.slice(1)
        ].free_num;
        if (freeNum < this.input[3]) {
          alert("该实验室容量不足");
          return;
        } else {
          if (this.$route.query.course_name == null) {
            this.$http
              .post(
                this.$store.state.url + "appointment/book",
                JSON.stringify({
                  book_time: this.timeChoice,
                  class_info: this.input[7],
                  course_name: this.input[0],
                  equip_need: this.input[2],
                  exp_type: this.input[6],
                  id: 0,
                  lab_id: this.labs[this.labChoice].id,
                  name: this.labs[this.labChoice].name,
                  office: this.labs[this.labChoice].place,
                  remark: this.input[8], //备注
                  status: 0,
                  stu_num: this.input[3],
                  // teacher_id: "00182",
                  time:
                    myDate.getFullYear().toString() +
                    "-" +
                    (myDate.getMonth() + 1).toString() +
                    "-" +
                    myDate.getDate().toString(),
                  week: this.Select_week.toString()
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
              });
          } else {
             this.$http
              .put(
                this.$store.state.url + "appointment/book",
                JSON.stringify({
                  book_time: this.timeChoice,
                  class_info: this.input[7],
                  course_name: this.input[0],
                  equip_need: this.input[2],
                  exp_type: this.input[6],
                  id: 0,
                  lab_id: this.labs[this.labChoice].id,
                  name: this.labs[this.labChoice].name,
                  office: this.labs[this.labChoice].place,
                  remark: this.input[8], //备注
                  status: 0,
                  stu_num: this.input[3],
                  // teacher_id: "00182",
                  time:
                    myDate.getFullYear().toString() +
                    "-" +
                    (myDate.getMonth() + 1).toString() +
                    "-" +
                    myDate.getDate().toString(),
                  week: this.Select_week.toString()
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
              });
          }
        }
      }
      if (this.active++ > 3) this.active = 0;
      if (this.active == 1) {
        new Promise(function(res, rej) {
          res();
        }).then(res => {
          this.GetBooksByWeek(this.labChoice);
          // console.log($(".KBmain"));
          // console.log($(".KBmain")[4]);
          // 其中 i为行 即大节 j为列
        });
      }
    },
    GetBooksByWeek(week) {
      console.log(week);
      this.$http
        .get("api/book/common/" + week,this.config)
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
      .get(this.$store.state.url + "appointment/lab",this.config)
      .then(res => {
        console.log(res.data);
        for (let i = 0; i < res.data.length; i++) {
          this.labs.push(res.data[i]);
          this.labsName.push(res.data[i].name);
        }
      })
      .catch(res => {
        console.log(res);
      });
    if (this.$route.query.course_name != null) {
      this.input[0] = this.$route.query.course_name;
      this.input[7] = this.$route.query.class_info;
      this.input[2] = this.$route.query.equip_need;
      this.input[3] = this.$route.query.stu_num;
      this.input[6] = this.$route.query.exp_type;
      this.input[8] = this.$route.query.remark;
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
  margin: 0 auto;
  width: 95%;
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
