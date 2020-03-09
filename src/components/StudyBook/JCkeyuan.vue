<template>
  <div class="jiaocaiLY">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="科院教材" name="first">
        <el-table :data="tableData" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column show-overflow-tooltip v-for="col in ShowCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editJC(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                移除
              </el-button>
              <el-button @click.native.prevent="details(scope.$index,tableData)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="up_excel" @click="upExcel" type="success">上传excel</el-button>
        <TBfoot class="TBfoot" :value="TBvalue[0]" :options="TBoptions[0]" @change="change" ref="t1"></TBfoot>
        <div @click="addnewTr" style="cursor: pointer;width:200px;margin:0 auto">
          <svg class="icon JC_icon" aria-hidden="true">
            <use xlink:href="#icon-jiahao"></use>
          </svg>
          <label class="labadd">添加一行</label>
        </div>
        <div class="downloadExcel" @click="getAllData"></div>
        <download-excel class="exceld btn btn-default" :data="tableDataAll" :fields="json_fields" worksheet="My Worksheet" name="教材使用信息表.xls">
        </download-excel>
      </el-tab-pane>
      <el-tab-pane label="学期查询" name="second">
        <el-select v-model="valueXQ" placeholder="选择学期" @change="selectXQ">
          <el-option v-for="item in optionsXQ" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-table :data="tableDataXQ" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column show-overflow-tooltip v-for="col in ShowCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editJC(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableDataXQ)" type="text" size="small">
                移除
              </el-button>
              <el-button @click.native.prevent="details(scope.$index,tableDataXQ)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot class="TBfoot" ref="t2" :value="TBvalue[1]" :options="TBoptions[1]" @change="change"></TBfoot>
        <!-- <download-excel class="exceld btn btn-default" :data="tableDataXQ" :fields="json_fields" worksheet="My Worksheet" name="教材使用信息表(学期).xls">
        </download-excel> -->
      </el-tab-pane>
    </el-tabs>
    <Popup v-if="flag" class="popup" title="科院教材" @success="PopupSuccess" @cancel="PopupCancel"></Popup>
   <Details v-if="flag_details" @success="detailsCancel" :detailsData="rows" :detailsName='KeyuanCols' ></Details>
  </div>
</template>
<script>
import store from "@/vuex/store";
import TBfoot from "@/components/common/table_footer";
import Popup from "@/components/common/popup";
import Details from "@/components/common/details";
export default {
  store,
  components: {
    TBfoot,
    Popup,
    Details,
  }, 
  data() {
    return {
      flag: false,
      flag_details:false,
      activeName: "first",
      KeyuanCols: [
        {
          prop: "tbcfaculty",
          label: "系别",
          width: 80
        },
        {
          prop: "tbcclassnum",
          label: "课程号"
        },
        {
          prop: "tbcclassname",
          label: "课程名"
        },
        {
          prop: "tbcproperty",
          label: "课程属性",
          width: 60
        },
        {
          prop: "tbcname",
          label: "教材名称/版次/作者"
        },
        // {
        //   prop: "tbcedition",
        //   label: "版次",
        //   width: 80
        // },
        // {
        //   prop: "tbcauthor",
        //   label: "作者",
        //   width: 80
        // },
        {
          prop: "tbcpress",
          label: "出版社"
        },
        {
          prop: "tbcdate",
          label: "出版年月",
          width: 120
        },
        {
          prop: "tbcprice",
          label: "估定价",
          width: 80
        },
        {
          prop: "tbcisbn",
          label: "ISBN号",
          width: 80
        },
        {
          prop: "tbcplan",
          label: "规划/精品教材",
          width: 80
        },
        {
          prop: "tbcinstructor",
          label: "主讲教师",
          width: 80
        },
        {
          prop: "tbcamount",
          label: "教师用书数量",
          width: 120
        },
        {
          prop: "tbcclassinfo",
          label: "班级信息",
          width: 120
        },
        {
          prop: "tbccomment",
          label: "备注",
          width: 120
        }
      ],
      ShowCols: [
        {
          prop: "tbcclassnum",
          label: "课程号"
        },
        {
          prop: "tbcclassname",
          label: "课程名"
        },
        {
          prop: "tbcname",
          label: "教材名称/版次/作者"
        },
        {
          prop: "tbcprice",
          label: "估定价",
          width: 80
        },
        {
          prop: "tbcinstructor",
          label: "主讲教师",
          width: 80
        },
        {
          prop: "tbcamount",
          label: "教师用书数量",
          width: 120
        }
      ],
      tableDataAll:[],
      tableData: [{}],
      tableDataXQ: [{}],
      // tableDataJYS: [],
      json_fields: {
        // 序号: "tbmid",
        系别: "tbcfaculty",
        课程号: "tbcclassnum",
        课程名: "tbcclassname",
        课程属性: "tbcproperty",
        "教材名称/版次/作者": "tbcname",
        // 版次: "tbcedition",
        // 作者: "tbcauthor",
        出版社: "tbcpress",
        出版年月: "tbcdate",
        估定价: "tbcprice",
        ISBN号: "tbcisbn",
        "规划/精品教材": "tbcplan",
        主讲教师: "tbcinstructor",
        教师用书数量: "tbcamount",
        班级信息: "tbcclassinfo",
        备注: "tbccomment"
      },
      valueXQ: null,
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
          value: 1,
          label: "计算机科学与技术教研室"
        },
        {
          value: 2,
          label: "软件工程教研室"
        },
        {
          value: 3,
          label: "网络工程教研室"
        },
        {
          value: 4,
          label: "信息安全教研室"
        }
      ],
      TBvalue: [1, 1],
      TBoptions: [[], []]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
            getAllData(){
      console.log("getalldata")
      this.$http.get(this.$store.state.url + "/textbook/cgetalldata")
      .then(res=>{
        // console.log(res.data)
        this.tableDataAll=res.data
        $('.exceld').eq(0).click();
      })
      .catch(res=>{
        console.log(res=>{
          console.log(res)
        })
      })
    },
    selectXQ() {
      console.log(this.valueXQ);
      this.$http
        .get(this.$store.state.url + "/textbook/cselectbyterm", {
          params: {
            tbcterm: this.valueXQ,
            page: 1
          }
        })
        .then(res => {
          console.log(res);
          this.TBoptions[1] = [];
          for (let i = 1; i <= res.headers.rows; i++) {
            this.TBoptions[1].push(i);
          }
          this.$refs.t2.setToptions(this.TBoptions[1]);
          this.$refs.t2.setTvalue(1);
          this.tableDataXQ = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    addnewTr() {
      this.$router.push({ path: "/tch_jiaocai/addk" });
    },
    deleteRow(index, rows) {
      console.log(this.tableData[index].tbmid);
      this.$http
        .get(this.$store.state.url + "/textbook/cdeleteone", {
          params: {
            id: this.tableData[index].tbcid
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            alert("删除成功");
            this.$http
              .get(this.$store.state.url + "/textbook/cselectall", {
                params: {
                  page: this.TBvalue[0]
                }
              })
              .then(res => {
                console.log(res);
                this.TBoptions[0] = [];
                for (let i = 1; i <= res.headers.rows; i++) {
                  this.TBoptions[0].push(i);
                }
                this.$refs.t1.setToptions(this.TBoptions[0]);
                this.$refs.t1.setTvalue(1);
                this.tableData = res.data;
              })
              .catch(res => {
                console.log(res);
              });
          }

          // if (res.status == 200) {
          // rows.splice(index, 1);
          // }
        })
        .catch(res => {
          console.log(res);
        });
    },
    details(index,table) {
      // console.log(this.tableData[index]);
      // console.log(this.tableData);
      // let details = this.$router.push({
      //   name: "details",
      //   params: { table: this.tableData[index], cols: this.KeyuanCols }
      // });
      // window.open(details.href, "_blank");
      this.rows=table[index]
      this.flag_details = true;
    },
    detailsCancel(){
        this.flag_details=false
    },
    editJC(index,table) {
      console.log(index);
      this.$router.push({
        path: "/tch_jiaocai/editk",
        query: { text: table[index].tbcid }
      });

    },
    change(value) {
      switch (this.activeName) {
        case "first":
          this.$http
            .get(this.$store.state.url + "/textbook/cselectall", {
              params: {
                page: value
              }
            })
            .then(res => {
              console.log(res);
              this.tableData = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          this.TBvalue[0] = value;
          break;
        case "second":
          this.$http
            .get(this.$store.state.url + "/textbook/cselectbyterm", {
              params: {
                tbcterm: this.valueXQ,
                page: value
              }
            })
            .then(res => {
              console.log(res);
              this.tableDataXQ = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          this.TBvalue[1] = value;
          break;
      }
      console.log(value);
    },
    upExcel() {
      this.flag = true;
    },
    PopupSuccess(file) {
      let formdata = new FormData();
      formdata.append("file", file);
      this.$http
        .post(this.$store.state.url + "/textbook/", formdata)
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    PopupCancel() {
      this.flag = false;
    }
  },
  mounted() {
    this.$http
      .get(this.$store.state.url + "/textbook/cselectall", {
        params: {
          page: 1
        }
      })
      .then(res => {
        console.log(res);
        for (let i = 1; i <= res.headers.rows; i++) {
          this.TBoptions[0].push(i);
        }
        this.tableData = res.data;
      })
      .catch(res => {
        console.log(res);
      });
  }
};
</script>
<style scoped>
/* .jiaocaiLY {
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 78%;
  border-radius: 10px;
  float: left;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
} */
.downloadExcel{
  width: 40%;
  height: 60px;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 40px;
  margin-bottom: 20px;
  position: absolute;
  left: 30%;
}
.JC_icon {
  height: 3em;
  width: 3em;
  margin-top: 20px;
}
.labadd {
  position: relative;
  bottom: 1em;
}
.exceld {
  background-color: #c1c3e1;
  width: 400px;
  margin: 0 auto;
  height: 60px;
  line-height: 60px;
  font-size: 1em;
  border-radius: 30px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-top: 40px;
  margin-bottom: 20px;
}
.TBfoot {
  float: right;
  margin-top: 10px;
  margin-right: 40px;
}
.up_excel {
  float: left;
  margin: 20px 40px;
}
</style>