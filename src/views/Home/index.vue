<template>
  <div class="home-page">
    <van-sticky>
      <van-search
        class="search-bar"
        shape="round"
        background="#7232dd"
        placeholder="请输入搜索关键词"
        @focus="onSearch" 
      />
    </van-sticky>
    <van-swipe class="swipe-container" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image.goods_id" @click="go2GoodsDetail(image)">
        <van-image :src="image.image_src" />
      </van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item v-for="(cate, index) in cateList" :key="index" @click="go2ProductList">
        <van-image :src="cate.image_src" />
      </van-grid-item>
    </van-grid>
    <div class="floor-wrap">
      <div class="floor-group" v-for="(floor, index) in floorLIst" :key="index">
        <!-- 标题 -->
        <div class="floor-title">
          <img :src="floor.floor_title.image_src" alt="">
        </div>
        <!-- 内容 -->
        <div class="floor-list" v-for="item in floor.product_list" :key="item.name" @click="go2GoodsList(item)">
          <img :src="item.image_src" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { getSwiperList, getCateList, getFloorList } from '/@/api/home'
export default {
  setup () {
    const store = useStore()
    const router = useRouter()
    const name = computed(() => store.state.userNmae)
    const data = reactive({
      images: [],
      cateList: [],
      floorLIst: []
    })
    const methods = reactive({
      getSwiperList: async () => {
        try {
          const res = await getSwiperList({})
          if (res.data && res.data.meta.status === 200) {
            data.images = res.data.message || []
          }
        } catch (error) {}
      },
      getCateList: async () => {
        try {
          const res = await getCateList({})
          data.cateList = res.data.message
        } catch (error) {}
      },
      getFloorList: async () => {
        try {
          const res = await getFloorList({})
          data.floorLIst = res.data.message
        } catch (error) {}
      },
       // 商品详情
      go2GoodsDetail: (row: any) => {
        router.push({
          path: '/goods-list-detail',
          query: { goods_id: row.goods_id, pageType: 'Home' }
        })
      },
      // 商品列表product-list
      go2ProductList: (row: any) => {
        router.push({
          path: '/product-list'
        })
      },
      go2GoodsList: (row: any) => {
        const names = row.navigator_url.split('=')
        router.push({
          path: '/goods-list',
          query: {query: names[1]}
        })
      },
      onSearch: () => {
        router.push('./search')
      },
      handleBtn: () => {
        store.commit('getUserNmae', 'Vue')
      }
    })
    onMounted(() => {
      methods.getSwiperList()
      methods.getCateList()
      methods.getFloorList()
    })
    const refData = toRefs(data)
    return {
      name,
      ...refData,
      ...methods
    }
  }
}
</script>

<style lang="scss" scoped>
$blue: #7232dd;
.home-page {
  height: 100vh;
  .van-sticky {
    height: 50rem;
    .search-bar {
      height: 100%;
    }
  }
  .swipe-container .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 15rem;
    line-height: 15rem;
    text-align: center;
    background-color: $blue;
    .van-image {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .van-grid {
    display: flex;
    .van-grid-item {
      flex: 1;
    }
  }
  .floor-wrap {
    width: 100%;
    padding-bottom: 5rem;
    .floor-group {
      width: 100%;
      overflow: hidden;
      .floor-title {
        padding: .5rem;
        img {
          width: 100%;
        }
      }
      .floor-list {
        float: left;
        width: 33.33%;
        // padding: 0 1rem;
        img {
          width: 100%;
        }
        // 后4个
        &:nth-last-child(-n+4) {
          // 原图的宽高232*386
          // 第一张图 height: 33.33vw * 386 / 232
          height: 33.33vw * 386 / 232 / 2;
          border-left: .8rem solid #fff;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &:nth-child(3),
        &:nth-child(4) {
          border-bottom: .8rem solid #fff;
        }
      }
    }
  }
}
</style>
