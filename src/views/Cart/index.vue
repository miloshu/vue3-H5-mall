<template>
  <div class='cart-wrap'>
    <van-button color="#7232dd" style="width: 100%">添加收货地址</van-button>
    <van-contact-card
      type="edit"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="editAddress"
    />
    <h3 class="van-hairline--top">购物车</h3>
    <ul class="cart-list">
      <li class="cart-list-item van-hairline--top van-hairline--bottom">
        <van-checkbox v-model="checked" name="a" shape="square" class="checkbox"></van-checkbox>
        <img src="" alt="">
        <div class="cart-list-item-right">
          <p class="title">长虹</p>
          <p class="content van-ellipsis">XUU-XUU-22N22XUU-22N222222N222</p>
          <div class="stepper-btn">
            <p class="goods-price">¥ 1900</p>
            <van-stepper v-model="stepperValue" theme="round" button-size="22" disable-input />
          </div>
        </div>
      </li>
    </ul>
    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkedAll" @click="checkAll">全选</van-checkbox>
      <template #tip>
        你的收货地址不支持同城送, <span @click="onClickLink">修改地址</span>
      </template>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, reactive, toRefs, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'Cart',
  setup() {
    const router = useRouter()
    const store = useStore()
    const checked = ref(true)
    const checkedAll = ref(true)
    const stepperValue = ref(0)
    const currentContact = reactive({
      name: '张三',
      tel: '13800000000',
    })
    const editAddress = () => {
      router.push('/address-list')
    }
    const checkAll = () => {
    }
    const onSubmit = () => {
    }
    const onClickLink = () => {
    }
    onMounted(() => {
      if (store.state.addressInfo) {
        currentContact.name = store.state.addressInfo.name
        currentContact.tel = store.state.addressInfo.tel
      }
    })
    return {
      checked,
      checkedAll,
      stepperValue,
      currentContact,
      onSubmit,
      onClickLink,
      checkAll,
      editAddress
    }
  },
}
</script>
<style lang='scss' scoped>
.cart-wrap {
  h3 {
    padding-top: 0.8rem;
    padding-left: 1rem;
    font-size: 1.4rem;
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
        width: 30%;
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
    }
  }
}
</style>
<style>
.van-submit-bar {
  bottom: 5rem;
}
</style>