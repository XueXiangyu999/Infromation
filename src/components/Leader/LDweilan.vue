<template>
  <div class="lingdao">
    <!-- <div id="container"></div> -->
    <!-- <div v-if="Is">
      <div v-if="flag">
        <el-button type="success" @click="dingwei">定位</el-button>
      </div>
      <div v-else>
        <el-button type="derger" @click="dingwei">重新定位</el-button>
        <el-button type="success" @click="success">定位成功</el-button>
      </div>
    </div>
    <div v-else>
      <el-button class="danger" @click="quit">退出</el-button>
    </div> -->
    <div v-if="flag">
      <el-select v-model="value" placeholder="预计在线时间" class="LD_select">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <br>
      <el-button type="success" @click="online">我在线上</el-button>
    </div>
    <div v-else>
      <div style="margin:40px">
        <label style="font-size:1.3em;color:">剩余在线时长：</label>
        <div class="time">
          <div class="time_container" style="background-color:red">
            <p class="timer">{{hour}}</p>
            <p class="unit">时</p>

          </div>
          <div class="time_container" style="background-color:blue">
            <p class="timer">{{minute}}</p>
            <p class="unit">分</p>

          </div>
          <div class="time_container" style="background-color:green">
            <p class="timer">{{second}}</p>
            <p class="unit">秒</p>

          </div>
        </div>
        <!-- <label>{{hour}} 时 {{minute}} 分 {{second}} 秒 </label> -->
      </div>

      <el-button type="danger" @click="outline">提前下线</el-button>
    </div>

  </div>
</template>

<script>
import store from "@/vuex/store";
import qs from "qs"
export default {
  store,
  data() {
    return {
      leaderName:null,
      options: [
        {
          value: 1,
          label: "30分钟"
        },
        {
          value: 2,
          label: "1小时"
        },
        {
          value: 3,
          label: "1小时30分钟"
        },
        {
          value: 4,
          label: "2小时"
        },
        {
          value: 5,
          label: "2小时30分钟"
        },
        {
          value: 6,
          label: "3小时"
        },
        {
          value: 7,
          label: "3小时30分钟"
        },
        {
          value: 8,
          label: "4小时"
        },
        {
          value: 99,
          label: "不定时"
        }
      ],
      value: null,
      flag: true,
      Is: true,
      LD_point: null,
      LD_map: null,
      hour: null,
      minute: null,
      second: null,
      times: [
        {
          color: "red",
          time: "时"
        },
        {
          color: "blue",
          time: "分"
        },
        {
          color: "green",
          time: "秒"
        }
      ],
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    };
  },
  watch:{
    second(to,form){
      // console.log(to)
      if(this.hour==0&&this.minute==0&&to==0){
        this.outline();
      }
    }
  },
  computed: {
    returnzTime(index) {
      switch (index) {
        case 1:
          return this.hour;
          break;
        case 2:
          return this.minute;
          break;
        case 3:
          return this.second;
          break;
      }
    }
  },
  methods: {
    dingwei() {
      var userAgent = window.navigator.userAgent; //取得浏览器的userAgent字符串
      console.log(userAgent);
      console.log(userAgent.indexOf("Chrome"));
      if (userAgent.indexOf("Edge") > -1) {
        this.dingweio();
      } else if (userAgent.indexOf("Chrome") > -1) {
        console.log("q11");
        this.dingweit();
      }
    },
    dingweio() {
      var _this = this;
      // console.log(this.LD_point);
      // console.log(this.LD_map);
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          // _this.LD_map.addControl(15);
          _this.LD_map.addOverlay(mk);
          _this.LD_map.panTo(r.point);
          _this.LD_point = r.point;
          console.log(_this.LD_point);
          _this.LD_map.centerAndZoom(this.LD_point, 15);
          // alert("您的位置：" + r.point.lng + "," + r.point.lat);
          _this.$http
            .get(this.$store.state.url + "leader/leader", {
              params: {
                name: this.leaderName,
                latitude: r.point.lat,
                longtitude: r.point.lng
              }
            },this.config)
            .then(function(res) {
              console.log(res);
            })
            .catch(function(res) {});
        } else {
          alert("failed" + this.getStatus());
        }
      });
      this.flag = false;
    },
    dingweit() {
      var _this = this;
      // console.log(this.LD_point);
      // console.log(this.LD_map);
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          console.log(r.point);
          // var translateCallback = function(point) {
          //   console.log(point)
          //   var mk = new BMap.Marker(point);
          //   _this.LD_map.addOverlay(mk);
          //   var label = new BMap.Label("我是百度标注哦", {
          //     offset: new BMap.Size(20, -10)
          //   });
          //   mk.setLabel(label); //添加百度label
          //   _this.LD_map.setCenter(point);
          //   alert(point.lng + "," + point.lat);
          // };
          setTimeout(function() {
            var convertor = new BMap.Convertor();
            var pointArr = [];
            pointArr.push(r.point);
            convertor.translate(pointArr, 1, 5, function(data) {
              if (data.status === 0) {
                var marker = new BMap.Marker(data.points[0]);
                _this.LD_map.addOverlay(marker);
                // var label = new BMap.Label("转换后的百度标注（正确）", {
                //   offset: new BMap.Size(20, -10)
                // });
                // marker.setLabel(label); //添加百度label
                _this.LD_map.setCenter(data.points[0]);
                _this.$http
                  .get(this.$store.state.url + "leader/leader", {
                    params: {
                      name: this.leaderName,
                      latitude: r.point.lng,
                      longtitude: r.point.lat
                    }
                  },this.config)
                  .then(function(res) {
                    console.log(res);
                  })
                  .catch(function(res) {});
              }
            });

            // BMap.Convertor.translate(r.point, 0, function(point) {
            //   r.point = point;
            //   _this.LD_map.addOverlay(mk);
            //   _this.LD_map.panTo(r.point);
            //   _this.LD_point = r.point;

            //   console.log(_this.LD_point);
            //   _this.LD_map.centerAndZoom(this.LD_point, 15);
            // }); //真实经纬度转成百度坐标
          }, 1000);
          console.log(r.point);
          // _this.LD_map.addControl(15);

          // alert("您的位置：" + r.point.lng + "," + r.point.lat);
        } else {
          alert("failed" + this.getStatus());
        }
      });
      this.flag = false;
    },

    success() {
      this.Is = false;
    },
    quit() {
      this.$http.get().then();
    },

    online() {
      console.log(this.value);
      console.log(this.config)
      this.$http
        .post(this.$store.state.url + "leader/leaderduration", 
          qs.stringify({
            name:this.leaderName,
            time: this.value
          }) 
        ,this.config)
        .then(res => {
          console.log(res);
          if (res.data == 1) {
            this.flag = false;
            this.hour = Math.floor(this.value / 2);
            this.minute = (this.value % 2) * 30;
            this.second = 0;
            var timer = setInterval(() => {
              this.second -= 1;
              if (this.second < 0) {
                this.second = 60;
                this.minute -= 1;
              }
              if (this.minute < 0) {
                this.minute = 60;
                this.hour -= 1;
              }
            }, 1000);
          }
        })
        .catch(res => {
          console.log(res);
        });
      this.flag = false;
      this.hour = Math.floor(this.value / 2);
      this.minute = (this.value % 2) * 30;
      this.second = 0;
      var timer = setInterval(() => {
        this.second -= 1;
        if (this.second < 0) {
          this.second = 59;
          this.minute -= 1;
        }
        if (this.minute < 0) {
          this.minute = 59;
          this.hour -= 1;
        }
      }, 1000);
    },
    outline() {
      this.$http
        .post(this.$store.state.url + "leader/leaderoffline", qs.stringify({
            name: this.leaderName
        }),this.config)
        .then(res => {
          console.log(res);
          if (res.data == 1) this.flag = true;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  
  mounted() {
    this.config.headers.Authorization=sessionStorage.Authorization;
    
    // this.leaderName=sessionStorage.name;
    this.leaderName="周杰伦";
    // this.$store.commit("loginStatus", sessionStorage.getItem("isLogin"));
    // if (this.$store.state.user.isLogin == 0) {
    //   this.$router.push("/login");
    // }
    var date = new Date();
    var hours = date.getHours;
    var minutes = date.getMinutes;
    var seconds = date.getSeconds;
    // this.LD_map = new BMap.Map("container");
    // // 创建地图实例
    // this.LD_point = new BMap.Point(115.51, 38.89);
    // // 创建点坐标
    // this.LD_map.centerAndZoom(this.LD_point, 15);
    // // 初始化地图，设置中心点坐标和地图级别
    console.log(this.config)
    var _this = this;
    this.$http
      .post(this.$store.state.url + "leader/leaderonline",qs.stringify({
          name: this.leaderName
      }) ,this.config)
      .then(res => {
        console.log(res);
        if (res.data.key == "领导不在线") {
          this.flag = true;
        } else {
          //返回领导剩余在线时长
          console.log(res.data);
          this.hour = res.data.hour;
          this.minute = res.data.minute;
          this.second = 60;
          var timer = setInterval(() => {
            this.second -= 1;
            if (this.second < 0) {
              this.second = 60;
              this.minute -= 1;
            }
            if (this.minute < 0) {
              this.minute = 60;
              this.hour -= 1;
            }
            if(this.hour<0){
              this.outline();
            }
          }, 1000);
          this.flag = false;
        }
      })
      .catch(res => {
        console.log(res);
      });
      $(".lingdao").css("height", document.body.clientHeight - 50 + "px");
  }
};
</script>

<style scoped>
/* .lingdao {
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
.lingdao {
  background-color: white;
  width: 87%;
  float: right;
  margin: 0;
  border:0;
}
.time {
  margin: 0 auto;
  width: 530px;
  overflow: hidden;
}
.timer {
  color: white;
  font-size: 2em;
  margin: 20px auto;
}
.unit {
  font-size: 1.2em;
  color: white;
  margin: 0px auto;
}
.time_container {
  width: 120px;
  height: 120px;
  opacity: 0.8;
  float: left;
  background-color: blue;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 28px;
}
#container {
  margin: 10px auto;
  width: 60%;
  height: 400px;
}
.el-button {
  width: 250px;
  height: 50px;
  border-radius: 10px;
  margin: 10px;
}
.LD_select {
  width: 25%;
  margin-top: 60px;
  margin-bottom: 60px;
}
</style>
