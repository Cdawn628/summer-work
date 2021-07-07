<template>
  <TabBar>
    <TabBarItem path="/news">
      <i class="iconfont icon-sousuo" slot="item-icon"></i>
      <div slot="item-text">探索</div>
    </TabBarItem>
    <TabBarItem path="/writing">
      <i class="iconfont icon-aixin" slot="item-icon"></i>
      <div slot="item-text">发布</div>
    </TabBarItem>
    <TabBarItem path="/profile">
      <i class="iconfont icon-wode" slot="item-icon"></i>
      <div slot="item-text">我的</div>
    </TabBarItem>
  </TabBar>
</template>

<script>
import TabBar from "../components/tabbar/TabBar";
import TabBarItem from "../components/tabbar/TabBarItem";
export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>

<style scoped>
</style>
