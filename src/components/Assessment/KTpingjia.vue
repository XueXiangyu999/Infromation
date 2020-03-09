<template>
  <div class="ketanag">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="原始评价" name="first">
        <el-table :data="tableData" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column prop="cefaculty" label="系">
          </el-table-column>
          <el-table-column prop="celab"  show-overflow-tooltip label="教研室">
          </el-table-column>
          <el-table-column prop="ceinstructor" label="老师">
          </el-table-column>
          <el-table-column prop="ceclass" label="课程">
          </el-table-column>
          <el-table-column prop="ceresult" label="评价结果">
          </el-table-column>
          <el-table-column prop="ceterm" label="所属学期">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editKT(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="up_excel" @click="upExcel" type="success">上传excel</el-button>
        <TBfoot ref="t1" class="TBfoot" :value="TBvalue[0]" :options="TBoptions[0]" @change="change"></TBfoot>
        <div @click="addnewTr" style="cursor: pointer;width:200px;margin:0 auto">
          <svg class="icon JC_icon" aria-hidden="true">
            <use xlink:href="#icon-jiahao"></use>
          </svg>
          <label class="labadd">添加一行</label>
        </div>
        <div class="downloadExcel" @click="getAllData"></div>
        <download-excel id="excel" class="btn btn-default" :data="tableDataAll" :fields="json_fields" worksheet="My Worksheet" name="课堂评价表.xls">
        </download-excel>
      </el-tab-pane>
      <el-tab-pane label="教研室评价" name="second">
        <el-select v-model="valueJYS" placeholder="选择教研室" @change="selectJYS">
          <el-option v-for="item in optionsJYS" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-table :data="tableDataJYS" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column prop="cefaculty" label="系">
          </el-table-column>
          <el-table-column prop="celab" show-overflow-tooltip label="教研室">
          </el-table-column>
          <el-table-column prop="ceinstructor" label="老师">
          </el-table-column>
          <el-table-column prop="ceclass" label="课程">
          </el-table-column>
          <el-table-column prop="ceresult" label="评价结果">
          </el-table-column>
          <el-table-column prop="ceterm" label="所属学期">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editKT(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot ref="t2" class="TBfoot" :value="TBvalue[1]" :options="TBoptions[1]" @change="change"></TBfoot>
      </el-tab-pane>
      <el-tab-pane label="学期评价" name="third">
        <el-select v-model="valueXQ" placeholder="选择学期" @change="selectXQ">
          <el-option v-for="item in optionsXQ" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-table :data="tableDataXQ" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column prop="cefaculty" label="系">
          </el-table-column>
          <el-table-column prop="celab" show-overflow-tooltip label="教研室">
          </el-table-column>
          <el-table-column prop="ceinstructor" label="老师">
          </el-table-column>
          <el-table-column prop="ceclass" label="课程">
          </el-table-column>
          <el-table-column prop="ceresult" label="评价结果">
          </el-table-column>
          <el-table-column prop="ceterm" label="所属学期">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editKT(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot ref="t3" class="TBfoot" :value="TBvalue[2]" :options="TBoptions[2]" @change="change"></TBfoot>
      </el-tab-pane>
      <el-tab-pane label="老师评价" name="fourth">
        <el-select v-model="valueLS" placeholder="选择老师" @change="selectLS">
          <el-option v-for="item in optionsLS" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-table :data="tableDataLS" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column prop="cefaculty" label="系">
          </el-table-column>
          <el-table-column prop="celab" show-overflow-tooltip label="教研室">
          </el-table-column>
          <el-table-column prop="ceinstructor" label="老师">
          </el-table-column>
          <el-table-column prop="ceclass" label="课程">
          </el-table-column>
          <el-table-column prop="cecresult" label="评价结果">
          </el-table-column>
          <el-table-column prop="ceterm" label="所属学期">
          </el-table-column>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editKT(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot ref="t4" class="TBfoot" :value="TBvalue[3]" :options="TBoptions[3]" @change="change"></TBfoot>
      </el-tab-pane>
    </el-tabs>
    <Popup v-if="flag" class="popup" title="课堂评价表" @success="PopupSuccess" @cancel="PopupCancel"></Popup>
  </div>
</template>
<script>
import store from "@/vuex/store";
import TBfoot from "@/components/common/table_footer";
import Popup from "@/components/common/popup";
export default {
  store,
  data() {
    return {
      flag: false,
      activeName: "first",
      tableData: [{}],
      tableDataXQ: [{}],
      tableDataJYS: [{}],
      tableDataLS: [{}],
      tableDataAll:[],
      json_fields: {
        系: "cefaculty",
        教研室: "celab",
        老师: "ceinstructor",
        课程: "ceclass",
        评价结果: "ceresult",
        所属学期: "ceterm"
      },
      valueXQ: null,
      valueLS: null,
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
          value: "计算机科学与技术教研室",
          label: "计算机科学与技术教研室"
        },
        {
          value: "软件工程教研室",
          label: "软件工程教研室"
        },
        {
          value: "网络工程教研室",
          label: "网络工程教研室"
        },
        {
          value: "信息安全教研室",
          label: "信息安全教研室"
        }
      ],
      optionsLS: [
        {
          value: "小明",
          label: "小明"
        },
        {
          value: "小刘",
          label: "小刘"
        },
        {
          value: "小李",
          label: "小李"
        },
        {
          value: "小郑",
          label: "小郑"
        }
      ],
      TBvalue: [1, 1, 1, 1],
      TBoptions: [[], [], [], []]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getAllData(){
      console.log("getalldata")
      this.$http.get(this.$store.state.url + "/evaluation/getalldata")
      .then(res=>{
        // console.log(res.data)
        this.tableDataAll=res.data
        $('#excel').eq(0).click();
      })
      .catch(res=>{
        console.log(res=>{
          console.log(res)
        })
      })
    },
    selectXQ() {
      this.$http
        .get(this.$store.state.url + "/evaluation/selectbyterm", {
          params: {
            ceterm: this.valueXQ,
            page: 1
          }
        })
        .then(res => {
          console.log(res);
          this.TBoptions[2] = [];
          for (let i = 1; i <= res.headers.rows; i++) {
            this.TBoptions[2].push(i);
          }
          this.$refs.t3.setToptions(this.TBoptions[2]);
          this.$refs.t3.setTvalue(1);
          this.tableDataXQ = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    selectJYS() {
      this.$http
        .get(this.$store.state.url + "/evaluation/selectbylab", {
          params: {
            celab: this.valueJYS,
            page: 1
          }
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.TBoptions[1] = [];
          for (let i = 1; i <= res.headers.rows; i++) {
            this.TBoptions[1].push(i);
          }
          this.$refs.t2.setToptions(this.TBoptions[1]);
          this.$refs.t2.setTvalue(1);
          this.tableDataJYS = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    selectLS() {
      this.$http
        .get(this.$store.state.url + "/evaluation/selectbyinstructor", {
          params: {
            ceinstructor: this.valueLS,
            page: 1
          }
        })
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.TBoptions[3] = [];
          for (let i = 1; i <= res.headers.rows; i++) {
            this.TBoptions[3].push(i);
          }
          this.$refs.t4.setToptions(this.TBoptions[3]);
          this.$refs.t4.setTvalue(1);
          this.tableDataLS = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    addnewTr() {
      this.$router.push({ path: "/tch_ketang/add" });
    },
    deleteRow(index, rows) {
      console.log(this.tableData[index].ceid);
      this.$http
        .get(this.$store.state.url + "/evaluation/deleteone", {
          params: {
            ceid: this.tableData[index].ceid
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            rows.splice(index, 1);
            alert("删除成功");
            this.$http
              .get(this.$store.state.url + "/evaluation/selectall", {
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
        })
        .catch(res => {
          console.log(res);
        });
    },
    editKT(index) {
      console.log(index);
      this.$router.push({
        path: "/tch_ketang/edit",
        query: { text: this.tableData[index] }
      });
    },
    change(value) {
      switch (this.activeName) {
        case "first":
          this.$http
            .get(this.$store.state.url + "/evaluation/selectall", {
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
            .get(this.$store.state.url + "/evaluation/selectbylab", {
              params: {
                page: value,
                celab: this.valueJYS
              }
            })
            .then(res => {
              console.log(res);
              this.tableDataJYS = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          this.TBvalue[1] = value;
          break;
        case "third":
          this.$http
            .get(this.$store.state.url + "/evaluation/selectbyterm", {
              params: {
                page: value,
                ceterm: this.valueXQ
              }
            })
            .then(res => {
              console.log(res);
              this.tableDataXQ = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          this.TBvalue[2] = value;
          break;
        case "fourth":
          this.$http
            .get(this.$store.state.url + "/evaluation/selectbyinstructor", {
              params: {
                page: value,
                ceinstructor: this.valueLS
              }
            })
            .then(res => {
              console.log(res);
              this.tableDataLS = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          this.TBvalue[3] = value;
          break;
      }
      console.log(value);
    },
    upExcel() {
      // $(".popup").css("display", "block");
      this.flag = true;
    },
    PopupSuccess(file) {
      let formdata = new FormData();
      formdata.append("file", file);
      this.$http
        .post(this.$store.state.url + "/evaluation/uploadexcel", formdata)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            alert("上传成功");
            $(".popup").css("display", "none");
            location.reload();
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    PopupCancel() {
      // $(".popup").css("display", "none");
      this.flag = false;
    }
  },
  mounted() {
    this.$http
      .get(this.$store.state.url + "/evaluation/selectall", {
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
  },
  components: {
    TBfoot,
    Popup
  }
};
</script>
<style scoped>
/* .ketanag {
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
#excel {
  background-color: #c1c3e1;
  width: 40%;
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