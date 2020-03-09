<template>
  <div class="FDshetuan">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="待审批" name="first">
        <el-table :data="tableDataR" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}" >
          <el-table-column show-overflow-tooltip v-for="col in ShetuanCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="passST(scope.$index)" type="text" size="small">通过</el-button>
              <el-button @click.native.prevent="rejectST(scope.$index)" type="text" size="small">驳回</el-button>
              <el-button @click.native.prevent="details(scope.$index,tableDataR)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot class="TBfoot" :value="TBvalue[0]" :options="TBoptions[0]" @change="change"></TBfoot>
      </el-tab-pane>
      <el-tab-pane label="已审批" name="second">
        <el-table :data="tableDataD" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}" >
          <el-table-column show-overflow-tooltip v-for="col in ShetuanCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button @click.native.prevent="details(scope.$index,tableDataD)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot class="TBfoot" :value="TBvalue[1]" :options="TBoptions[1]" @change="change"></TBfoot>
      </el-tab-pane>
      <el-tab-pane label="全部" name="third">
        <el-table :data="tableData" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}" >
          <el-table-column show-overflow-tooltip v-for="col in ShetuanCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="editJC(scope.$index)" type="text" size="small">编辑</el-button>
              <!-- <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button> -->
              <el-button @click.native.prevent="details(scope.$index,tableData)" type="text" size="small">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <TBfoot class="TBfoot" :value="TBvalue[2]" :options="TBoptions[2]" @change="change"></TBfoot>
        <Details v-if="flag_details" @success="detailsCancel" :detailsData="rows" :detailsName='ShetuanCols' ></Details>
        <!-- <div @click="addnewTr" style="cursor: pointer;width:200px;margin:0 auto">
          <svg class="icon FD_icon" aria-hidden="true">
            <use xlink:href="#icon-jiahao"></use>
          </svg>
          <label class="labadd">添加一行</label>
        </div> -->
      </el-tab-pane>

    </el-tabs>

  </div>
</template>
<script>
import store from "@/vuex/store";
import TBfoot from "@/components/common/table_footer";
import Details from "@/components/common/details";
export default {
  store,
  components: {
    TBfoot,
    Details
  },
  data() {
    return {
      rows:null,
      flag_details:false,
      activeName: "first",
      ShetuanCols: [
        {
          prop: "cname",
          label: "社团名称",
          width: 160
        },
        {
          prop: "cplan",
          label: "活动计划"
        },
        {
          prop: "cbudget",
          label: "预算",
          width: 80
        },
        {
          prop: "crecord",
          label: "老师审批记录"
        }
      ],
      tableData: [
        {
          cname: "fdas",
          cplan:
            "反抗拉萨的煎熬了夫卡就收到了开发建设的立法而非简单介绍覅受到了附件所带来的是JFK楼上的深刻的将考虑对方快乐圣诞节覅欧式的金发女郎"
        }
      ],
      tableDataD: [{}],
      tableDataR: [{}],
      TBvalue: [1, 1, 1],
      TBoptions: [[1, 2, 3, 4, 5], [1, 2, 3, 4], [1]]
    };
  },
  methods: {
    selectR() {
      this.$http
        .get(this.$store.state.url + "selectnotapproved", { page: 1 })
        .then(res => {
          console.log(res);
          console.log(res.data);
          for (let i = 1; i <= res.data; i++) {
            this.TBoptions[0].push(i);
          }
          this.tableDataR = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    selectD() {
      this.$http
        .get(this.$store.state.url + "selectapproved", { page: 1 })
        .then(res => {
          console.log(res);
          for (let i = 1; i <= res.data; i++) {
            this.TBoptions[1].push(i);
          }
          this.tableDataD = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },

    selectAll() {
      this.$http
        .get(this.$store.state.url + "selectall", { page: 1 })
        .then(res => {
          console.log(res);
          console.log(res.data);
          for (let i = 1; i <= res.data; i++) {
            this.TBoptions[2].push(i);
          }
          this.tableData = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      switch (this.activeName) {
        case "first":
          this.$http
            .get(this.$store.state.url + "selectnotapproved", { page: 1 })
            .then(res => {
              console.log(res);
              console.log(res.data);
              for (let i = 1; i <= res.data; i++) {
                this.TBoptions[0].push(i);
              }
              this.tableDataR = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          break;
        case "second":
          this.$http
            .get(this.$store.state.url + "selectapproved", { page: 1 })
            .then(res => {
              console.log(res);
              for (let i = 1; i <= res.data; i++) {
                this.TBoptions[1].push(i);
              }
              this.tableDataD = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          break;
        case "third":
          this.$http
            .get(this.$store.state.url + "selectall", { page: 1 })
            .then(res => {
              console.log(res);
              console.log(res.data);
              for (let i = 1; i <= res.data; i++) {
                this.TBoptions[2].push(i);
              }d
              this.tableData = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          break;
      }
    },
    addnewTr() {
      this.$router.push({ path: "/tch_fudaoyuan/adds"});
    },
    // deleteRow(index, rows) {
    //   console.log(this.tableData[index].cid);
    //   this.$http
    //     .get(this.$store.state.url + "deleteone", {
    //       params: {
    //         cid: this.tableData[index].cid
    //       }
    //     })
    //     .then(res => {
    //       console.log(res);
    //       if (res.status == 200) {
    //         rows.splice(index, 1);
    //       }
    //     })
    //     .catch(res => {
    //       console.log(res);
    //     });
    // },
    editJC(index) {
      console.log(index);
      this.$router.push({
        path: "/tch_fudaoyuan/edits",
        query: { text: this.tableData[index] }
      });
    },
    passST(index) {
      this.$http
        .get(this.$store.state.url + "approve", {
          params: {
            cid: this.tableDataR[index].cid
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            location.reload();
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    rejectST(index) {
      let prompts;
      prompts = prompt("驳回的理由:");
      this.$http
        .get(this.$store.state.url + "notapprove", {
          params: {
            cid: this.tableDataR[index].cid,
            creason: prompts
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
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
    detailsR(value) {
      this.$router.push({
        name: "details",
        params: { table: this.tableDataR[index], cols: this.ShetuanCols }
      });
    },
    detailsD(value) {
      this.$router.push({
        name: "details",
        params: { table: this.tableDataD[index], cols: this.ShetuanCols }
      });
    },
    details(index,table) {
      // this.$router.push({
      //   name: "details",
      //   params: { table: this.tableData[index], cols: this.ShetuanCols }
      // });
       this.rows=table[index]
      this.flag_details = true;
    },

    change(value) {
      switch (this.activeName) {
        case "first":
          this.$http
            .get(this.$store.state.url + "selectnotapproved", { page: value })
            .then(res => {
              console.log(res);
              console.log(res.data);
              this.tableDataR = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          break;
        case "second":
          this.$http
            .get(this.$store.state.url + "selectapproved", { page: value })
            .then(res => {
              console.log(res);
              this.tableDataD = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          break;
        case "third":
          this.$http
            .get(this.$store.state.url + "selectall", { page: value })
            .then(res => {
              console.log(res);
              console.log(res.data);
              this.tableData = res.data;
            })
            .catch(res => {
              console.log(res);
            });
          break;
      }
      console.log(value);
    }
  },
  mounted() {
    this.$http
      .get(this.$store.state.url + "selectnotapproved")
      .then(res => {
        console.log(res);
        this.tableDataR = res.data;
      })
      .catch(res => {
        console.log(res);
      });
  }
};
</script>
<style scoped>
/* .FDshetuan {
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
.el-table-column {
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.TBfoot {
  float: right;
  margin-top: 10px;
  margin-right: 40px;
}
</style>