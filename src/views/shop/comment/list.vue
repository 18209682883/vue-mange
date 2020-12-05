<template>
  <div class="comment">
    <el-container>
      <el-container style="overflow: hidden; margin-bottom: 110px">
        <el-header>
          <div></div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input
                v-model="formInline.user"
                placeholder="要搜索的商品名称"
                size="mini"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" size="mini">搜索</el-button>
            </el-form-item>
          </el-form>
        </el-header>
        <el-main>
          <el-table :data="CommentData" border stripe style="width: 100%">
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item>
                    <img :src="props.row.user.avatar" alt="" style="border-radius:50%">
                  </el-form-item>
                  <el-form-item>
                    <p>
                      <span style="font-weight: bold;">{{ props.row.user.username }}</span>
                      <span>{{ props.row.review_time }}</span>
                    </p>
                    <p>
                      <span>{{ props.row.review.data }}</span><br>
                      <img :src="props.row.review.image" alt="" style="width:80px;height:80px">
                    </p>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="ID" prop="id" width="60"> </el-table-column>
            <el-table-column label="商品">
              <template slot-scope="scope">
                <img :src="scope.row.goods_item.cover" alt="" style="width:65px;heihgt:65px;margin-right:10px">
                <span>{{ scope.row.goods_item.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="评价信息">
              <template slot-scope="scope">
                <p>用户名：{{ scope.row.user.username }}</p>
                <p>评分：<el-rate
                  v-model="scope.row.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate></p>
              </template>
            </el-table-column>
            <el-table-column label="评价时间" prop="review_time"></el-table-column>
            <el-table-column label="是否显示" width="120">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == 1" type="success" @click="initUpdateCommentStatus(0,scope.row.id)">启用</el-tag>
                <el-tag v-else type="danger" @click="initUpdateCommentStatus(1,scope.row.id)">禁用</el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
      <el-footer>
        <!-- 分页器 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="CommentList.page"
          :page-sizes="[10, 20,]"
          :page-size="CommentList.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="CommentList.total">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import {getCommentData,getCommentStatus} from '../../../api/comment'
export default {
  data() {
    return {
      // 搜索
      formInline: {},
      // 评论页面数据
      CommentData: [],
      CommentList:{
        page:1,
        limit:10,
        total:0
      }
    };
  },
  created() {},
  mounted() {
    this.initCommentData()
  },
  methods: {
    // 获取评论页面的数据
    initCommentData(){
      getCommentData(this.CommentList.page,this.CommentList.limit).then((res)=>{
        console.log(res)
        this.CommentData = res.data.data.list;
        this.CommentList.total = res.data.data.totalCount
      })
    },
    // 分页器
    handleSizeChange(size){
      this.CommentList.limit = size
      this.initCommentData()
    },
    // 分页条数
    handleCurrentChange(page){
      this.CommentList.page = page
      this.initCommentData()
    },
    // 修改商品评价状态方法
    initUpdateCommentStatus(status,id){
      getCommentStatus(id,status).then((res)=>{
        if(res.data){
          if(status == 0){
            this.initCommentData()
            this.$message({
              type:'warning',
              message:'禁用成功',
              duration:1000
            })
          }else{
            this.$message({
              type:'success',
              message:'启用成功',
              duration:1000
            })
            this.initCommentData()
          }
        }
      })
    }
  },
};
</script>

<style scoped lang="scss">
.comment {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  .el-form {
    margin-top: 20px;
  }
}
.el-footer {
  background-color: #fff;
  color: #333;
  position: absolute;
  display: flex;
  align-items: center;
  left: 0;
  right: 0;
  top: 580px;
  border-top: 1px solid #ccc;
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
