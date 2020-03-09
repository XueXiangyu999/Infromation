<template>
    <div id="tch_qingjia_main">
        <div id="tch_qingjia_fenye">
            <el-tabs v-model="activeName" tab-position="left" style="padding-top:40px;">
                <el-tab-pane label="请假历史" name="first">
                    <el-table style=" width: 90%;margin: 0 auto;"
                    :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)">
                     <el-table-column type="index" width="100">    
                    </el-table-column>
                    <el-table-column label="请假日期" prop="date" width="200">    
                    </el-table-column>
                    <el-table-column label="请假教师" prop="name" width="200">    
                    </el-table-column>
                </el-table>
                <el-pagination
                    id="fenye"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="userList.length">    
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="请假" name="second">
                    <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="请假理由">
                            <el-input type="textarea" v-model="form.liyou"></el-input>
                        </el-form-item>
                        <el-form-item label="请假时长">
                            <el-select v-model="form.time" placeholder="请选择请假时长">
                            <el-option label="1天" value="1"></el-option>
                            <el-option label="2天" value="2"></el-option>
                            <el-option label="3天及3天以上" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="返校时间">
                            <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
                            </el-col>
                        </el-form-item>
                        <el-form-item label="本人电话">
                            <el-input v-model="form.telephone1"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                            <el-button @click="dele">删除</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="班主任审核" name="third">
                    <el-table
                            :data="tableData_bzr"
                            style="margin:0 auto"
                            max-height="400px">
                            <el-table-column
                            align="center"
                            fixed
                            prop="date"
                            label="提交日期"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="name"
                            label="提交学生"
                            width="150">
                            </el-table-column>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="shenhe"
                            label="审核状态"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            label="查看"
                            width="150">
                            <template slot-scope="scope">
                                <el-button 
                                type="text"
                                size="small">
                                <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                                下载
                                </el-button>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            label="审核"
                            width="150">
                            <template slot-scope="scope">
                                <el-button 
                                size="small">
                                <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                                审核通过
                                </el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                </el-tab-pane>
                <el-tab-pane label="辅导员审核" name="fourth">
                    <el-table
                            :data="tableData_fdy"
                            style="margin:0 auto"
                            max-height="400px">
                            <el-table-column
                            align="center"
                            fixed
                            prop="date"
                            label="提交日期"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="name"
                            label="提交学生"
                            width="150">
                            </el-table-column>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="shenhe"
                            label="审核状态"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            label="查看"
                            width="150">
                            <template slot-scope="scope">
                                <el-button 
                                type="text"
                                size="small">
                                <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                                下载
                                </el-button>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            label="审核"
                            width="150">
                            <template slot-scope="scope">
                                <el-button 
                                size="small">
                                <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                                审核通过
                                </el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                </el-tab-pane>
                <el-tab-pane label="特殊审核" name="fifth">
                    <el-table
                            :data="tableData_ts"
                            style="margin:0 auto"
                            max-height="400px">
                            <el-table-column
                            align="center"
                            fixed
                            prop="date"
                            label="提交日期"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="name"
                            label="提交学生"
                            width="150">
                            </el-table-column>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            prop="shenhe"
                            label="审核状态"
                            width="150">
                            </el-table-column>
                            <el-table-column
                            align="center"
                            label="查看"
                            width="150">
                            <template slot-scope="scope">
                                <el-button 
                                type="text"
                                size="small">
                                <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                                下载
                                </el-button>
                            </template>
                            </el-table-column>
                            <el-table-column
                            align="center"
                            label="审核"
                            width="150">
                            <template slot-scope="scope">
                                <el-button 
                                size="small">
                                <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                                审核通过
                                </el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
data() {
      return {
        activeName: 'first',
        currentPage:1, //初始页
        pagesize:10,    //   每页的数据
         form: {
          liyou: '',
          time:'',
          date:'',
          telephone1:'',
          
        },
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
        ],
        tableData_bzr:[
            {
                date:'3',
                name:'33',
                shenhe:'',
            }
        ],
        tableData_fdy:[
            {
                date:'2',
                name:'22',
                shenhe:'',
            }
        ],
        tableData_ts:[
            {
                date:'1',
                name:'11',
                shenhe:'',
            }
        ],
      }
    },
    methods: {
      onSubmit() {
        
      },
      dele(){
          this.form.liyou='',
          this.form.time='',
          this.form.date='',
          this.form.telephone1=''

      },
        handleCurrentChange: function(currentPage){
            this.currentPage = currentPage;
            console.log(this.currentPage)  //点击第几页
        },
    },
    mounted:function(){
    if(sessionStorage.getItem("isLogin")==null||sessionStorage.getItem("isLogin")==false){
      this.$router.push('/login');
    }
    },
}
</script>

<style>
/* #tch_qingjia_main{
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
#tch_qingjia_fenye{
    width: 90%;
    margin: 40px auto;

}

</style>

