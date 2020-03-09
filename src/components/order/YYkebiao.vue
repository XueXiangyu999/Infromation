<template>
  <div class="YYkebiao">
    <h3>{{title.time}}学年 第{{title.term}}学期 {{title.lab}} 实验预约表</h3>
    <span class="WeekSpan">第
      <!-- <select class="selectYY" v-model="Select_week">
                <option v-for="week in weeks" :value="week">{{week}}</option>
            </select> -->
      <el-select class="selectYY" v-model="Select_week">
        <el-option v-for="week in weeks" :key="week" :value="week" :label="week"></el-option>
      </el-select>
      周
    </span>
    <span class="TimePosition">日期： {{1}} 至 {{1}} 实验地点：{{1}}</span>
    <el-button class="CTT" @click="Create_TimeTable" type="success">生成课表</el-button>
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
      <p>实验课程名称：{{details.name}}</p>
      <p>专业班级：{{details.className}}</p>
      <p>人数：{{details.personNum}}</p>
      <p>指导教师：{{details.teacher}}</p>
      <p>可用设备数：{{details.free_equip}}</p>
      <p>总实验设备数：{{details.all_equip}}</p>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      details: {
        name: "235453423",
        className: "计科1507",
        personNum: "45",
        teacher: "林建",
        free_equip: "159",
        all_equip: "200"
      },
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
            type: 1
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 2
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
            type: 1
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 2
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
            type: 1
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 2
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
            type: 1
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 2
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
            type: 1
          },
          {
            text: "",
            color: "",
            type: 0
          },
          {
            text: "",
            color: "",
            type: 2
          }
        ]
      ],
      Toptions: [],
      weeks: [1, 2, 3, 4, 5, 6],
      Select_week: [],
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/json"
        }
      }
    };
  },
  methods: {
    Create_TimeTable() {},
  },
  mounted() {
    this.config.headers.Authorization=sessionStorage.Authorization;
    console.log($(".KBmain"));
    console.log($(".KBmain")[4]);

    //其中 i为行 即大节 j为列
    for (let i = 0; i < 5; i++) {
      for (let j = 1; j < 6; j++) {
        let num = i * 6 + j;
        switch (this.TBtr[i][j].type) {
          case 0:
            this.TBtr[i][j].text = "可预约";
            $(".KBmain")
              .eq(num)
              .css("color", "#94ef84");
            break;
          case 1:
            this.TBtr[i][j].text = "已有通过预约，未满";
            $(".KBmain")
              .eq(num)
              .css({ "background-color": "#c9c9c9", color: "#ff8037" });
            break;
          case 2:
            this.TBtr[i][j].text = "不可预约或未满";
            $(".KBmain")
              .eq(num)
              .css({ "background-color": "#a1a1a1", color: "red" });
            break;
        }
        if(this.TBtr[i][j].type!=0){
          $(".KBmain")
              .eq(num)
              .mouseover(function() {
                this.$http;
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
  }
};
</script>

<style scoped>
p {
  padding: 0;
  margin: 0;
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
  margin-top: 50px;
} */
.YYtable {
  width: 95%;
  border-spacing: 0;
  margin: 0 auto;
  margin-bottom: 30px;
}
.KBheader {
  background-color: #eceded;
  width: 16.6%;
  height: 40px;
  border: 1px solid #e1e1e1;
}
.KBmain {
  position: relative;
  font-size: 0.8em;
  height: 70px;
  border: 1px solid #e1e1e1;
}
.selectYY {
  width: 60px;
}
h3 {
  margin-bottom: 10px;
}
.WeekSpan {
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
</style>
