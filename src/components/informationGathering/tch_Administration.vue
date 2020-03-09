<template>
  <div>
    <div id="tch_release">
      <p class="release_top">已发布的信息:</p>
      <el-table
        style=" width: 90%;margin: 0 auto;"
        :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      >
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column label="文件标题" width="200" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="截止日期" prop="deadline" width="150" align="center"></el-table-column>
        <el-table-column label="上传形式" width="100" align="center">
          <template slot-scope="scope" width>
            <div v-if="scope.row.type==1">表单</div>
            <div v-if="scope.row.type==2">文件</div>
          </template>
        </el-table-column>
        <el-table-column label="提交人数" width="100" align="center">
          <template slot-scope="scope" width>
            <div
              v-if="scope.row.total==scope.row.submit"
              style="color:#67C23A"
            >{{scope.row.submit}}/{{scope.row.total}}</div>
            <div v-else style="color:#F56C6C">{{scope.row.submit}}/{{scope.row.total}}</div>
          </template>
        </el-table-column>
        <el-table-column label="下载操作" align="center">
          <template slot-scope="scope" width>
            <div v-if="scope.row.type==1">
              <el-link
                type="primary"
                :underline="false"
                :href="path+'/collection/admin/downloadFieldCollectionResult?collection='+scope.row.id"
              >下载</el-link>
            </div>
            <div v-else>
              <el-button type="text" @click="saveTable(scope.row.id);dialogVisible = true;">下载</el-button>
              <el-dialog width="30%" title="文件下载" :visible.sync="dialogVisible">
                <el-table
                  height="300"
                  ref="multipleTable"
                  :data="tableData"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column type="index" width="50"></el-table-column>
                  <el-table-column label="姓名" width="120">
                    <template slot-scope="scope">{{ scope.row.name}}</template>
                  </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="download(scope.row);dialogVisible = false">下载选中项</el-button>
                </span>
              </el-dialog>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="文件状态" width align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="success">已发布</el-tag>
            <el-tag v-if="scope.row.status==2" type="info">已截止</el-tag>
            <el-tag v-if="scope.row.status==1" type="danger">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="删除/恢复操作" width align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status==0"
              size="mini"
              type="danger"
              @click="delete_field(scope.row.id)"
            >删除</el-button>
            <el-button
              v-if="scope.row.status==2"
              size="mini"
              type="danger"
              @click="delete_field(scope.row.id)"
              disabled
            >删除</el-button>
            <el-button
              v-if="scope.row.status==1"
              size="mini"
              type="warning"
              @click="recover_field(scope.row.id)"
            >恢复文件</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        id="fenye"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next, jumper"
        :total="userList.length"
      ></el-pagination>
      <el-button
        type="primary"
        round
        style="display: inline-block;margin-top:10px;margin-left:100px;"
        size="small"
        @click="gorelease"
      >上传新表单</el-button>
    </div>
  </div>
</template>

<script>
import leftNav from "@/components/page/left_nav";
export default {
  name: "tch_release",
  data() {
    return {
      path: "",
      currentPage: 1, //初始页
      pagesize: 10, //   每页的数据
      userList: [],
      dialogVisible: false,
      tableData: [],
      multipleSelection: []
    };
  },
  components: {
    leftNav
  },
  methods: {
    handleSelectionChange(val) {
       
    },
    saveTable(id) {
      var params = { collection: id };
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        url: sessionStorage.getItem("path") + "/collection/admin/getSubmitList",
        data: params,
        dataType: "json",
        type: "post",
        async: false,
        headers: { Authorization: Authorization },
        success: function(msg) {
          window.table = $.extend(true, [], msg.submit);
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.tableData = $.extend(true, [], table);
    },
    download(array) {
      var dowmloadTable = "";
      $.each(this.multipleSelection, function(index, item) {
        if (dowmloadTable == "") {
          dowmloadTable = dowmloadTable + item.file;
        } else {
          dowmloadTable = dowmloadTable + "," + item.file;
        }
      });
      if (dowmloadTable != "") {
        window.location =
          sessionStorage.getItem("path") +
          "/collection/admin/downloadZip?files=" +
          dowmloadTable;
      }
      // window.location =sessionStorage.getItem('path')+'/collection/admin/downloadZip?files='
    },
    delete_field(msg) {
      //删除文件
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = { id: msg };
          var Authorization = this.$store.state.user.Authorization;
          $.ajax({
            url: sessionStorage.getItem("path") + "/collection/deleteRelease",
            data: params,
            dataType: "json",
            type: "post",
            async: false,
            headers: { Authorization: Authorization },
            success: function(msg) {
              console.log(msg);
            },
            error: function() {
              alert("服务器错误");
            }
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          var params = { author: this.$store.state.user.id };
          var Authorization = this.$store.state.user.Authorization;
          $.ajax({
            url:
              sessionStorage.getItem("path") +
              "/collection/getCollectionByAuthor",
            data: params,
            dataType: "json",
            type: "post",
            async: false,
            headers: { Authorization: Authorization },
            success: function(msg) {
              console.log(msg);
              window.userform = $.extend(true, [], msg);
            },
            error: function() {
              alert("服务器错误");
            }
          });
          this.userList = $.extend(true, [], userform);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    recover_field(msg) {
      //恢复文件
      this.$confirm("此操作将恢复该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var params = { id: msg };
          var Authorization = this.$store.state.user.Authorization;
          $.ajax({
            url: sessionStorage.getItem("path") + "/collection/recoverRelease",
            data: params,
            dataType: "json",
            type: "post",
            async: false,
            headers: { Authorization: Authorization },
            success: function(msg) {},
            error: function() {
              alert("服务器错误");
            }
          });
          this.$message({
            type: "success",
            message: "恢复成功!"
          });
          var params = { author: this.$store.state.user.id };
          var Authorization = this.$store.state.user.Authorization;
          $.ajax({
            url:
              sessionStorage.getItem("path") +
              "/collection/getCollectionByAuthor",
            data: params,
            dataType: "json",
            type: "post",
            async: false,
            headers: { Authorization: Authorization },
            success: function(msg) {
              window.userform = $.extend(true, [], msg);
            },
            error: function() {
              alert("服务器错误");
            }
          });
          this.userList = $.extend(true, [], userform);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消恢复"
          });
        });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    handleUserList() {
      // this.$http.get('http://localhost:3000/userList').then(res => {  //这是从本地请求的数据接口，
      //     this.userList = res.body
      // })
    },
    gorelease() {
      this.$router.push("/tch_release");
    }
  },
  mounted: function() {
    this.userList = $.extend(true, [], userform);
  },
  created: function() {
    this.handleUserList();
    this.path = sessionStorage.getItem("path");
    this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    if (this.$store.state.user.isLogin == 0) {
      this.$router.push("/login");
    }

    var params = { author: this.$store.state.user.id };
    var Authorization = this.$store.state.user.Authorization;
    $.ajax({
      url: sessionStorage.getItem("path") + "/collection/getCollectionByAuthor",
      data: params,
      dataType: "json",
      type: "post",
      async: false,
      headers: { Authorization: Authorization },
      success: function(msg) {
        console.log(msg);
        window.userform = $.extend(true, [], msg);
      },
      error: function() {
        alert("服务器错误");
      }
    });
  }
};
</script>

<style>
#tch_release {
  background-color: rgba(255, 255, 255, 0.9);
  margin-left: 20%;
  margin-top: 1%;
  width: 75%;
  height: 100%;
  text-align: left;
}
.release_top {
  text-align: left;
  width: 90%;
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 5px;
  border-bottom: solid 2px #ccc;
}
/* .new_wj{
    display: inline-block;
    background-color: black;
    width: 30%;
    height: 150px;
    margin: 10px 1%
} */
/* 分页选择栏 */
#fenye {
  display: inline-block;
  margin-top: 10px;
  margin-left: 5%;
  margin-bottom: 10px;
}
</style>
