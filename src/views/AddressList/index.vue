<template>
  <div class="address-container">
    <!-- 收货地址 -->
    <van-nav-bar
      left-text="返回"
      title="收货地址"
      left-arrow
      @click-left="router.go(-1)"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onClickLeft"
    />
  </div>
</template>
<script lang="ts">
import { onMounted, ref, reactive, provide } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    let chosenAddressId = ref('1')
    const list = [
      {
        id: '1',
        name: '张三',
        tel: '13000008888',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '舒',
        tel: '13588889999',
        address: '广东省东莞市长安镇',
      },
    ];
    const disabledList = [
      {
        id: '3',
        name: '舒',
        tel: '13268800000',
        address: '广东省深圳市福田区',
      },
    ];
    // provide('currentContact', list)
    const onAdd = () => {
      router.push('/address-list/edit')
    };
    const onEdit = (item:any) => {
      router.push('/address-edit')
    };
    const onClickLeft = (item:any) => {
      store.state.addressInfo = item
      store.state.chooseAddressId = item.id
      router.push('/cart')
    };
    onMounted(() => {
      if (store.state.chooseAddressId) {
        chosenAddressId = store.state.chooseAddressId
      }
    })
    return {
      store,
      router,
      list,
      onAdd,
      onEdit,
      disabledList,
      onClickLeft,
      chosenAddressId,
    }
  }
}
</script>
<style lang="scss" scoped>
.address-container {
  width: 100%;
  height: 100%;
}
  .van-address-list {
    padding-top: 3.5rem !important;
  }
</style>