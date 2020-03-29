<template>
  <div class="Laboratory">
    <el-table :data="tableData" style="width: 95%;margin:0 auto">
      <el-table-column v-for="(col,index) in showCols" :key="index" :label="col.label" :prop="col.prop">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="170">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editJC(scope.$index,tableData)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
          <!-- <el-button @click.native.prevent="findEquipment(scope.$index,tableData)" type="text" size="small">查看设备</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- <TBfoot class="TBfoot" :value="TBvalue" :options="TBoptions" ref="t1" @change="change"></TBfoot> -->
    <div @click="addnewTr" style="cursor: pointer;width:200px;margin:0 auto">
      <svg class="icon JC_icon" aria-hidden="true">
        <use xlink:href="#icon-jiahao"></use>
      </svg>
      <label class="labadd">添加实验室</label>
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
      url: this.$store.state.YYurl,
      tableData: [],
      TBvalue: 1,
      TBoptions: [],
      showCols: [
        {
          label: "ID",
          prop: "id"
        },
        {
          label: "实验室名称",
          prop: "name"
        },
        {
          label: "实验室地点",
          prop: "place"
        },
        {
          label: "总设备数量",
          prop: "equip_num"
        },
        {
          label: "设备",
          prop: "equip_name"
        },
        {
          label: "最大容量",
          prop: "stu_num"
        },
        {
          label: "实验室规则",
          prop: "rule"
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
      this.$router.push({ path: "/tch_yuyue/add_shi" });
    },
    deleteRow(index, rows) {
      this.$http
        .delete(this.$store.state.url + "appointment/manager/lab/" + rows[index].id,this.config)
        .then(res => {
          console.log(res);
          this.$http
            .get(this.$store.state.url + "appointment/lab",this.config)
            .then(res => {
              console.log(res.data);
              let getData = res.data;
              for (let i = 0; i < res.data.length; i++) {
                this.$http
                  .get(this.$store.state.url + "appointment/manager/lab/" + getData[i].id,this.config)
                  .then(res => {
                    console.log(res);
                    this.tableData=[];
                    this.tableData.push(res.data);
                  })
                  .catch(res => {
                    console.log(res);
                  });
              }
            })
            .catch(res => {
              console.log(res);
            });
        })
        .catch(res => {
          console.log(res);
        });
    },
    editJC(index, table) {
      console.log(index);
      this.$router.push({
        path: "/tch_yuyue/add_shi",
        query: { text: table[index] }
      });
    },
    // findEquipment(index, table) {

    //   this.$router.push({
    //     path:'/tch_yuyue/shebei',
    //     query:{}
    //   })
    // }
  },
  mounted() {
    this.config.headers.Authorization=sessionStorage.Authorization;
    sessionStorage.setItem('nowActive',this.$route.query.opt)
    this.$http
      .get(this.$store.state.url + "appointment/lab",this.config)
      .then(res => {
        console.log(res.data);
        let getData = res.data;
        for (let i = 0; i < res.data.length; i++) {
          this.$http
            .get(this.$store.state.url + "appointment/manager/lab/" + getData[i].id,this.config)
            .then(res => {
              console.log(res);
              this.tableData.push(res.data);
            })
            .catch(res => {
              console.log(res);
            });
        }
      })
      .catch(res => {
        console.log(res);
      });

    $(".Laboratory").css("height", document.body.clientHeight - 50 + "px");
  }
};
</script>
<style scoped>
/* .Laboratory {
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
/* .Laboratory {
  background-color: white;
  width: 87%
  float: right;
  margin: 0;
  border: 0;
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
