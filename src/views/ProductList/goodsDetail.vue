<template>
  <div class='goods-detail-wrap'>
    <van-nav-bar
      left-text="返回"
      title="商品详情"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 点击轮播图, 预览大图 1: 绑定点击事件, 调用vantUI previewImage组件 -->
    <van-swipe class="swipe-container" :autoplay="3000" lazy-render>
      <van-swipe-item
        v-for="(image, index) in images"
        :key="image.goods_id"
        @click="previewBigImage(index)">
        <img :src="image.pics_mid_url" />
      </van-swipe-item>
    </van-swipe>
    <div class="goods-price">¥ {{ goodsParam.goods_price }}</div>
    <van-divider />
    <div class="goods-title-box">
      <div class="goods-title van-multi-ellipsis--l3">{{ goodsParam.goods_name }}</div>
      <div class="goods-collection" @click="handleCollect">
        <van-icon :name="isCollect ? 'star' : 'star-o'" color="#ff5000" size="20" />
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
      <van-action-bar-icon icon="share-o" text="分享" color="#ff5000" @click="onClickShare"  />
      <!-- <van-action-bar-icon icon="star" text="已收藏" color="#ff5000" /> -->
      <van-action-bar-icon icon="cart-o" text="购物车" :badge="badgeNum" @click="onClickCartIcon" />
      <van-action-bar-button color="#be99ff" type="warning" text="加入购物车" @click="onClickAddCartIcon" />
      <van-action-bar-button color="#7232dd" type="danger" text="立即购买" />
    </van-action-bar>
    <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
    <loading v-show="loading"></loading>
  </div>
</template>

<script lang="ts">
import { ImagePreview, Toast } from 'vant'
import { onMounted, ref, reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getGoodsDetailList } from '/@/api/category'
import Loading from '/@/components/Loading/index.vue'
import { setStorage, getStorage } from '/@/utils/storage'
// 类型定义
interface stateProps {
  loading: boolean;
  isCollect: boolean;
  goods_id: number | string;
  images: any[];
  badgeNum: number | string;
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
      badgeNum: '',
      images: [],
      isCollect: false,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    })
    const refData = toRefs(state)
    const methods = reactive({
      onClickLeft: () => {
        if (route.query.pageType) {
          router.push('/home')
        } else {
          router.push('/goods-list')
        }
      },
      getGoodsDetailList: async () => {
        try {
          state.loading = true
          const res = await getGoodsDetailList({goods_id: state.goods_id})
          state.goodsParam = res.data.message
          state.images = res.data.message.pics
          state.loading = false
        } catch (error) { state.loading = false }
      },
      previewBigImage: (startPosition: number) => {
        const images = state.images.map(k => k.pics_mid)
        const instance:any = ImagePreview({
          images,
          startPosition,
          // beforeClose 属性可以拦截关闭行为
          beforeClose: () => false,
        })
        setTimeout(() => {
          // 调用实例上的 close 方法手动关闭图片预览
          instance.close()
        }, 3000);
      },
      onClickCartIcon: () => router.push('/cart'),
      // 分享
      onClickShare: () => {
        state.showShare = true
      },
      onSelect: (option) => {
        Toast(option.name)
        state.showShare = false
      },
      /*  加入购物车
      * 1. 获取缓存中的购物车数组
      * 2. 判断当前商品对象是否存在于购物车数组中
      * 3. 已经存在, 则修改商品数量, 执行购物车数据++, 重新把购物车数组填充回缓存中
      * 4. 不存在购物车数组中, 第一次添加, 直接给购物车添加一个一个新元素, 新元素带上购物车数量属性num
      * 5. 弹窗提示信息
      */
      onClickAddCartIcon: () => {
        let cart = getStorage('goods_cart') as any || []
        let index = cart.findIndex(v => v.goods_id == state.goods_id)
        if (index === -1) {
          // 不存在, 第一次添加
          state.goodsParam.num = 1
          state.goodsParam.checked = true
          cart.push(state.goodsParam)
          state.badgeNum = cart[0].num
        } else {
          // 已经存在购物车数据. num++
          cart[index].num++
          state.badgeNum = cart[index].num
        }
        // 把购物车重新添加回缓存中
        setStorage('goods_cart', cart)
        Toast.success('加入成功')
      },
      // 商品收藏按钮
      handleCollect: () => {
        // 获取缓存中的商品收藏数组
        let collectGoods = getStorage('collect') as any || []
        // 判断该商品是否被收藏过
        let index = collectGoods.findIndex(v => v.goods_id == state.goods_id)
        if (index !== -1) {
          // 已收藏, 在数组中删除该商品
          collectGoods.splice(index, 1)
          state.isCollect = false
          Toast.success('已取消收藏')
        } else {
          // 未收藏过
          collectGoods.push(state.goodsParam)
          state.isCollect = true
          Toast.success('收藏成功')
        }
        // 把收藏数组存入到缓存中
        setStorage('collect', collectGoods)
      }
    })
    onMounted(() => {
      // 加载缓存中的购物车数量数据
      let cart = getStorage('goods_cart') as any || []
      if (cart.length) {
        // 判断当前数据是否已加入购物车
        cart.forEach((item:any, index:number) => {
          if (item.goods_id === +state.goods_id) state.badgeNum = item.num
        })
      }
      // 加载缓存中的商品收藏数据
      let collectGoods = getStorage('collect') as any || []
      state.isCollect = collectGoods.some(v => v.goods_id == state.goods_id)
      // 判断当前商品是否被收藏
      methods.getGoodsDetailList()
    })
    return {
      ...refData,
      ...methods
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
      // margin-top: 1rem;
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
      padding-bottom: 4rem;
      h3 {
        padding: 0 1.5rem;
        font-size: 1.6rem;
        color: #ee0a24;
      }
    }
  }
  
</style>
