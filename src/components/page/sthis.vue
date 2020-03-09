<template>
  <div class="FDshetuan">
    <el-table :data="tableData" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}" >
      <el-table-column show-overflow-tooltip v-for="col in ShetuanCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editJC(scope.$index,tableData)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="details(scope.$index,tableData)" type="text" size="small">详情</el-button>
          
        </template>
      </el-table-column>
    </el-table>
    <TBfoot class="TBfoot" :value="TBvalue" :options="TBoptions" @change="change"></TBfoot>
    <Details v-if="flag_details" @success="detailsCancel" :detailsData="rows" :detailsName='ShetuanCols'></Details>
  </div>
</template>
<script>
import store from "@/vuex/store";
import TBfoot from "@/components/common/table_footer";
import Details from "@/components/common/details";
import Myhtml from "@/components/common/Myhtml";

export default {
  store,
  components: {
    Myhtml,
    TBfoot,
    Details
  },
  data() {
    return {
      flag_details: false,
      rows: null,
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
        },
        {
          prop: "cterm",
          label: "学期",
          width: "160"
        }
      ],
      tableData: [
        {
          cname: "fdas",
          cplan:`<p>发射点发士大夫艰苦拉萨地方就是打卡练腹肌十大风口浪进啊撒旦风口浪尖啊是打卡练腹肌阿萨的饭卡是打卡练腹肌阿萨的开发接口</p><p>福建师大开发建设的付款了士大夫看见ask砥砺奋进ask代理费校色解放了富士达s'd机而富士康的分解啊撒富士康的</p><p>发是打卡练腹肌ask到了放假<img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/40/pcmoren_tian_org.png" alt="[舔屏]" data-w-e="1">打法师傅十大富士达十大十大<img src="http://img.t.sinajs.cn/t4/appstyle/expression/ext/normal/3c/pcmoren_wu_org.png" alt="[污]" data-w-e="1">sd阿斯蒂<span style="text-decoration-line: line-through;">芬阿瑟东</span></p>`,
          cbudget:"44",
          cterm:"2018-1",
          crecord:'通过'
        }
      ],
      tableDataShow:[

      ],
      TBvalue: 1,
      TBoptions: []
    };
  },
  methods: {
    selectAll() {
      this.$http
        .get(this.$store.state.url + "/club/selectall", { page: 1 })
        .then(res => {
          console.log(res);
          console.log(res.data);
          for (let i = 1; i <= res.data; i++) {
            this.TBoptions.push(i);
          }
          this.tableData = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    },
    deleteRow(index, rows) {
      console.log(this.tableData[index].cid);
      this.$http
        .get(this.$store.state.url + "/club/deleteone", {
          params: {
            cid: this.tableData[index].cid
          }
        })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            rows.splice(index, 1);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    detailsCancel() {
      this.flag_details = false;
    },
    editJC(index) {
      console.log(index);
      this.$router.push({
        path: "/std_shetuan/add",
        query: {text: this.tableData[index].cid }
      });
    },
    details(index, table) {
      console.log(table[index])
      this.rows = table[index];
      this.flag_details = true;
    },

    change(value) {
          this.$http
            .get(this.$store.state.url + "/club/selectnotapproved", {
              page: value
            })
            .then(res => {
              this.tableData = res.data;
            })
            .catch(res => {
              console.log(res);
            });
      }
  },
  mounted() {
    for(let i=0;i<this.tableData.length;i++){
      console.log(this.tableData[i].cplan)
      let str=this.tableData[i].cplan;
      

    }
    this.$http
      .get(this.$store.state.url + "club/selectbynum", {
        params: {
          cpnum: "201701001123"
        }
      })
      .then(res => {
        console.log(res);
        this.tableData = res.data;
        
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