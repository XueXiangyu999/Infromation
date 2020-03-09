<template>
    <div>
        <router-view/>
        <div id="tch_guanli">
            <p class="guanli_top">已发布的信息:</p>
             <el-table style=" width: 90%;margin: 0 auto;"
                    :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    :cell-style="{padding:'0'}"
                    >
                     <el-table-column type="index" width="50" align="center">    
                    </el-table-column>
                    <el-table-column label="截止日期" prop="deadline" width="100" align="center" sortable>    
                    </el-table-column>
                    <el-table-column label="文件标题"  width="150" align="center" show-overflow-tooltip> 
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
                    </el-table-column>
                    <el-table-column label="下载/填写" align="center">
                        <template slot-scope="scope" width="">
                            <div v-if="scope.row.delete==false">
                                <div v-if="scope.row.type===1">
                                    <el-button type="success" plain
                                    size="mini" 
                                    @click="dialogFormVisible = true;saveform(scope.row)">填写
                                    </el-button>


                                    <el-dialog title="请完成信息填写" :visible.sync="dialogFormVisible" id="bd_input" :close-on-click-modal="false">
                                        <el-form :model="dynamicValidateForm"  label-width="100px" class="demo-dynamic">
                                            <el-form-item
                                                v-for="(domain, index) in dynamicValidateForm.domains"
                                                :label="domain.name"
                                                :key="domain.key"
                                                :prop="'domains.' + index + '.value'"
                                                style="color:red;margin-right:20px;margin-bottom:0;"
                                            >
                                                <el-input v-model="domain.value" ></el-input>
                                                <p style="margin:5px;font-size:0.85em;line-height: 16px;">*{{domain.bz}}</p>
                                            </el-form-item>
                                        </el-form>



                                        <!-- <el-form :model="form">
                                            <!-- <el-form-item label="活动名称" :label-width="formLabelWidth">
                                            <el-input v-model="form.name" autocomplete="off"></el-input>
                                            </el-form-item> -->
                                            
                                        <!-- </el-form>  -->
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                                            <el-button type="primary" @click="dialogFormVisible = false;submitbd(scope.row.id)">提 交</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                                <div v-else>
                                    <el-link 
                                    type="primary"
                                    :underline="false"
                                    :href="path+'/collection/downloadTemplate?id='+scope.row.collection"
                                    style="font-size:0.85em"
                                    >下载
                                    </el-link>
                                    <!-- <el-button type="primary" plain
                                    size="mini"
                                    @click="download(scope.row.id)">下载</el-button> -->
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="scope.row.type===1">
                                    <el-button type="success" plain
                                    size="mini" 
                                    disabled
                                    >填写
                                    </el-button>
                                    
                                </div>
                                <div v-else>
                                    <el-button type="text" 
                                    size="mini"
                                    @click="download(scope.row.id)"
                                    disabled>下载</el-button>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="上传" key="scope.row.name"  width="200" align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.delete==false">
                                <div v-if="scope.row.type==1">
                                    <el-alert
                                        title="填写后提交"
                                        type="info"
                                        :closable="false"
                                        show-icon>
                                    </el-alert>
                                </div>
                                <div v-else>
                                    
                                        <el-upload
                                        class="upload-demo"
                                        :headers="header"
                                        :action="action"
                                        :data="uploadData"
                                        :on-preview="handlePreview"
                                        :on-remove="function(file,fileList){return handleRemove(file,fileList,scope.$index)}"
                                        :on-success="function(res,file,fileList){return handleSuccess(res,file,fileList,scope.$index)}"
                                        multiple
                                        :limit="1"
                                        :file-list="fileList[scope.$index]"
                                        :show-file-list='false'>
                                        <el-button size="small" type="text" v-if="!scope.row.file" @click="saveid(scope.row.id)">上传文件</el-button>
                                        </el-upload>


                                    
                                </div>
                            </div>
                            <div v-else>
                                <div v-if="scope.row.type==1">
                                    <el-button type="success" size="small" disabled>提交</el-button>
                                </div>
                                <div v-else>
                                    <el-button size="small" type="text" v-if="!scope.row.file" @click="saveid(scope.row.id)" disabled>上传文件</el-button>
                                </div>
                            </div>
                        </template>
                        <!-- <template slot-scope="scope" width="" v-else>
                            <el-button
                            size="mini">上传</el-button>
                        </template> -->
                    </el-table-column>
                    <el-table-column label="提交状态" width="170" align="center"> 
                        <template slot-scope="scope" width="">
                            <div v-if="scope.row.delete">
                                <el-alert
                                
                                    title="发布人已删除"
                                    type="error"
                                    :closable="false"
                                    show-icon>
                                </el-alert>
                            </div>
                            <div v-else>
                                <div v-if="scope.row.submit==false">
                                    <el-alert
                                    title="未提交"
                                    type="warning"
                                    :closable="false"
                                    show-icon>
                                </el-alert>
                                </div>
                                <div v-else>
                                    <el-alert
                                    title="已提交"
                                    type="success"
                                    :closable="false"
                                    show-icon>
                                </el-alert>
                                </div>
                            </div>
                            <!-- <div v-if="scope.row.zhuangtai">
                                <el-alert
                                    title="提交成功"
                                    type="success"
                                    :closable="false"
                                    show-icon>
                                </el-alert>
                            </div>
                            <div v-else>
                                <el-alert
                                    title="未提交"
                                    type="warning"
                                    :closable="false"
                                    show-icon>
                                </el-alert>
                            </div> -->
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
        fileList: [[]],
        tableData3: [],
        action: ``,
        uploadData: {},
        header:'',
        path:'',
        formLabelWidth: '120px',
        dialogFormVisible: false,
        currentPage:1, //初始页
        pagesize:10,    //   每页的数据
        userList: [],
        dynamicValidateForm: {
          domains: [{
          }],
        },
      }
    },
    components: { 
      leftNav,
    },
    created() {
        this.handleUserList()
    },
    methods: {
         handleSuccess (res, file, fileList, index) {
             this.$message({
            message: '您已成功上传'+'     '+file.name+'      '+"文件",
            type: 'success'
            });
      if (res.code) {
        // this.tableData3[index].file = res.data.url
      }
      // 上传之后,把返回的fileList赋值给对应组件的fileList
      this.fileList[index] = fileList
    },
        handlePreview (file) {

    },

     setTable () {
      this.tableData3 = [{
        name: '',
        date: '',
        amount: null,
        file: ''
      }]
    },

    // 删除图片
    handleRemove (file, fileList, index) {
      this.tableData3[index].file = ''
    },


        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },
        handleUserList() {
            // this.$http.get('http://localhost:3000/userList').then(res => {  //这是从本地请求的数据接口，
            //     this.userList = res.body
            // })
        },

        //表单提交
        submitbd(id){
            var jc=0
            this.dynamicValidateForm.domains.forEach(function(item,index){
                console.log(item)
                if(item.value==''||item.value==null){
                    jc=1
                }
            })
            if(jc==0){
            console.log(this.dynamicValidateForm.domains)
            var params={
                "id":id,
                "context":JSON.stringify(this.dynamicValidateForm.domains)
            }
            
            var Authorization=this.$store.state.user.Authorization
            $.ajax({
            url:sessionStorage.getItem('path')+'/collection/submitFieldStatistics',
            data : params, 
            dataType: "json",
            type : "post",
            async : false,
            headers:{'Authorization':Authorization},
            success:function (msg) {
               
            },
            error : function(){
                alert('服务器错误');
            }
            })
            }
            else{
                this.$notify({
                    title: '警告',
                    message: '请完善信息',
                    type: 'warning'
                    });
                    this.dialogFormVisible=true
            }
        },

        //文件上传
        saveid(id){
            this.action=sessionStorage.getItem('path')+'/collection/submitFileStatistics'
            this.uploadData={"id":id}
        },

        //文件下载
        download(data){
        
        },
        saveform(array){
           this.dynamicValidateForm.domains=$.parseJSON(array.field)
        }
    },
    created:function(){
         this.setTable()
    this.$store.commit('loginStatus',sessionStorage.getItem('isLogin'));
    if(this.$store.state.user.isLogin==0){
        this.$router.push('/login')
    }

        var params={"uid":this.$store.state.user.id}
        var Authorization=this.$store.state.user.Authorization
        $.ajax({
        url:sessionStorage.getItem('path')+'/collection/getStatisticsByUid',
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
    mounted:function(){
        this.userList=$.extend(true, [], userform);
        this.path=sessionStorage.getItem('path')
        this.header={Authorization:this.$store.state.user.Authorization}
    }
}
</script>

<style>
#tch_guanli{
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
.guanli_top{
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

#bd_input{
    text-align: left;
}
</style>
