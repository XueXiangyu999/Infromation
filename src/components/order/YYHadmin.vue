<template>
    <div class="YYadmin">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未处理预约" name="first">
                <el-table :data="tableData_NoPass_show" style="width: 95%;margin:0 auto" :cell-style="{padding:'3px'}">
                    <el-table-column v-for="(col,index) in showCols" :width="col.width" :key="index" :label="col.label" :prop="col.prop">
                    </el-table-column>
                    <!-- <el-table-column label="剩余容量" :width="80">
                        <template slot-scope="scope">
                            <el-button class="buttonInner" v-if="tableData_NoPass_show[scope.$index].remainStuNum>tableData_NoPass_show[scope.$index].stu_num" type="success">{{tableData_NoPass_show[scope.$index].remainStuNum}}</el-button>
                            <el-button class="buttonInner" v-else type="danger">{{tableData_NoPass_show[scope.$index].remainStuNum}}</el-button>
                        </template>
                    </el-table-column> -->
                    <el-table-column fixed="right" label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="pass(scope.$index,tableData_NoPass_show)" type="text" size="small">通过</el-button>
                            <el-button @click.native.prevent="Nopass(scope.$index,tableData_NoPass_show)" type="text" size="small">驳回</el-button>
                            <el-button @click.native.prevent="details(scope.$index,tableData_NoPass_show)" type="text" size="small">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <TBfoot class="TBfoot" :value="TBvalue1" :options="TBoptions1" ref="t1" @change="change1"></TBfoot>
            </el-tab-pane>
            <el-tab-pane label="预约列表" name="second">
                <el-table :data="tableData_show" style="width: 95%;margin:0 auto" :cell-style="{padding:'3px'}">
                    <el-table-column v-for="(col,index) in showCols" :width="col.width" :key="index" :label="col.label" :prop="col.prop">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <el-button class="buttonInner" v-if="tableData_show[scope.$index].status==1" type="success">通过</el-button>
                            <el-button class="buttonInner" v-if="tableData_show[scope.$index].status==-1" type="danger">未通过</el-button>
                            <el-button class="buttonInner" v-if="tableData_show[scope.$index].status==null" type="primary">未处理</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="pass(scope.$index,tableData_show)" type="text" size="small">通过</el-button>
                            <el-button @click.native.prevent="Nopass(scope.$index,tableData_show)" type="text" size="small">驳回</el-button>
                            <el-button @click.native.prevent="details(scope.$index,tableData_show)" type="text" size="small">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <TBfoot class="TBfoot" :value="TBvalue2" :options="TBoptions2" ref="t2" @change="change2"></TBfoot>
            </el-tab-pane>
            <el-tab-pane label="已通过预约" name="third">
                <el-table :data="tableData_Pass_show" style="width: 95%;margin:0 auto" :cell-style="{padding:'3px'}">
                    <el-table-column v-for="(col,index) in showCols" :width="col.width" :key="index" :label="col.label" :prop="col.prop">
                    </el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <el-button class="buttonInner" v-if="tableData_Pass_show[scope.$index].status==1" type="success">通过</el-button>
                            <el-button class="buttonInner" v-if="tableData_Pass_show[scope.$index].status==-1" type="danger">未通过</el-button>
                            <el-button class="buttonInner" v-if="tableData_Pass_show[scope.$index].status==null" type="primary">未处理</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="130">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="Nopass(scope.$index,tableData_Pass_show)" type="text" size="small">驳回</el-button>
                            <el-button @click.native.prevent="details(scope.$index,tableData_Pass_show)" type="text" size="small">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <TBfoot class="TBfoot" :value="TBvalue3" :options="TBoptions3" ref="t3" @change="change3"></TBfoot>
            </el-tab-pane>
        </el-tabs>
        <Details v-if="flag_details" @success="detailsCancel" :detailsData="rows" :detailsName='Cols'></Details>
    </div>
</template>
<script>
import store from "@/vuex/store";
import TBfoot from "@/components/common/table_footer";
import Details from "@/components/common/details";
export default {
  components: {
    TBfoot,
    Details
  },
  data() {
    return {
      rows: null,
      flag_details: false,
      TBvalue1: 1,
      TBoptions1: [],
      TBvalue2: 1,
      TBoptions2: [],
      TBvalue3: 1,
      TBoptions3: [],

      tableData_NoPass: [],
      tableData_NoPass_show: [],
      tableData_Pass: [],
      tableData_Pass_show: [],
      tableData: [],
      tableData_show: [],

      activeName: "first",
      Cols: [
        {
          label: "ID",
          prop: "id"
        },
        {
          label: "预约人id",
          prop: "teacher_id"
        },
        {
          label: "会议室名称",
          prop: "room_name"
        },
        {
          label: "预约人数",
          prop: "number"
        },
        {
          label: "预约时间",
          prop: "book_time",
          width: 240
        },
        {
          label: "提交时间",
          prop: "time"
        },
        {
          label: "备注",
          prop: "remark"
        }
      ],
      showCols: [ 
        {
          label: "预约人id",
          prop: "teacher_id"
        },
        // {
        //   label: "课程名称",
        //   prop: "course_name"
        // },
        {
          label: "预约人数",
          prop: "number"
        },
        // {
        //   label: "实验类型",
        //   prop: "exp_type"
        // },
        // {
        //   label: "专业班级",
        //   prop: "class_info"
        // },
        // {
        //   label: "设备数量",
        //   prop: "equip_need"
        // },
        {
          label: "会议室名称",
          prop: "room_name"
        },
        {
          label: "预约时间",
          prop: "book_time",
          width: 200
        },
        {
          label: "提交时间",
          prop: "time"
        }
      ],
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
    detailsCancel() {
      this.flag_details = false;
    },
    change1(value) {
      this.TBvalue1 = value;
      this.tableData_NoPass_show = this.tableData_NoPass.slice(
        (value - 1) * 15,
        value * 15
      );
    },
    change2(value) {
      this.TBvalue2 = value;
      this.tableData_show = this.tableData.slice((value - 1) * 15, value * 15);
    },
    change3(value) {
      this.TBvalue3 = value;
      this.tableData_Pass_show = this.tableData_Pass.slice(
        (value - 1) * 15,
        value * 15
      );
    },
    details(index, table) {
      this.rows = table[index];
      console.log(table[index])
      this.flag_details = true;
    },
    pass(index, data) {
      this.$http
        .post(this.$store.state.url + "appointment/manager/Rbook/" + data[index].id + "/" + 1, null, this.config)
        .then(res => {
          console.log(res);
          this.init();
        })
        .catch(res => {
          console.log(res);
        });
    },
    Nopass(index, data) {
      this.$http
        .post(this.$store.state.url + "appointment/manager/Rbook/" + data[index].id + "/" + -1, null, this.config)
        .then(res => {
          console.log(res);
          this.init();
        })
        .catch(res => {
          console.log(res);
        });
    },
    init() {
      this.$http
        .get(this.$store.state.url + "appointment/manager/Rbook/all", this.config)
        .then(res => {
          this.tableData = [];
          this.tableData_NoPass = [];
          this.tableData_Pass = [];
          console.log(res.data);
          for (let i = 0; i < res.data.length; i++) {
            this.tableData.push(res.data[i]);
            if (res.data[i].status == null) {
              this.tableData_NoPass.push(res.data[i]);
            } else if (res.data[i].status == 1) {
              this.tableData_Pass.push(res.data[i]);
            }
          }
          this.tableData = res.data;

          this.$refs.t1.setToptions(
            this.setoptions(this.tableData_NoPass.length)
          );
          this.$refs.t2.setToptions(this.setoptions(this.tableData.length));
          this.$refs.t3.setToptions(
            this.setoptions(this.tableData_Pass.length)
          );
          this.change1(1);
          this.change2(1);
          this.change3(1);
        })
        .catch(res => {
          console.log(res);
        });
    },
    //生产一个tbfoot的数组
    setoptions(length) {
      let min = 15;
      let options = [];
      for (let i = 1; i <= Math.ceil(length / min); i++) {
        options.push(i);
      }
      return options;
    }
  },
  mounted() {
    this.config.headers.Authorization=sessionStorage.Authorization;
    sessionStorage.setItem("nowActive", this.$route.query.opt);
    this.init();
  }
};
</script>
<style>
.TBfoot {
  float: right;
  margin-top: 10px;
  margin-right: 40px;
}
.buttonInner {
  padding: 7px;
  font-size: 0.9em;
}
</style>
