<template>
    <div id="release">
        <div id="release_main">
            <div id="release_menu">
                <ul style="border-bottom:solid 1px #ccc">
                    <li id="release_wj" style="cursor:pointer" @click="click_left">上传文件</li>
                    <li id="release_bd" style="cursor:pointer" @click="click_right">创建表单</li>
                </ul>
            </div>
            <div id="menu_border"></div>
            <div id="release_wjbd_main">
                <div id="release_wj_main">
                    <form action="##" method="POST" id="release_1" onsubmit="return false">
                        <div class="demo-input-suffix">
                          文件标题：
                          <el-input
                            style="width:300px"
                            placeholder="标题"
                            v-model="title"
                            >
                          </el-input>
                        </div>
                        <p style="margin-top:30px">填写人员:
                          <el-cascader
                          @change="new_select"
                            v-model="select"
                            :options="options"
                            :props="props"
                            collapse-tags
                            clearable
                            style="margin-left:10px">
                          </el-cascader>
                        </p>
                        
                        <p style="margin-top:30px">截止日期：
                          <el-date-picker
                          v-model="jz_date"
                          type="date"
                          placeholder="选择日期"
                          @change="dateChange"
                          format="yyyy-MM-dd" 
                            value-format="yyyy-MM-dd" >
                        </el-date-picker>
                        </p>
                        <p style="margin-top:30px">上传模板：<input type="file" id="testfile"></p>
                        <p style="margin-top:30px"><el-button type="primary" :loading="false" id="release_fb" @click="release_1">确认上传</el-button></p>
                    </form>
                </div>
                <div id="release_bd_main">
                    <form action="##" method="POST" id="release_2" onsubmit="return false">
                       <div class="demo-input-suffix">
                          文件标题：
                          <el-input
                          style="width:300px"
                            placeholder="标题"
                            v-model="title">
                          </el-input>
                        </div>
                       <p>填写人员:
                          <el-cascader
                            @change="new_select"
                            v-model="select"
                            :options="options"
                            :props="props"
                            collapse-tags
                            clearable>
                          </el-cascader>
                        </p>
                        <p>截止日期：
                          <el-date-picker
                          v-model="jz_date"
                          type="date"
                          placeholder="选择日期"
                          @change="dateChange"
                          format="yyyy-MM-dd" 
                          value-format="yyyy-MM-dd" >
                        </el-date-picker>
                        </p>
                        <p>表单预览：<p>
                          <div>
                            <div id="new_bd">
                              <div class="demo">姓名:<input disabled="disabled" name="newli0" type="text"><span style="color:red">*请填写真实姓名</span><button value="0" type="button" class="delete_button" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">删除</button></div>
                            </div>
                            <!-- <el-button type="text" @click="dialogFormVisible = true">点击添加表单内容</el-button> -->
                            <el-button type="primary" @click="clear();dialogFormVisible = true" icon="el-icon-circle-plus-outline" style="margin-left:25%;margin-top:20px;">点击添加表单内容</el-button>
                            <el-dialog title="新建表单项" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
                              <el-form :model="form">
                                <el-form-item label="信息名称" :label-width="formLabelWidth">
                                  <el-input v-model="form.name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="信息备注" :label-width="formLabelWidth">
                                  <el-input v-model="form.beizhu" autocomplete="off"></el-input>
                                </el-form-item>
                              </el-form>
                              <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false;add_bd()">确 定</el-button>
                              </div>
                              </el-dialog>
                          </div>
                          <el-button-group id="release_last">
                            <el-button type="primary" icon="el-icon-delete" @click="bd_remove()">删除</el-button>
                            <el-button type="primary" icon="el-icon-upload" @click="release_2()">发布</el-button>
                          </el-button-group>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// location.reload()

var bd=new Array()


$(document).ready(function(){
  
  bd[0]={name:"姓名",bz:"请填写真实姓名",id:0}

  var index=1
window.addbd = function(name,beizhu){  //添加新的表单项
  if(name!=''){
    var newli='<div>'+name+':<input disabled="disabled" name="newli'+index+'" type="text"><span style="color:red">*'+beizhu+'</span><button type="button" value="'+index+'" class="delete_button" onclick="this.parentNode.parentNode.removeChild(this.parentNode)">删除</button></div>';
    $('#new_bd').append(newli); 
    $('#release_wjbd_main').height($('#release_wjbd_main').height()+40);
    // alert('1')
    bd.push({name:name,bz:beizhu,id:index})

    index++;
  }
  else {
    // alert('2')
  }
  // alert(newli)
  // alert(name+beizhu)
}


//删除表单项
$(document).on("click",'.delete_button',function(){
      var value=$(this).val();
　　　 var ind=0;
      for(var i in bd){
      if(bd[i].id==value){
        ind=i;
        break;
        }
      }
    bd.splice(ind,1);
    $('#release_wjbd_main').height($('#release_wjbd_main').height()-40);
　　})

window.bdremove=function(){          //重置表单
  $("#new_bd").children().remove()
  $('#release_wjbd_main').height(350)
}



})
export default {
    name:'release',
    data () {
      return {
        title:'',
        jz_date:'',

        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          beizhu: '',
        },
        formLabelWidth: '120px',
        value: '',

        props: { multiple: true },
        options: [{
          value: 1,
          label: '教师',
        }, {
          value: 2,
          label: '行政班级',
          children: []
        },{
          value:3,
          label:'专业班级',
          children:[]
        }],
        select:[]
      };
    },
    methods:{
      clear(){
        this.form.name=''
        this.form.beizhu=''
      },
      add_bd(){
        addbd(this.form.name,this.form.beizhu)
      },
      bd_remove(){
        bdremove()
      },

      //切换
      click_right(){
        $('#menu_border').animate({marginLeft:'140px'});
        $('#release_wj_main').animate({left:'-540px'});
        $('#release_bd_main').animate({left:'60px'});
      },
      click_left(){
        $('#menu_border').animate({marginLeft:'40px'});
        $('#release_wj_main').animate({left:'60'});
        $('#release_bd_main').animate({left:'100%'});
      },


        //日期格式转换
       dateChange(val) {
        this.jz_date = val;
      },

      new_select(){
        window.tch=0
        window.xz_class=[]
        window.zy_class=[]
        $.each(this.select,function(index,item){
          if(item[0]==1){
            tch=1
          }
          if(item[0]==2){
            xz_class.push(item[1])
          }
          if(item[0]==3){
            zy_class.push(item[1])
          }
          });
        console.log(this.select)
      },


      //文件表单提交
      release_1(){
        var path=0
        if(this.title && this.select.length!=0 && this.jz_date && $("#testfile")[0].files[0]){
        var Authorization=this.$store.state.user.Authorization 
        var title=this.title
        var target=JSON.stringify({
            "teacher":tch,
            "students": {
              "nature_class": xz_class,
              "major_class": zy_class
            }
          })
        var deadline=this.jz_date
        var file_obj=$("#testfile")[0].files[0]
        var fd = new FormData();
        fd.append('title', title)
        fd.append('target', target)
        fd.append('deadline', deadline)
        fd.append('file', file_obj);    
        $.ajax({
          url:sessionStorage.getItem('path')+'/collection/releaseFileCollection',
          data : fd, 
          async:false,
          type : "post",
          traditional : true,
          processData:false,
          contentType:false,
          dataType:"json",
          headers:{'Authorization':Authorization},
          success:function (msg) {
              path=1
            },
            error : function(){
                alert('服务器错误');
            }
        })
        }
        else{
          if(this.title==''){
            this.$message.error('请填写标题');
          }
          else{
            if(this.select.length==0){
              this.$message.error('请选择收件人信息');
            }
            else{
              if(this.jz_date=='' ||this.jz_date==null){
                this.$message.error('请选择截止日期');
              }
              else{
                if($("#testfile")[0].files[0]==null){
                  this.$message.error('请选择上传文件');
                }
              }
            }
          }
        }
        if(path==1){
          this.$router.push('/tch_Administration')
        }
      },

      release_2(){
        var path=0
        if(this.title && this.select.length!=0 && this.jz_date && bd[0]){
        var Authorization=this.$store.state.user.Authorization 
        var target=JSON.stringify({
            "teacher":tch,
            "students": {
              "nature_class": xz_class,
              "major_class": zy_class
            }
          })
          var field=JSON.stringify(bd)

        var title=this.title
        var deadline=this.jz_date
        var bdform = new FormData();
        bdform.append('title', title)
        bdform.append('target', target)
        bdform.append('deadline', deadline)
        bdform.append('field', field);
        $.ajax({
          url:sessionStorage.getItem('path')+'/collection/releaseFieldCollection',
          data : bdform, 
          async:false,
          type : "post",
          headers:{'Authorization':Authorization},
          dataType:"json",
          processData:false,
          contentType:false,
          success:function (msg) {
              path=1
            },
            error : function(){
                alert('服务器错误');
            }
        })
        }
        else{
          if(this.title==''){
            this.$message.error('请填写标题');
          }
          else{
            if(this.select.length==0){
              this.$message.error('请选择收件人信息');
            }
            else{
              if(this.jz_date=='' ||this.jz_date==null){
                this.$message.error('请选择截止日期');
              }
              else{
                if(bd[0]==null){
                  this.$message.error('请创建表单');
                }
              }
            }
          }
        }
        if(path==1){
          this.$router.push('/tch_Administration')
        }
      }
    },
    mounted:function(){
    this.$store.commit('loginStatus',sessionStorage.getItem('isLogin'));
    if(this.$store.state.user.isLogin==0){
        this.$router.push('/login')
    }
    var Authorization=this.$store.state.user.Authorization 
      $.ajax({
      headers: { Authorization: Authorization },
      url: sessionStorage.getItem("path") + "/userManagement/getNatureClass",
      dataType: "json",
      async: false,
      type: "post",
      success: function(msg) {
        window.options1 = $.extend(true, [], msg);
      },
      error: function() {
        alert("服务器错误");
      }
    });
    $.ajax({
      headers: { Authorization: Authorization },
      url: sessionStorage.getItem("path") + "/userManagement/getMajorClass",
      dataType: "json",
      async: false,
      type: "post",
      success: function(msg) {
        window.options2 = $.extend(true, [], msg);
      },
      error: function() {
        alert("服务器错误");
      }
    });
    this.options[1].children=$.extend(true, [], options1);
    this.options[2].children=$.extend(true, [], options2);
    $.each(this.options[1].children,function(index,item){
      var temp=item.name;
      delete(item.name);
      item.label=temp;
      var num=item.id;
      delete(item.id);
      item.value=num;
      });
    $.each(this.options[2].children,function(index,item){
      var temp=item.name;
      delete(item.name);
      item.label=temp;
      var num=item.id;
      delete(item.id);
      item.value=num;
      });  
  }
  
}
</script>

<style>
#release{
    float: left;
    /* height: 100%; */
}
#release_main{
    margin-left: 20%;
    margin-top: 150px;
    width: 700px;
    height: 100%;
    background-color: white;
    text-align: left;
    padding: 20px 0;
}
/* 菜单栏 */
#release_menu ul li{
    width: 100px;
    list-style-type: none;
    display: inline-block;
    text-align: center;
    line-height: 30px;
}
#menu_border{
    width: 100px;
    height: 3px;
    background-color: rgb(129, 129, 255);
    margin-left: 40px;
    margin-top: -18px;
}
#release_wjbd_main{
    overflow: hidden;
    position: relative;
    width: 540px;
    min-height: 450px;
    height: 450px;
    padding-left: 60px;
    padding-top: 10px;
    margin-left: 50px
}
/* 文件上传 */
#release_wj_main{
    display: block;
    position: absolute;
}
/* 备注文本域 */
#release_wj_bz{
    font-size: 1em;
    margin: 0 auto;
}
/* 发布按钮 */
#release_fb{
    margin-left: 50%;
}
/* 创建表单 */
#release_bd_main{
    width: 100%;
    position: absolute;
    left: 100%;
}
/* 新建表单 */
#new_bd{
  width: 90%;
  margin: 0 auto;
  height: 100%;
}
#new_bd div{
  position: relative;
  height: 40px;
}
#new_bd input{
  position: absolute;
  top:-5px;
  left: 15%;
  margin-left: 20px;
  border: 1px solid #ccc;
  padding: 7px 0px;
  border-radius: 3px;
  padding-left:5px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
}
#new_bd input:focus{
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6)
}
#new_bd span{
  position: absolute;
  left:55% ;
  font-size: 0.8em;
  width: 100px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
word-break:keep-all;
}
#release_last{
  margin-left: 55%;
  margin-top: 30px;
}
.delete_button{
  padding:4px 4px;
   letter-spacing: 0.5em;
    background-color: #F56C6C;
    border-color: #F56C6C;
    color: #fff;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px; /* future proofing */
    -khtml-border-radius: 5px; /* for old Konqueror browsers */
    text-align: center;
    vertical-align: middle;
    float: right;
    margin-right:50px;

}
</style>
