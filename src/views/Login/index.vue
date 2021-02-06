<template>
  <div class="main">
    <div class="card">
      <van-row type="flex" justify="center" class="card-row">
        <van-col span="18">
          <!-- 请输入用户名 -->
          <van-field
            v-model="user.userName"
            clearable
            placeholder="请输入用户名"
            left-icon="user-o"
            class="field"
          />
          <!-- 请输入密码 -->
          <van-field
            v-model="user.passWord"
            type="password"
            placeholder="请输入密码"
            left-icon="edit"
            class="field"
          />
          <!-- 选择 -->
          <van-field name="switch" label="记住密码">
            <template #input>
              <van-switch v-model="isRem" size="24" />
            </template>
          </van-field>
          <!-- 登录按钮 -->
          <van-button
            block
            round
            :loading="loading"
            loading-text="登录中"
            class="btn-login"
            type="primary"
            @click="handleLogin"
            >登录
          </van-button>
          <!-- 注册 -->
          <van-button
            round
            :loading="loading"
            loading-text="注册中"
            class="btn-login"
            type="primary"
            @click="handleRegiste"
            >登录
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script lang="ts">
 // 在vue2中 data 在vue3中使用 reactive代替
import { defineComponent, reactive, onMounted, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { Login } from '/@/api/user'
// import Cookies from 'js-cookie'
// import store from '/@/store'
interface DataProps {
  loading: boolean;
  isRem: boolean;
  user: object;
  login?: () => void;
  handleRegiste?: () => void;
}
export default defineComponent({
  setup(props, context) {
    // 3.0钩子函数
    onMounted(() => {
      // to do something
    })
    const { push } = useRouter()
    const data:DataProps = reactive({
      loading: false,
      isRem: true,
      user: {
        userName: '',
        passWord: '',
      }
    })
    // 方法都集中放入methods里面
    const methods = reactive({
      handleLogin: () => {
        Login({
          username: "lisi",
          password: "123456"
        }).then(res => {
          console.log(res, 88888)
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
        })
      },
      handleRegiste: () => void {}
    })
    const refData = toRefs(data)
		// 在Vue3.0中，所有的数据和方法都通过在setup 中 return 出去，然后在template中使用
    return {
      ...refData,
      ...methods
    }
  }
})
</script>
<style lang="scss" scoped>
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    .card{
      margin-top: 5rem;
    }
    .btn-login {
      margin-top: 20px;
    }
  }
</style>
