<template>
  <div>
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

<script>
import { ref } from 'vue'
export default {
  name: 'TabBar',
  props: {
    tabData: {
      type: Array,
      default: () => ([])
    }
  },
  emits:['chang'],
  setup (props, context) {
    console.log(props.data,'props')
    const active = ref(0)
    const handleChange = (value) => {
      context.emit('chang', value)
    }
    return {
      active,
      handleChange
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: #7232dd;
.van-tabbar-item--active {
  color: $blue;
}
</style>
