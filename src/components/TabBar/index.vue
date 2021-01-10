<template>
  <div class="tab-bar-wrap">
    <van-tabbar fixed route placeholder v-model="active" @change="handleChange">
      <van-tabbar-item
        v-for="(item,index) in tabData"
        :key="index"
        :to="item.to"
        :icon="item.icon">
        {{item.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
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
    const handleChange = (value: number) => {
      context.emit('chang', value)
    }
    return {
      active,
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
