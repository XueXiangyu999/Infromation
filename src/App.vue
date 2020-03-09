 <template>
  <div id="app">
    <topNav v-if="!(path==='/login')"></topNav>
    <router-view></router-view>
    <!-- <router-view name="left_nav"/>
    <router-view name="main_inf"/> -->
    <!-- <router-view name="main_function"/> -->

    <div></div>
  </div>
</template>

<script>
// import leftNav from '@/components/common/left_nav'
import topNav from "@/components/common/top_nav";
export default {
  name: "App",
  components: {
    // leftNav,
    topNav 
  },
  data() {
    return {
      path: ""
    };
  },
  // mounted:function(){
  // var orderheight=document.body.clientHeight;
  // console.log(orderheight);
  // sessionStorage.setItem('testkey','12138');
  // console.log(sessionStorage)

  // document.getElementById('leftNav').style.height=orderheight+'px';
  // }
  mounted: function() {
    // var orderheight = document.body.clientHeight;
    // console.log(orderheight);
    //document.getElementById('leftNav').style.height=orderheight+'px';

    this.path = this.$route.path;
    // 判断路由
  },
  // 监视路由
  watch: {
    $route(to, from) {
      this.path = to.path;
    }
  }
};
</script>
  
<style>
#app {
  /* background: url("assets/huadian.jpg");
  background-size: 100% 100%; */
  background-color: #e9ecf5;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* overflow:scroll; */
  overflow-x: auto;
  text-align: center;
  color: #2c3e50;
  background: url("assets/huadian.jpg");
  background-color: #bfc2ed;
  /* background-size: 100% 100%;*/
  background-repeat: round;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: block;
  clear: both;
}
</style>
