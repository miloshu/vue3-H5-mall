<template>
  <div class='user-center-wrap'>
    <!-- <h1>个人中心</h1> -->
    <div class='user-img-wrap'>
      <img class='user-bg' src="../../assets/imgs/avatar.jpeg" />
      <div class='user-avatar'>
        <img src="../../assets/imgs/avatar.jpeg" alt="" class="avatar-icon">
        <div class="user-name">阿寿</div>
      </div>
    </div>
    <!-- <div class="login-btn">
      <van-button type="primary">登录</van-button>
    </div> -->
    <div class="user-content">
      <div class="user-main">
        <!-- 历史足迹 -->
        <div class="hstory-wrap">
          <div class="hstory-box">
            <div class="num">2</div>
            <div class="name">收藏的店铺</div>
          </div>
          <div class="hstory-box">
            <div class="num">{{collectNum}}</div>
            <div class="name">收藏的商品</div>
          </div>
          <div class="hstory-box">
            <div class="num">0</div>
            <div class="name">关注的店铺</div>
          </div>
          <div class="hstory-box">
            <div class="num">208</div>
            <div class="name">我的足迹</div>
          </div>
        </div>
        <!-- 我的订单 -->
         <div class="my-order-wrap">
          <div class="order-title van-hairline--bottom">我的订单</div>
          <div class="order-content">
            <div>
              <van-icon class="icon" name="gift-card" color="#ee0a24" />
              <div class="name">全部订单</div>
            </div>
            <div>
              <van-icon class="icon" name="bill" color="#ee0a24" />
              <div class="name">待付款</div>
            </div>
            <div>
              <van-icon class="icon" name="send-gift" color="#ee0a24" />
              <div class="name">待收货</div>
            </div>
            <div>
              <van-icon class="icon" name="gold-coin" color="#ee0a24"/>
              <div class="name">退款/退货</div>
            </div>
          </div>
        </div>
        <!-- 收货地址管理 -->
        <div class="address-manage-wrap">收货地址管理</div>
        <!-- 应用信息🇭🇰相关 -->
        <div class="app-info-wrap address-manage-wrap">
          <div class="contact-customer-box van-hairline--bottom">
            <span>联系客服</span>
            <span>400-53395288</span>
          </div>
          <div class="suggest van-hairline--bottom">意见反馈</div>
          <div class="about van-hairline--bottom">关于我们</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, computed, reactive, toRefs } from 'vue'
import { setStorage, getStorage } from '/@/utils/storage'
export default {
  name: 'MyCenter',
  components: {},
  setup() {
    const state = reactive({
      userInfo: {},
      collectGoods: []
    })
    const refData = toRefs(state)
    // 计算收藏过的商品
    const collectNum = computed(() => {
      return state.collectGoods.length
    })
    // 页面加载完毕
    onMounted(() => {
      state.collectGoods = getStorage('collect') as any || []
    })
    return {
      ...refData,
      collectNum
    }
  }
}
</script>
<style lang='scss' scoped>
.user-center-wrap {
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
  .user-img-wrap {
    position: relative;
    height: 40vh;
    .user-bg {
      width: 100%;
      height: 40vh;
      filter: blur(8px);
    }
    .user-avatar {
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translateX(-50%);
      text-align: center;
      .avatar-icon {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
      }
      .user-name {
        color: #fff;
      }
    }
  }
  .login-btn {
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 1.5rem;
    border-radius: 50%;
  }
  .user-content {
    position: relative;
    .user-main {
      position: absolute;
      width: 90%;
      left: 50%;
      top: -4rem;
      padding-bottom: 5rem;
      transform: translateX(-50%);
      background-color: #e5e5e5;
    }
    .hstory-wrap {
      display: flex;
      background-color: #fff;
      .hstory-box {
        flex: 1;
        padding: 1rem 0;
        text-align: center;
      }
    }
    .my-order-wrap {
      margin-top: 1rem;
      background-color: #fff;
      .order-title {
        padding: 0.8rem;
      }
      .order-content {
        display: flex;
        text-align: center;
        > div { padding: .8rem; flex: 1;}
        .icon {
          font-size: 2rem;
          color: rgb(238, 10, 36);
        }
      }
    }
    .address-manage-wrap {
      margin-top: 1rem;
      padding: 0.8rem;
      background-color: #fff;
      .contact-customer-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .contact-customer-box,
      .about,
      .suggest {
        padding: 1rem;
      }
      .about {
        border-bottom: none;
      }
    }
    .app-info-wrap {
      padding: 0 1rem;
    }
  }
}
</style>
