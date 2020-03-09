<template>
    <div id="repassword_main">
        <p id="repassword_p">重置密码：</p>
        <div class="searchWord">
      <el-input v-model="search" style="display: inline-block;" 
        placeholder="请输入搜索信息">
      </el-input>
    </div>
    <div class="dormitoryData">
      <el-table
        ref="dormitoryTable"
        :data="tables"
        tooltip-effect="dark"
        height="440"
        stripe
        style="width: 100%">
        <el-table-column label="姓名" prop="name">
        </el-table-column>
        <el-table-column label="账号" prop="userName">
        </el-table-column>
        <el-table-column label="身份" prop="userType">   
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="120">
        <template slot-scope="scope">
            <el-button @click="dialogFormVisible = true;save_id(scope.row.id)"  type="primary" icon="el-icon-edit" size="mini" ></el-button>
                <el-dialog :modal-append-to-body='false' title="重置密码" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="设置密码" :label-width="formLabelWidth">
                        <el-input v-model="form.password" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false;repassword()">确 定</el-button>
                </div>
                </el-dialog>
        </template>
        </el-table-column>
      </el-table>
    </div>
    </div>
</template>

<script>
export default {
    name: 'Inf',
    data(){
      return{
        dialogFormVisible: false,
        form: {
            password:'',
            id:'',
            },
        formLabelWidth: '120px',
        dormitory: [{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:1,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:2,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:3,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:4,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:5,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:6,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:7,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:8,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:9,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:1,
            id:10,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:2,
            id:11,
        },{
            name:"张继锟",
            userName:201709000230,
            userType:2,
            id:12,
        },
        ],
        search: '',
      }
    },


    computed: {
      // 模糊搜索
      tables () {
        const search = this.search
        if (search) {
          return this.dormitory.filter(data => {

            return Object.keys(data).some(key => {

              return String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }
        return this.dormitory
      }
    },



    methods:{
        save_id(id){
            this.form.id=id
        },
        repassword(){
            if(this.form.password){
            console.log(this.form)
            var params=this.form
            var Authorization=this.$store.state.user.Authorization
            $.ajax({
            url:'http://47.95.246.40:8081/resetPassword',
            data:params,
            dataType: "json",
            type : "post",
            headers:{'Authorization':Authorization},
            success : function(msg){
                console.log(msg)    
            },
            error : function(){
                alert('服务器错误');
            }
        })
            }
            else{
                this.$notify({
                title: '警告',
                message: '请填写重置密码',
                type: 'warning'
                });
            }
        }
    },
    mounted:function(){
    this.$store.commit('loginStatus',sessionStorage.getItem('isLogin'))
    if(this.$store.state.user.isLogin==0){
        this.$router.push('/login');
    }
    var Authorization=this.$store.state.user.Authorization
    $.ajax({
            url:'http://47.95.246.40:8081/getAllUser',
            dataType: "json",
            type : "post",
            headers:{'Authorization':Authorization},
            success : function(msg){
                console.log(msg)    
            },
            error : function(){
                alert('服务器错误');
            }
        })
        this.dormitory.forEach(item => {
            if (item.userType==1) {
            item.userType="学生"
            }
            if (item.userType==2) {
            item.userType="教师"
            }
        })
        }
    
}
</script>

<style>
/* #repassword_main{
    background-color: rgba(255, 255, 255,0.9);
    margin-left: 15%;
    margin-top: 3%;
    width: 70%;
    min-width: 700px;
    text-align: left;
    padding: 3px 20px;
} */
#repassword_p{
    font-size: 1.2em;
    width: 100%;
    padding-bottom: 4px;
    border-bottom: 1px solid #ccc
}
</style>
