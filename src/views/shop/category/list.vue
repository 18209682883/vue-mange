<template>
  <div class="category">
    <el-container>
      <el-container>
        <el-header>
          <button
            type="button"
            class="el-button el-button--primary el-button--mini"
            style="background: #008080"
          >
            <span>创建顶级分类</span>
          </button>
        </el-header>
        <el-main>
          <el-tree
            :data="data"
            node-key="id"
            :props="defaultProps"
            Indent="10px"
            ItemHeight="60PX"
            default-expand-all
            @node-drag-start="handleDragStart"
            @node-drag-enter="handleDragEnter"
            @node-drag-leave="handleDragLeave"
            @node-drag-over="handleDragOver"
            @node-drag-end="handleDragEnd"
            @node-drop="handleDrop"
            draggable
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
          >
            <span slot-scope="{ data }" class="center-category">
              <div style="display:flex;align-items: center;float:left">
                <span>{{ data.name }}</span>
              </div>
              <div class="el-tree-node__content">
                <el-button type="danger" size="mini">隐藏</el-button>
                <el-button type="success" size="mini">增加</el-button>
                <el-button type="warning" size="mini">修改</el-button>
                <el-button type="danger" size="mini">删除</el-button>
              </div>
            </span>
          </el-tree>
        </el-main>
      </el-container>
    </el-container>
     
  </div>
</template>

<script>
import { getCategoryList } from "../../../api/category";
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "child",
        lable: "name",
      },
    };
  },
  created() {},
  mounted() {
    this.initCategoryList();
  },
  methods: {
    //调用商品类型数据的方法
    initCategoryList() {
      getCategoryList().then((res) => {
        console.log(res.data.data);
        this.data = res.data.data;
      });
    },

    handleDragStart(node, ev) {
      console.log("drag start", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: ", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: ", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: ", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    },
  },
};
</script>

<style scoped lang="scss">
.category {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.el-header {
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  color: #333;
  height: 40px;
  z-index: 100;
  display: flex;
  align-items: center;
}
.el-main {
  background-color: #fff;
  color: #333;
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
  bottom: 50px;
}
.el-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
}
.el-tree-node__content {
  height: 40px;
  display: flex;
  align-items: center;
}
.center-category{
  width:100%;
  display:flex;
  align-items: center;
  justify-content: space-between;
  height:40px;
  display:block;
}
</style>
