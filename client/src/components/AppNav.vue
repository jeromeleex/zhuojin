<template>
  <div id="AppNav">
    <div class="main">
      <!--logo-->
      <div class="logo">
        <a href="/">lixiao.vip</a>
      </div>
      <!--导航-->
      <div class="nav">
        <ul>
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/article">文章</router-link>
          </li>
          <li>
            <router-link to="/message">留言</router-link>
          </li>
          <li>
            <router-link to="/link">友链</router-link>
          </li>
          <li>
            <router-link to="/about">关于</router-link>
          </li>
        </ul>
      </div>
      <!--登陆成功之后显示用户头像-->
      <UserPhoto v-if="userInfo.user"></UserPhoto>
      <!--登陆与注册按钮-->
      <div v-else class="login">
        <el-button
          type="success"
          size="mini"
          @click="loginBtnClick"
        >登陆 / 注册
        </el-button>
      </div>

      <!--登陆弹窗-->
      <LoginBox
        v-show="ifShowLoginBox"
        @closeBox="closeBox"
      ></LoginBox>
    </div>
  </div>
</template>

<script>

import LoginBox from "@/components/LoginBox";
import UserPhoto from "@/components/UserPhoto";
import {mapState} from "vuex";

export default {
  name: "AppNav",
  data() {
    return {
      ifShowLoginBox: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  components: {LoginBox,UserPhoto},
  methods: {
    loginBtnClick() {
      this.ifShowLoginBox = true
    },
    closeBox() {
      this.ifShowLoginBox = false
    }
  }
}
</script>

<style lang="less" scoped>
#AppNav {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  box-shadow: 0 0 2px #999;
  background-color: #fff;

  .main {
    display: flex;
    justify-content: space-between;

    box-sizing: border-box;
    max-width: 1300px;
    height: 100%;
    margin: 0 auto;
    padding: 0 15px;

    .logo {
      width: 130px;
      height: 50px;

      a {
        font-family: "Pacifico";
        line-height: 42px;
        font-size: 26px;
        letter-spacing: 5px;
        color: rgba(0, 0, 0, .7);
      }
    }

    .nav {
      ul {
        display: flex;
        height: 50px;

        li {
          height: 50px;

          a {
            display: block;
            height: 98%;
            border-bottom: 2px solid transparent;
            padding: 0 25px;
            color: #777;
            line-height: 48px;
            font-weight: bolder;
            transition: all .3s;

            &:hover {
              color: #00b7ff;
            }

            &.router-link-active {
              color: #00b7ff;
              border-color: #00b7ff;
            }
          }
        }
      }
    }

    .login {
      .el-button {
        margin-top: 11px;
      }
    }
  }
}

</style>














