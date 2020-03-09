<template>
  <div id="admon_calendar">
    <div id="fileList">
      <h2>{{month}} 月日历收集:</h2>
      <el-table :data="tableData" style="width: 80%">
        <el-table-column
          label="教研室"
          prop="sectionName"
          width="200"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag
              v-if="scope.row.submit==scope.row.total"
              type="success"
              size="small"
              effect="dark"
            >已完成</el-tag>
            <el-tag v-else type="warning" size="small" effect="dark">未完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="提交人数" width="100" align="center">
          <template slot-scope="scope">
            <div
              v-if="scope.row.submit==scope.row.total"
              style="color:green"
            >{{scope.row.submit}}/{{scope.row.total}}</div>
            <div v-else style="color:red">{{scope.row.submit}}/{{scope.row.total}}</div>
          </template>
        </el-table-column>
        <el-table-column label="查看" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="saveSection(scope.row);dialogTableVisible = true"
              size="mini"
            >查看</el-button>
            <el-dialog title="教研室名单" :visible.sync="dialogTableVisible" width="30%">
              <el-table :data="list"  height="250">
                <el-table-column property="userName" label="教师" width="200" align="center"></el-table-column>
                <el-table-column label="状态" width="200" align="center">
                  <template slot-scope="scope">
                    <el-tag v-if="scope.row.status==0" type="warning" size="small" effect="dark">未提交</el-tag>
                    <el-tag v-if="scope.row.status==1" type="danger" size="small" effect="dark">未审核</el-tag>
                    <el-tag v-if="scope.row.status==2" type="success" size="small" effect="dark">已通过</el-tag>
                    <el-tag v-if="scope.row.status==3" type="danger" size="small" effect="dark">未通过</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </el-dialog>
          </template>
        </el-table-column>
        <el-table-column label="下载" width="100" align="center">
          <template slot-scope="scope">
            <el-link
              v-if="scope.row.submit!=scope.row.total"
              type="primary"
              style="font-size:13px"
              disabled
            >下载</el-link>
            <el-link
              :href="path+'/calendar/admin/downloadSectionZip?section='+scope.row.section"
              v-else
              type="primary"
              style="font-size:13px"
              :underline="false"
            >下载</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: sessionStorage.getItem("path"),
      tableData: [],
      month: "",
      dialogTableVisible: false,
      list: []
    };
  },
  methods: {
    saveSection(array) {
      var params = { section: array.section };
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        headers: { Authorization: Authorization },
        data: params,
        url:
          sessionStorage.getItem("path") +
          "/calendar/admin/getCurrentCalendarsBySection",
        dataType: "json",
        async: false,
        type: "post",
        success: function(msg) {
          console.log(msg);
          window.list = $.extend(true, [], msg);
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.list = $.extend(true, [], list);
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
        sessionStorage.getItem("path") + "/calendar/admin/getSectionUploadMsg",
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
  mounted() {
    this.tableData = $.extend(true, [], fileList);
  }
};
</script>

<style scoped>
#app {
  color: rgba(255, 255, 255, 0);
}
#admon_calendar {
  font-size: 13px;
  height: 100%;
  width: 100%;
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
/* .el-table__body td,
.el-table__body th {
  padding: 1px;
} */
</style>