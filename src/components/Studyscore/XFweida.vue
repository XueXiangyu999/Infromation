<template>
    <div class="dabiao">
        <h2>未达标学生</h2>
        <el-button type="primary">下载</el-button>
        <div class="WD_table">
        <p>预览</p>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="学号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table></div>
    </div>
</template>

<script>
import store from "@/vuex/store";
export default {
 data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }

};
</script>
<style scoped>
/* .dabiao {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 70%;
  border-radius: 10px;
  float: right;
  min-width: 400px;
  min-height: 400px;
  margin-right: 100px;
  margin-top: 100px;
  position: relative;
} */
.el-button {
  position: absolute;
  top: 10px;
  right: 30px;
}
.WD_table{
    margin: 0 auto;
    width: 90%;
}
.WD_table p {
  font-size: 1.2em;
  color: #8086e9;
  float: left;
  margin: 0;
}
</style>
