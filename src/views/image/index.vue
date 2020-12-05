<template>
  <div class="price">
    <el-container>
      <!-- 相册列表头部 -->
      <el-header>
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          style="margin-top: 20px"
        >
          <el-form-item>
            <el-select
              v-model="formInline.region"
              size="mini"
              style="width: 130px"
            >
              <el-option label="降序" value="降序"></el-option>
              <el-option label="升序" value="升序"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="formInline.user"
              size="mini"
              placeholder="请输入图片名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="mini">搜索</el-button>
          </el-form-item>
        </el-form>
        <div class="right-header">
          <el-button type="success" size="mini" @click="initAddFrom()">创建相册</el-button>
          <el-button type="warning" size="mini" @click="UploadPrice()"
            >上传图片</el-button
          >
        </div>
      </el-header>
      <!-- 中间区域内容 -->
      <el-container
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 60px;
          overflow: hidden;
          width: 100%;
        "
      >
        <el-container style="position: relative; width: 240px">
          <el-aside width="245px">
            <ul class="list-group">
              <li
                class="list-group-item"
                v-for="(item, index) in PriceListData"
                :key="index"
                @click="initPriceList(item.id)"
              >
                {{ item.name }}
                <button type="button" class="btn btn-light" size="mini">
                  {{ item.images_count }}
                  <el-dropdown>
                    <span class="el-dropdown-link">
                      <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="initUpdateList(item)"
                        >修改</el-dropdown-item
                      >
                      <el-dropdown-item
                        @click.native="initDeletePriceList(item.id)"
                        >删除</el-dropdown-item
                      >
                    </el-dropdown-menu>
                  </el-dropdown>
                </button>
              </li>
            </ul>
          </el-aside>
        </el-container>
        <el-container
          style="position: relative; margin-bottom: 60px; width: 80%"
        >
          <el-main>
            <app-price :adumlList="adumlList"></app-price>
          </el-main>
        </el-container>
      </el-container>
      <el-footer>
        <div class="left-page">
          <el-button-group>
            <el-button size="mini" @click="prevPage()">上一页</el-button>
            <el-button size="mini" @click="nextPage()">下一页</el-button>
          </el-button-group>
        </div>
        <div class="right-page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="initPriceData.page"
            :page-sizes="[10, 20, 30, 100]"
            :page-size="initPriceData.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="initPriceData.total"
          >
          </el-pagination>
        </div>
      </el-footer>
    </el-container>
    <!-- 修改相册列表的弹框 -->
    <el-dialog title="修改相册" :visible.sync="UpdateFormVisible" width="40%">
      <el-form :model="UpdateForm" lable-width="100">
        <el-form-item label="相册名称">
          <el-input v-model="UpdateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number
            v-model="UpdateForm.order"
            :min="1"
            :max="9999"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="UpdatePriceList">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 上传图片弹框 -->
    <el-dialog title="上传图片" :visible.sync="UploadVisible" width="50%">
      <el-upload
        class="upload-demo"
        drag
        action="/dev-api/image/upload"
        name="img"
        :data="{image_class_id:image_class_id}"
        :show-file-list="true"
        :headers="{ token:$store.state.user.token }"
         :on-success="uploadSuccess"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
    <!-- 增加相册列表的弹框 -->
    <el-dialog title="创建相册" :visible.sync="AddVisible" width="50%">
      <el-form :model="AddFormData" label-width="80px">
        <el-form-item label="相册名称">
          <el-input v-model="AddFormData.name"></el-input>
        </el-form-item>
        <el-form-item label="相册排序">
          <el-input-number
            v-model="AddFormData.order"
            :min="1"
            :max="1000"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="AddVisible = false" style="color:#008080">取 消</el-button>
        <el-button type="primary" @click="initAddImageList" style="background:#008080">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getPriceList,
  getImageList,
  getDeleteList,
  getUpdateData,
  getUploadPrice,
  getUpdateList,
  getAddPriceList,
} from "../../api/price";
import AppPrice from './price'
export default {
  data() {
    return {
      // 获取相册列表
      adlumPage: 1, //相册页面
      adlumMaxPage: -1, //相册最大值
      PriceList: {
        page: 1,
        limit: 10,
        total: 0,
      },
      // 获取相册列表的数组
      PriceListData: [],
      // 获取相册图片列表
      initPriceData: {
        page: 1,
        limit: 50,
        total: 0,
      },
      // 获取相册图片的数组
      adumlList: [],
      // 获取修改相册列表
      UpdateFormVisible: false,
      UpdateForm: {
        id: 0,
        name: "",
        order: 0,
      },
      // 头部搜索降序
      formInline: {},
      // 上传图片
      UploadVisible: false,
      UploadList: {
        url: "",
      },
      // 增加相册列表
      AddVisible: false,
      AddFormData:{
        name:'',
        order:1
      },
      image_class_id:0
    };
  },
  created() {},
  mounted() {
    this.initDataList();
    // this.initPriceList()
    // this.initDeletePriceList()
  },
  components: {
    AppPrice,
  },
  methods: {
    // 获取相册列表
    initDataList() {
      getPriceList(this.PriceList.page, this.PriceList.limit).then((res) => {
        this.PriceListData = res.data.data.list;
        this.adlumMaxPage = Math.ceil(res.data.data.totalCount / 10);
      });
    },
    // 获取相册图片
    initPriceList(id) {
      getImageList(id, this.initPriceData.page, this.initPriceData.limit).then(
        (result) => {
          this.adumlList = result.data.data.list;
          this.initPriceData.total = result.data.data.totalCount;
          this.image_class_id = id
        }
      );
    },
    // 创建列表的弹框
    initAddFrom(){
      this.AddVisible = true
    },
    // 创建相册列表方法
    initAddImageList() {
      getAddPriceList(this.AddFormData).then((res)=>{
        this.AddVisible = false
        this.AddFormData = "";
        this.initDataList()
        this.$message.success('添加成功')
      })
    },
    // 删除相册列表
    initDeletePriceList(id) {
      getDeleteList(id).then((res) => {
        this.$message.success("删除成功");
        this.initDataList();
      });
    },
    // 查看修改相册列表方法
    initUpdateList(arr) {
      console.log(arr);
      this.UpdateForm.id = arr.id;
      this.UpdateForm.name = arr.name;
      this.UpdateForm.order = arr.order;
      this.UpdateFormVisible = true;
    },
    // 点击修改相册的方法
    UpdatePriceList() {
      getUpdateData(
        this.UpdateForm.id,
        this.UpdateForm.name,
        this.UpdateForm.order
      ).then((res) => {
        this.UpdateFormVisible = false;
        this.$message.success("修改成功");
        this.initDataList();
      });
    },
    // 上传图片弹框
    UploadPrice() {
      this.UploadVisible = true;
    },
    // 上传图片
    uploadSuccess() {
      this.UploadVisible = false;
      this.initDataList()
    },
    // 每页条数的方法
    handleSizeChange(size) {
      this.initPriceData.size = size;
      this.initPriceList();
      thia.initDataList();
    },
    // 分页器
    handleCurrentChange(page) {
      this.initPriceData.page = page;
      this.initPriceList();
      this.initDataList();
    },
    // 上一页下一页的分页
    prevPage() {
      this.PriceList.page--;
      if (this.PriceList.page < 1) {
        this.PriceList.page = 1;
      }
      this.initDataList();
    },
    nextPage() {
      this.PriceList.page++;
      this.initDataList();
    },
  },
};
</script>

<style scoped lang="scss">
.price {
  width: 100%;
  height: 91.6%;
  position: relative;
}
/* 面包屑样式 */
.el-card.is-always-shadow {
  box-shadow: none;
}
/* 布局容器样式 */
.el-header {
  background-color: #f8f9fa;
  color: #333;
  z-index: 1000;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.el-footer {
  background-color: #f8f9fa;
  color: #333;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  margin-top: 50px;
  border-top: 1px solid #ccc;
  display: flex;
  align-items: center;
}
.el-aside {
  background-color: #fff;
  position: absolute;
  color: #333;
  height: 100%;
  overflow: auto;
  right: 0;
  left: 0;
  border-right: 1px solid #ccc;
}

.el-main {
  background-color: #fff;
  color: #333;
  position: absolute;
  padding: 0;
  left: 0;
  right: 0;
  border-left: 1px solid #ccc;
  top: 0;
}
.el-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: auto;
}
/* 相册列表样式 */
.list-group {
  width: 100%;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 20px;
    height: 60px;
  }
}
// 上传图片的样式
.upload-demo {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.left-page {
  width: 225px;
  border-right: 1px solid #ccc;
  height: 100%;
  line-height: 60px;
  text-align: center;
}
.right-page {
  margin-left: 50px;
}
</style>
