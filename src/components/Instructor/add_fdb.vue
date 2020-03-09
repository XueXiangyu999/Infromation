<template>
  <div class="addFDB">
    <h2>班干部信息添加</h2>
    班级：
    <el-select v-model="valueBJ" placeholder="选择班级" @change="selectBJ" style="margin-right:200px">
      <el-option v-for="item in optionsBJ" :key="item.value" :label="item.natureClass" :value="item.nature_class">
      </el-option>
    </el-select>
    职务：
    <el-select v-model="valueZW" placeholder="选择职务" @change="selectZW">
      <el-option v-for="item in optionsZW" :key="item.value" :label="item.dutyName" :value="item.duty">
      </el-option>
    </el-select>

    <el-table :data="tableData" style="width: 95%;margin:0 auto" :cell-style="{padding:'0px'}">

      <el-table-column v-for="col in BanganbuCols" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click.native.prevent="set(scope.$index, tableData)" type="text" size="small">设置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <TBfoot ref="t1" class="TBfoot" :value="TBvalue" :options="TBoptions" @change="change"></TBfoot>
    <el-button class="back" @click="cancel" type="danger">返回</el-button>
  </div>

</template>
<script>
import qs from "qs";
import TBfoot from "@/components/common/table_footer";
import store from "@/vuex/store";
export default {
  components: { TBfoot },
  data() {
    return {
      TBvalue: null,
      TBoptions: [],
      config: {
        headers: {
          Authorization: null,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      },
      valueZW: null,
      optionsBJ: [],
      optionsZW: [],
      valueBJ: null,
      valueZW: null,
      tableData: [],
      BanganbuCols: [
        // {
        //   prop: "natureClass",
        //   label: "班级"
        // },
        {
          prop: "dutyName",
          label: "职务"
        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "phone",
          label: "电话"
        }
      ]
    };
  },
  store,
  methods: {
    change(index) {
      this.selectCY(index);
    },
    selectBJ() {},
    selectZW() {},
    selectCY(num) {
      console.log(this.valueBJ);
      this.$http
        .post(
          this.$store.state.url + "userManagement/admin/getClassMember",
          qs.stringify({
            nature_class: this.valueBJ,
            duty: "",
            pageNum: num,
            limit: 15
          }),
          this.config
        )
        .then(res => {
          this.tableData = [];
          console.log(res);
          this.TBoptions[0] = res.data.navigatepageNums;
          this.$refs.t1.setToptions(this.TBoptions[0]);
          let response = res.data.list;
          let Bphone;
          for (let i = 0; i < response.length; i++) {
            if (response.phone != null) {
              Bphone = response[i].phone;
            } else {
              Bphone = "暂无";
            }

            let newData = {
              id: response[i].id,
              dutyName: response[i].dutyName,
              // natureClass: response[i].classMsg.natureClass,
              name: response[i].msg.name,
              phone: Bphone
            };
            this.tableData.push(newData);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    set(index, data) {
      console.log(data[index]);
      this.$http
        .post(
          this.$store.state.url + "userManagement/updateStudentDuty",
          qs.stringify({
            id: data[index].id,
            duty: this.valueZW,
            nature_class: this.valueBJ
          }),
          this.config
        )
        .then(res => {
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.config.headers.Authorization = sessionStorage.Authorization;
    if (this.$route.query.text != null) {
      console.log(this.$route.query.text);
      let msg = this.$route.query.text;
      this.optionsBJ = [
        {
          natureClass: msg.natureClass,
          nature_class: msg.nature_class
        }
      ];
      this.valueBJ = msg.nature_class;

      this.optionsZW = [
        {
          dutyName: msg.dutyName,
          duty: msg.duty
        }
      ];
      this.valueZW = msg.duty;
      this.$refs.t1.setTvalue(1);
      setTimeout(this.selectCY(1), 100);
    } else {
      this.$http
        .post(
          this.$store.state.url + "userManagement/getNatureClass",
          qs.stringify({}),
          this.config
        )
        .then(res => {
          console.log(res);
          this.optionsBJ = res.data;
        })
        .catch(res => {
          console.log(res);
        });

      this.$http
        .post(
          this.$store.state.url + "userManagement/getAllStudentDuty",
          qs.stringify({}),
          this.config
        )
        .then(res => {
          console.log(res);
          this.optionsZW = res.data;
        })
        .catch(res => {
          console.log(res);
        });
    }
     $(".addFDB").css("height", document.body.clientHeight - 50 + "px");
  }
};
</script>
<style scoped>
/* .addFDB {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 78%;
  border-radius: 10px;
  float: left;
  min-width: 800px;
  margin-left: 2vw;
  min-height: 400px;
  margin-top: 50px;
} */
.addFDB {
  background-color: white;
  width: 87%;
  float: right;
  margin: 0;
  border:0;
}
.addTable {
  margin: 0 auto;
  font-size: 1.2em;
}
.addTable tr {
  height: 50px;
}
.addTable input {
  text-align: center;
  height: 1.4em;
  margin-right: 30px;
  width: 280px;
  font-size: 1.1em;
}
.addTable label {
  font-size: 0.86em;
}
.addTable .el-select {
  height: 1.4em;
  margin-right: 30px;
  width: 290px;
  font-size: 1.1em;
  display: block;
}
h2 {
  border-bottom: 2px solid #e6e6f1;
}
.TBfoot {
  float: right;
  margin-top: 10px;
  margin-right: 40px;
}
.back {
  float: left;
  margin-left: 30px;
  margin-top: 10px;
}

</style>