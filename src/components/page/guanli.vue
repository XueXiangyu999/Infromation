<template>
    <div>
        <div id="tch_release">
            <p class="release_top">已发布的信息:</p>
            <el-table style=" width: 90%;margin: 0 auto;"
                    :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)">
                     <el-table-column type="index" width="50" align="center">    
                    </el-table-column>
                    <el-table-column label="截止日期" prop="deadline" width="150" align="center">    
                    </el-table-column>
                    <el-table-column label="文件标题"  width="200" align="center" show-overflow-tooltip> 
                        <template slot-scope="scope">
                            <span>{{ scope.row.title }}</span>
                        </template>   
                    </el-table-column>
                    <el-table-column label="上传形式"  width="100" align="center"> 
                        <template slot-scope="scope" width="">
                            <div v-if="scope.row.type==1">表单</div>
                            <div v-if="scope.row.type==2">文件</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="提交人数"  width="100" align="center"> 
                        <template slot-scope="scope" width="">
                            <div v-if="scope.row.type==scope.row.template" style="color:#67C23A">{{scope.row.type}}/{{scope.row.type}}</div>
                            <div v-else style="color:#F56C6C">{{scope.row.type}}/{{scope.row.type}}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="下载操作" align="center">
                        <template slot-scope="scope" width="">
                            <el-button
                            size="mini">下载</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="文件状态"  width="" align="center">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.delete==false" type="success">已发布</el-tag>
                            <el-tag v-else type="danger">已删除</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="删除/恢复操作"  width="" align="center">
                        <template slot-scope="scope">
                            <el-button
                            v-if="scope.row.delete==false"
                            size="mini"
                            type="danger"
                            @click="delete_field(scope.row.id)"
                            >删除</el-button>
                            <el-button
                            v-else
                            size="mini"
                            type="warning"
                            @click="recover_field(scope.row.id)"
                            >恢复文件</el-button>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="下载" prop="load" width="100">    
                    </el-table-column>
                    <el-table-column label="删除" prop="delete" width="100">    
                    </el-table-column> -->
             </el-table> 
                <el-pagination
                    id="fenye"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    layout="total, prev, pager, next, jumper"
                    :total="userList.length">    
                </el-pagination>
                <el-button type="primary" round style="display: inline-block;margin-top:10px;margin-left:100px;" size="small" @click="gorelease">上传新表单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import leftNav from '@/components/page/left_nav'
export default {
    name: 'tch_release',
    data(){
      return{
        path:'',
        currentPage:1, //初始页
        pagesize:10,    //   每页的数据
        userList:[],
      }
    },
    components: { 
      leftNav,
    },
    created() {
        this.handleUserList()
    },
    methods: {
        delete_field(msg){        //删除文件
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params={"id":msg}
          console.log(params)
          var Authorization=this.$store.state.user.Authorization
          $.ajax({
            url:sessionStorage.getItem('path')+'/collection/deleteRelease',
            data : params, 
            dataType: "json",
            type : "post",
            async : false,
            headers:{'Authorization':Authorization},
            success:function (msg) {
              console.log(msg)  
            },
            error : function(){
                alert('服务器错误');
            }
          })
          this.$message({
                    type: 'success',
                    message: '删除成功!   刷新后查看'
                });


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        },
        recover_field(msg){        //恢复文件
            this.$confirm('此操作将恢复该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var params={"id":msg}
          console.log(params)
          var Authorization=this.$store.state.user.Authorization
          $.ajax({
            url:sessionStorage.getItem('path')+'/collection/recoverRelease',
            data : params, 
            dataType: "json",
            type : "post",
            async : false,
            headers:{'Authorization':Authorization},
            success:function (msg) {
              console.log(msg)  
            },
            error : function(){
                alert('服务器错误');
            }
          })
          this.$message({
                    type: 'success',
                    message: '恢复成功!   刷新后查看'
                });


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消恢复'
          });          
        });
        },
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage; 
        },
        handleUserList() {
            // this.$http.get('http://localhost:3000/userList').then(res => {  //这是从本地请求的数据接口，
            //     this.userList = res.body
            // })
        },
        gorelease(){
            this.$router.push('/tch_release/release');
        }
    },
    mounted:function(){
        this.userList=$.extend(true, [], userform);
    },
    created:function(){

    this.$store.commit('loginStatus',sessionStorage.getItem('isLogin'));
    if(this.$store.state.user.isLogin==0){
        this.$router.push('/login')
    }
    
    var params={"author":this.$store.state.user.id}
          var Authorization=this.$store.state.user.Authorization
          $.ajax({
            url:sessionStorage.getItem('path')+'/collection/getCollectionByAuthor',
            data : params, 
            dataType: "json",
            type : "post",
            async : false,
            headers:{'Authorization':Authorization},
            success:function (msg) {
              console.log(msg)
              window.userform=$.extend(true, [], msg);
            },
            error : function(){
                alert('服务器错误');
            }
          })


    },
}
</script>

<style>
/* #tch_release{
    background-color: rgba(255, 255, 255,0.9);
    margin-left: 20%;
    margin-top: 1%;
    width: 75%;
    height: 100%;
    text-align: left;
} */
.release_top{
    text-align: left;
    width: 90%;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 5px;
    border-bottom: solid 2px #ccc
}
/* .new_wj{
    display: inline-block;
    background-color: black;
    width: 30%;
    height: 150px;
    margin: 10px 1%
} */
/* 分页选择栏 */
#fenye{
    display: inline-block;
    margin-top: 10px; 
    margin-left: 5%;
    margin-bottom: 10px;
}
</style>
