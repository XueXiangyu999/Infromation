<template>
  <div class="main">
    <!-- <div class="student_server">
      <div class="inf_top">
        <span>学生服务</span>
      </div>
      <ul class="list">
        <li v-for="(student,index) in std_servers" @click="select(index)">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="student.class"></use>
          </svg>
          <p>{{student.title}}</p>
        </li>
      </ul>
    </div>
    <div class="teacher_server">
      <div class="inf_top">
        <span>教师服务</span>
      </div>
      <ul class="list">
        <li v-for="(teacher,index) in tch_servers" @click="select(index+std_servers.length)">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="teacher.class"></use>
          </svg>
          <p>{{teacher.title}}</p>
        </li>
      </ul>
    </div> -->
    <div class="my_server">
      <div class="inf_top">
        <span>我的服务</span>
      </div>
      <ul class="list">
        <li v-for="(server,index) in my_servers" @click="selectAll(index)">
          <svg class="icon" aria-hidden="true">
            <use :xlink:href="server.image"></use>
          </svg>
          <p>{{server.name}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import store from "@/vuex/store";
import qs from "qs";
export default {
  store,
  name: "Inf",
  data() {
    return {
      std_servers: [
        {
          class: "#icon-leave-active",
          title: "请假销假"
        },

        {
          class: "#icon-xinxi1",
          title: "信息收集"
        },
        {
          class: "#icon-lingdaoren",
          title: "领导围栏"
        },
        {
          class: "#icon-wenjian-copy",
          title: "文件下载"
        },
        {
          class: "#icon-shetuanhuodong",
          title: "社团管理"
        }
      ],
      tch_servers: [
        {
          class: "#icon-kaoshiok",
          title: "考试申请"
        },
        {
          class: "#icon-rili",
          title: "教学日历"
        },
        {
          class: "#icon-qingjiashenhe",
          title: "请假销假"
        },
        {
          class: "#icon-shenhe",
          title: "学分审核"
        },
        {
          class: "#icon-lingdaoren",
          title: "领导围栏"
        },
        {
          class: "#icon-wenjian-copy",
          title: "文件下载"
        },
        {
          class: "#icon-shujijiaocai",
          title: "教材使用"
        },
        {
          class: "#icon-ketang2",
          title: "课堂质量评价"
        },
        {
          class: "#icon-jiaolian1",
          title: "辅导员模块"
        },
        {
          class: "#icon-yuyue",
          title: "我要预约"
        }
      ],
      my_servers: [
        {
          image: "",
          name: "",
          entrance: "",
          work: 1
        }
      ],

      li: null,
      paths: [
        "/std_qingjia/std_qingjia",
        "/admin_Getnformaition",
        "/std_lingdao/lingdao",
        "/std_wenjian/wenjian",
        "/std_shetuan/shetuan",
        "/tch_kaoshi/kaoshi",
        "/tch_rili/rili",
        "/tch_qingjia/tch_qingjia",
        "/tch_xuefen/xuefen",
        "/tch_lingdao/lingdao",
        "/tch_wenjian/wenjian",
        "/tch_jiaocai/jiaocai",
        "/tch_ketang/ketang",
        "/tch_fudaoyuan/fudaoyuan",
        "/tch_yuyue/my"
      ],
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  methods: {
    select: function(index) {
      this.li = $(".list li");
      console.log(this.li.length);
      this.li.eq(index).animate(
        {
          top: "-1200px"
        },
        () => {
          console.log(111);
          this.$router.push({
            path: this.paths[index],
            query: { serve: index }
          });
        }
      );
    },
    selectAll(index) {
      this.li = $(".list li");
      console.log(this.li.length);
      this.li.eq(index).animate(
        {
          top: "-1200px"
        },
        () => {
          console.log(111);
          this.$router.push({
            path: this.my_servers[index].entrance,
            query: {
              name: this.my_servers[index].name
              // identity:this.my_servers[index].identity
            }
          });
        }
      );
    }
  },
  mounted() {
    if(sessionStorage){
          this.config.headers.Authorization = sessionStorage.Authorization||null;

            this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    if (this.$store.state.user.isLogin == 0) {
      this.$router.push("/login");
    }
    }else{
      this.$router.push("/login");
    }



    //    this.$http.post("http://192.168.199.172:8068/getBaseList",{
    //     "pageNo":1,
    //     "pageSize":2,
    //     "usrId":"123"
    // }).then(res=>{
    //   console.log(res)
    // })
    this.$http
      .post(
        this.$store.state.url + "authority/getModuleListByUser",
        qs.stringify({}),
        this.config
      )
      .then(res => {
        console.log(res);
        this.my_servers = res.data;
        
      });
  }
};
</script>
<style scoped>
.main {
  opacity: 0.95;
  width: 800px;
  padding: 10px;
  margin: 0 auto;
  min-height: 80%;
  /* background-color: #d6e3f2; */
  background-color: white;
  margin-top: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  /* position: relative; */
  /* overflow-x: scroll; */
  border-radius: 10px;
  min-width: 180px;
}
.student_server,
.teacher_server {
  padding: 0px;
  margin: 10px;
  /* background-color: #f2f8f9; */
  min-width: 180px;
}
.inf_top {
  width: 80%;
  margin: 0 auto;
  overflow: hidden;
  border-bottom: 2px solid #ebebeb;
}
.inf_top span {
  margin-top: 10px;
  margin-bottom: 10px;
  float: left;
  font-size: 1.3em;
  border-left: 3px solid red;
  padding-left: 16px;
}
.list {
  padding: 0px;
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  list-style: none;
}
.list li {
  position: relative;
  margin: 10px;
  font-size: 1.2em;
  background-color: #d9dbf2;
  width: 30%;
  min-width: 180px;
  height: 140px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  border-radius: 6px;
}
.list p {
  /* margin-block-start: 0em;
  margin-block-end: 0em; */
  margin: 0;
}
.list li i {
  font-size: 1.2em;
}
#app {
  background: url("../../assets/huadian.jpg");
  /* background-size: 100% 100%;*/
  background-repeat: round;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: block;
  clear: both;
}
.icon {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  fill: currentColor;
  overflow: hidden;
}
</style>
