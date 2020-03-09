<template>
  <div class="FDbanganbu">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部查询" name="first">
        <el-table :data="tableData" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column v-for="col in BanganbuCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editJC(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot ref="t1" class="TBfoot" :value="TBvalue[0]" :options="TBoptions[0]" @change="change"></TBfoot>
        <div @click="addnewTr" style="cursor: pointer;width:200px;margin:0 auto;">
          <svg class="icon FD_icon" aria-hidden="true">
            <use xlink:href="#icon-jiahao"></use>
          </svg>
          <label class="labadd">新增班干部</label>
        </div>
      </el-tab-pane>
      <el-tab-pane label="班级查询" name="second">

        <el-select v-model="valueBJ" placeholder="选择班级" @change="selectBJ">
          <el-option v-for="item in optionsBJ" :key="item.value" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-table :data="tableDataBJ" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column v-for="col in BanganbuCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editJC(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableDataBJ)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot ref="t2" class="TBfoot" :value="TBvalue[1]" :options="TBoptions[1]" @change="change"></TBfoot>
      </el-tab-pane>
      <el-tab-pane label="职务查询" name="third">
        <el-select v-model="valueZW" placeholder="选择职务" @change="selectZW">
          <el-option v-for="item in optionsZW" :key="item.value" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
        <el-table :data="tableDataZW" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
          <el-table-column v-for="col in BanganbuCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editJC(scope.$index)" type="text" size="small">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.$index, tableDataZW)" type="text" size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot ref="t3" class="TBfoot" :value="TBvalue[2]" :options="TBoptions[2]" @change="change"></TBfoot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import store from "@/vuex/store";
import TBfoot from "@/components/common/table_footer";
import qs from "qs";
export default {
  store,
  components: { TBfoot },
  data() {
    return {
      leaderName:null,
      activeName: "first",
      valueBJ: null,
      valueZW: null,
      tableData: [],
      tableDataBJ: [],
      tableDataZW: [],
      BanganbuCols: [
        {
          prop: "natureClass",
          label: "班级"
        },
        {
          prop: "dutyName",
          label: "职务"
        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "phone",
          label: "电话"
        }
      ],
      optionsBJ: [],
      optionsZW: [
        // {
        //   label: "班长",
        //   value: "1"
        // },
        // {
        //   label: "团支书",
        //   value: "2"
        // },
        // {
        //   label: "体育委员",
        //   value: "3"
        // },
        // {
        //   label: "宣传委员",
        //   value: "4"
        // },
        // {
        //   label: "心理委员",
        //   value: "5"
        // },
        // {
        //   label: "学习委员",
        //   value: "6"
        // },
        // {
        //   label: "安保委员",
        //   value: "7"
        // },
        // {
        //   label: "生活委员",
        //   value: "8"
        // },
        // {
        //   label: "文艺委员",
        //   value: "9"
        // },
        // {
        //   label: "纪律委员",
        //   value: "10"
        // }
      ],
      TBvalue: [1, 1, 1],
      TBoptions: [[], [], []],
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    addnewTr() {
      this.$router.push({ path: "/tch_fudaoyuan/add" });
    },
    deleteRow(index, rows) {
      console.log(this.tableData[index].ccid);
      this.$http
        .get(this.$store.state.url + "/cadre/deleteone", {
          params: {
            ccid: this.tableData[index].ccid
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            alert("删除成功");
            this.$http
              .get(this.$store.state.url + "/cadre/cselectall", {
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
            // rows.splice(index, 1);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    editJC(index) {
      console.log(index);
      this.$router.push({
        path: "/tch_fudaoyuan/add",
        query: { text: this.tableData[index] }
      });
    },

    selectBJ() {
      // this.$http
      //   .get(this.$store.state.url + "/cadre/selectbyclass", {
      //     params: {
      //       ccclass: this.valueBJ,
      //       page: 1
      //     }
      //   })
      //   .then(res => {
      //     console.log(res);
      //     this.TBoptions[1] = [];
      //     for (let i = 1; i <= res.headers.rows; i++) {
      //       this.TBoptions[1].push(i);
      //     }
      //     this.$refs.t2.setToptions(this.TBoptions[1]);
      //     this.$refs.t2.setTvalue(1);
      //     this.tableDataBJ = res.data;
      //   })
      //   .catch(res => {
      //     console.log(res);
      //   });

      this.$http
      .post(
        this.$store.state.url + "userManagement/admin/getClassLeader",
        qs.stringify({
          nature_class: this.valueBJ,
          duty: "",
          pageNum: 1,
          limit: 15
        }),
        this.config
      )
      .then(res => {
        this.tableDataBJ=[];
        this.TBoptions[0] = res.data.navigatepageNums;
        this.$refs.t1.setToptions(this.TBoptions[0]);
        let response = res.data.list;
        let Bphone;
        for (let i = 0; i < response.length; i++) {
          if (response.phone != null) {
            Bphone = response[i].phone;
          } else {
            Bphone = "暂无";
          }

          let newData = {
            dutyName: response[i].dutyName,
            natureClass: response[i].classMsg.natureClass,
            name: response[i].msg.name,
            phone: Bphone
          };
          this.tableDataBJ.push(newData);
        }
      })
      .catch(res => {
        console.log(res);
      });
    },
    selectZW() {

      this.$http
      .post(
        this.$store.state.url + "userManagement/admin/getClassLeader",
        qs.stringify({
          nature_class: "",
          duty: this.valueZW,
          pageNum: 1,
          limit: 15
        }),
        this.config
      )
      .then(res => {
        this.tableDataZW=[];
        this.TBoptions[0] = res.data.navigatepageNums;
        this.$refs.t1.setToptions(this.TBoptions[0]);
        let response = res.data.list;
        let Bphone;
        for (let i = 0; i < response.length; i++) {
          if (response.phone != null) {
            Bphone = response[i].phone;
          } else {
            Bphone = "暂无";
          }

          let newData = {
            dutyName: response[i].dutyName,
            natureClass: response[i].classMsg.natureClass,
            name: response[i].msg.name,
            phone: Bphone,

          };
          this.tableDataZW.push(newData);
        }
      })
      .catch(res => {
        console.log(res);
      });
    },

    change(value) {
      switch (this.activeName) {
        case "first":
          this.$http
            .get(this.$store.state.url + "/cadre/selectall", {
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
            .get(this.$store.state.url + "/cadre/selectbyclass", {
              params: {
                page: value,
                ccclass: this.valueBJ
              }
            })
            .then(res => {
              console.log(res);
              this.tableDataBJ = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          this.TBvalue[1] = value;
          break;
        case "third":
          this.$http
            .get(this.$store.state.url + "/cadre/selectbyposition", {
              params: {
                page: value,
                ccposition: this.valueZW
              }
            })
            .then(res => {
              console.log(res);
              this.tableDataZW = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          this.TBvalue[2] = value;
          break;
      }
      console.log(value);
    }
  },

  mounted() {
    this.config.headers.Authorization = sessionStorage.Authorization;
    this.$http
      .post(
        this.$store.state.url + "userManagement/admin/getClassLeader",
        qs.stringify({
          nature_class: "",
          duty: "",
          pageNum: 1,
          limit: 15
        }),
        this.config
      )
      .then(res => {
        console.log(res)
        this.TBoptions[0] = res.data.navigatepageNums;
        this.$refs.t1.setToptions(this.TBoptions[0]);
        let response = res.data.list;
        let Bphone;
        for (let i = 0; i < response.length; i++) {
          if (response.phone != null) {
            Bphone = response[i].phone;
          } else {
            Bphone = "暂无";
          }

          let newData = {
            dutyName: response[i].dutyName,
            duty:response[i].duty,
            natureClass: response[i].classMsg.natureClass,
            nature_class:response[i].classMsg.nature_class,
            name: response[i].msg.name,
            phone: Bphone

          };
          this.tableData.push(newData);
        }
      })
      .catch(res => {
        console.log(res);
      });

    this.$http
      .post(
        this.$store.state.url + "userManagement/getNatureClass",
        qs.stringify({}),
        this.config
      )
      .then(res => {
        console.log(res);
        this.optionsBJ=res.data

      })
      .catch(res => {
        console.log(res);
      });

    this.$http
      .post(
        this.$store.state.url + "userManagement/getAllStudentDuty",
        qs.stringify({}),
        this.config
      )
      .then(res => {
        console.log(res);
        this.optionsZW=res.data

      })
      .catch(res => {
        console.log(res);
      });
  }
};
</script>
<style scoped>
/* .FDbanganbu {
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
.FD_icon {
  height: 3em;
  width: 3em;
  margin-top: 20px;
}
.labadd {
  position: relative;
  bottom: 1em;
}
.TBfoot {
  float: right;
  margin-top: 10px;
  margin-right: 40px;
}
</style>
