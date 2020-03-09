<template>
  <div class="YYmy">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="实验室预约" name="first">
        <el-table :data="tableData_show" style="width: 95%;margin:0 auto">
          <el-table-column v-for="(col,index) in showCols" :key="index" :label="col.label" :prop="col.prop" :width="col.width">
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <!-- <el-button type="primary">{{tableData[scope.$index].status}}</el-button> -->
              <el-button v-if="tableData_show[scope.$index].status==1" type="success" size="small">通过</el-button>
              <el-button class="buttonInner" v-if="tableData_show[scope.$index].status==-1" type="danger" size="small">未通过</el-button>
              <el-button class="buttonInner" v-if="tableData_show[scope.$index].status==0" type="primary" size="small">未处理</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData_show)" type="text" size="small">撤回</el-button>
              <el-button @click.native.prevent="editRow(scope.$index, tableData_show)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot class="TBfoot" :value="TBvalue1" :options="TBoptions1" ref="t1" @change="change(1)"></TBfoot>
      </el-tab-pane>
      <el-tab-pane label="会议室预约" name="second">
        <el-table :data="tableDataM_show" style="width: 95%;margin:0 auto">
          <el-table-column v-for="(col,index) in showMCols" :key="index" :label="col.label" :prop="col.prop" :width="col.width">
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template slot-scope="scope">
              <!-- <el-button type="primary">{{tableData[scope.$index].status}}</el-button> -->
              <el-button v-if="tableDataM_show[scope.$index].status==1" type="success" size="small">通过</el-button>
              <el-button class="buttonInner" v-if="tableDataM_show[scope.$index].status==-1" type="danger" size="small">未通过</el-button>
              <el-button class="buttonInner" v-if="tableDataM_show[scope.$index].status==null" type="primary" size="small">未处理</el-button>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="MdeleteRow(scope.$index, tableDataM_show)" type="text" size="small">撤回</el-button>
              <el-button @click.native.prevent="MeditRow(scope.$index, tableDataM_show)" type="text" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot class="TBfoot" :value="TBvalue2" :options="TBoptions2" ref="t1" @change="change(2)"></TBfoot>
      </el-tab-pane>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
import TBfoot from "@/components/common/table_footer";
export default {
  components: {
    TBfoot
  },
  data() {
    return {
      teacherID: "00182",
      activeName: "first",
      TBvalue1: 1,
      TBvalue2: 1,
      TBoptions1: [],
      TBoptions2: [],
      tableData_show: [],
      tableDataM_show: [],
      showCols: [
        {
          label: "课程名",
          prop: "course_name"
        },
        {
          label: "实验室名称",
          prop: "lab_name"
        },
        {
          label: "实验室地点",
          prop: "office"
        },
        {
          label: "学生人数",
          prop: "stu_num"
        },
        {
          label: "预约时间",
          prop: "book_time",
          width: 300
        },
        {
          label: "提交时间",
          prop: "time"
        }
      ],
      showMCols: [
        // {
        //   label: "课程名",
        //   prop: "course_name"
        // },
        {
          label: "会议室名称",
          prop: "room_name"
        },
        {
          label: "会议室地点",
          prop: "place"
        },
        {
          label: "预约人数",
          prop: "number"
        },
        {
          label: "预约时间",
          prop: "book_time",
          width: 300
        },
        {
          label: "提交时间",
          prop: "time"
        }
      ],
      tableDataM: [],
      tableData: [],
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/json"
        }
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    editRow(index, data) {
      this.$router.push({
        path: "/tch_yuyue/SYsteps?serve=14&opt=1",
        query: {
          course_name: data[index].course_name,
          equip_need: data[index].equip_need,
          stu_num: data[index].stu_num,
          exp_type: data[index].exp_type,
          class_info: data[index].class_info,
          remark: data[index].remark
        }
      });
    },
    MeditRow(index, data) {
      console.log(data[index])
      this.$router.push({
        path: "/tch_yuyue/HYsteps?serve=14&opt=6",
        
        query: {
          
          room_id: data[index].room_id,
          room_name: data[index].room_name,
          remark: data[index].remark,
          number: data[index].number,
          book_time: data[index].book_time,
        }
      });
    },
    change(value) {
      this.TBvalue1 = value;
      this.setLabData();
    },
    deleteRow(index, table) {
      this.$http
        .delete(this.$store.state.url + "appointment/manager/book/" + table[index].id, JSON.stringify({}),this.config)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            // this.$http
            //   .get(this.$store.state.url + "appointment/book/" + this.teacherID, JSON.stringify({}), {
            //     headers: {
            //       Authorization: null,
            //       "Content-Type": "application/json"
            //     }
            //   })
            //   .then(res => {
            //     this.tableData = res.data;
            //   })
            //   .catch(res => {
            //     console.log(res);
            //   });
            this.setLabData();
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    MdeleteRow(index, table) {
      this.$http
        .delete(this.$store.state.url + "appointment/manager/Rbook/" + table[index].id, JSON.stringify({}), this.config)
        .then(res => {
          console.log(res);
          if (res.data.code == 1) {
            // this.$http
            //   .get(this.$store.state.url + "appointment/Rbook/" + this.teacherID, JSON.stringify({}), {
            //     headers: {
            //       Authorization: null,
            //       "Content-Type": "application/json"
            //     }
            //   })
            //   .then(res => {
            //     this.tableDataM = res.data;
            //   })
            //   .catch(res => {
            //     console.log(res);
            //   });
            this.setMeetData();
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    setLabData() {
      console.log(this.config)
      this.$http
        .get(this.$store.state.url + "appointment/book/" + this.teacherID, this.config)
        .then(res => {
          console.log(res);
          this.tableData = res.data;
          res.data.forEach((element, index) => {
            var book_course =
              "星期" +
              element.book_time.slice(0, 1) +
              " 第" +
              parseInt(element.book_time.slice(1)) +
              "大节";
            var termStart = new Date("2019/01/01");
            termStart.setDate(termStart.getDate() + element.week * 7);
            this.tableData[index].book_time =
              termStart.getFullYear() +
              "-" +
              (termStart.getMonth() + 1) +
              "-" +
              termStart.getDate() +
              " " +
              book_course;
          });
          this.tableData_show = this.tableData.slice(
            (this.TBvalue1 - 1) * 10,
            this.TBvalue1 * 10
          );
          let op = [];
          for (let i = 0; i <= this.tableData.length / 10; i++) {
            op.push(i + 1);
          }
          console.log(op);
          this.$refs.t1.setToptions(op);
        })
        .catch(res => {
          console.log(res);
        });
    },
    setMeetData() {
      this.$http
        .get(this.$store.state.url + "appointment/room/" + this.teacherID,  this.config)
        .then(res => {
          console.log(res);
          this.tableDataM = res.data;
          // this.tableDataM.forEach((element, index) => {
          //   var book_course =
          //     "星期" +
          //     element.book_time.slice(0, 1) +
          //     " 第" +
          //     parseInt(element.book_time.slice(1)) +
          //     "大节";
          //   var termStart = new Date("2019/01/01");
          //   termStart.setDate(termStart.getDate() + element.week * 7);
          //   this.tableData[index].book_time =
          //     termStart.getFullYear() +
          //     "-" +
          //     (termStart.getMonth() + 1) +
          //     "-" +
          //     termStart.getDate() +
          //     " " +
          //     book_course;
          // });
          this.tableDataM_show = this.tableDataM.slice(
            (this.TBvalue2 - 1) * 10,
            this.TBvalue2 * 10
          );
          console.log(this.tableDataM_show)
          let op = [];
          for (let i = 0; i <= this.tableDataM.length / 10; i++) {
            op.push(i + 1);
          }
          console.log(op);
          this.$refs.t1.setToptions(op);
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  mounted() {
    this.config.headers.Authorization=sessionStorage.Authorization;
    console.log(this.$route.query.opt);
    sessionStorage.setItem("nowActive", this.$route.query.opt);
    this.setLabData();
    this.setMeetData();
  }
};
</script>

<style>
/* .YYmy {
  background-color: white;
  width: 87%;
  min-height: 94%;
  float: right;
  margin: 0;
  border: 0;
} */
.TBfoot {
  float: right;
  margin-top: 10px;
  margin-right: 40px;
}
</style>
