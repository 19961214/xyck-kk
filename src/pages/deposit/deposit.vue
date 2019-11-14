<template>
  <div class="wrap">
    <header class="header">
      <div class="header-content">
        <img class="header-logo" src="../../images/logo.png" alt />
        <div class="header-head-wrap">
          <img class="header-head" src="../../images/logo.png" alt />
          <div class="header-title">
            <p class="header-text">用户123456</p>
            <div class="header-text2">
              <p>退出</p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="content">
      <div class="content-wrap">
        <div class="content-text">
          <p class="content-text1">{{userCashCountData}}</p>
          <p class="content-text2">累计提现余额</p>
        </div>
        <div class="content-text line">
          <!-- <p class="content-text1">{{userCashCountData}}</p>
          <p class="content-text2">累计提现余额</p>-->
        </div>
      </div>
    </div>

    <div class="content2">
      <div class="content-wrap2">
        <div class="content-wrap2-color">
          <div class="content-wrap2-p">KK直播平台提现记录</div>
          <div class="content-wrap2-date">
            <div class="content-wrap2-input">
              <el-input v-model="input" placeholder="订单号"></el-input>
            </div>
          </div>

          <div class="content-wrap2-date2">
            <el-date-picker
              v-model="value1"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="el-input__inner"
            ></el-date-picker>
          </div>

          <div class="content-wrap2-type">
            <el-select v-model="value" placeholder="类型" class="main-select main-select-size">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="btn-wrap">
            <el-button type="primary" @click="seach">查询</el-button>
          </div>
        </div>

        <div class="main">
          <el-table :data="tableDataList" style="width: 100%">
            <el-table-column prop="createTime" label="时间" width="180"></el-table-column>
            <!-- <el-table-column prop="type" label="类型" width="180"></el-table-column> -->
            <el-table-column prop="orderId" label="订单号"></el-table-column>
            <el-table-column prop="commissionAmount" label="提现金额 (元)"></el-table-column>
            <!-- <el-table-column prop="yue" label="账户余额 (元)"></el-table-column> -->
            <el-table-column prop="commissionStatus" label="状态">
              <template slot-scope="scope">
                <!--{{scope.row.state}}-->
                <div class="img-wrap" v-if="scope.row.commissionStatus==2">
                  <img class="img" src="../../images/icon_adopt.png" alt />
                </div>
                <div class="img-wrap" v-if="scope.row.commissionStatus==0">
                  <img class="img" src="../../images/icon_audit.png" alt />
                </div>
                <div class="img-wrap" v-if="scope.row.commissionStatus==1">
                  <img class="img" src="../../images/icon_fail.png" alt />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
          <div class="pagination">
            <div class="pagination-wrap">
              <!-- <span class="btn-span" @click="currentChange(1)">首页</span> -->
              <el-pagination
                background
                prev-text="上一页"
                next-text="下一页"
                pager-count:5
                :page-size="size"
                @current-change="currentChange"
                layout="prev, pager, next,slot"
                :total="dataLength"
              ></el-pagination>
              <!-- <span class="btn-span">尾页</span> -->
              <span class="sum-text">共{{dataLength}}条数据</span>
              <!-- <el-pagination background layout="prev, pager, next" :total="tableData.length"></el-pagination> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../assets/stylus/elemet-ui-reset.css";
import { getData, getUserCashCount } from "../../api/index";
export default {
  data() {
    return {
      value1: [],
      value: "",
      input: "",
      size: 10, // 每页显示条数
      currentPage: 1, //当前页数
      // tableData: [],
      tableDataList: [], //表格当前页显示的数据
      userCashCountData: 0, //提现汇总数据
      options: [
        {
          value: "选项1",
          label: "已到账"
        },
        {
          value: "选项2",
          label: "提现中"
        },
        {
          value: "选项3",
          label: "提现失败"
        }
      ],
      dataLength: 0, //总数据数量
      parameter: {
        //请求表格数据参数
        appId: "1018",
        certNo: "",
        orderId: "",
        pageNum: 1,
        userName: "",
        startTime: "",
        endTime: "",
        status: ""
      }
    };
  },
  methods: {
    seach() {
      this.parameter.orderId = this.input;
      if (this.value == "选项1") {
        var status = 2;
      }
      if (this.value == "选项2") {
        var status = 0;
      }
      if (this.value == "选项3") {
        var status = 3;
      }
      this.parameter.status = status;
      this.parameter.startTime = this.value1[0];
      this.parameter.endTime = this.value1[1];
      this.getUserCashList();
      // console.log(this.input,this.value1,status)
    },
    currentChange(currentPage) {
      this.currentPage = currentPage;
      this.parameter.pageNum = currentPage;
      // console.log(currentPage)
      this.getUserCashList();
    },
    //获取首页提现汇总数据
    async userCashCount() {
      const result2 = await getUserCashCount({
        appId: "1018",
        certNo: "",
        orderId: "",
        pageNum: 0,
        userName: ""
      });
      if (result2.code == 1) {
        this.userCashCountData = result2.data.totalAmount;
      }
      // console.log(result2.data.totalAmount)
    },
    //获取首页提现表格数据
    async getUserCashList() {
      // console.log('调用了')
      // console.log(this.parameter)
      const parameter = this.parameter;
      const result = await getData(parameter);
      // if(result.code==1 && this.tableData.length>0){
      //   console.log('拼接')
      //   const arr1 = this.tableData
      //   const arr2 = result.rows
      //   Array.prototype.push.apply(arr1, arr2);
      //   this.tableData = arr1;
      //   // this.dataLength = result.total
      // }
      // if(result.code==1 && this.tableData.length==0){
      //   this.tableData = result.rows;
      //   this.dataLength = result.total
      // }
      if (result.code == 1) {
        this.tableDataList = result.rows;
        this.dataLength = result.total;
      }
      // console.log(this.tableDataList)
    }
  },
  async mounted() {
    this.getUserCashList();
    this.userCashCount();
  },
  computed: {
    // tableDataList() {
    //   return this.tableData.slice(
    //     this.size * (this.currentPage - 1),
    //     this.size * this.currentPage
    //   );
    // }
  },
  components: {}
};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
.wrap {
  background: #f0f4f9;
  padding-bottom: 40px;

  .header {
    width: 100%;
    height: 60px;
    background-color: #fff;

    .header-content {
      padding: 0 18.7%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .header-logo {
        width: 84px;
        height: 38px;
      }

      .header-head-wrap {
        height: 60px;
        display: flex;
        align-items: center;

        .header-head {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .header-title {
          display: flex;
          align-items: center;
          margin-left: 10px;

          .header-text {
            font-size: 14px;
            color: #666666;
          }

          .header-text2 {
            width: 50px;
            height: 14px;
            padding-left: 20px;
            border-left: 1px solid #ccc;
            font-size: 14px;
            color: #666666;
            margin-left: 20px;
          }
        }
      }
    }
  }

  .content {
    width: 100%;
    margin-top: 40px;

    .content-wrap {
      padding: 0 18.7%;
      display: flex;

      .line {
        box-sizing: border-box;
        border-left: 1px dashed #eee;
      }

      .content-text {
        width: 50%;
        height: 100px;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .content-text1 {
          font-size: 26px;
          color: #2981F3;
        }

        .content-text2 {
          font-size: 14px;
          color: #999999;
          margin-top: 15px;
        }
      }
    }
  }

  .content2 {
    width: 100%;
    margin-top: 40px;

    .content-wrap2 {
      padding: 0 18.7%;

      .content-wrap2-color {
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        padding: 30px 0;

        .content-wrap2-p {
          display: inline-block;
          font-size: 16px;
          color: #333;
          margin-left: 21px;
          margin-right: 80px;
        }

        .content-wrap2-date {
          display: inline-block;
          margin-left: 21px;
        }

        .content-wrap2-date2 {
          display: inline-block;
          margin-left: 21px;
        }

        .content-wrap2-type {
          display: inline-block;
          margin-left: 21px;
        }

        .btn-wrap {
          display: inline-block;
          margin-left: 21px;
        }
      }

      .main {
        width: 100%;
        height: 100%;
        margin: 0 auto;

        div img {
          width: 81px;
          height: 30px;
        }

        .pagination .pagination-wrap {
          background-color: #fff;
          padding: 30px 20px 30px 0;
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }

        .pagination .pagination-wrap .btn-span {
          border: 1px solid #E5E5E5;
          display: inline-block;
          width: 54px;
          height: 26px;
          border-radius: 5px;
          font-size: 12px;
          text-align: center;
          line-height: 26px;
          cursor: pointer;
        }

        .pagination .pagination-wrap .sum-text {
          font-size: 12px;
          color: #333;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
