<template>
  <div class="dabiao">
    <h2>达标学生</h2>
    <el-button type="primary">下载</el-button>
    <div class="DB_table">
      <p>预览</p>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="学号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>
    </div>
    <!-- <input type="file"onchange="importf(this)" />

    <p id="excelContent"></p> -->
  </div>
</template>

<script>
import store from "@/vuex/store";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  mounted() {
    /**

         * FileReader共有4种读取方法：

         * 1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。

         * 2.readAsBinaryString(file)：将文件读取为二进制字符串

         * 3.readAsDataURL(file)：将文件读取为Data URL

         * 4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'

         */

    // var wb; //读取完成的数据

    // var rABS = false; //是否将文件读取为二进制字符串

    //开始导入

    // function importf(obj) {
    //   if (!obj.files) {
    //     return;
    //   }

    //   var f = obj.files[0];

    //   var reader = new FileReader();

    //   reader.onload = function(e) {
    //     var data = e.target.result;

    //     if (rABS) {
    //       wb = XLSX.read(btoa(fixdata(data)), {
    //         //手动转化
    //         type: "base64"
    //       });
    //     } else {
    //       wb = XLSX.read(data, {
    //         type: "binary"
    //       });
    //     }

    //     /**
    //      * wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
    //      * wb.Sheets[Sheet名]获取第一个Sheet的数据
    //      */

    //     var excelJson = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

    //     document.getElementById("excelContent").innerHTML = JSON.stringify(
    //       excelJson
    //     );
    //   };

    //   if (rABS) {
    //     reader.readAsArrayBuffer(f);
    //   } else {
    //     reader.readAsBinaryString(f);
    //   }
    // }

    // //文件流转BinaryString

    // function fixdata(data) {
    //   var o = "",
    //     l = 0,
    //     w = 10240;

    //   for (; l < data.byteLength / w; ++l)
    //     o += String.fromCharCode.apply(
    //       null,
    //       new Uint8Array(data.slice(l * w, l * w + w))
    //     );

    //   o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));

    //   return o;
    // }

    // function importXLS(fileName) {
    //   objCon = new ActiveXObject("ADODB.Connection");
    //   objCon.Provider = "Microsoft.Jet.OLEDB.4.0";
    //   objCon.ConnectionString =
    //     "Data Source=" + fileName + ";Extended Properties=Excel 8.0;";
    //   objCon.CursorLocation = 1;
    //   objCon.Open;
    //   var strQuery;
    //   //Get the SheetName
    //   var strSheetName = "Sheet1$";
    //   var rsTemp = new ActiveXObject("ADODB.Recordset");
    //   rsTemp = objCon.OpenSchema(20);
    //   if (!rsTemp.EOF) strSheetName = rsTemp.Fields("Table_Name").Value;
    //   rsTemp = null;
    //   rsExcel = new ActiveXObject("ADODB.Recordset");
    //   strQuery = "SELECT * FROM [" + strSheetName + "]";
    //   rsExcel.ActiveConnection = objCon;
    //   rsExcel.Open(strQuery);
    //   while (!rsExcel.EOF) {
    //     for (i = 0; i < rsExcel.Fields.Count; ++i) {
    //       alert(rsExcel.Fields(i).value);
    //     }
    //     rsExcel.MoveNext;
    //   }
    //   // Close the connection and dispose the file
    //   objCon.Close;
    //   objCon = null;
    //   rsExcel = null;
    // }

    const getBlob = url => {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };

        xhr.send();
      });
    };

    const saveAs = (blob, filename) => {
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        const link = document.createElement("a");
        const body = document.querySelector("body");

        link.href = window.URL.createObjectURL(blob); // 创建对象url
        link.download = filename;

        // fix Firefox
        link.style.display = "none";
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href); // 通过调用 URL.createObjectURL() 创建的 URL 对象
      }
    };

    // export
     const download = (url, filename = "") => {
      getBlob(url).then(blob => {
        saveAs(blob, filename);
      });
    };
  }
};
</script>
<style scoped>
/* .dabiao {
  opacity: 0.94;
  background-color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  width: 70%;
  border-radius: 10px;
  float: right;
  min-width: 400px;
  min-height: 400px;
  margin-right: 100px;
  margin-top: 100px;
  position: relative;
} */
.el-button {
  position: absolute;
  top: 10px;
  right: 30px;
}
.DB_table {
  margin: 0 auto;
  width: 90%;
}
.DB_table p {
  font-size: 1.2em;
  color: #8086e9;
  float: left;
  margin: 0;
}
</style>
