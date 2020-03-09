<template>
<div>
  <div class="left_Nav">
    <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#ffffff" text-color="#818181" active-text-color="#a1bddf">
      <el-menu-item-group>
          <!-- <template slot="title"> -->
            <p>{{title}}</p>
          <!-- </template> -->
      </el-menu-item-group>
      <el-menu-item v-for="(option,index) in options" index="index" :key="index" @click="change(index)">
        <i :class="option.iclass"></i>
        <span slot="title">{{option.title}}</span>
        <!-- <Notice class="notice">
          <p>1</p>
        </Notice> -->
      </el-menu-item>
    </el-menu>
    
  </div>
<router-view></router-view>
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
  data(){
    return{
    title:null,
    options:null,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    change(index){
      // this.$router.push({path:this.$store.state.router[this.$route.query.serve][index],query:{serve:this.$route.query.serve}});
      this.$router.push({path:this.$store.state.router[this.$route.query.serve][index],query:{serve:this.$route.query.serve,opt:index}});

    }
  }, 
  store,
  mounted() {
    $(".left_Nav").animate({ top: "0px" });
    var _this=this
    console.log(_this.$route.query.serve);
    console.log(_this.$store.state.servers);
    this.title=this.$store.state.servers[this.$route.query.serve];
    this.options=this.$store.state.left_nav[this.$route.query.serve];
  },
  
};
</script>

<style scoped>
p{
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
.left_Nav {
  text-align: left;
  width: 14%;
  position: relative;
  top: -1000px;
  overflow: hidden;
  float: left;
  margin-top: 20px;
  margin-left: 1vw;
  border-radius: 10px;
  min-width: 170px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
}
</style>

