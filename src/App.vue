<template>
  <router-view></router-view>
</template>
      
<script lang="ts">
      
export default {
  name: 'App'
}
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  .van-swipe__indicator--active {
    background-color:#7232dd !important;
  }
}
</style>
