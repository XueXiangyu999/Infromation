<template>
  <div class="WJxiazai_main">
    <div v-if="flag" class="WJxiazai">
      <div class="WJ_head">
        <div class="WJ_left" @click="Prelift"></div>
        <h2>下载专区</h2>
        <el-button type="primary" @click="upload">+ 上传文件</el-button>
      </div>
      <div class="WJ_main">
        <div class="WJmobanContainer" @click="CreateNewWjj">
          <WJmoban WJclass="#icon-jiahao" WJtext="新建文件夹"></WJmoban>
        </div>
        <div class="WJmobanContainer" v-for="(WJ_moban,index) in XRWJ" @click="func(WJ_moban.isFolder,index)">
          <WJmoban :WJclass="WJ_moban.w_class" :WJtext="WJ_moban.name" :type="WJ_moban.isFolder"></WJmoban>
          <p class="delete" @click="WJ_delete(index)">删除</p>
        </div>
      </div>

    </div>

    <div v-else class="WJshangchuan">
      <h2>上传专区</h2>
      <form class="WJ_form">
        <label>选择文件：</label>
        <input type='file' name='scfile' style="display: none;" onchange="scye.value=value" accept="" id="scfile">
        <input name='scye' class="ye" onclick=scfile.click()>
        <label>（可选）</label>
        <br>
        <br>
        <label>文件名字：</label>
        <input name='ye1' class="ye" v-model="name">
        <label>（可选）</label>
      </form>
      <el-button class="scbtn" type="primary" @click="updata">上传
        <i class="el-icon-upload el-icon--right"></i>
      </el-button>
      <el-button class="scbtn" type="danger" @click="cancel">取消
      </el-button>
    </div>

  </div>
</template>

<script>
import qs from "qs";
import store from "@/vuex/store";
import WJmoban from "@/components/common/WJmoban.vue";
// var newfre = Vue.extend(WJmoban);
export default {
  store,
  data() {
    return {
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      name: null,
      flag: true,
      id: null,
      data: null,
      father_WJID: 0,
      XRWJ: [
        // {
        //   w_class: "#icon-wenjian",
        //   name: "出错啦",
        //   folder: 0,
        //   childWjj: []
        // }
      ],
      WJ: [],
      index: []
    };
  },
  methods: {
    cancel() {
      this.flag = true;
    },
    updata() {
      // let FileName = $("#scfile").val();
      // let index1 = FileName.lastIndexOf(".");
      // let index2 = FileName.length;
      // let suffix = FileName.substring(index1, index2); //后缀名

      // let temp = this.WJ;
      // for (let i = 0; i < this.index.length; i++) {
      //   // temp = this.WJ[this.index[i]].childWjj;
      //   temp = temp[this.index[i]].childWjj;
      //   console.log(temp);
      // }
      // temp.push(newWj);
      let id = 0;
      if (this.father_WJID == null) {
        id = 0;
      } else {
        id = this.father_WJID;
      }
      let formdata = new FormData();
      formdata.append("name", this.name);
      formdata.append("file", $("#scfile")[0].files[0]);
      formdata.append("parent", id);
      this.$http
        .post(
          this.$store.state.url + "file/admin/insertFile",
          formdata,
          this.config
        )
        .then(res => {
          if (res.data.code == 200) {
            alert("上传成功");
            this.XRWJ = res.data.data;
            this.flag = true;
          }
          // location.reload();
        })
        .catch(res => {});
    },
    WJ_delete(windex) {
      let _this = this;
      event.stopPropagation();
      this.$http
        .post(
          this.$store.state.url + "file/admin/markAsDelete",
          qs.stringify({
            id: this.XRWJ[windex].id
          }),
          this.config
        )
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            alert("删除成功");
            this.$http
              .post(
                this.$store.state.url + "file/getFilesByParent",
                qs.stringify({
                  parent: this.father_WJID
                }),
                this.config
              )
              .then(res => {
                console.log(res);
                console.log(res.data);
                this.XRWJ = res.data;
              })
              .catch(res => {});
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    upload() {
      this.flag = false;
    },
    func(type, findex) {
      if (!type) {
        const a = document.createElement("a");
        a.href =
          this.$store.state.url +
          "file/downloadFile?id=" +
          this.XRWJ[findex].id;
        a.click();
      } else {
        // console.log(findex);
        // this.index.push(findex);
        // console.log(this.index);
        // this.XRWJ = this.XRWJ[findex].childWjj;
        this.$http
          .post(
            this.$store.state.url + "file/getFilesByParent",
            qs.stringify({
              parent: this.XRWJ[findex].id
            }),
            this.config
          )
          .then(res => {
            console.log(res);
            console.log(res.data);

            this.father_WJID = this.XRWJ[findex].id;
            this.XRWJ = res.data;
          })
          .catch(res => {});
      }
    },
    CreateNewWjj() {
      var Myname = prompt("请输入文件夹的名字：");
      if (Myname) {
        let id = 0;
        if (this.father_WJID == null) {
          id = 0;
        } else {
          id = this.father_WJID;
        }
        this.$http
          .post(
            this.$store.state.url + "file/admin/insertFolder",
            qs.stringify({
              parent: id,
              name: Myname
            }),
            this.config
          )
          .then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.XRWJ = res.data.data;
            }
          })
          .catch(res => {
            console.log(res);
          });
      } else if (Myname == "") {
        alert("文件夹名不能为空");
      }
    },
    Prelift() {
      this.$http
        .post(
          this.$store.state.url + "file/getParentFilesByParent",
          qs.stringify(
            {
              parent: this.father_WJID
            },
            this.config
          )
        )
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.father_WJID = res.data.id;
            this.XRWJ = res.data.data;
          }
        })
        .catch(res => {});
    }
  },
  mounted() {
    this.config.headers.Authorization = sessionStorage.Authorization;
    var _this = this;
    var myDate = new Date();
    this.data = myDate.getTime().toString();
    console.log(this.data);
    this.$http
      .post(this.$store.state.url + "file/getRootFile",null,this.config)
      .then(res => {
        console.log(res.data);
        this.XRWJ = res.data;
        // _this.WJ = res.data;
        // _this.XRWJ = res.data;
      })
      .catch(res => {
        console.log(res);
      });
    $(".WJxiazai_main").css("height", document.body.clientHeight - 50 + "px");
  },
  components: {
    WJmoban
  }
};
</script>

<style scoped>
h2 {
  line-height: 60px;
  margin: 0;
}
/* .WJxiazai {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 78%;
  border-radius: 10px;
  float: left;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
} */
.WJxiazai_main {
  background-color: white;
  width: 87%;
  float: right;
  margin: 0;
  border: 0;
}
.WJ_head {
  width: 90%;
  border-bottom: 1px solid #ccceec;
  height: 60px;
  margin: 0 auto;
  text-align: center;
  position: relative;
}
.el-button {
  position: absolute;
  right: 20px;
  bottom: 10px;
}
.WJmobanContainer {
  width: 140px;
  height: 200px;
  margin: 15px;
  margin-bottom: 15px;
  float: left;
}
.WJmobanContainer:hover > .delete {
  display: block;
}
.delete {
  font-size: 0.9em;
  color: red;
  display: none;
  cursor: pointer;
}
.WJmoban {
  width: 140px;
  height: 180px;
  font-size: 1em;
  background-color: #ebecff;
  margin: 0;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  cursor: pointer;
}
.WJmoban > p {
  /* color: white; */
  font-size: 1.3em;
  /* margin-block-start: 0em;
  margin-block-end: 0em; */
  margin: 0;
}
.WJ_main {
  width: 90%;
  margin: 0 auto;
}
.icon {
  height: 5em;
  width: 5em;
  margin-top: 2em;
  margin-bottom: 1em;
  fill: currentColor;
  overflow: hidden;
}
.WJ_left {
  width: 20px;
  height: 20px;
  border-top: 5px solid black;
  border-left: 5px solid black;
  transform: rotate(-45deg);
  position: absolute;
  left: 18px;
  top: 18px;
}
.WJ_left:hover {
  opacity: 0.6;
}
/* 
.WJshangchuan {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 70%;
  border-radius: 10px;
  float: right;
  margin-left: 80px;
  min-width: 400px;
  min-height: 400px;
  margin-right: 80px;
  margin-top: 100px;
} */
.ye {
  width: 221.4px;
  margin-left: 20px;
  color: green;
  border: 1px solid green;
  height: 30px;
}
.WJ_form {
  margin: 0 auto;
  width: 450px;
  text-align: left;
}
.scbtn {
  margin-top: 20px;
  width: 100px;

  position: relative;
}
</style>
