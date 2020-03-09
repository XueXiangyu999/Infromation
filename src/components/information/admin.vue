<template>
  <div id="admain_information">
    <div id="userList">
      <h2>用户列表:</h2>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input v-model="searchForm.name" placeholder="姓名" @change="search"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input v-model="searchForm.userName" placeholder="学工号" @change="search"></el-input>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-select
              v-model="searchForm.userType"
              filterable
              placeholder="请选择角色"
              @change="search"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input v-model="searchForm.limit" placeholder="每页显示人数" @change="search"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" :row-style="{height:0}">
        <el-table-column prop="userName" label="学工号" width="200" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="200" align="center"></el-table-column>
        <el-table-column label="角色" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.role==1" type="danger" size="small">教师</el-tag>
            <el-tag v-else size="small">学生</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户状态" width="200" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="success" size="small">正常使用</el-tag>
            <el-tag v-else type="danger" size="small">禁止使用</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="dialogFormVisible2=true;save_user(scope.row)"
            >修改信息</el-button>
            <el-dialog title="修改信息:" :visible.sync="dialogFormVisible2" :append-to-body="true">
              <el-form
                id="addOneUser_form"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="用户姓名" prop="name" style="padding-right: 50%;">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="学工号" prop="userName" style="padding-right: 50%;">
                  <el-input v-model="ruleForm.userName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item
                  label="学位"
                  prop="degree"
                  v-if="ruleForm.userType==1"
                  style="padding-right: 60%;"
                >
                  <el-input v-model="ruleForm.degree"></el-input>
                </el-form-item>
                <el-form-item
                  label="职称"
                  prop="title"
                  v-if="ruleForm.userType==1"
                  style="padding-right: 60%;"
                >
                  <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item
                  label="行政班级"
                  prop="xz_class"
                  v-if="ruleForm.userType==2"
                  style="text-align:left"
                >
                  <el-select v-model="ruleForm.xz_class" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options3"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="专业班级"
                  prop="zz_class"
                  v-if="ruleForm.userType==2"
                  style="text-align:left"
                >
                  <el-select v-model="ruleForm.zy_class" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options4"
                      :key="item.name"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="ruleForm.userType==1" label="学士学位" style="margin-bottom:-10px">
                  <el-row :gutter="20">
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm.xs_school" placeholder="毕业学校"></el-input>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm.xs_major" placeholder="毕业专业"></el-input>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm.xs_data" placeholder="毕业时间"></el-input>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item v-if="ruleForm.userType==1" label="硕士学位" style="margin-bottom:-10px">
                  <el-row :gutter="20">
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm.ss_school" placeholder="毕业学校"></el-input>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm.ss_major" placeholder="毕业专业"></el-input>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm.ss_data" placeholder="毕业时间"></el-input>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item v-if="ruleForm.userType==1" label="博士学位" style="margin-bottom:-10px">
                  <el-row :gutter="20">
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm.bs_school" placeholder="毕业学校"></el-input>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm.bs_major" placeholder="毕业专业"></el-input>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-input v-model="ruleForm.bs_data" placeholder="毕业时间"></el-input>
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-row :gutter="20" v-if="ruleForm.userType==1" style="margin-bottom:-20px">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="所属部门" prop="department">
                        <el-select v-model="ruleForm.department" filterable placeholder="请选择">
                          <el-option
                            v-for="item in options2"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="职务" prop="job">
                        <el-select v-model="ruleForm.job" filterable placeholder="请选择">
                          <el-option
                            v-for="item in options1"
                            :key="item.name"
                            :label="item.name"
                            :value="item.id"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="党派" prop="Party">
                        <el-input v-model="ruleForm.Party"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" v-if="ruleForm.userType==1" style="margin-bottom:-20px">
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="是否硕导">
                        <el-switch v-model="ruleForm.Whether" active-text="是" inactive-text="否"></el-switch>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="研究方向" prop="Research">
                        <el-input v-model="ruleForm.Research"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">
                      <el-form-item label="社会兼职" prop="Part_time_job">
                        <el-input v-model="ruleForm.Part_time_job"></el-input>
                      </el-form-item>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="re_information();dialogFormVisible2 = false">确认修改</el-button>
              </span>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="page_size"
        :current-page.sync="currentPage"
        :pager-count="7"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab_0: "tab0",
      isno: 100,
      total: 0,
      page_size: 10,
      searchForm: {
        name: "",
        userName: "",
        userType: "",
        limit: 10
      },
      currentPage: 1,
      tableData: [],
      options: [
        {
          value: "教师",
          lable: "教师"
        },
        {
          value: "学生",
          lable: "学生"
        },
        {
          value: "全部",
          lable: "全部"
        }
      ],
      options2: [],
      options1: [],
      options3: [],
      options4: [],
      input_delete: "",
      dialogFormVisible2: false,
      user: {
        basic:{
          name:'',
          userName:'',
        },
        detail:{
          education:'',
          title:'',
          bachelor_school:'',
          bachelor_major:'',
          bachelor_graduate_time:'',
          master_school:'',
          master_major:'',
          master_graduate_time:'',
          doctor_school:'',
          doctor_major:'',
          doctor_graduate_time:'',
          departmentName:'',
          dutyName:'',
          party:'',
          isGraduateAdvisor:'',
          classMsg:{
            nature_class:'',
            major_class:'',
          }
        }
      },
      deletdUser: {},
      ruleForm: {
        name: "",
        userName: "",
        userType: "",
        xz_class: "",
        zy_class: "",
        xs_school: "",
        xs_major: "",
        xs_data: "",
        ss_school: "",
        ss_major: "",
        ss_data: "",
        bs_school: "",
        bs_major: "",
        bs_data: "",
        department: "",
        job: "",
        Party: "",
        Whether: "",
        Research: "",
        Part_time_job: "",
        degree: "",
        title: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userName: [
          { required: true, message: "请输入学工号", trigger: "blur" }
        ],
        xz_class: [
          { required: true, message: "请选择行政班级", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请选择所属部门", trigger: "blur" }
        ],
        job: [{ required: true, message: "请选择职务", trigger: "blur" }],
        Party: [{ required: true, message: "请填写党派", trigger: "blur" }],
        Research: [
          { required: true, message: "请填写研究方向", trigger: "blur" }
        ],
        title: [{ required: true, message: "请填写职称", trigger: "blur" }]
      }
    };
  },
  methods: {
    dateChangebirthday(val) {
      this.ruleForm.data = val;
    },
    handleCurrentChange(val) {
      var role;
      if (this.searchForm.userType == "教师") {
        role = 1;
      } else {
        if (this.searchForm.userType == "学生") {
          role = 2;
        } else {
          role = "";
        }
      }
      if (this.searchForm.limit == "" || this.searchForm.limit == 0) {
        this.searchForm.limit = 10;
      }
      var params = {
        pageNum: val,
        limit: this.searchForm.limit,
        name: this.searchForm.name,
        role: role,
        userName: this.searchForm.userName
      };
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        headers: { Authorization: Authorization },
        data: params,
        url:
          sessionStorage.getItem("path") + "/userManagement/admin/searchUser",
        dataType: "json",
        async: false,
        type: "post",
        success: function(msg) {
          // console.log(msg);
          window.userList = $.extend(true, [], msg.list);
          window.total = msg.total;
          window.page_size = msg.pageSize;
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.tableData = $.extend(true, [], userList);
      this.total = total;
      this.page_size = page_size;
    },
    search() {
      this.currentPage = 1;
      var role;
      if (this.searchForm.userType == "教师") {
        role = 1;
      } else {
        if (this.searchForm.userType == "学生") {
          role = 2;
        } else {
          role = "";
        }
      }
      if (this.searchForm.limit == "" || this.searchForm.limit == 0) {
        this.searchForm.limit = 10;
      }
      var params = {
        pageNum: this.currentPage,
        limit: this.searchForm.limit,
        name: this.searchForm.name,
        role: role,
        userName: this.searchForm.userName
      };
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        headers: { Authorization: Authorization },
        data: params,
        url:
          sessionStorage.getItem("path") + "/userManagement/admin/searchUser",
        dataType: "json",
        async: false,
        type: "post",
        success: function(msg) {
          // console.log(msg);
          window.userList = $.extend(true, [], msg.list);
          window.total = msg.total;
          window.page_size = msg.pageSize;
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.tableData = $.extend(true, [], userList);
      this.total = total;
      this.page_size = page_size;
    },
    save_user(array) {
      this.deletdUser = array;
      if (this.deletdUser.role == 1) {
        this.ruleForm.userType = 1;
        var header = this.$store.state.user.Authorization;
        var params = { uid: array.id };
        $.ajax({
          url: sessionStorage.getItem("path") + "/userManagement/getAllMsg",
          data: params,
          async: false,
          dataType: "json",
          type: "post",
          headers: { Authorization: header },
          success: function(msg) {
            console.log(msg);
            window.user = $.extend(true, [], msg);
          },
          error: function() {
            alert("服务器错误");
          }
        });
        this.ruleForm.name = user.basic.name;
        this.ruleForm.userName = user.basic.userName;
        this.ruleForm.degree = user.detail.education;
        this.ruleForm.title = user.detail.title;
        this.ruleForm.xs_school = user.detail.bachelor_school;
        this.ruleForm.xs_major = user.detail.bachelor_major;
        this.ruleForm.xs_data = user.detail.bachelor_graduate_time;
        this.ruleForm.ss_school = user.detail.master_school;
        this.ruleForm.ss_major = user.detail.master_major;
        this.ruleForm.ss_data = user.detail.master_graduate_time;
        this.ruleForm.bs_school = user.detail.doctor_school;
        this.ruleForm.bs_major = user.detail.doctor_major;
        this.ruleForm.bs_data = user.detail.doctor_graduate_time;
        this.ruleForm.department = user.detail.departmentName;
        this.ruleForm.job = user.detail.dutyName;
        this.ruleForm.Party = user.detail.party;
        this.ruleForm.Whether = user.detail.isGraduateAdvisor;
        if (this.ruleForm.Whether == 1) {
          this.ruleForm.Whether = true;
        } else {
          this.ruleForm.Whether = false;
        }

        this.ruleForm.Research = user.detail.research_interest;
        this.ruleForm.Part_time_job = user.detail.part_time_job;
      } else {
        this.ruleForm.userType = 2;
        var header = this.$store.state.user.Authorization;
        var params = { uid: array.id };
        $.ajax({
          url: sessionStorage.getItem("path") + "/userManagement/getAllMsg",
          data: params,
          async: false,
          dataType: "json",
          type: "post",
          headers: { Authorization: header },
          success: function(msg) {
            console.log(msg);
            window.user = $.extend(true, [], msg);
          },
          error: function() {
            alert("服务器错误");
          }
        });
        this.ruleForm.name = user.basic.name;
        this.ruleForm.userName = user.basic.userName;
        this.ruleForm.xz_class = user.detail.classMsg.nature_class;
        this.ruleForm.zy_class = user.detail.classMsg.major_class;
      }
    },
    re_information() {
      if (this.ruleForm.userType == 1) {
        if (this.ruleForm.Whether) {
          this.ruleForm.Whether = 1;
        } else {
          this.ruleForm.Whether = 0;
        }
        var dep;
        if (user.detail.departmentName == this.ruleForm.department) {
          dep = user.detail.department;
        } else {
          dep = this.ruleForm.department;
        }
        var dut;
        if (user.detail.dutyName == this.ruleForm.job) {
          dut = user.detail.duty;
        } else {
          dut = this.ruleForm.job;
        }
        var params = {
          id: this.deletdUser.id,
          name: this.ruleForm.name,
          education: this.ruleForm.degree,
          bachelor_school: this.ruleForm.xs_school,
          bachelor_major: this.ruleForm.xs_major,
          bachelor_graduate_time: parseInt(this.ruleForm.xs_data),
          master_school: this.ruleForm.ss_school,
          master_major: this.ruleForm.ss_major,
          master_graduate_time: parseInt(this.ruleForm.ss_data),
          doctor_school: this.ruleForm.bs_school,
          doctor_major: this.ruleForm.bs_major,
          doctor_graduate_time: parseInt(this.ruleForm.bs_data),
          duty: dut,
          title: this.ruleForm.title,
          isGraduateAdvisor: this.ruleForm.Whether,
          department: dep,
          research_interest: this.ruleForm.Research,
          party: this.ruleForm.Party,
          part_time_job: this.ruleForm.Part_time_job
        };
        var header = this.$store.state.user.Authorization;
        $.ajax({
          url:
            sessionStorage.getItem("path") +
            "/userManagement/admin/updateTeacherMsg",
          data: params,
          async: false,
          dataType: "json",
          type: "post",
          headers: { Authorization: header },
          success: function(msg) {
            alert("修改成功");
          },
          error: function() {
            alert("服务器错误");
          }
        });
      } else {
        var params = {
          id: this.deletdUser.id,
          name: this.ruleForm.name,
          nature_class: this.ruleForm.xz_class,
          major_class: this.ruleForm.zy_class
        };
        var header = this.$store.state.user.Authorization;
        $.ajax({
          url:
            sessionStorage.getItem("path") +
            "/userManagement/admin/updateStudentMsg",
          data: params,
          async: false,
          dataType: "json",
          type: "post",
          headers: { Authorization: header },
          success: function(msg) {
            alert("修改成功");
          },
          error: function() {
            alert("服务器错误");
          }
        });
      }
    }
  },
  created() {
    this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    //   if(sessionStorage.getItem("isLogin")==0){
    //   this.$router.push('/login');
    //   }
    var params = {
      pageNum: "1",
      limit: this.searchForm.limit,
      name: this.searchForm.name,
      role: this.searchForm.userType,
      userName: this.searchForm.userName
    };
    var Authorization = this.$store.state.user.Authorization;
    $.ajax({
      headers: { Authorization: Authorization },
      data: params,
      url: sessionStorage.getItem("path") + "/userManagement/admin/searchUser",
      dataType: "json",
      async: false,
      type: "post",
      success: function(msg) {
        // console.log(msg);
        window.userList = $.extend(true, [], msg.list);
        window.total = msg.total;
        window.page_size = msg.pageSize;
      },
      error: function() {
        alert("服务器错误");
      }
    });
    var Authorization = this.$store.state.user.Authorization;
    $.ajax({
      headers: { Authorization: Authorization },
      url:
        sessionStorage.getItem("path") +
        "/userManagement/admin/getTeacherDepartment",
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
    $.ajax({
      headers: { Authorization: Authorization },
      url:
        sessionStorage.getItem("path") + "/userManagement/admin/getTeacherDuty",
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
      url: sessionStorage.getItem("path") + "/userManagement/getNatureClass",
      dataType: "json",
      async: false,
      type: "post",
      success: function(msg) {
        window.options3 = $.extend(true, [], msg);
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
        window.options4 = $.extend(true, [], msg);
      },
      error: function() {
        alert("服务器错误");
      }
    });
  },
  mounted() {
    this.tableData = $.extend(true, [], userList);
    this.total = total;
    this.page_size = page_size;
    this.options2 = $.extend(true, [], options2);
    this.options1 = $.extend(true, [], options1);
    this.options3 = $.extend(true, [], options3);
    this.options4 = $.extend(true, [], options4);
  }
};
</script>

<style scoped>
#app {
  color: rgba(255, 255, 255, 0);
}
#admain_information {
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.85);
}
#userList {
  height: 100%;
  width: 90%;
  text-align: left;
  overflow: auto;
  padding: 5%;
  padding-top: 20px;
  padding-bottom: 0;
  margin-bottom: -25px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
</style>