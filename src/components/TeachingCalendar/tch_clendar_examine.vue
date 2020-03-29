<template>
  <div id="lookFor_calendar">
    <div id="fileList">
      <h2>{{month}} 月日历审核:</h2>
      <el-table :data="tableData" style="width: 80%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :selectable="checkboxT"></el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="warning" size="small" effect="dark">未提交</el-tag>
            <el-tag v-if="scope.row.status==1" type="danger" size="small" effect="dark">未审核</el-tag>
            <el-tag v-if="scope.row.status==2" type="success" size="small" effect="dark">已通过</el-tag>
            <el-tag v-if="scope.row.status==3" type="danger" size="small" effect="dark">未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="教师"
          width="100"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="更新日期"
          width="100"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="下载" width="100" align="center">
          <template slot-scope="scope">
            <el-link v-if="scope.row.status==0" type="primary" style="font-size:13px" disabled>下载</el-link>
            <el-link
              :href="path+'/calendar/downloadCalendar?id='+scope.row.id"
              v-else
              type="primary"
              style="font-size:13px"
              :underline="false"
            >下载</el-link>
          </template>
        </el-table-column>
        <el-table-column label="审核" width="300" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.status==0">
              <el-button size="mini" type="primary" disabled>通过</el-button>
              <el-button size="mini" type="danger" disabled>未通过</el-button>
            </div>
            <div v-else>
              <el-button size="mini" type="primary" @click="pass(scope.row)">通过</el-button>
              <el-button size="mini" type="danger" @click="no_pass(scope.row)">未通过</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" round size="mini" @click="download()">批量下载</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      tableData: [],
      multipleSelection: [],
      month: "",
      noPeople: ""
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    checkboxT(row, rowIndex) {
      if (row.status == 0) {
        return false;
      } else {
        return true;
      }
    },
    download() {
      var dowmloadTable = "";
      $.each(this.multipleSelection, function(index, item) {
        if (item.status != 0) {
          if (dowmloadTable == "") {
            dowmloadTable = dowmloadTable + item.id;
          } else {
            dowmloadTable = dowmloadTable + "," + item.id;
          }
        }
      });
      if (this.multipleSelection.length == 1) {
        window.location.href =
          sessionStorage.getItem("path") +
          "/calendar/downloadCalendar?id=" +
          dowmloadTable;
      } else {
        if (dowmloadTable != "") {
          window.location =
            sessionStorage.getItem("path") +
            "/calendar/downloadZip?calendars=" +
            dowmloadTable;
        }
      }
    },
    examine(array) {
      console.log(array.judge);
      if (array.judge) {
        console.log(1);
        var params = {};
        var Authorization = this.$store.state.user.Authorization;
        // $.ajax({
        //   headers: { Authorization: Authorization },
        //   data: params,
        //   url: sessionStorage.getItem("path") + "/calendar/getHistoryCalendar",
        //   dataType: "json",
        //   async: false,
        //   type: "post",
        //   success: function(msg) {
        //   },
        //   error: function() {
        //     alert("服务器错误");
        //   }
        // });
      } else {
        console.log(2);
        var params = {};
        var Authorization = this.$store.state.user.Authorization;
        // $.ajax({
        //   headers: { Authorization: Authorization },
        //   data: params,
        //   url: sessionStorage.getItem("path") + "/calendar/getHistoryCalendar",
        //   dataType: "json",
        //   async: false,
        //   type: "post",
        //   success: function(msg) {
        //   },
        //   error: function() {
        //     alert("服务器错误");
        //   }
        // });
      }
    },
    save(array) {
      this.noPeople = array.id;
    },
    open() {
      this.$confirm("确定给与未通过?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已发送!"
          });
        })
        .catch(() => {});
    },
    pass(array) {
      var Authorization = this.$store.state.user.Authorization;
      var params = {
        id: array.id,
        result: true
      };
      $.ajax({
        headers: { Authorization: Authorization },
        data: params,
        url: sessionStorage.getItem("path") + "/calendar/admin/auditCalendar",
        dataType: "json",
        async: false,
        type: "post",
        success: function(msg) {
          $.ajax({
            headers: { Authorization: Authorization },
            url:
              sessionStorage.getItem("path") +
              "/calendar/admin/getCurrentCalendars",
            dataType: "json",
            async: false,
            type: "post",
            success: function(msg) {
              window.fileList = $.extend(true, [], msg);
            },
            error: function() {
              alert("服务器错误");
            }
          });
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.tableData = $.extend(true, [], fileList);
    },
    no_pass(array){
      var Authorization = this.$store.state.user.Authorization;
      var params = {
        id: array.id,
        result: false
      };
      $.ajax({
        headers: { Authorization: Authorization },
        data: params,
        url: sessionStorage.getItem("path") + "/calendar/admin/auditCalendar",
        dataType: "json",
        async: false,
        type: "post",
        success: function(msg) {
          $.ajax({
            headers: { Authorization: Authorization },
            url:
              sessionStorage.getItem("path") +
              "/calendar/admin/getCurrentCalendars",
            dataType: "json",
            async: false,
            type: "post",
            success: function(msg) {
              window.fileList = $.extend(true, [], msg);
            },
            error: function() {
              alert("服务器错误");
            }
          });
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.tableData = $.extend(true, [], fileList);
    }
  },
  created() {
    this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    if (sessionStorage.getItem("isLogin") == 0) {
      this.$router.push("/login");
    }
    var myDate = new Date();
    this.month = myDate.getMonth() + 1;
    var Authorization = this.$store.state.user.Authorization;
    $.ajax({
      headers: { Authorization: Authorization },
      url:
        sessionStorage.getItem("path") +
        "/calendar/admin/getCurrentCalendars",
      dataType: "json",
      async: false,
      type: "post",
      success: function(msg) {
        console.log(msg);
        window.fileList = $.extend(true, [], msg);
      },
      error: function() {
        alert("服务器错误");
      }
    });
  },
  mounted() {
    // this.tableData = $.extend(true, [], fileList);
    this.path = sessionStorage.getItem("path");
    this.tableData = $.extend(true, [], fileList);
    this.tableData.forEach(Element => {
      if (Element.status == 2) {
        Element.judge = true;
      } else {
        Element.judge = false;
      }
    });
  }
};
</script>

<style scoped>
#app {
  color: rgba(255, 255, 255, 0);
}
#lookFor_calendar {
  font-size: 13px;
  height: 100%;
  /* width: 100%; */
  background: rgba(255, 255, 255, 0.85);
}
#fileList {
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
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>