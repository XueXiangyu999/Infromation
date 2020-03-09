<template>
  <div id="admain_information">
    <div id="userList">
      <h2>文件列表:</h2>
      <el-row :gutter="20" style="margin-top:20px;">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input v-model="searchForm.name" placeholder="发布人" @change="search"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input v-model="searchForm.fileName" placeholder="文件名称" @change="search"></el-input>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-input v-model="searchForm.limit" placeholder="每页显示人数" @change="search"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 100%" :row-style="{height:0}">
        <el-table-column prop="title" label="文件名称" width="300" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="update_time" label="发布时间" width="200" align="center"></el-table-column>
        <el-table-column prop="name" label="发布人" width="200" align="center"></el-table-column>
        <el-table-column label="文件形式" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type==1">表单</el-tag>
            <el-tag v-else>文件</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="文件状态" width="200" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status==0">发布正常</el-tag>
            <el-tag type="danger" v-if="scope.row.status==1">发布人已删除</el-tag>
            <el-tag type="" v-if="scope.row.status==2">已截止</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status==0">
              <div v-if="scope.row.type===1">
                <el-button
                  type="success"
                  plain
                  size="mini"
                  @click="dialogFormVisible = true;saveform(scope.row)"
                >查看</el-button>

                <el-dialog
                  title="请完成信息填写"
                  :visible.sync="dialogFormVisible"
                  id="bd_input"
                  :close-on-click-modal="false"
                  :modal-append-to-body="false"
                >
                  <el-form :model="dynamicValidateForm" label-width="100px" class="demo-dynamic">
                    <el-form-item
                      v-for="(domain, index) in dynamicValidateForm.domains"
                      :label="domain.name"
                      :key="domain.key"
                      :prop="'domains.' + index + '.value'"
                      style="color:red;margin-right:20px;margin-bottom:0;"
                    >
                      <el-input v-model="domain.value"></el-input>
                      <p style="margin:5px;font-size:0.85em;line-height: 16px;">*{{domain.bz}}</p>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                  </div>
                </el-dialog>
                <el-button
                  v-if="scope.row.status==0"
                  size="mini"
                  type="danger"
                  @click="delete_field(scope.row.id)"
                >删除</el-button>
              </div>
              <div v-else>
                <el-link
                  type="primary"
                  :underline="false"
                  :href="path+'/collection/downloadTemplate?id='+scope.row.id"
                  style="font-size:0.85em;width:60px"
                >下载</el-link>
                <el-button
                  v-if="scope.row.status==0"
                  size="mini"
                  type="danger"
                  @click="delete_field(scope.row.id)"
                >删除</el-button>
              </div>
            </div>
            <div v-else>
              <div v-if="scope.row.type===1">
                <el-button
                  type="success"
                  plain
                  size="mini"
                  @click="dialogFormVisible = true;saveform(scope.row)"
                >查看</el-button>
                <el-button v-if="scope.row.status==1" size="mini" type="warning" @click="recover_field(scope.row.id)">恢复</el-button>
                <el-button
                  v-if="scope.row.status==2"
                  size="mini"
                  type="danger"
                  @click="delete_field(scope.row.id)"
                  disabled
                >删除</el-button>
              </div>
              <div v-else>
                <el-link
                  type="primary"
                  :underline="false"
                  :href="path+'/collection/downloadTemplate?id='+scope.row.id"
                  style="font-size:0.85em;width:60px"
                >下载</el-link>
                <el-button v-if="scope.row.status==1" size="mini" type="warning" @click="recover_field(scope.row.id)">恢复</el-button>
                <el-button
                  v-if="scope.row.status==2"
                  size="mini"
                  type="danger"
                  @click="delete_field(scope.row.id)"
                  disabled
                >删除</el-button>
              </div>
            </div>
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
      total: 0,
      page_size: 10,
      searchForm: {
        name: "",
        fileName: "",
        limit: 10
      },
      currentPage: 1,
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      dynamicValidateForm: {
        domains: [{}]
      },
      header: "",
      path: "",
      action: ""
    };
  },
  methods: {
    saveform(array) {
      this.dynamicValidateForm.domains = $.parseJSON(array.field);
    },
    handleCurrentChange(val) {
      if (this.searchForm.limit == "" || this.searchForm.limit == 0) {
        this.searchForm.limit = 10;
      }
      var params = {
        pageNum: val,
        limit: this.searchForm.limit,
        name: this.searchForm.name,
        title: this.searchForm.fileName
      };
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        headers: { Authorization: Authorization },
        data: params,
        url:
          sessionStorage.getItem("path") +
          "/collection/admin/getCollectionList",
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
      $.each(this.tableData, function(index, item) {
        item.update_time = item.update_time.substring(0, 10);
      });
    },
    search() {
      this.currentPage = 1;
      if (this.searchForm.limit == "" || this.searchForm.limit == 0) {
        this.searchForm.limit = 10;
      }
      var params = {
        pageNum: this.currentPage,
        limit: this.searchForm.limit,
        name: this.searchForm.name,
        title: this.searchForm.fileName
      };
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        headers: { Authorization: Authorization },
        data: params,
        url:
          sessionStorage.getItem("path") +
          "/collection/admin/getCollectionList",
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
      $.each(this.tableData, function(index, item) {
        item.update_time = item.update_time.substring(0, 10);
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
          console.log(params);
          var Authorization = this.$store.state.user.Authorization;
          $.ajax({
            url: sessionStorage.getItem("path") + "/collection/recoverRelease",
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
            message: "恢复成功!"
          });
          var params = {
            pageNum: "1",
            limit: this.searchForm.limit,
            name: this.searchForm.name,
            title: this.searchForm.fileName
          };
          var Authorization = this.$store.state.user.Authorization;
          $.ajax({
            headers: { Authorization: Authorization },
            data: params,
            url:
              sessionStorage.getItem("path") +
              "/collection/admin/getCollectionList",
            dataType: "json",
            async: false,
            type: "post",
            success: function(msg) {
              console.log(msg);
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
          $.each(this.tableData, function(index, item) {
            item.update_time = item.update_time.substring(0, 10);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消恢复"
          });
        });
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
          console.log(params);
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
          var params = {
            pageNum: "1",
            limit: this.searchForm.limit,
            name: this.searchForm.name,
            title: this.searchForm.fileName
          };
          var Authorization = this.$store.state.user.Authorization;
          $.ajax({
            headers: { Authorization: Authorization },
            data: params,
            url:
              sessionStorage.getItem("path") +
              "/collection/admin/getCollectionList",
            dataType: "json",
            async: false,
            type: "post",
            success: function(msg) {
              console.log(msg);
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
          $.each(this.tableData, function(index, item) {
            item.update_time = item.update_time.substring(0, 10);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    if (sessionStorage.getItem("isLogin") == 0) {
      this.$router.push("/login");
    }
    var params = {
      pageNum: "1",
      limit: this.searchForm.limit,
      name: this.searchForm.name,
      title: this.searchForm.fileName
    };
    var Authorization = this.$store.state.user.Authorization;
    $.ajax({
      headers: { Authorization: Authorization },
      data: params,
      url:
        sessionStorage.getItem("path") + "/collection/admin/getCollectionList",
      dataType: "json",
      async: false,
      type: "post",
      success: function(msg) {
        console.log(msg);
        window.userList = $.extend(true, [], msg.list);
        window.total = msg.total;
        window.page_size = msg.pageSize;
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
    $.each(this.tableData, function(index, item) {
      item.update_time = item.update_time.substring(0, 10);
    });
    this.path = sessionStorage.getItem("path");
    this.header = { Authorization: this.$store.state.user.Authorization };
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
  padding-bottom: 40px;
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