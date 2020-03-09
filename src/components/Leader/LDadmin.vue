<template>
  <div class="LDstu">
    <h2>{{title}}</h2>
    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="title" label="职务" width="180">
      </el-table-column>`
      <el-table-column prop="name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="电话">
      </el-table-column>
      <el-table-column prop="officeLocation" label="办公室位置">
      </el-table-column>
      <el-table-column prop="availability" label="是否再办公室">
      </el-table-column>
       <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button @click.native.prevent="outline(scope.$index, tableData)" type="text" size="small">下线</el-button>
            </template>
          </el-table-column>
    </el-table>
  </div>

</template>
<script>
import store from "@/vuex/store";
export default {
  store,
 watch:{
  $route(to,from){
    console.log(to.query.opt);
    this.$http.get(this.$store.state.url +'returnleaderbyindex',{
      params:{
        index:to.query.opt,
      }
    })
    .then(response=>{
      console.log(response)
      console.log(response.data)
      this.tableData=response.data
            for(let i=0;i<this.tableData.length;i++){
        if(this.tableData[i].availability==1)
        {
          this.tableData[i].availability="是";
        }
        else{
          this.tableData[i].availability="否";
        }
      }
    })
    .catch((error)=>{
      console.log(error)
    })
  }
},
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    outline(index,tabledata){
              this.$http
        .post(this.$store.state.url + "leader/leaderoffline", qs.stringify({
            name:tabledata[index].name
        }),this.config)
        .then(res => {
          console.log(res);
          if (res.data == 1) this.flag = true;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  data() {
    return {
      tableData: [

      ],
      title: null,
      TilteIndex: [
        "计算机系领导",
        "系办公室",
        "系党委学生工作办公室",
        "计算机科学与技术教研室",
        "软件工程教研室",
        "网络工程教研室",
        "信息安全教研室"
      ]
    };
  },
  mounted() {
    console.log(this.$route.query.opt);
    console.log(this.TilteIndex);
    this.$http.get(this.$store.state.url +'returnleaderbyindex',{
      params:{
        index:0,
      }
    })
    .then(res=>{
      console.log(res)
      console.log(res.data)
      this.tableData=res.data
      for(let i=0;i<this.tableData.length;i++){
        if(this.tableData[i].availability==1)
        {
          this.tableData[i].availability="是";
        }
        else{
          this.tableData[i].availability="否";
        }
      }

    })
    .catch(res=>{
      console.log(res)
    })
  }
};
</script>
<style scoped>
/* .LDstu {
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
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
