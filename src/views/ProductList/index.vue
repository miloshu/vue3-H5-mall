<template>
  <div class='product-list'>
    <van-sticky>
      <van-search
        class="search-bar"
        shape="round"
        background="#7232dd"
        placeholder="请输入搜索关键词"
        @focus="onSearch"
      />
    </van-sticky>
    <div class="product-content">
      <ul class="left-cates">
        <li v-for="(item, index) in leftMenuList"
          :key="index" @click="changeClassifys(index)"
          :class="{active: activeIndex === index}"
          >
          <span :class="{'active': activeId === item.cat_id}">{{item.cat_name}}</span>
        </li>
      </ul>
      <ul class="right-cates">
        <li v-for="(item, index) in rightConList" :key="index">
          <div class="goods-title">
            <span class="goods-delimiter">/</span>
            <span class="title">{{item.cat_name}}</span>
            <span class="goods-delimiter">/</span>
          </div>
          <div class="goods-list">
            <a v-for="(v, idx) in item.children" :key="idx" @click="goToListDetail(item.cat_id)">
              <img :src="v.cat_icon" alt="" >
              <div>{{v.cat_name}}</div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, defineComponent } from 'vue'
import { getCategoriesList } from '/@/api/category'
import { setStorage, getStorage } from '/@/utils/storage'
import { useRouter } from 'vue-router'
// 类型定义
interface stateProps {
  activeId: number;
  activeIndex: number;
  lists: any[];
  leftMenuList: any[];
  rightConList: any[];
}
export default defineComponent({
  setup () {
    const router = useRouter()
    const state: stateProps = reactive({
      activeId: 1,
      activeIndex: 0,
      lists: [],
      leftMenuList: [],
      rightConList: []
    });
    const methods = reactive({
      getCategoriesList: async () => {
        try {
          const res = await getCategoriesList({})
          state.lists = res.data.message
          // 存储数据
          setStorage('categories', {time: Date.now(), data: state.lists})
          // 商品列表左侧数据
          state.leftMenuList = state.lists.filter(v => v.cat_name)
          // 商品列表右侧数据
          state.rightConList = state.lists[0].children
        } catch (error) {}
      },
      changeClassifys: (index: number) => {
        state.activeIndex = index
        state.rightConList = state.lists[index].children
        // 让滚动条回滚到顶部
        let oDom = document.querySelector('.right-cates') as Element
        oDom.scrollTop = 0
      },
      // 跳转商品详情列表
      goToListDetail: (id: number) => {
        router.push({
          path: '/goods-list',
          query: { cid: id }
        })
      },
      onSearch: () => {
        router.push('./search')
      }
    })
    onMounted(() => {
      /*  1. 先判断本地存储中有没有旧数据 {time: Date.now(), data: [...]}
       *  2. 没有旧数据则发送新的请求
       *  3. 有旧数据,且旧数据没有过期, 就是用本地存储中的旧数据
      */
      // 1. 获取本地存储中的数据
      const categories = getStorage('categories') as any
      // 2. 判断是否存在
      if (!categories) {
        // 不存在, 则发送请求获取数据
        methods.getCategoriesList()
      } else {
        // 存在旧数据, 是否过期? , 定义过期时间 60s
        if (Date.now() - categories.time > 1000 * 60) {
          // 已过期, 重新发送请求
          methods.getCategoriesList()
        } else {
          // 使用旧数据
          state.lists = categories.data
          state.leftMenuList = state.lists.filter(v => v.cat_name)
          state.rightConList = state.lists[0].children
        }
      }
    })
    const refData = toRefs(state)
    const refMethods = toRefs(methods)
    return {
      ...refData,
      ...refMethods
    }
  }
})
</script>
<style lang='scss' scoped>
$blue: #7232dd;
.product-list {
  width: 100%;
  height: 100vh;
  .van-sticky {
    height: 50rem;
    .search-bar {
      height: 100%;
    }
  }
  .product-content {
    display: flex;
    height: 100vh;
  }
  .left-cates, .right-cates {
    height: 100%;
    padding-bottom: 5rem;
    font-size: 1.3rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .left-cates {
    flex: 1;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 4rem;
      font-size: 1.2rem;
      &.active {
        color: $blue;
        border-left: 2px solid $blue;
      }
    }
  }
  .right-cates {
    flex: 3;
    li {
      .goods-title {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4rem;
        font-size: 1.2rem;
        .goods-delimiter {
          color: #ccc;
          padding: 0 5px;
        }
      }
      .goods-list {
        display: flex;
        flex-wrap: wrap;
        a {
          display: inline-block;
          width: 33.33%;
          text-align: center;
          img {
            width: 50%;
          }
          div {
            font-size: 1.2rem;
            color: #000;
          }
        }
      }
    }
  }
}
</style>
