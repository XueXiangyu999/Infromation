<template>

  <div class="topNav">
    <div class="big_icon">
      <!-- <p style="line-height: 50px;">NCEPU</p> -->
      <img class="logo" src="../../assets/logo.png" />
    </div>
    <div class="nav">
      <!-- <div class="search">
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div> -->
      <ul class="top_inf">
        <!-- <li class="top_opt">
          <i class="icon iconfont icon-guanbi" />

        </li> -->
        <!-- <li class="top_opt" @click="down(0)" @mouseleave="up(0)">
          <i class="icon iconfont icon-youxiang" /></i>
          <ul class="option">
            <li v-for="option in options" :key="option.name">{{option.text}}</li>
          </ul>
        </li> -->
        <li class="top_opt" @click="down(0)" @mouseleave="up(0)">
          <i class="icon iconfont icon-shezhi">
          </i>
          <ul class="option">
            <li class="header_options" v-for="option in options" @click="jump(index)" :key="option.name">{{option.text}}</li>
          </ul>
        </li>
        <li class="top_opt" @click="backhome">
          <i class="icon iconfont icon-guanbi" />
        </li>
      </ul>
    </div>
  </div>

</template> 
<script>
import Notice from "@/components/common/notice.vue";
export default {
  name: "Top_Nav",
  data() {
    return {
      options: [
        {
          id: 1,
          name: "1",
          text: "我的信息",
        },
        // {
        //   id: 2,
        //   name: "2",
        //   text: "退出登陆"
        // },
        // {
        //   id: 3,
        //   name: "3",
        //   text: "选项三"
        // }
      ],
      option: null,

      input: "",
      select: ""
    };
  },
  methods: {
    backhome: function() {
      this.$router.push("/");
    },
    jump(index){
      switch(index){
        case 1:
          this.$router.push('/std_information')
        break;
      }
    },
    down: function(index) {
      this.option.eq(index).css({
        width: "180px",
        height: this.options.length * 30 + "px",
        transition: "width 0.1s,height 0.5s",
      });
    },
    up: function(index) {
      this.option.eq(index).css({
        width: "0px",
        height: "0px",
        transition: "width 0.5s,height 0.1s"
      });
    }
  },
  components: {
    Notice
  },
  mounted() {
    this.option = $(".option");
    console.log(this.option);
  }
};
</script>
<style scoped>
* {
  /* margin-block-start: 0em;
  margin-block-end: 0em; */
  margin: 0;
}

.topNav {
  z-index: 1000;
  position: relative;
  height: 50px;
  /* height: 6%; */
  width: 100%;
  /* min-width: 1050px; */
  opacity: 0.8;
}
.nav {
  background-color: white;
  /* min-width: 800px; */
  float: left;
  width: 84%;
  height: 100%;
}
.big_icon {
  /* min-width: 150px; */
  overflow: hidden;
  background-color: white;
  width: 16%;
  height: 100%;
  float: left;
}
.big_icon img {
  width: 90%;
  height: 90%;
  object-fit: fill;
}
.top_inf{
  height: 100%;
  /* overflow: hidden; */
  float: right;
}
.top_opt {
  list-style: none;
  float: right;
  height: 100%;
  width: 50px;
  border-left: 1px solid #f2f3f5;
  position: relative;
}
.top_opt:hover {
  background-color: #b1b1b1;
}
.icon-youxiang {
  position: relative;
  top: 9px;
  color: blue;
  font-size: 30px;
}
.icon-shezhi {
  position: relative;
  top: 9px;
  color: blue;
  font-size: 1.8em;
}
.icon-guanbi {
  position: relative;
  top: 11px;
  color: red;
  font-size: 1.6em;
}
.notice {
  position: absolute;
  z-index: 20px;
  bottom: 28px;
  left: 28px;
}
.notice p {
  line-height: 14px;
  margin: 0;
  color: white;
  font-size: 0.7em;
}
.option {
  padding-inline-start: 0px;
  position: absolute;
  top: 45px;
  right: 0px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  width: 0px;
  height: 0px;
  overflow: hidden;
}
.option li {
  /* float: left; */
  opacity: 2;
  z-index: 99;
  list-style: none;
  height: 30px;
  line-height: 30px;
}
.search {
  width: 300px;
  margin-left: 100px;
  margin-top: 5px;
  float: left;
}
.header_options{
  cursor: pointer;
}
</style>


