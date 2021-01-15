<template>
  <div class='goods-detail-wrap'>
    <van-nav-bar
      left-text="返回"
      title="商品详情"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-swipe class="swipe-container" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image.goods_id">
        <img :src="image.pics_mid_url" />
      </van-swipe-item>
    </van-swipe>
    <div class="goods-price">¥ {{goodsParam.goods_price}}</div>
    <van-divider />
    <div class="goods-title-box">
      <div class="goods-title van-multi-ellipsis--l3">{{goodsParam.goods_name}}</div>
      <div class="goods-collection">
        <van-icon name="star-o" color="#ee0a24" size="20" />
        <span class="collect-text">收藏</span>
      </div>
    </div>
    <van-divider />
    <div class="goods-content">
      <h3>图文详情</h3>
      <div v-html="goodsParam.goods_introduce"></div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-action-bar-icon icon="cart-o" text="购物车" badge="5" />
      <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" />
      <van-action-bar-button color="#be99ff" type="warning" text="加入购物车" />
      <van-action-bar-button color="#7232dd" type="danger" text="立即购买" />
    </van-action-bar>
    <loading v-show="loading"></loading>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getGoodsDetailList } from '/@/api/category'
import Loading from '/@/components/Loading/index.vue'
// 类型定义
interface stateProps {
  loading: boolean;
  goods_id: number | string;
  images: any[];
  goodsParam: any;
  [prop: string]: any;
}
export default {
  name: 'GoodsDetail',
  components: { Loading },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const state: stateProps = reactive({
      loading: false,
      goodsParam: {},
      goods_id: route.query.goods_id as number | string,
      images: []
    })
    const refData = toRefs(state)
    const methods = reactive({
      onClickLeft: () => {router.push('/goods-list')},
      getGoodsDetailList: async () => {
        try {
          state.loading = true
          const res = await getGoodsDetailList({goods_id: state.goods_id})
          state.goodsParam = res.data.message
          state.images = res.data.message.pics
          state.loading = false
        } catch (error) { state.loading = false }
      }
    })
    const refMethods = toRefs(methods)
    onMounted(() => {
      // console.log(Toast)
      methods.getGoodsDetailList()
    })
    return {
      ...refData,
      ...refMethods
    }
  }
  
}
</script>
<style lang='scss' scoped>
$blue: #7232dd;
.swipe-container .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 20rem;
    line-height: 20rem;
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
  .van-divider {
    margin: 0 !important;
  }
  .goods-detail-wrap {
    .goods-price {
      width: 100%;
      padding: 0.6rem 1.5rem;
      text-align: left;
      font-size: 1.6rem;
      color: #ee0a24;
    }
    .goods-title-box {
      display: flex;
    }
    .goods-title {
      flex: 5;
      padding: 5px 10px;
      font-size: 1.2rem;
      color: #000;
      text-align: left;
    }
    .goods-collection {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid rgb(235, 237, 240);
    }
    .goods-content {
      h3 {
        padding: 0 1.5rem;
        font-size: 1.6rem;
        color: #ee0a24;
      }
    }
  }
  
</style>
