<template>
  <div class="tab-bar-item" :class="{ active: isActive }" @click="itemClick">
    <slot name="item-icon"></slot>
    <slot name="item-text"></slot>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return !this.$route.path.indexOf(this.path);
    },
  },
  methods: {
    itemClick() {
      // 重复定位报错，用catch解决
      this.$router.push(this.path).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style scoped>
.active {
  color: #1296db;
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}

[class~="iconfont"] {
  font-size: 26px;
}
</style>
