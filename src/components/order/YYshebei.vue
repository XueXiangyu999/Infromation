<template>
  <div class="Equipment">
    <el-table :data="tableData" style="width: 95%;margin:0 auto">
      <el-table-column v-for="(col,index) in showCols" :key="index" :label="col.label" :prop="col.prop" :width="col.width">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editJC(scope.$index,tableData)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <TBfoot class="TBfoot" :value="TBvalue" :options="TBoptions" ref="t1" @change="change"></TBfoot>
    <div @click="addnewTr" style="cursor: pointer;width:200px;margin:0 auto">
      <svg class="icon JC_icon" aria-hidden="true">
        <use xlink:href="#icon-jiahao"></use>
      </svg>
      <label class="labadd">添加一行</label>
    </div>
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
      tableData: [{}],
      TBvalue: 1,
      TBoptions: [],
      showCols: [
        {
          label: "ID",
          prop: "id",
          width: 100
        },
        {
          label: "设备类别",
          prop: "equCategory"
        },
        {
          label: "设备数量",
          prop: "equNum"
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
            Authorization: sessionStorage.Authorization,
            "Content-Type": "application/json"
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
                  Authorization: sessionStorage.Authorization,
                  "Content-Type": "application/json"
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
    findEquipment(index, table) {}
  }
};
</script>
<style scoped>
/* .Equipment {
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
</style>