<template>
  <div class='product-list-detail'>
    <van-nav-bar
      left-text="返回"
      title="商品列表"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-search
      class="search-bar"
      v-model="searchParams.query"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch">
    </van-search>
    <loading v-show="loading"></loading>
    <van-tabs v-model="active" @click="tabClick" class="tabs-box">
      <van-tab v-for="item in tabs" :title="item.name" :key="item.id">
        <div class="good-content">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-card
            v-for="good in goodList"
            :key="good.goods_id"
            :num="good.goods_number"
            :price="good.goods_price"
            :desc="good.goods_name"
            :thumb="good.goods_small_logo ? good.goods_small_logo : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsecretkeycrm.digifilm.com.cn%2Fupload%2F20180530%2Fe676f667c4cdfc7e074898adab2622f2.jpg&refer=http%3A%2F%2Fsecretkeycrm.digifilm.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612877657&t=0309216f4e33e2e64d576153be017f31'"
            @click="go2GoodsDetail(good)"
          />
          <van-empty image="search" description="暂无数据" v-if="!goodList.length" />
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { searchCategoriesList } from '/@/api/category'
import { Toast } from 'vant';
import TabBar from '/@/components/TabBar/index.vue'
import Loading from '/@/components/Loading/index.vue'

// 类型定义
interface searchParams {
  query: string;
  cid: number | string;
  pagenum: number;
  pagesize: number;
}
interface stateProps {
  loading: boolean;
  totalPage: number | string;
  searchParams: searchParams;
  tabs: any[];
  goodList: any[];
  [prop: string]: any;
}
export default {
  name: 'GoodsList',
  components: {
    TabBar,
    Loading
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const active = ref(1)
    const state: stateProps = reactive({
      loading: false,
      totalPage: 1, // 总页数
      searchParams: {
        query: '',
        cid: 9 || route.query.cid,
        pagenum: 1,
        pagesize: 10
      },
      goodList: [],
      tabs: [
        {
          id: 100010001,
          name: '综合',
          isActive: true
        },
        {
          id: 100010002,
          name: '销量',
          isActive: false
        },
        {
          id: 100010003,
          name: '价格',
          isActive: false
        },
      ]
    })
    const refData = toRefs(state)
    const tabClick = (name: number) => {
      console.log(name, 'name')
    }
    const onClickLeft = () => {router.push('/product-list')}
    const handleSearch = async () => {
      try {
        state.loading = true
        let res = await searchCategoriesList(state.searchParams)
        if (res.data.message) {
          // 获取总条数
          const total = res.data.message.total
          // 计算总页数 总条数/页容量
          state.totalPage = Math.ceil(total / state.searchParams.pagesize)
          // 数组拼接
          state.goodList = [...state.goodList, ...res.data.message.goods]
        }
        state.loading = false
      } catch (error) {
        console.log(error)
        state.loading = false
      }
    }
    const onSearch = (val: string) => {
      state.searchParams.query = val
      state.goodList = []
      handleSearch()
    }
    /* 用户上滑页面, 滚动条触底, 开始加载下一页数据
    *  1. 找到滚动条触底事件
    *  2. 判断还有没有下一页数据
    *  3. 如果没有下一页数据, 则弹窗提示
    *  4. 有下一页数据, 加载下一页数据
    */
    const onRefresh = () => {
      // 判断是否存在下一页
      if (state.searchParams.pagenum >= state.totalPage) {
        state.loading = false
        Toast('没有更多了...')
      } else {
        state.searchParams.pagenum++
        handleSearch()
      }
    }
    // 商品详情
    const go2GoodsDetail = (row: any) => {
      router.push({
        path: '/goods-list-detail',
        query: { goods_id: row.goods_id }
      })
    }
    onMounted(() => {
      handleSearch()
    })
    return {
      ...refData,
      active,
      tabClick,
      onSearch,
      onClickLeft,
      onRefresh,
      go2GoodsDetail
    }
  },
}
</script>
<style lang='scss'>
.product-list-detail {
  width: 100vw;
  height: 100vh;
 .tabs-box {
    width: 100%;
    height: 3rem;
    .van-tabs__wrap {
      width: 100%;
      height: 100%;
    }
    .van-tabs__nav--card {
      width: 100%;
      height: 100%;
      margin: 0;
    }
  }
  .van-tabs__line {
    width: 10rem;
    background-color: #7232dd;
  }
  .van-card__desc {
    margin-top: 1rem;
  }
  .van-card__bottom {
    position: relative;
    bottom: 1rem;
    .van-card__price {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
}
</style>


