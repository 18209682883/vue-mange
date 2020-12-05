<template>
  <div>
    <!-- 图片列表 -->
    <div class="price">
      <div
        class="card"
        style="width: 200px"
        v-for="(item, index) in adumlList"
        :key="index"
      >
        <img :src="item.url" class="card-img-top" />
        <p>{{ item.name }}</p>
        <div class="card-body">
          <div class="p-2 text-center">
            <div class="el-button-group">
              <button type="button" @click="ViewPrice(item.url)" class="el-button p-2 el-button--default el-button--mini">
                <i class="el-icon-view"></i>
              </button>
              <button type="button" @click="ViewUpdate(item.name,item.id)" class="el-button p-2 el-button--default el-button--mini">
                <i class="el-icon-edit"></i>
              </button>
              <button type="button" @click="initDeleteData(item.id)" class="el-button p-2 el-button--default el-button--mini">
                <i class="el-icon-delete"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看大图弹框 -->
    <div class="addPrice">
      <el-dialog
        :visible.sync="ViewsVisible"
        width="60%">
        <div style="margin:-60px -20px -30px ">
          <img :src="ViewsData.url" alt="" style="width:100%;height:100%">
        </div>
      </el-dialog>
    </div>
    <!-- 查看图片地址弹框 -->
    <el-dialog title="提示" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="formData">
        <el-form-item label="请输入新名称">
          <el-input v-model="formData.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button class="bg-text-info" type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getDelImage,getImageList} from '../../api/price'
export default {
  props: {
    adumlList: {
      default: true,
    },
  },
  data() {
    return {
      // 查看大图弹框
      ViewsVisible:false,
      ViewsData:{
        url:""
      },
      // 查看图片地址
      dialogFormVisible:false,
      formData:{
        name:'',
      },
    };
  },
  created() {},
  mounted() {
  },
  methods: {
    // 点击查看大图方法
    ViewPrice(url){
      this.ViewsData.url = url;
      this.ViewsVisible = true
    },
    // 点修改图片地址
    ViewUpdate(name,id){
      this.formData.name = name
      this.formData.id = id
      this.dialogFormVisible = true
    },
    // 删除单个图片方法
    initDeleteData(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          getDelImage(id).then((result)=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getImageList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
};
</script>

<style scoped lang="scss">
// 相册列报的样式
.price {
  width: 100%;
  display: flex;
  margin-left: 10px;
  flex-wrap: wrap;
  .card {
    margin: 7px;
    box-shadow: none;
    position: relative;
    p{
      position: absolute;
      background: rgba(0,0,0,0.5);
      color: #fff;
      font-size: 13px;
      height: 30px;
      width: 100%;
      line-height: 30px;
      text-align: center;
      top: 70px;
    }
  }
  img {
    width: 199px;
    height: 100px;
  }
  .card-body{
    padding: 0;
  }
  .btn{
    background: #008080 !important;
    i{
      color: #008080;
    } 
  }
}
</style>
