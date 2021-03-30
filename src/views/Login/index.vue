<template>
  <div class="login">
    <van-nav-bar
      left-text="返回"
      title="验证手机"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main">
      <div class="login">
        <div class="pic theme-bg" :class="{'pic-hide': picHide}">
          <p class="pic-word">为了方便您及时查询订单信息，鲜蜂侠需要验证您的手机号为查询帐号</p>
        </div>
        <div class="inputs">
          <div class="phone-padding spline-bottom">
            <input class="phone" type="tel" placeholder="手机号码" v-model="phone" @focus="picHidefocus()" @blur="picHideBlue()">
          </div>
        </div>
        <div class="theme-bg login-submit" @click="login()">确定</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
 // 在vue2中 data 在vue3中使用 reactive代替
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog } from 'vant'
import { login, registe } from '/@/api/login'
// import Cookies from 'js-cookie'
import store from '/@/store'
interface DataProps {
  loading: boolean;
  picHide: boolean;
  phone: string;
  login?: () => void;
  handleRegiste?: () => void;
}
export default defineComponent({
  setup(props, context) {
    // 3.0钩子函数
    onMounted(() => {
      // to do something
    })
    const { push, go } = useRouter()
    const state:DataProps = reactive({
      loading: false,
      timer: null,
      // 控制显示隐藏
      picHide: false,
      // 手机号的值
      phone: ''
    })
    // 方法都集中放入methods里面
    const methods = reactive({
      // 返回上一页
      onClickLeft: () => {push('/cart')},
      // 当input聚焦的时候
      picHidefocus: () => {
        clearTimeout(state.timer)
        state.picHide = true
      },
      // 失焦的时候触发
      picHideBlue: () => {
        state.timer = setTimeout(() => {
          state.picHide = false
        }, 2000)
      },
      /*
        登录,如果数据库中有这个手机号那么就读取数据保存到vuex中，
        如果没有这个手机号就自动注册
      */
      handleLogin: () => {
      // 获取手机号的值,并进行校验
        let reg = /^1[34578]\d{9}$/
        if (!reg.test(state.phone)) {
          Dialog.confirm({
            title: '错误提示',
            message: '手机号格式填写错误，必须是11位的纯数字',
            showConfirmButton: false
          })
        } else {
          store.dispatch('login', state.phone)
            .then(function (data) {
              Dialog.confirm({
                title: '提示',
                message: data.msg
              })
              .then(function () {
                // 在用户点击确定后判断状态来决定是否要回到首页
                if (data.status) {
                  // 成功->跳转到上一个页面
                  go(-1)
                }
              })
            })
          }
        // login().then(res => {
          // if (res.code === 200) {
          //   Toast({ type: 'success', message: '登录成功', duration: 1000 });
          //   sessionStorage.setItem("userInfo", state.user.userInfo);
          //   push(res.detail)
          // } else if (res.code === 202) {
          //   Toast({ type: 'danger', message: res.msg });
          // } else {
          //   Toast({ type: 'danger', message: '登陆超时，请重新登陆' })
          //   push('/')
          // }
        // })
      },
      handleRegiste: () => void {}
    })
    const refData = toRefs(state)
		// 在Vue3.0中，所有的数据和方法都通过在setup 中 return 出去，然后在template中使用
    return {
      ...refData,
      ...methods
    }
  }
})
</script>
<style lang="scss" scoped>
.main{
  bottom: 0;
}
.pic{
  height: 6.9rem;
  background-image: url("./images/pic.png");
  background-repeat: no-repeat;
  background-position: 1rem bottom;
  -webkit-background-size: auto 80%;
  background-size: auto 80%;
  position: relative;
  overflow: hidden;
  -webkit-transition: height .4s;
  -o-transition: height .4s;
  transition: height .4s;
}
.pic-word{
  position: absolute;
  top: 1.7rem;
  width: 62%;
  right: 0;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: #000;
}
.inputs{
  background-color: #fff;
}
.phone-padding{
  padding: 0 1.5rem;
}
.phone{
  font-size: 1.4rem;
  outline: none;
  height: 4rem;
  line-height: 4rem;
  width: 100%;
  border: 0;
}
.login-submit{
  margin: 2rem .6rem;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  font-size: 1.6rem;
}
.pic-hide{
  height: 0px !important;
}
</style>
