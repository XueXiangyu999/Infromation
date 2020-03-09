<template>
  <div id="lookFor_calendar">
    <div id="fileList">
      <h2>历史教学日历:</h2>
      <el-row :gutter="15" style="margin-top:20px;">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-date-picker
              v-model="searchForm.year"
              type="year"
              @change="search"
              placeholder="选择年"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-select v-model="searchForm.month" placeholder="选择月" @change="search">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-input v-model="searchForm.limit" placeholder="每页显示数量" @change="search"></el-input>
          </div>
        </el-col>
      </el-row>
      <el-table :data="tableData" style="width: 50%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0" type="danger" size="small" effect="dark">未提交</el-tag>
            <el-tag v-if="scope.row.status==1" type="danger" size="small" effect="dark">未审核</el-tag>
            <el-tag v-if="scope.row.status==2" type="success" size="small" effect="dark">已通过</el-tag>
            <el-tag v-if="scope.row.status==3" type="danger" size="small" effect="dark">未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="文件名" width="200" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div v-if="scope.row.status==0" style="font-size:13px;">暂无数据</div>
            <div v-else style="font-size:13px">{{scope.row.fileName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="上传年份" width="100" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div v-if="scope.row.status==0" style="font-size:13px;">暂无数据</div>
            <div v-else style="font-size:13px">{{scope.row.year}}</div>
          </template>
        </el-table-column>
        <el-table-column label="上传月份" width="100" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <div v-if="scope.row.status==0" style="font-size:13px;">暂无数据</div>
            <div v-else style="font-size:13px">{{scope.row.month}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center" :show-overflow-tooltip="true">
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
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="page_size"
        :current-page.sync="currentPage"
        :pager-count="7"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <el-button
        type="primary"
        round
        size="mini"
        style="float:right;margin-top:-30px;margin-right:50%"
        @click="download()"
      >批量下载</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "",
      total: 0,
      page_size: 10,
      searchForm: {
        year: 0,
        month: 0,
        limit: 10
      },
      options: [
        {
          value: "1",
          label: "一月"
        },
        {
          value: "2",
          label: "二月"
        },
        {
          value: "3",
          label: "三月"
        },
        {
          value: "4",
          label: "四月"
        },
        {
          value: "5",
          label: "五月"
        },
        {
          value: "6",
          label: "六月"
        },
        {
          value: "7",
          label: "七月"
        },
        {
          value: "8",
          label: "八月"
        },
        {
          value: "9",
          label: "九月"
        },
        {
          value: "10",
          label: "十月"
        },
        {
          value: "11",
          label: "十一月"
        },
        {
          value: "12",
          label: "十二月"
        }
      ],
      currentPage: 1,
      tableData: [],
      multipleSelection: []
    };
  },
  methods: {
    search() {
      if (this.searchForm.limit == "" || this.searchForm.limit == 0) {
        this.searchForm.limit = 10;
      }
      var date = "";
      if (this.searchForm.year != "") {
        date = this.searchForm.year.getFullYear();
      }
      var params = {
        pageNum: 1,
        year: date,
        month: this.searchForm.month,
        limit: this.searchForm.limit
      };
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        headers: { Authorization: Authorization },
        data: params,
        url: sessionStorage.getItem("path") + "/calendar/getHistoryCalendar",
        dataType: "json",
        async: false,
        type: "post",
        success: function(msg) {
          window.fileList = $.extend(true, [], msg.list);
          window.total = msg.total;
          window.page_size = msg.pageSize;
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.tableData = $.extend(true, [], fileList);
      this.total = total;
      this.page_size = page_size;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      if (this.searchForm.limit == "" || this.searchForm.limit == 0) {
        this.searchForm.limit = 10;
      }
      var date = "";
      if (this.searchForm.year != "") {
        date = this.searchForm.year.getFullYear();
      }
      var params = {
        pageNum: val,
        year: date,
        month: this.searchForm.month,
        limit: this.searchForm.limit
      };
      var Authorization = this.$store.state.user.Authorization;
      $.ajax({
        headers: { Authorization: Authorization },
        data: params,
        url: sessionStorage.getItem("path") + "/calendar/getHistoryCalendar",
        dataType: "json",
        async: false,
        type: "post",
        success: function(msg) {
          window.fileList = $.extend(true, [], msg.list);
          window.total = msg.total;
          window.page_size = msg.pageSize;
        },
        error: function() {
          alert("服务器错误");
        }
      });
      this.tableData = $.extend(true, [], fileList);
      this.total = total;
      this.page_size = page_size;
    },
    download() {
      var dowmloadTable = "";
      $.each(this.multipleSelection, function(index, item) {
        if (dowmloadTable == "") {
          dowmloadTable = dowmloadTable + item.id;
        } else {
          dowmloadTable = dowmloadTable + "," + item.id;
        }
      });
      if (this.multipleSelection.length == 1) {
        window.location.href =
        sessionStorage.getItem("path") + "/calendar/downloadCalendar?id="+dowmloadTable;
      } else {
        if (dowmloadTable != "") {
          window.location =
            sessionStorage.getItem("path") +
            "/calendar/downloadZip?calendars=" +
            dowmloadTable;
        }
      }
    }
  },
  created() {
    this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    if (sessionStorage.getItem("isLogin") == 0) {
      this.$router.push("/login");
    }
    this.searchForm.year = "";
    this.searchForm.month = "";
    var params = {
      pageNum: "1",
      limit: this.searchForm.limit,
      year: this.searchForm.year,
      month: this.searchForm.month
    };
    var Authorization = this.$store.state.user.Authorization;
    $.ajax({
      headers: { Authorization: Authorization },
      data: params,
      url: sessionStorage.getItem("path") + "/calendar/getHistoryCalendar",
      dataType: "json",
      async: false,
      type: "post",
      success: function(msg) {
        window.fileList = $.extend(true, [], msg.list);
        window.total = msg.total;
        window.page_size = msg.pageSize;
      },
      error: function() {
        alert("服务器错误");
      }
    });
  },
  mounted() {
    this.tableData = $.extend(true, [], fileList);
    this.total = total;
    this.page_size = page_size;
    this.path = sessionStorage.getItem("path");
  }
};
</script>

<style scoped>
#app {
  color: rgba(255, 255, 255, 0);
}
#lookFor_calendar {
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
</style>