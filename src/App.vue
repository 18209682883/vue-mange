<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import jquery from 'jquery';
export default {
  
}
</script>
<style lang="scss">
  *{
    margin: 0;
    padding:0;
    list-style: none;
  }
  html,body,#app{
    width: 100%;
    height: 100%;  
  }
  ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow   : inset 0 0 5px rgba(121, 119, 119, 0.2);
  background   : #8f8d8d;
  }
  ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(104, 103, 103, 0.2);
  border-radius: 10px;
  background   : #ededed;
  }
</style>
