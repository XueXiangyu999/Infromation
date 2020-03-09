<template>
    <div id="kaoshi_main">
        <div id="kaoshi_fenye">
            <el-tabs v-model="activeName">
                <el-tab-pane label="约考文件" name="first">
                    <div class="left_right" style="float:left"> 
                        <p>约考文件模板：</p>
                        <div id="kaoshi_muban">
                            <img src="..\..\assets\img\yuekao\word-iocn.png" style="float:left;width:100px;margin-top:10px;display:inline_block">
                            <p style="width:120px;float:left;">2019上半年约考文件模板</p>
                            <el-button type="primary" size="mini" style="float:right;margin-right:25px">下载<i class="el-icon-download el-icon--right"></i></el-button>
                        </div>
                    </div>
                    <div style="float:right">
                        <p>约考文件上传：</p>
                        <el-upload
                        class="upload-demo"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        style="width:100%"
                        >
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="接收文件" name="second">
                    <el-table style=" width: 90%;margin: 0 auto;"
                    :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    @selection-change="handleSelectionChange"
                    tooltip-effect="dark"
                    >
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column 
                        type="index" 
                        width="55">    
                        </el-table-column>
                        <el-table-column
                        label="上传日期"
                        width="120">
                        <template slot-scope="scope">{{ scope.row.date }}</template>
                        </el-table-column>
                        <el-table-column
                        prop="name"
                        label="上传教师"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop=""
                        label="约考科目"
                        width="120"
                        show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column label="下载操作">
                        <template slot-scope="scope" width="120">
                            <el-button
                            size="mini">下载</el-button>
                        </template>
                    </el-table-column>
                    </el-table>
                    <el-pagination
                    id="fenye"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="userList.length"
                    style="margin-top:10px;">    
                    </el-pagination>
                    <el-button 
                    type="primary" 
                    round 
                    style="float:right;margin-top:-30px;margin-right:40px;" 
                    size="small"
                    @click="">下载选中项
                    </el-button>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
data() {
      return {
        currentPage:1, //初始页
        pagesize:10,    //   每页的数据
        activeName: 'first',
        userList: [
            {
                date:'2019-7-24',
                name:'测试1',
                style:'excel',
                // url:
            },
            {
                date:'2019-7-24',
                name:'测试2',
                style:'excel',
            },
            {
                date:'2019-7-24',
                name:'测试3',
                style:'excel',
            },
            {
                date:'2019-7-24',
                name:'测试4',
                style:'excel',
            },
            {
                date:'2019-7-24',
                name:'测试5',
                style:'excel',
            },
            {
                date:'2019-7-24',
                name:'测试6',
                style:'excel',
            },
            {
                date:'2019-7-24',
                name:'测试7',
                style:'excel',
            },
            {
                date:'2019-7-24',
                name:'测试8',
                style:'excel',
            },
            {
                date:'2019-7-24',
                name:'测试9',
                style:'excel',
            },
            {
                date:'2019-7-24',
                name:'测试10',
                style:'excel',
            },
            {
                date:'2019-7-24',
                name:'测试11',
                style:'excel',
            },
        ]
      };
    },
    methods: {
      handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    mounted:function(){
    if(sessionStorage.getItem("isLogin")==null||sessionStorage.getItem("isLogin")==false){
      this.$router.push('/login');
    }
    },
}
</script>

<style>
#kaoshi_main{
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
}
#kaoshi_fenye{
    width: 90%;
    margin: 40px auto;

}
#kaoshi_muban{
    width: 240px;
    height: 120px;
    border: 1px solid #ccc;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .22), 0 0 6px rgba(0, 0, 0, .14);
}
.left_right{
    width: 50%;
    height: 200px;
}
</style>
