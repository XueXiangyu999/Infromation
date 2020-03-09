<template>
    <div id="rili_main">
        <div id="rili_fenye">
            <el-tabs v-model="activeName">
                <el-tab-pane label="下载日历" name="first">
                    <template>
                        <el-table :data="tableData" style="width: 100%" max-height="400px">
                            <el-table-column align="center" fixed prop="date" label="上传日期" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="name" label="课程名称" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="xueqi" label="使用学期" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="shenhe" label="审核状态" width="150">
                            </el-table-column>
                            <el-table-column align="center" label="操作" width="150">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">
                                        <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                                        下载
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="上传日历" name="second">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="学科名称">
                            <el-input v-model="formInline.name" placeholder="学科"></el-input>
                        </el-form-item>
                        <!-- <el-form-item label="使用学期">
                            <el-select v-model="formInline.xueqi" placeholder="使用学期">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>    
                        </el-form-item> -->
                        <el-form-item>
                            <el-upload class="upload-demo" ref="upload" action="http://47.95.246.40:8081/uploadCalendar" :headers="head" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="日历审核" name="third">
                    <template>
                        <el-table :data="tableDataSh" style="width: 100%" max-height="400px">
                            <el-table-column align="center" fixed prop="date" label="上传日期" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="name" label="课程名称" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="username" label="上传教师" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="xueqi" label="使用学期" width="150">
                            </el-table-column>
                            <el-table-column align="center" label="查看" width="150">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">
                                        <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                                        下载
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="shenhe" label="审核通过" width="100">
                            </el-table-column>
                        </el-table>
                    </template>
                </el-tab-pane>
                <el-tab-pane label="日历接收" name="fourth">
                    <template>
                        <el-table :data="tableDataJs" style="width: 100%" max-height="400px">
                            <el-table-column align="center" fixed prop="date" label="上传日期" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="name" label="课程名称" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="username" label="上传教师" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="xueqi" label="使用学期" width="150">
                            </el-table-column>
                            <el-table-column align="center" prop="shenhe" label="审核状态" width="100">
                            </el-table-column>
                            <el-table-column align="center" label="查看" width="150">
                                <template slot-scope="scope">
                                    <el-button type="text" size="small">
                                        <!-- @click.native.prevent="deleteRow(scope.$index, tableData)" -->
                                        下载
                                    </el-button>
                                </template>
                            </el-table-column>

                        </el-table>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      head: { Authorization: this.$store.state.user.Authorization },
      formInline: {
        name: "",
        xueqi: ""
      },
      // options: [{
      //   value: '2017-2',
      //   label: '2017下半年'
      // }, {
      //   value: '2018-1',
      //   label: '2018上半年'
      // }, {
      //   value: '2018-2',
      //   label: '2018下半年'
      // }, {
      //   value: '2019-1',
      //   label: '2019上半年'
      // }, {
      //   value: '2019-2',
      //   label: '2019下半年'
      // }],
      tableData: [
        {
          date: "2017-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2018-3-1",
          name: "计算机基础",
          xueqi: "2018上半年",
          shenhe: "通过"
        },
        {
          date: "2018-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-3-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        }
      ],
      tableDataSh: [
        {
          date: "2017-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2018-3-1",
          name: "计算机基础",
          xueqi: "2018上半年",
          shenhe: "通过"
        },
        {
          date: "2018-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-3-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        }
      ],
      tableDataJs: [
        {
          date: "2017-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2018-3-1",
          name: "计算机基础",
          xueqi: "2018上半年",
          shenhe: "通过"
        },
        {
          date: "2018-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-3-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        },
        {
          date: "2019-9-1",
          name: "计算机基础",
          xueqi: "2017下半年",
          shenhe: "通过"
        }
      ],
      fileList: [{}]
    };
  },
  methods: {
    submitUpload() {
      if (this.formInline.name && this.formInline.xueqi) {
        this.$refs.upload.submit();
      } else {
        alert("请填写学科名称和使用学期");
      }
    },
    handleRemove(file, fileList) {},
    handlePreview(file) {}
  },
  mounted: function() {
    if (
      sessionStorage.getItem("isLogin") == null ||
      sessionStorage.getItem("isLogin") == false
    ) {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
#rili_main {
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
#rili_fenye {
  width: 90%;
  margin: 40px auto;
}
</style>
