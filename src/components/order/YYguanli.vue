<template>
  <div class="YYguanli">
    <el-table :data="tableData" style="width: 95%;margin:0 auto" :cell-style="{padding:'3px'}">
      <el-table-column v-for="(col,index) in showCols" :key="index" :label="col.label" :prop="col.prop">

        <template slot-scope="scope">
          <div v-if="col.prop=='ISsubmit'||col.prop=='ISpass'">
            <!-- <div v-if="col.prop=='ISsubmit'">
              <el-switch v-model="tableData[scope.$index].ISsubmit" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </div> -->
            <div v-if="col.prop=='ISpass'">
              <el-switch v-model="tableData[scope.$index].ISpass" active-color="#13ce66" inactive-color="#ff4949">
              </el-switch>
            </div>
          </div>

          <div v-else>
            <p>{{tableData[scope.$index][col.prop]}}</p>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <TBfoot class="TBfoot" :value="TBvalue" :options="TBoptions" ref="t1" @change="change"></TBfoot>
  </div>
</template>
<script>
import store from "@/vuex/store";
import TBfoot from "@/components/common/table_footer";
export default {
  store,
  components: {
    TBfoot
  },
  data() {
    return {
      tableData: [
        {
          id: 3,
          labName: "软件实验室",
          ISsubmit: true,
          ISpass: false,
          time: "2019-02-02"
        },
        {
          id: 4,
          labName: "软件实验室",
          ISsubmit: true,
          ISpass: false,
          time: "2019-02-02"
        },
        {
          id: 5,
          labName: "软件实验室",
          ISsubmit: true,
          ISpass: false,
          time: "2019-02-02"
        },
        {
          id: 6,
          labName: "软件实验室",
          ISsubmit: true,
          ISpass: false,
          time: "2019-02-02"
        }
      ],
      TBvalue: 1,
      TBoptions: [],
      showCols: [
        {
          label: "ID",
          prop: "id"
        },
        {
          label: "实验室名称",
          prop: "labName"
        },
        // {
        //   label: "是否已提交",
        //   prop: "ISsubmit",
        //   value: true
        // },
        {
          label: "是否已通过",
          prop: "ISpass",
          value: true
        },
        {
          label: "预约日期",
          prop: "time"
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
    change(value) {
      this.TBvalue = value;
    },

    addnewTr() {
      this.$router.push({ path: "/" });
    },
    deleteRow(index, rows) {
      this.$http
        .get(this.$store.state.url + "/", {
          params: {
            id: this.rows[index].tbmid
          },
          headers: {
            Authorization: sessionStorage.Authorization
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            alert("删除成功");
            this.$http
              .get(this.$store.state.url + "/", {
                params: {
                  tbmlab: this.valueJYS,
                  page: this.TBvalue[2]
                },
                headers: {
                  Authorization: sessionStorage.Authorization
                }
              })
              .then(res => {
                console.log(res);
                console.log(res.data);
                this.TBoptions[2] = [];
                for (let i = 1; i <= res.headers.rows; i++) {
                  this.TBoptions[2].push(i);
                }
                this.$refs.t1.setToptions(this.TBoptions[2]);
                this.$refs.t1.setTvalue(1);
                this.tableDataJYS = res.data;
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
    editJC(index, table) {
      console.log(index);
      this.$router.push({
        path: "/tch_jiaocai/edit",
        query: { text: table[index].tbmid }
      });
    },
    findEquipment(index, table) {},
    mounted() {}
  }
};
</script>
<style scoped>
/* .YYguanli {
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
.JC_icon {
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
p {
  margin: 0;
}
</style>
