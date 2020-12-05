<template>
  <div class="header1">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="box box-top">
            <div>
              <i class="el-icon-s-custom" style="background:blue;font-size:26px;color:#ffffff;"></i>
            </div>
            <div>
              <div class="num">30</div>
              <div class="title">关注人数(个)</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="box box-top">
            <div>
              <i class="el-icon-s-finance" style="background:green;font-size:26px;color:#ffffff;"></i>
            </div>
            <div>
              <div class="num">120</div>
              <div class="title">订单总数(笔)</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card shadow="hover">
          <div class="box box-top">
            <div>
              <i class="el-icon-s-order" style="background:red;font-size:26px;color:#ffffff;"></i>
            </div>
            <div>
              <div class="num">4183.80</div>
              <div class="title">今日订单总金额(元)</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div class="box box-top">
            <div>
              <i class="el-icon-s-data" style="background:orange;font-size:26px;color:#ffffff;"></i>
            </div>
            <div>
              <div class="num">100</div>
              <div class="title">本月销量(笔)</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="nav">
          <div class="box1">
            <div class="el-card_header">
              <div class="cleaefix">
                <span>店铺及商品提示</span>
                <button type="button" class="el-button el-button--text">
                  <span style="color: teal">需要关注的店铺信息及待处理事项</span>
                </button>
              </div>
            </div>
            <el-row :gutter="12">
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="nav1">
                    <h3>64</h3>
                    <span>出售中</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="nav1">
                    <h3>10</h3>
                    <span>待回复</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="nav1">
                    <h3>0</h3>
                    <span>库存预警</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple">
                  <div class="nav1">
                    <h3>3</h3>
                    <span>仓库中</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="nav2">
          <div class="box2">
            <div class="el-card_header">
              <div class="cleaefix">
                <span>交易提示</span>
                <button type="button" class="el-button el-button--text">
                  <span style="color: teal">需要立即处理的交易订单</span>
                </button>
              </div>
            </div>
            <el-row :gutter="12">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <div class="nav3">
                    <h3>0</h3>
                    <span>待付款</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <div class="nav3">
                    <h3>10</h3>
                    <span>待发货</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <div class="nav3">
                    <h3>0</h3>
                    <span>已发货</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <div class="nav3">
                    <h3>3</h3>
                    <span>已收货</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <div class="nav3">
                    <h3>3</h3>
                    <span>退款中</span>
                  </div>
                </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <div class="nav3">
                    <h3>3</h3>
                    <span>代售后</span>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="box">
          <div id="echart"></div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>销售情况统计</span>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <div class="media align-items-center border">
            <span class="py-4 px-3 bg-light border-right">昨日销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-1 mb-1">
                <span>订单金额(元)</span> 12
              </div>
              <div class="pl-3">
                <span>订单量(件)</span> 12
              </div>
            </div>
          </div>
          <div class="media align-items-center border box-media">
            <span class="py-4 px-3 bg-light border-right">昨日销量</span>
            <div class="media-body">
              <div class="border-bottom pl-3 pb-1 mb-1">
                <span>订单金额(元)</span> 12
              </div>
              <div class="pl-3">
                <span>订单量(件)</span> 12
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>单品销售排名</span>
            <el-button style="float: right; padding: 3px 0" type="text">按周期统计商家店铺的订单量和订单金额</el-button>
          </div>
          <el-table :data="tableData" height="200" border style="width: 100%">
            <el-table-column type="index" label="#" width="60"></el-table-column>
            <el-table-column prop="name" label="商品信息"></el-table-column>
            <el-table-column prop="address" label="销量" width="80"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  name: "",
  data() {
    return {
      tableData: [
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          address: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          address: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          address: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          address: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          address: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          address: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          address: "9"
        },
        {
          name: "小天鹅（LittleSwan）滚筒洗衣机...",
          address: "9"
        }
      ]
    };
  },
  computed: {},
  mounted() {
    this.setEchart();
  },
  methods: {
    setEchart() {
      let myechart = this.$echarts.init(document.getElementById("echart"));
      let option = {
        title: {
          //   text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      myechart.setOption(option);
    }
  }
};
</script>


<style lang="scss" scoped>
.header1{
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
.cleaefix {
  padding: 15px;
  border-bottom: 1px solid #ebeef5;
  box-sizing: border-box;
}
.el-row {
  margin-bottom: 10px;
}

.el-col-6 {
  text-align: center;
}
.nav1 {
  height: 70px;
  line-height: 30px;
  margin-top: 20px;
  border-radius: 5px;
  background: #f8f9fa;
}
.nav3 {
  height: 70px;
  line-height: 30px;
  margin-top: 20px;
  border-radius: 5px;
  text-align: center;
  background: #f8f9fa;
}

.el-card_body {
  padding: 20px;
}
.btn {
  display: inline-block;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
}

.col-3 {
  width: 150px;
}

.btn-light {
  color: #000;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
}

button {
  float: right;
  padding: 3px 0px;
}

.nav {
  padding-left: 10px;
  padding-right: 10px;
  height: 198px;
  justify-content: space-between;
}
.nav2 {
  padding-left: 10px;
  padding-right: 10px;
  height: 198px;
  justify-content: space-between;
}

.box {
  border-radius: 5px;
  padding: 15px;
  background: #fff;
  #echart {
    height: 350px;
  }
}
.box1 {
  border-radius: 5px;
  padding: 15px;
  border: 1px solid #ebeef5;
  overflow: hidden;
  background: #fff;
}
.box2 {
  border-radius: 5px;
  padding: 15px;
  border: 1px solid #ebeef5;
  overflow: hidden;
  background: #fff;
}
.box-top {
  display: flex;
  align-items: center;
  div:nth-of-type(1) {
    width: 20%;
  }
  .num {
    font-size: 20px;
    font-weight: bold;
  }
  .title {
    line-height: 30px;
  }
}
.el-icon-s-custom {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}

.el-icon-s-finance {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.el-icon-s-order {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.el-icon-s-data {
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.align-items-center {
  align-items: center !important;
}
.border {
  border: 1px solid #dee2e6 !important;
}
.media {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
}
.pb-4,
.py-4 {
  padding-bottom: 1.5rem !important;
}
.pt-4,
.py-4 {
  padding-top: 1.5rem !important;
}
.pl-3,
.px-3 {
  padding-left: 1rem !important;
}
.pr-3,
.px-3 {
  padding-right: 1rem !important;
}
.border-right {
  border-right: 1px solid #dee2e6 !important;
}
.bg-light {
  background-color: #f8f9fa !important;
}
.media-body {
  flex: 1;
}
.pl-3,
.px-3 {
  padding-left: 1rem !important;
}
.pb-1,
.py-1 {
  padding-bottom: 0.25rem !important;
}
.mb-1,
.my-1 {
  margin-bottom: 0.25rem !important;
}
.border-bottom {
  border-bottom: 1px solid #dee2e6 !important;
}
.box-media {
  margin-top: 15px;
}
.nav{
  width: 100%;
}
</style>
