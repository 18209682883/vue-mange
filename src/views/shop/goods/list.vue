<template>
  <div class="shop">
    <el-container>
      <el-container style="overflow: hidden; margin-bottom: 100px">
        <el-main>
          <!-- 标签页 -->
          <el-tabs
            v-model="fromGoodsList.tab"
            @tab-click="handleClick"
            style="padding: 0 10px"
          >
            <el-tab-pane label="全部" name="all" style="width: 100%">
              <el-table
                ref="multipleTable"
                border
                stripe
                :data="ShopListData"
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <el-table-column type="selection" width="40"> </el-table-column>
                <el-table-column label="商品" wdith="240">
                  <template slot-scope="scope">
                    <div style="display: flex; align-items: center">
                      <p>
                        <img
                          :src="scope.row.cover"
                          alt=""
                          style="width: 60px; height: 60px"
                        />
                      </p>
                      <p style="margin-left: 20px; margin-top: 15px">
                        <span>{{ scope.row.title }}</span
                        ><br />
                        <span>分类：{{ scope.row.category.name }}</span
                        ><br />
                        <span>时间：{{ scope.row.category.create_time }}</span>
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="discount" label="实际销量" width="80">
                </el-table-column>
                <el-table-column prop="status" label="商品状态" width="60">
                  <template slot-scope="scope">
                    <span
                      class="badge badge-success"
                      v-if="scope.row.status == 1"
                      >上架</span
                    >
                    <span
                      class="badge badge-danger"
                      v-if="scope.row.status == 0"
                      >仓库</span
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="审核状态" width="120" align="center">
                  <template slot-scope="scope">
                    <div class="cell">
                      <div class="d-flex flex-column" v-if="scope.row.ischeck == 0">
                        <button type="button" class="el-button el-button--success el-button--mini is-plain">
                          <span>审核通过</span>
                        </button>
                        <button type="button" class="el-button ml-0 mt-2 el-button--danger el-button--mini is-plain">
                          <span>审核拒绝</span>
                        </button>
                      </div>
                    </div>
                    <span class="text-secondary" v-if="scope.row.ischeck == 1">通过</span>
                    <span class="text-secondary" v-if="scope.row.ischeck == 2">拒绝</span>
                  </template>
                </el-table-column>
                <el-table-column prop="stock" label="总库存" width="90">
                </el-table-column>
                <el-table-column prop="" label="价格(元)" width="110">
                  <template slot-scope="scope">
                    <span class="text-danger">{{ scope.row.min_price }}</span>
                    <span class="text-secondary"
                      >/{{ scope.row.min_oprice }}</span
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="操作"> </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="审核中" name="checking"></el-tab-pane>
            <el-tab-pane label="出售中" name="saling">出售中</el-tab-pane>
            <el-tab-pane label="已下架" name="off">已下架</el-tab-pane>
            <el-tab-pane label="库存预警" name="min_stock">库存预警</el-tab-pane>
            <el-tab-pane label="回收站" name="delete">回收站</el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="fromGoodsList.page"
          :page-sizes="[10, 20, 50]"
          :page-size="fromGoodsList.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="fromGoodsList.total">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { getShopList } from "../../../api/shoplist";
export default {
  data() {
    return {
      Tabs: {
        activeName: "all",
      },
      // 存放表格数据数据
      ShopListData: [],
      fromGoodsList: {
        page: 1,
        limit: 10,
        total: 0,
        tab:'all'
      },
    };
  },
  created() {},
  mounted() {
    this.initGoodsList();
  },
  methods: {
    handleClick() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取列表数据
    initGoodsList() {
      getShopList(this.fromGoodsList.page, this.fromGoodsList.limit,this.fromGoodsList.tab).then(
        (res) => {
          console.log(res);
          this.ShopListData = res.data.data.list;
          this.fromGoodsList.total = res.data.data.totalCount
        }
      );
    },
    // 全部数据的分页器
    handleSizeChange(size){
      this.fromGoodsList.size = size;
      this.initGoodsList()
    },
    handleCurrentChange(page){
      this.fromGoodsList.page = page
      this.initGoodsList()
    }
  },
};
</script>

<style scoped lang="scss">
.el-card.is-always-shadow {
  box-shadow: none;
}
.shop {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.el-footer {
  background-color: #fff;
  color: #333;
  position: fixed;
  border: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  left: 200px;
  width: 87%;
  right: 0;
  top: 693px;
  z-index: 100;
  display: flex;
  align-items: center;
}
.el-main {
  background-color: #fff;
  color: #333;
}
.el-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}
</style>
