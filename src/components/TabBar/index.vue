<template>
  <div class="tab-bar-wrap">
    <van-tabbar fixed route placeholder v-model="active" @change="handleChange">
      <van-tabbar-item
        v-for="(item,index) in tabData"
        :key="index"
        :to="item.to"
        :badge="item.to.name === 'Cart' ? (badge > 0 ? badge : '') : ''"
        :icon="item.icon">
        {{item.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { ref, reactive, toRefs, onMounted, computed } from 'vue'
import { setStorage, getStorage } from '/@/utils/storage'
export default {
  name: 'TabBar',
  props: {
    tabData: {
      type: Array,
      default: () => ([])
    }
  },
  emits: ['chang'],
  setup (props, context) {
    // console.log(props.data,'props')
    const active = ref(0)
    const state = reactive({
      badge: 0,
      goodsList: []
    })
    const refData = toRefs(state)
    const handleChange = (value: number) => {
      context.emit('chang', value)
    }
    // 页面加载完毕
    onMounted(() => {
      let cart = getStorage('goods_cart') as any || []
      cart.forEach(item => state.goodsList.push(item.num))
      state.goodsList.forEach(e => state.badge += e)
    })
    return {
      active,
      ...refData,
      handleChange
    }
  }
}
</script>

<style lang="scss">
$purple: #7232dd;
.van-tabbar-item--active {
  color: $purple !important;
}
</style>
