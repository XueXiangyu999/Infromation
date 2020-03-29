<template>
  <div class="Infor_main">
    <div v-if="jkflag" class="left_Nav">
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#2d2e3e" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item-group>
          <p>{{title}}</p>
        </el-menu-item-group>
        <el-menu-item v-for="(option,Dindex) in options" :index="Dindex.toString()" :key="Dindex" @click="change(Dindex)">
          <i :class="option.iclass" class=""></i>
          <span slot="title">{{option.title}}</span>
        </el-menu-item> 
      </el-menu>
    </div>
    <router-view class="INfor_main_right"></router-view>
  </div>
</template>
<script>
import Notice from "@/components/common/notice.vue";
import store from "@/vuex/store";
export default {
  store,
  name: "Left_Nav",
  components: {
    Notice
  },
  data() {
    return {
      defaultActive:'0',
      jkflag:true,
      title: null,
      options: null
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    setDefaultActive(){
      this.defaultActive=sessionStorage.getItem('nowActive').toString();
      console.log(this.defaultActive)
    },
    change(index) {
      // this.$router.push({path:this.$store.state.router[this.$route.query.serve][index],query:{serve:this.$route.query.serve}});
      this.$router.push({
        path: this.options[index].path,
        query: this.$route.query
      });
    }
  },
  store,

  mounted() {
    this.setDefaultActive();
    // $(".left_Nav").animate({ top: "0px" });
    // console.log($('.INfor_main_right')[0].clientHeight)
    // console.log($('.INfor_main_right').eq(0).clientHeight)
    // console.log($('.INfor_main_right').clientHeight)
    // console.log($('.INfor_main_right').css('height'))
    // console.log($('.INfor_main_right'))
    // $('.left_Nav').height($('.INfor_main_right')[0].clientHeight+"px")
    var _this = this;
    // console.log(_this.$route.query.serve);
    // console.log(_this.$store.state.servers);
    // let Myheight = document.body.clientHeight - 50;
    // console.log(Myheight);
    // $(".left_Nav").css("height", Myheight + "px");
    // $(".INfor_main_right").css("height", Myheight + "px");
    this.$store.commit('getOptions',[this.$route.query.name,this.$route.query.identity])
    this.options=this.$store.state.options;
    console.log(this.options)
    this.title=this.$route.query.name
    // this.options = this.$store.state.left_nav[this.$route.query.serve];
    if(this.$route.path=='/std_information'||this.$route.path=='/tch_information'||this.$route.path=='/admin_information'){
      this.jkflag=false
    }
  }
};
</script>

<style scoped>
p {
  text-align: center;
  font-size: 1.2em;
  /* margin-block-start: 0em;
  margin-block-end: 0em; */
  margin: 0;
}
.notice {
  float: right;
  margin-top: 22px;
  font-size: 5px;
}
.notice p {
  line-height: 14px;
  margin: 0;
  color: white;
}
.el-menu-item-group {
  background-color: #232324;
  border-bottom: 18px solid #232324;
}
.left_Nav {
  color: white;
  background-color: #2d2e3e;
  text-align: left;
  width: 13%;
  margin: 0;
  overflow: hidden;
  min-height: 100%;
  float: left;
}
.left_Nav >>> .el-menu {
  border: 0px !important;
}
/* .el-menu-item i {
 color: white;
} */
.Infor_main {
  overflow:auto;
  height: 100%;
}
.Infor_main:after{
    clear: both;
}
.INfor_main_right {
  background-color: white;
  width: 87%;
  min-height: 100%;
  float: right;
  margin: 0;
  border: 0;
  /* overflow:scroll ; */
}
</style>