<template>
  <div class="FDshetuanrenshi">
    <el-table :data="tableData" cell-style="padding:0" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">
      <el-table-column prop="name" label="社团名称">
      </el-table-column>
      <el-table-column prop="cpname" label="负责人">
      </el-table-column>
      <el-table-column prop="cpnum" label="负责人学号">
      </el-table-column>
      <el-table-column prop="description" label="描述">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click.native.prevent="editJC(scope.$index)" type="text" size="small">编辑</el-button>
          <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <TBfoot ref="t1" class="TBfoot" :value="TBvalue[0]" :options="TBoptions[0]" @change="change"></TBfoot>
    <el-button type="success" class="addclub" @click="dialogVisible=true">添加社团</el-button>
    <!-- <div @click="addnewTr" style="cursor: pointer;width:200px;margin:0 auto">
      <svg class="icon FD_icon" aria-hidden="true">
        <use xlink:href="#icon-jiahao"></use>
      </svg>
      <label class="labadd">添加社团负责人</label>
    </div> -->

    <!-- <el-dialog title="添加社团" :visible.sync="dialogFormVisible" >
      社团名称：
      <el-input v-model="clubName" placeholder="请输入社团名称"></el-input>
      社团描述：
      <el-input type="textarea" :rows="4" placeholder="请输入社团描述" v-model="textarea">
      </el-input>
    </el-dialog> -->
    <!-- <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
    <el-dialog title="添加社团" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :append-to-body='true' class="dialogui">
      <p>社团名称：</p>
      <el-input v-model="clubName" placeholder="请输入社团名称"></el-input>
      <p>社团描述：</p>
      <el-input type="textarea" :rows="4" placeholder="请输入社团描述" v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addClub">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
 <script>
import store from "@/vuex/store";
import qs from "qs";
import TBfoot from "@/components/common/table_footer";
export default {
  store,
  components: {
    TBfoot
  },
  data() {
    return {
      dialogVisible: false,
      textarea: null,
      clubName: null,
      tableData: [],
      TBvalue: [1],
      TBoptions: [1],
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },

  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    addClub() {
      this.$http.post(this.$store.state.url + "club/admin/insertClub",qs.stringify({
        name:this.clubName,
        description:this.textarea,
      }),this.config)
      .then(res=>{
        console.log(res)
        alert(res.data.msg)
      })
      .catch(res=>{
        console.log(res)
      })
      this.dialogVisible = false
    },
    addnewTr() {
      this.$router.push({ path: "/tch_fudaoyuan/addsr" });
    },
    deleteRow(index, rows) {
      console.log(this.tableData[index].cpid);
      this.$http
        .get(this.$store.state.url + "club/deleteprincipal", {
          params: {
            cpid: this.tableData[index].cpid
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
    editJC(index) {
      console.log(index);
      this.$router.push({
        path: "/tch_fudaoyuan/editsr",
        query: { text: this.tableData[index] }
      });
    },
    getClubnameBypage(index){
        this.$http.post(this.$store.state.url+'club/admin/getClubList',qs.stringify(
            {
              pageNum:index,
              limit:15,
            },
        ),this.config).then(res=>{
          console.log(res)
          this.tableData=res.data.list;
        }).catch(res=>{
          console.log(res)
        })
    },
    change(value) {
      switch (this.activeName) {
        case "first":
          break;
        case "second":
          break;
        case "third":
          break;
      }
      console.log(value);
    }
  },
  mounted() {

        this.config.headers.Authorization = sessionStorage.Authorization;

  this.getClubnameBypage(1);
    // this.$http
    //   .get(this.$store.state.url + "club/selectprincipal", {
    //     params: {
    //       page: 1
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.tableData = res.data;
    //   })
    //   .catch(res => {
    //     console.log(res);
    //   });
  }
};
</script>
<style scoped>
/* .FDshetuanrenshi {
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
.addclub {
  float: left;
  margin-left: 50px;
  margin-top: 20px;
}
.dialogui {
  text-align: left;
}
.dialogui > p {
  text-align: left;
}
</style>