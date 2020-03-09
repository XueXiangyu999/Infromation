<template>
    <div class="YYxueqi">
        <h2>学期操作</h2>
        <div class="time">
            <div class="block">
                <span class="demonstration">起始日期：</span>
                <el-date-picker v-model="value1" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <div class="block">
                <span class="demonstration">节假日：</span>
                <el-date-picker value-format="yyyy-MM-dd" v-model="value2" type="date" placeholder="选择日期">
                </el-date-picker>
            </div>
            <el-button class="xueqiBTN" @click="chooseHio" type="">选择</el-button>
        </div>
        <h4>当前已选节假日</h4>
        <div style="overflow: hidden;">
            <div v-for="(term,index) in holidays" :key="index" class="holiday">
                {{term}}
                <i class="icon iconfont icon-error_circle" @click="close(index)"></i>
            </div>
        </div>
        <el-button class="submit" type="success" @click="submitNow">立即提交</el-button>
    </div>
</template>

<script>
export default {
  data() {
    return {
      value1: null,
      value2: null,
      holidays:[],
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/json"
        }
      }
    };
  },
  methods:{
      close(index){
        this.holidays.splice(index,1)
      },
      submitNow(){},
      chooseHio(){
        console.log(this.value2)
        if(this.value2!=null){
          this.holidays.push(this.value2);
        this.value2=null;
        }
        else{
          alert("请选择假期")
        }
      }
  }
};
</script>

<style scoped>
/* .YYxueqi {
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 78%;
  min-width: 1100px;
  border-radius: 10px;
  float: left;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
} */
.time {
  margin: 0 auto;
  width: 70%;
  overflow: hidden;
}
.block {
  float: left;
  margin-right: 50px;
}
.xueqiBTN {
  float: left;
}
.holiday {
  width: 120px;
  height: 20px;
  border: 1px solid #e2e2e2;
  margin: 15px;
  float: left;
  text-align: left;
  line-height: 20px;
  padding: 5px;
  border-radius: 5px;
}
.icon{
    margin-left: 6px;overflow: hidden;
    cursor: pointer;
}
.submit{
  margin: 20px;
  width:200px;
}
</style>
