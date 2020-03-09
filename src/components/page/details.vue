<template>
    <div class="Ddisplsy">
        <el-table class="Dtable" :data="tableData" style="width: 100%">
            <el-table-column v-for="col in cols" :width="col.width" :key="col.prop" :prop="col.prop" :label="col.label" >
            </el-table-column>
        </el-table>
        <el-button type="primary" @click="back">返回</el-button>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        cols:[]
      }
    }, 
    methods:{
      back(){
        this.$router.go(-1)
      }
    },
    mounted(){
        let table=this.$route.params.table;
        this.cols=this.$route.params.cols;
        this.tableData.push(table)
    }
  }
</script>
<style scoped>
    .Ddisplsy{
        width:98%;
        margin:20px auto;
    }
    .Dtable{
        border-radius: 5px;
    }
    .el-table-column{
      min-height: 40px;
    }
    .el-button{
      margin: 20px auto;
      width:300px;
    }
</style>
