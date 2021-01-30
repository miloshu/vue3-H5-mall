<template>
  <div class='search-page'>
    <van-search
      v-model="value"
      show-action
      class="search-box"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <ul class="good-lists-wrap" v-if="goodsList.length">
      <li class="van-multi-ellipsis--l2 van-hairline--bottom"
        v-for="item in goodsList" :key="item.goods_id"
        @click="go2GoodsDetail(item)">
        {{ item.goods_name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { qsearch } from '/@/api/home'

export default {
  name: 'Search',
  setup() {
    const router = useRouter()
    const state = reactive({
      value: '',
      goodsList: []
    })
    const refData = toRefs(state)
    const onSearch = async (val: string) => {
      try {
        const res = await qsearch({
          query: val
        })
        state.goodsList = res.data.message
      } catch (error) {}
    }

    const go2GoodsDetail = (row: any) => {
      router.push({
        path: '/goods-list-detail',
        query: { goods_id: row.goods_id, pageType: 'Home' }
      })
    }
    const onCancel = () => {router.push('./home')}
    return {
      ...refData,
      onSearch,
      onCancel,
      go2GoodsDetail
    }
  },
}
</script>
<style lang='scss' scoped>
.search-page {
  position: relative;
  height: 100%;
  .good-lists-wrap {
    position: absolute;
    top: 5.4rem;
    width: 100%;
    max-height: 20rem;
    padding: 0 1.2rem;
    li {
      height: 4rem;
      line-height: 1;
      padding: 1rem 0;
    }
  }
}
</style>
