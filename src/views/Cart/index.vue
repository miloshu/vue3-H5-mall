<template>
  <div class='cart-wrap'>
    <van-button color="#7232dd" style="width: 100%" v-if="!currentContact.name">添加收货地址</van-button>
    <van-contact-card
      type="edit"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="editAddress"
    />
    <h3 class="van-hairline--top">购物车</h3>
    <div class="main-content">
      <ul class="cart-list" v-if="goodList.length">
        <li class="cart-list-item van-hairline--top van-hairline--bottom"
          v-for="(item, index) in goodList" :key="index">
          <van-checkbox v-model="item.checked" class="checkbox" @change="handledSelect"></van-checkbox>
          <img :src="item.goods_small_logo" alt="">
          <div class="cart-list-item-right">
            <p class="title">{{ item.goods_name.slice(0, 2)}}</p>
            <p class="content van-multi-ellipsis--l2">{{ item.goods_name}}</p>
            <div class="stepper-btn">
              <p class="goods-price">¥ {{ item.goods_price }}</p>
              <van-stepper 
                v-model="item.num"
                theme="round"
                button-size="22"
                disable-input
                min="0"
                @minus="handleMinus(item, index, -1)"
                @plus="handlePlus(item, 1)" />
            </div>
          </div>
        </li>
      </ul>
      <img 
        v-else
        src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3896639434,2608684613&fm=26&gp=0.jpg"
        style="width: 95%; margin-top: 20%; text-align: center;" />
    </div>
    <van-submit-bar :price="totalPrice*100" safe-area-inset-bottom button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="isCheckedAll" @click.stop="checkAll">全选</van-checkbox>
      <!-- <template #tip>
        你的收货地址不支持同城送, <span @click="onClickLink">修改地址</span>
      </template> -->
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Dialog } from 'vant'
import { Toast } from 'vant'
import { setStorage, getStorage } from '/@/utils/storage'
export default {
  name: 'Cart',
  setup() {
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      isCheckedAll: false,
      currentContact: {
        name: '张三',
        tel: '13809989998'
      },
      totalPrice: 0,
      totalNum: 0,
      goodList: []
    })
    const editAddress = () => {
      router.push('/address-list')
    }
    /* 全选复选框绑定事件, 
    * 获取state中的全选值 isCheckedAll, 然后直接取反, 
    * 遍历购物车数组, 让里面的商品选中状态跟随isCheckedAll的改变而改变
    * 把购物车数组和isCheckedAll重新设置回data, 购物车数组重新设置回缓存中替换原来缓存数据
    */
    const checkAll = () => {
      state.isCheckedAll = state.isCheckedAll
      // 循环修改goodlist数组中选中的商品状态
      state.goodList.forEach(v => v.checked = state.isCheckedAll)
      // 把修改后的值重新设置回缓存中替换原来缓存数据
      setCartData(state.goodList)
    }
    /* 点击提交订单, 
    * 1. 判断有没有收货地址信息
    * 2. 判断用户有没有选购商品到购物车
    * 3. 满足条件1和2, 则跳转到支付订单页面
    * 
    */
    const onSubmit = () => {
      if (!state.currentContact.name) {
        return Toast({
          message: '请填写收货地址',
          position: 'bottom',
        })
      }
      if (!state.totalNum) {
        return Toast({
          message: '请先选购商品',
          position: 'bottom',
        })
      }
      router.push('/payment-order')
    }
    const onClickLink = () => {
    }
    // 设置购物车状态 计算总数量, 总价格, 全选
    const setCartData = (arr: []) => {
      let checkedAll = true
      let totalPrice = 0
      let totalNum = 0
      arr.forEach(ele => {
        if (ele.checked) {
          totalPrice += ele.goods_price * ele.num
          totalNum += ele.num
        } else {
          checkedAll = false
        }
      })
      state.isCheckedAll = arr.length ? checkedAll : false
      state.totalPrice = totalPrice
      state.totalNum = totalNum
      setStorage('goods_cart', state.goodList)
    }
    // 选中商品事件
    const handledSelect = (val: boolean) => {
      val = !val // 取反
      // 把购物车重新添加回缓存中
      setCartData(state.goodList)
    }
    // 商品数量减少逻辑
    const handleMinus = (item: {num: number}, index: number, num: number) => {
      if (item.num === 1) {
        // 弹窗提示确认删除该商品吗?
        Dialog.confirm({
          message: '确认删除该商品吗?',
          showCancelButton: true,
          cancelButtonText: '再想想',
          confirmButtonText: '确认删除'
        }).then(() => {
          state.goodList.splice(index, 1)
          setCartData(state.goodList)
        }).catch(() => {
          item.num = 1
          // on cancel
        })
      } else {
        item.num += num
        setCartData(state.goodList)
      }
      // setCartData(state.goodList)
    }
    // 商品数量增加逻辑
    const handlePlus = (item: {num: number}, num: number) => {
      item.num += num
      setCartData(state.goodList)
    }
    // 页面加载完毕
    onMounted(() => {
      /* 1. 获取本地存储中地址数据, 把数据设置给data中的一个变量
      *  2. 把购物车数据填充到data中
      *  3. 全选实现 数据的展示
      *    1). 获取缓存中的购物车数据
      *    2). 根据购物车中的商品数据, 所有的商品都被选中 checked = true 全选就被选中
      *  4. 总价格和总数量的展示
      *    1). 都需要商品被选中才计算
      *    2). 获取购物车数组, 遍历 判断商品是否被选中
      *    3). 总价格 += 商品的单价 * 商品的数量
      *    4). 总数量 += 商品的数量
      *    5). 把计算后的价格和数量设置回data中
      *  5. 商品的选中
      *   1). 绑定change事件
      *   2). 获取到被修改的商品对象
      *   3). 商品对象的选中状态 取反
      *   4). 重新填充回data和缓存中
      *   5). 重新计算总价格和总数量
      */
      if (store.state.addressInfo) {
        state.currentContact.name = store.state.addressInfo.name
        state.currentContact.tel = store.state.addressInfo.tel
      }
      state.goodList = getStorage('goods_cart') as any || []
      setCartData(state.goodList)
    })
    const refData = toRefs(state)
    return {
      ...refData,
      onSubmit,
      onClickLink,
      checkAll,
      handleMinus,
      handlePlus,
      handledSelect,
      editAddress
    }
  },
}
</script>
<style lang='scss' scoped>
.cart-wrap {
  height: 100%;
  h3 {
    padding-top: 0.8rem;
    padding-left: 1rem;
    font-size: 1.4rem;
  }
  .main-content {
    height: calc(100% - 18.8rem);
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
.van-submit-bar {
  bottom: 5rem;
}
</style>