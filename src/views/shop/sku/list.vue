<template>
  <div class="cation">
    <el-container>
      <el-container style="margin-bottom: 100px">
        <el-header>
          <el-button type="success" size="mini" @click="add()"
            >添加规格</el-button
          >
          <el-button type="danger" size="mini">批量删除</el-button>
        </el-header>
        <el-main>
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              align="center"
              width="55"
            ></el-table-column>
            <el-table-column label="商品规格" align="center" prop="name">
            </el-table-column>
            <el-table-column prop="default" align="center" label="规格值">
            </el-table-column>
            <el-table-column
              prop="order"
              align="center"
              label="排序"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column align="center" label="状态">
              <template slot-scope="scope">
                <el-tag
                  type="danger"
                  v-if="scope.row.status == 0"
                  @click="initDataStatus(1, scope.row.id)"
                  >禁用</el-tag
                >
                <el-tag
                  v-else
                  type="success"
                  @click="initDataStatus(0, scope.row.id)"
                  >启用</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <div class="el-button-group">
                  <button
                    type="button"
                    class="el-button el-button--primary el-button--mini is-plain"
                    @click="initDataUpdate(scope.row)"
                  >
                    <span>修改</span>
                  </button>
                  <button
                    type="button"
                    class="el-button el-button--danger el-button--mini is-plain"
                    @click="initDataDelete(scope.row.id)"
                  >
                    <span>删除</span>
                  </button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="fromData.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="fromData.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="fromData.total"
        >
        </el-pagination>
      </el-footer>
     </el-container
    > 
    <!-- 修改商品规格弹框 -->
    <el-dialog title="修改规格" :visible.sync="UpdateVisible" width="50%">
      <el-form :model="UpdateForm" label-width="80px" size="mini">
        <el-form-item label="规格名称">
          <el-input v-model="UpdateForm.name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="UpdateForm.order"
            :min="1"
            :max="9999"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="UpdateForm.status" size="medium">
            <el-radio border :label="1">启用</el-radio>
            <el-radio border :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="UpdateForm.type" size="medium">
            <el-radio border :label="0">文字</el-radio>
            <el-radio border :label="1">颜色</el-radio>
            <el-radio border :label="2">图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格值" prop="desc">
          <el-input type="textarea" v-model="UpdateForm.default"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UpdateVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="initAddUpdate()"
          style="background: #008080"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 增加商品规格弹框 -->
    <el-dialog title="添加规格" :visible.sync="AddVisible" width="50%">
      <el-form :model="addFrom" label-width="80px" size="mini">
        <el-form-item label="规格名称" style="height: 40px">
          <el-input v-model="addFrom.name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number
            v-model="addFrom.order"
            :min="1"
            :max="9999"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="addFrom.status" size="medium">
            <el-radio border :label="1">启用</el-radio>
            <el-radio border :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio-group v-model="addFrom.type" size="medium">
            <el-radio border :label="0">文字</el-radio>
            <el-radio border :label="1">颜色</el-radio>
            <el-radio border :label="2">图片</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="规格值" prop="desc">
          <el-input
            type="textarea"
            v-model="addFrom.default"
            placeholder="一行为一个规格项，多个规格项换行输入"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="initAddData(addFrom)"
          style="background: #008080"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getCationList,
  getCationStatus,
  getCationDelete,
  getCationUpdate,
  getCationAddData,
} from "../../../api/cation";
export default {
  data() {
    return {
      //获取数据
      tableData: [],
      fromData: {
        page: 1,
        limit: 10,
        total: 0,
      },
      //修改商品规格
      UpdateVisible: false,
      UpdateForm: {
        id: "",
        name: "",
        order: "",
        status: 0,
        type: "",
        default: "",
      },
      //添加规格
      addFrom: {
        name: "",
        order: 50,
        status: 1,
        type: 0,
        default: "",
      },
      AddVisible: false,
    };
  },
  created() {},
  mounted() {
    this.initDataList();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 获取数据列表
    initDataList() {
      getCationList(this.fromData.page, this.fromData.limit).then((res) => {
        this.tableData = res.data.data.list;
        this.fromData.total = res.data.data.totalCount;
      });
    },
    //修改商品规格状态方法
    initDataStatus(status, id) {
      getCationStatus(id, status).then((res) => {
        if (res.data) {
          if (status == 0) {
            this.$message.warning("禁用成功");
            this.initDataList();
          } else {
            this.$message.success("启用成功");
            this.initDataList();
          }
        }
      });
    },
    //商品规格的分页器
    handleSizeChange(size) {
      this.fromData.limit = size;
      this.initDataList();
    },
    //商品规格的分页器
    handleCurrentChange(page) {
      this.fromData.page = page;
      this.initDataList();
    },
    //商品规格的删除方法
    initDataDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getCationDelete(id).then((res) => {});
          this.$message({
            type: "error",
            message: "演示数据，禁止删除",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //商品规格修改弹框拿到相对于的值
    initDataUpdate(arr) {
      this.UpdateForm.id = arr.id;
      this.UpdateForm.name = arr.name;
      this.UpdateForm.order = arr.order;
      this.UpdateForm.status = arr.status;
      this.UpdateForm.type = arr.type;
      this.UpdateForm.default = arr.default;
      this.UpdateVisible = true;
    },
    //商品规格修改方法
    initAddUpdate() {
      getCationUpdate(this.UpdateForm, this.UpdateForm.id).then((res) => {
        if (res.data) {
          this.initDataList();
          this.UpdateVisible = false;
          this.$message.success("修改成功");
        }
      });
    },
    //新增商品规格弹窗
    add(){
       this.AddVisible = true   
    },
    //新增商品规格方法
    initAddData() {
      getCationAddData(this.addFrom).then((result) => {
        console.log(result);
        this.AddVisible = false;
        this.$message({
            type:'success',
            message:'添加成功',
            duration:1000 
        })
        this.addFrom = ""
        this.initDataList();
      });
    },
  },
};
</script>

<style scoped>
.cation {
  width: 100%;
  height: 100%;
  overflow: auto;
}
.el-header {
  background-color: #fff;
  color: #333;
  display: flex;
  align-items: center;
}
.el-footer {
  background-color: #fff;
  color: #333;
  position: absolute;
  display: flex;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  /* bottom: 0; */
  left: 0;
  right: 0;
  width: 100%;
  top: 580px;
  z-index: 100;
}
.el-main {
  background-color: #fff;
  color: #333;
}
.el-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
}
</style>
