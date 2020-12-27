<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer">
      <TabBar :tab-data="state.tabBar" @chang="handleChange"></TabBar>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import TabBar from '../components/TabBar/index.vue'
export default {
  name: 'AppLayout',
  components: {
    TabBar
  },
  setup () {
    const state = reactive({
      tabBar: [
        {
          title: '首页',
          to: {
            name: 'Home'
          },
          icon: 'home-o'
        },
        {
          title: '商品列表',
          to: {
            name: 'ProductList'
          },
          icon: 'apps-o'
        },
        {
          title: '购物车',
          to: {
            name: 'Cart'
          },
          icon: 'cart-o'
        },
        {
          title: '我的',
          to: {
            name: 'MyCenter'
          },
          icon: 'user-o'
        }
      ]
    })
    const handleChange = (value) => {
      console.log(value);
    }
    return {
      state,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  // .layout-footer {
  //   height: 5rem;
  //   .van-tabbar__placeholder {
  //     height: 100%;
  //   }
  //   .van-tabbar {
  //     height: 100%;
  //   }
  // }
}
</style>
