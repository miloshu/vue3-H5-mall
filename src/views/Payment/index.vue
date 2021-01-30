<template>
  <div class='payment-order-page'>
    <van-nav-bar
      left-text="返回"
      title="商品支付"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="address-wrap">
      <!-- <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        :switchable="false"
      /> -->
    </div>
    <div class="main-content">
      <ul class="cart-list">
        <li class="cart-list-item van-hairline--top van-hairline--bottom"
          v-for="(item, index) in filterCarts" :key="index">
          <img :src="item.goods_small_logo ? item.goods_small_logo : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsecretkeycrm.digifilm.com.cn%2Fupload%2F20180530%2Fe676f667c4cdfc7e074898adab2622f2.jpg&refer=http%3A%2F%2Fsecretkeycrm.digifilm.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612877657&t=0309216f4e33e2e64d576153be017f31'" alt="">
          <div class="cart-list-item-right">
            <p class="title">{{ item.goods_name.slice(0, 2)}}</p>
            <p class="content van-multi-ellipsis--l2">{{ item.goods_name}}</p>
            <div class="stepper-btn">
              <p class="goods-price">¥ {{ item.goods_price }}</p>
              <p class="goods-price">x {{ item.num }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <van-submit-bar
      :loading="loading"
      :price="totalPrice*100"
      button-text="支付"
      @submit="onSubmit"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, ref, reactive, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { setStorage, getStorage } from '/@/utils/storage'
export default {
  name: 'Payment',
  setup() {
    const router = useRouter()
    const store = useStore()
    const chosenAddressId = ref('1')
    const state = reactive({
      loading: false,
      totalPrice: 0,
      totalNum: 0,
      goodList: [],
      addressList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号',
        },
      ]
    })
    const onClickLeft = () => {router.push('/cart')}
    // 支付流程: 1.创建订单(获取订单编号) 2. 准备预支付; 3. 发起支付 4.查询订单状态, 5. 支付成功, 跳转到订单状态
    /*  
    *  1. 先判断缓存中有无token
    *  2. 没有则跳转到授权页面, 获取token
    */
    const onSubmit = () => {
    }
    // 过滤已选中的商品
    const filterCarts = computed(() => {
      return state.goodList.filter(v => v.checked)
    })
    // 页面加载完毕
    onMounted(() => {
      state.goodList = getStorage('goods_cart') as any || []
      state.goodList.forEach(ele => {
        if (ele.checked) {
          state.totalPrice += ele.goods_price * ele.num
          state.totalNum += ele.num
        }
      })
    })
    const refData = toRefs(state)
    return {
      ...refData,
      filterCarts,
      chosenAddressId,
      onClickLeft,
      onSubmit
    }
  },
}
</script>
<style lang='scss' scoped>
.payment-order-page {
  height: 100%;
  .address-wrap {
    padding-top: 4.7rem;
  }
  .main-content {
    height: calc(100% - 12rem);
  }
  .cart-list {
    width: 100%;
    .cart-list-item {
      display: flex;
      justify-content:space-between;
      align-items:center;
      padding-left: 1rem;
      .checkbox {
        width: 10%;
      }
      img {
        width: 28%;
      }
      .cart-list-item-right {
        width: 60%;
        .stepper-btn {
          display: flex;
          justify-content:space-between;
          align-items:center;
          padding-right: 1rem;
        }
      }
      &:last-child {
        padding-bottom: 10rem;
      }
    }
  }
}

</style>
