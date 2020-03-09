<template>
  <div class="main">
    <div class="details">
      <div class="details_table">
        <table>
          <tr v-for="(term,index) in tableData" :key="index">
            <td class="details_left">
              {{term.name}}
            </td>
            <td class="details_right">
              <!-- <b>{{term.text}}</b> -->
              <Myhtml class="myhtml" v-html="term.text"></Myhtml>
            </td>
          </tr>
        </table>
      </div>
      <el-button class="detailsBtn" type="success" @click="success">确认</el-button>
    </div>
    <div class="shadow"></div>
  </div>
</template>
<script>
import Myhtml from "@/components/common/Myhtml";
export default {
  props: ["detailsData", "detailsName"],
  components: {
    Myhtml
  },
  data() {
    return {
      tableData: [],
      keys: []
    };
  },
  methods: {
    success() {
      this.$emit("success");
    }
  },
  mounted() {
    // console.log(this.detailsData)
    for (let key in this.detailsData) {
      // console.log(key)
      this.keys.push(key);
    }
    // console.log(this.detailsData);
    console.log(this.detailsName)
    console.log(this.detailsData)
    console.log(this.keys)
    for (let i = 0; i < this.detailsName.length; i++) {
      for (let j = 0; j < this.keys.length; j++) {
        if (this.keys[j] == this.detailsName[i].prop) {
          let key=this.keys[j];
          
          console.log(key)
          console.log(this.detailsData[key])
          // let newD = {
          //   name: this.detailsName[i].label + ":",
          //   text: this.detailsData[key]
          // };
          this.tableData.push({
            name: this.detailsName[i].label + ":",
            text: this.detailsData[key]
          });
        }
      }

      // console.log($('Myhtml'))
    }
    console.log(this.tableData)
    //  console.log($('.myhtml'))
    let top = document.body.clientHeight * 0.08;
    let left = document.body.clientWidth * 0.2;
    $(".details")
      .eq(0)
      .css("top", top + "px");
    $(".details")
      .eq(0)
      .css("left", left + "px");
    $(".shadow")
      .eq(0)
      .css("width", document.body.clientWidth);
    $(".shadow")
      .eq(0)
      .css("height", document.body.clientWidth);
  },
  updated() {
    console.log($(".myhtml"));
    for (let i = 0; i < this.detailsName.length; i++) {
      // console.log($(".html").eq(i));
      // $(".html")
      //   .eq(i)
      //   .html(this.detailsData[this.keys[i]]);
    }
  }
};
</script>
<style>
.details {
  position: fixed;
  width: 60vw;
  padding: 10px;
  background-color: white;
  border-radius: 18px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.2);
  z-index: 1500;
}
.details tr {
  height: 38px;
}
.details_left {
  width: 16%;
}
.details_right {
  width: 80%;
}
.details_table {
  min-height: 30vh;
  max-height: 70vh;
  overflow-y: scroll;
}
.detailsBtn {
  width: 30%;
  margin: 20px;
}
.shadow {
  background-color: #000;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  opacity: 0.5;
  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 1000;
}
</style>
