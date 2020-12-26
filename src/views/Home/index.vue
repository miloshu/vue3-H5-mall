<template>
  <div class="home-page">
    <van-sticky>
      <van-search
        class="search-bar"
        v-model="value"
        shape="round"
        background="#7232dd"
        placeholder="请输入搜索关键词"
      />
    </van-sticky>
    <van-swipe class="my-swipe" :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <van-image :src="image" />
      </van-swipe-item>
    </van-swipe>
    <!-- <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid> -->
<!-- 
    <van-grid :column-num="3">
      <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
    </van-grid>

    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
      </van-grid-item>
    </van-grid> -->
    <!-- <van-button type="danger" @click="handleBtn">vuex按钮</van-button>
    <h1>{{name}}</h1>
    <p>{{ msg }}</p>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <router-link :to="`/detail/${item.id}`">{{item.name}}</router-link>
      </li>
    </ul> -->

  </div>
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
// import { getUser } from './../api/home'
export default {
  setup () {
    const store = useStore()
    const name = computed(() => store.state.userNmae)
    const data = reactive({
      value: '',
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    })
    const refData = toRefs(data)
    const handleBtn = () => {
      store.commit('getUserNmae', 'Vue')
    }
    return {
      ...refData,
      handleBtn
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-bar {
    height: 5rem;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 20rem;
    line-height: 20rem;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
