<template>
  <div class='product-list'>
    <van-sticky>
      <van-search
        class="search-bar"
        v-model="searchVal"
        shape="round"
        background="#7232dd"
        placeholder="请输入搜索关键词"
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
        <li v-for="(item, index) in rightConList" :key="index" @click="changeClassifys(item.cat_id)">
          <div class="goods-title">
            <span class="goods-delimiter">/</span>
            <span class="title">{{item.cat_name}}</span>
            <span class="goods-delimiter">/</span>
          </div>
          <div class="goods-list">
            <a href="" v-for="(v, idx) in item.children" :key="idx">
              <img :src="v.cat_icon" alt="">
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
export default defineComponent({
  setup () {
    const state = reactive({
      searchVal: '',
      activeId: 1,
      activeIndex: 0,
      lists: [],
      leftMenuList: [],
      rightConList: []
    });
    const items = [
      {
        text: '浙江',
        children: [
          { text: '杭州', id: 1 },
          { text: '温州', id: 2 },
        ],
      },
      {
        text: '江苏',
        children: [
          { text: '南京', id: 5 },
          { text: '无锡', id: 6 },
        ],
      },
    ]
    const methods = reactive({
      getCategoriesList: async () => {
        try {
          const res = await getCategoriesList({})
          state.lists = res.data.message
          state.leftMenuList = res.data.message.filter(v => v.cat_name)
          state.rightConList = res.data.message[0].children
          // state.rightConList = res.data.message[0].children
          console.log(res.data.message[0].children, '999999')
        } catch (error) {}
      },
      changeClassifys: (index: number) => {
        state.activeIndex = index
      }
    })
    onMounted(() => {
      methods.getCategoriesList()
    })
    const refData = toRefs(state)
    return {
      ...refData,
      ...methods
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
    height: 50px;
    .search-bar {
      height: 100%;
    }
  }
  .product-content {
    display: flex;
    height: 100vh;
    // position: relative;
    // height: calc(100% - 50px);
    // padding: 50px 0;
  }
  .left-cates, .right-cates {
    height: 100%;
    padding-bottom: 50px;
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
        .title {

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
