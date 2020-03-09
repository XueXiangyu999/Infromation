<template>
  <div class="jiaocai">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="本部教材" name="first">
        <el-table :data="tableData" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column show-overflow-tooltip v-for="col in ShowCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editJC(scope.$index,tableData)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
              <el-button @click.native.prevent="details(scope.$index,tableData)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="up_excel" @click="upExcel" type="success">上传excel</el-button>
        <TBfoot class="TBfoot" :value="TBvalue[0]" :options="TBoptions[0]" ref="t1" @change="change"></TBfoot>
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
          <el-table-column v-for="col in ShowCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editJC(scope.$index,tableDataXQ)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableDataXQ)" type="text" size="small">移除</el-button>
              <el-button @click.native.prevent="details(scope.$index,tableDataXQ)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot class="TBfoot" :value="TBvalue[1]" ref="t2" :options="TBoptions[1]" @change="change"></TBfoot>
        <!-- <download-excel class="exceld btn btn-default" :data="tableDataXQ" :fields="json_fields" worksheet="My Worksheet" name="教材使用信息表(学期).xls">
        </download-excel> -->
      </el-tab-pane>
      <el-tab-pane label="教研室查询" name="third">
        <el-select v-model="valueJYS" placeholder="选择教研室" @change="selectJYS">
          <el-option v-for="item in optionsJYS" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <el-table :data="tableDataJYS" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column v-for="col in ShowCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editJC(scope.$index,tableDataJYS)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableDataJYS)" type="text" size="small">移除</el-button>
              <el-button @click.native.prevent="details(scope.$index,tableDataJYS)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot class="TBfoot" ref="t3" :value="TBvalue[2]" :options="TBoptions[2]" @change="change"></TBfoot>
        <!-- <download-excel class="exceld btn btn-default" :data="tableDataJYS" :fields="json_fields" worksheet="My Worksheet" name="教材使用信息表(教研室).xls">
        </download-excel> -->
      </el-tab-pane>
    </el-tabs>
    <Popup v-if="flag" class="popup" title="本部教材" @success="PopupSuccess" @cancel="PopupCancel"></Popup>
    <Details v-if="flag_details" @success="detailsCancel" :detailsData="rows" :detailsName='BenbuCols'></Details>
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
    Details
  },
  data() {
    return {
            config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      flag: false,
      flag_details: false,
      rows: null,
      activeName: "first",
      BenbuCols: [
        {
          prop: "tbmclassnum",
          label: "课程号",
          width: 70
        },
        {
          prop: "tbmclassname",
          label: "课程名"
        },
        {
          prop: "tbmproperty",
          label: "属性",
          width: 60
        },
        {
          prop: "tbmbookname",
          label: "教材名称/版次/作者"
        },
        // {
        //   prop: "tbmedition",
        //   label: "版次",
        //   width: 60
        // },
        // {
        //   prop: "tbmauthor",
        //   label: "作者",
        //   width: 80
        // },
        {
          prop: "tbmpress",
          label: "出版社"
        },
        {
          prop: "tbmdate",
          label: "出版年月",
          width: 120
        },
        {
          prop: "tbmprice",
          label: "估定价",
          width: 80
        },
        {
          prop: "tbmisbn",
          label: "ISBN号",
          width: 80
        },
        {
          prop: "tbmplan",
          label: "规划/精品教材",
          width: 90
        },
        {
          prop: "tbmsignature",
          label: "教师签名",
          width: 80
        },
        {
          prop: "tbmunit",
          label: "开课单位"
        },
        {
          prop: "tbmterm",
          label: "开课学期"
        },
        {
          prop: "tbmlab",
          label: "教研室"
        }
      ],
      ShowCols: [
        {
          prop: "tbmclassname",
          label: "课程名",
          width: "200"
        },
        {
          prop: "tbmbookname",
          label: "教材名称/版次/作者"
        },
        {
          prop: "tbmprice",
          label: "估定价",
          width: "80"
        },
        {
          prop: "tbmunit",
          label: "开课单位",
          width: "140"
        },
        {
          prop: "tbmlab",
          label: "教研室",
          width: "160"
        }
      ],
      tableDataAll: [],
      tableData: [
        {
          tbmclassnum: "1",
          tbmclassname: "2",
          tbmproperty: "4",
          tbmbookname: "5",
          tbmedition: "65",
          tbmauthor: "786",
          tbmpress: "867",
          tbmdate: "43",
          tbmprice: "3545",
          tbmisbn: "537",
          tbmplan: "57",
          tbmsignature: "4",
          tbmunit: "4",
          tbmlab: "78"
        },
        {
          tbmclassnum: "1",
          tbmclassname: "2",
          tbmproperty: "4",
          tbmbookname: "5",
          tbmedition: "65",
          tbmauthor:
            "发射距离可达三点福克斯大家分厘卡深刻搭街坊四道口附近圣诞快乐房价收到付款是多久啊开了房间撒旦开发士大夫可是的骄傲分厘卡圣诞节福克斯的解放军深大路口附近速度快立法上的",
          tbmpress: "867",
          tbmdate: "43",
          tbmprice: "3545",
          tbmisbn: "537", 
          tbmplan: "57",
          tbmsignature: "4",
          tbmunit: "4",
          tbmlab: "78"
        }
      ],
      tableDataXQ: [
        {
          tbmclassnum: "1",
          tbmclassname: "2",
          tbmproperty: "4",
          tbmbookname: "5",
          tbmedition: "65",
          tbmauthor: "786",
          tbmpress: "867",
          tbmdate: "43",
          tbmprice: "3545",
          tbmisbn: "537",
          tbmplan: "57",
          tbmsignature: "4",
          tbmunit: "4",
          tbmlab: "78"
        }
      ],
      tableDataJYS: [],
      json_fields: {
        // 序号: "tbmid",
        课程号: "tbmclassnum",
        课程名: "tbmclassname",
        属性: "tbmproperty",
        "教材名称/版次/作者": "tbmbookname",
        // 版次: "tbmedition",
        // 作者: "tbmauthor",
        出版社: "tbmpress",
        出版年月: "tbmdate",
        估定价: "tbmprice",
        ISBN号: "tbmisbn",
        "规划/精品教材": "tbmplan",
        教师签名: "tbmsignature",
        开课单位: "tbmunit",
        教研室: "tbmlab"
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
          value: "计算机科学与技术教研室",
          label: "计算机科学与技术教研室"
        },
        {
          value: "软件教研室",
          label: "软件教研室"
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
      TBvalue: [1, 1, 1],
      TBoptions: [[], [], []]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getAllData() {
      console.log("getalldata");
      this.$http
        .get(this.$store.state.url + "textbook/getalldata",{},this.config)
        .then(res => {
          // console.log(res.data)
          // this.tableDataAll = res.data;
          // setTimeout(
          //   $(".exceld")
          //     .eq(0)
          //     .click(),
          // );
          // $(".exceld")
          //   .eq(0)
          //   .click();

          new Promise(() => {
            this.tableDataAll = res.data;
          }).then(function() {
            console.log("downBegin");
            $(".exceld")
              .eq(0)
              .click();
          });
        })
        .catch(res => {
          console.log(res => {
            console.log(res);
          });
        });
    },
    selectXQ() {
      this.$http
        .get(this.$store.state.url + "textbook/selectbyterm", {
          params: {
            tbmterm: this.valueXQ,
            page: 1
          }
        },this.config)
        .then(res => {
          console.log(res);
          this.TBoptions[1] = [];
          for (let i = 1; i <= res.headers.rows; i++) {
            this.TBoptions[1].push(i);
          }
          this.$refs.t2.setToptions(this.TBoptions[0]);
          this.$refs.t2.setTvalue(1);
          this.tableDataXQ = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    selectJYS() {
      this.$http
        .get(this.$store.state.url + "textbook/selectbylab", {
          params: {
            tbmlab: this.valueJYS,
            page: 1
          }
        },this.config)
        .then(res => {
          console.log(res);
          console.log(res.data);
          this.TBoptions[2] = [];
          for (let i = 1; i <= res.headers.rows; i++) {
            this.TBoptions[2].push(i);
          }
          this.$refs.t3.setToptions(this.TBoptions[2]);
          this.$refs.t3.setTvalue(1);
          this.tableDataJYS = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    addnewTr() {
      this.$router.push({ path: "/tch_jiaocai/add" });
    },
    deleteRow(index, rows) {
      this.$http
        .get(this.$store.state.url + "textbook/deleteone", {
          params: {
            id: this.rows[index].tbmid
          }
        },this.config)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            alert("删除成功");
            switch (this.activeName) {
              case "first":
                this.$http
                  .get(this.$store.state.url + "textbook/selectall", {
                    params: {
                      page: this.TBvalue[0]
                    }
                  },this.config)
                  .then(res => {
                    console.log(res);
                    this.tableData = res.data;
                  })
                  .catch(res => {
                    console.log(res);
                  });
                this.$http
                  .get(this.$store.state.url + "textbook/getrows",{},this.config)
                  .then(res => {
                    console.log(res);
                    this.TBoptions[0] = [];
                    for (let i = 1; i <= res.data; i++) {
                      this.TBoptions[0].push(i);
                    }
                    this.$refs.t1.setToptions(this.TBoptions[0]);
                    this.$refs.t1.setTvalue(1);
                  })
                  .catch(res => {
                    console.log(res);
                  });
                break;
              case "second":
                this.$http
                  .get(this.$store.state.url + "textbook/selectbyterm", {
                    params: {
                      tbmterm: this.valueXQ,
                      page: this.TBvalue[1]
                    }
                  },this.config)
                  .then(res => {
                    console.log(res);
                    this.TBoptions[1] = [];
                    for (let i = 1; i <= res.headers.rows; i++) {
                      this.TBoptions[1].push(i);
                    }
                    this.$refs.t2.setToptions(this.TBoptions[0]);
                    this.$refs.t2.setTvalue(1);
                    this.tableDataXQ = res.data;
                  })
                  .catch(res => {
                    console.log(res);
                  });
                break;
              case "third":
                this.$http
                  .get(this.$store.state.url + "textbook/selectbylab", {
                    params: {
                      tbmlab: this.valueJYS,
                      page: this.TBvalue[2]
                    }
                  },this.config)
                  .then(res => {
                    console.log(res);
                    console.log(res.data);
                    this.TBoptions[2] = [];
                    for (let i = 1; i <= res.headers.rows; i++) {
                      this.TBoptions[2].push(i);
                    }
                    this.$refs.t3.setToptions(this.TBoptions[2]);
                    this.$refs.t3.setTvalue(1);
                    this.tableDataJYS = res.data;
                  })
                  .catch(res => {
                    console.log(res);
                  });
                break;
            }
          }

          // if (res.status == 200) {
          // rows.splice(index, 1);
          // }
        })
        .catch(res => {
          console.log(res);
        });
    },
    details(index, table) {
      // console.log(this.tableData[index]);
      // console.log(this.tableData);
      // console.log($("#benbu"));
      // let details = this.$router.push({
      //   name: "details",
      //   params: { table: this.tableData[index], cols: this.BenbuCols }
      // });
      // window.open(details.href, "_blank");

      // this.rows=table[index]
      this.$http
        .get(this.$store.state.url + "textbook/edit", {
          params: {
            id: table[index].tbmid
          }
        },this.config)
        .then(res => {
          console.log(res.data);
          this.rows = res.data[0];
          this.flag_details = true;
        })
        .catch(res => {
          console.log(res);
        });
    },
    detailsXQ(index) {
      let details = this.$router.push({
        name: "details",
        params: { table: this.tableDataXQ[index], cols: this.BenbuCols }
      });
      // window.open(details.href, "_blank");
    },
    detailsJYS(index) {
      this.$router.push({
        name: "details",
        params: { table: this.tableDataJYS[index], cols: this.BenbuCols }
      });
    },
    editJC(index,table) {
      console.log(index);
      this.$router.push({
        path: "/tch_jiaocai/edit",
        query: { text: table[index].tbmid }
      });
    },
    change(value) {
      switch (this.activeName) {
        case "first":
          this.$http
            .get(this.$store.state.url + "textbook/selectall", {
              params: {
                page: value
              }
            },this.config)
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
          break;
        case "third":
          this.$http
            .get(this.$store.state.url + "textbook/selectbylab", {
              params: {
                page: value,
                tbmlab: this.valueJYS
              }
            },this.config)
            .then(res => {
              console.log(res);
              this.tableDataJYS = res.data;
            })
            .catch(res => {
              console.log(res);
            });
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
        .post(this.$store.state.url + "textbook/uploadexcel", formdata,this.config)
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
    detailsCancel() {
      this.flag_details = false;
    },
    PopupCancel() {
      // $(".popup").css("display", "none");
      this.flag = false;
    }
  },
  mounted() {
        this.config.headers.Authorization=sessionStorage.Authorization;
    this.$http
      .get(this.$store.state.url + "textbook/getrows",{},this.config)
      .then(res => {
        console.log(res);
        for (let i = 1; i <= res.data; i++) {
          this.TBoptions[0].push(i);
        }
      },)
      .catch(res => {
        console.log(res);
      });
    this.$http
      .get(this.$store.state.url + "textbook/selectall", {
        params: {
          page: 1
        }
      },this.config)
      .then(res => {
        console.log(res);
        this.tableData = res.data;
        console.log("111");
        console.log($(".el-table__row"));
      })
      .catch(res => {
        console.log(res);
      });
  }
};
</script>
<style scoped>
/* .jiaocai {
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
.downloadExcel {
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
  margin-top: 20px;
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
