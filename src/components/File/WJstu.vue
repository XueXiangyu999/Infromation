<template>
  <div class="WJstu">
    <div class="WJ_head">
      <div class="WJ_left" @click="Prelift"></div>
      <h2>下载专区</h2>
    </div>
    <div class="WJ_main">
      <!-- <div class="WJmobanContainer">
        <WJmoban WJclass="#icon-jiahao" WJtext="新建文件夹"></WJmoban>
      </div> -->
      <div class="WJmobanContainer" v-for="(WJ_moban,index) in XRWJ" @click="func(WJ_moban.type,index)">
        <WJmoban :WJclass="WJ_moban.class" :WJtext="WJ_moban.text" :type="WJ_moban.type"></WJmoban>
        <!-- <p class="delete" @click="WJ_delete(index)">删除</p> -->
      </div>
    </div>
  </div>
</template>
<script>
import store from "@/vuex/store";
import WJmoban from "@/components/common/WJmoban.vue";
export default {
  store,
  data() {
    return {
      name: null,
      flag: true,
      id: null,
      data: null,
      XRWJ: [
        {
          class: "#icon-wenjian",
          text: "出错啦",
          type: 0,
          childWjj: []
        }
      ],
      WJ: [
      ],
      index: []
    };
  },
  methods: {
    func(type, findex) {
      if (type) {
        var _this = this;
        let Fid = this.XRWJ[findex].id;
        var xmlhttp;
        if (window.XMLHttpRequest) {
          // code for IE7+, Firefox, Chrome, Opera, Safari
          xmlhttp = new XMLHttpRequest();
        } else {
          // code for IE6, IE5
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 0) {
            console.log(0);
            console.log(xmlhttp.status);
          }
          if (xmlhttp.readyState == 1) {
            console.log(1);
            console.log(xmlhttp.status);
          }
          if (xmlhttp.readyState == 2) {
            console.log(2);
            console.log(xmlhttp.status);
          }
          if (xmlhttp.readyState == 3) {
            console.log(xmlhttp.status);
          }
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            xmlhttp.onload = function() {
              const data = xmlhttp.response;
              const a = document.createElement("a");
              const blob = new Blob([data]);
              const blobUrl = window.URL.createObjectURL(blob);
              a.style.display = "none";
              a.download = _this.XRWJ[findex].text;
              a.href = blobUrl;
              a.click();
            };

            console.log(xmlhttp.status);
            console.log("success");
          }
        };
        xmlhttp.open("get", this.$store.state.url + "down?id=" + Fid, true);
        xmlhttp.responseType = "blob";

        xmlhttp.send();
      } else {
        console.log(findex);
        this.index.push(findex);
        console.log(this.index);
        this.XRWJ = this.XRWJ[findex].childWjj;
      }
    },
    Prelift() {
      this.index.pop();
      let temp = this.WJ;
      for (let i = 0; i < this.index.length; i++) {
        temp = temp[this.index[i]].childWjj;
      }
      this.XRWJ = temp;
    }
  },
  mounted() {
    var _this = this;
    var myDate = new Date();
    this.data = myDate.getTime().toString();
    console.log(this.data);
    this.$http
      .get(this.$store.state.url + "getfolder")
      .then(res => {
        console.log(res.data);
        _this.WJ = res.data;
        _this.XRWJ = res.data;
      })
      .catch(res => {
        console.log(res);
      });
  },
  components: {
    WJmoban
  }
};
</script>
<style scoped>
/* .WJstu {
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
h2 {
  line-height: 60px;
  margin: 0;
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
</style>

