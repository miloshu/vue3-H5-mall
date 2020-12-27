<template>
  <div class='product-list'>
    <van-sticky>
      <van-search
        class="search-bar"
        v-model="searchVal"
        shape="round"
        background="#7232dd"
        placeholder="请输入搜索关键词"
      />
    </van-sticky>
    <div class="product-content">
      <ul class="left-cates">

      </ul>
      <ul class="right-cates">
        
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, defineComponent } from 'vue'
import { getCategoriesList } from '/@/api/category'
export default defineComponent({
  setup () {
    const state = reactive({
      searchVal: '',
      activeId: 1,
      activeIndex: 0,
      lists: [],
      leftMenuList: [],
      rightConList: []
    });
    const items = [
      {
        text: '浙江',
        children: [
          { text: '杭州', id: 1 },
          { text: '温州', id: 2 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
    ]
    const methods = reactive({
      getCategoriesList: async () => {
        try {
          const res = await getCategoriesList({})
          state.lists = res.data.message
          state.leftMenuList = res.data.message.filter(v => v.cat_name)
          state.rightConList = res.data.message[0].children
          // state.rightConList = res.data.message[0].children
          console.log(res.data.message[0].children, '999999')
        } catch (error) {}
      },
    })
    onMounted(() => {
      methods.getCategoriesList()
    })
    const refData = toRefs(state)
    return {
      ...refData,
      items
    }
  }
})
</script>
<style lang='scss' scoped>
.product-list {
  width: 100%;
  height: 100vh;
  .van-sticky {
    height: 50px;
    .search-bar {
      height: 100%;
    }
  }
  .product-content {
    display: flex;
    height: 100%;
    // height: calc(100% - 100px);
  }
  .left-cates, .right-cates {
    height: 100%;
    overflow-y: auto;
  }
  .left-cates {
    flex: 1;
    background-color: yellowgreen;
  }
  .right-cates {
    flex: 3;
    background-color: pink;
  }
}
</style>
