<template>
  <div id="Personal">
    <div class="top">
      <div><img src="@/assets/tx.jpg" alt="" /></div>
      <div class="name">
        <p>一代</p>
        <p>大侠</p>
      </div>
    </div>
    <div class="icon">
      <a
        href="#"
        target="_blank"
        class="iconfont icon-github"
        title="不给看"
      ></a>
      <a
        href="#"
        target="_blank"
        class="iconfont icon-twitter"
        title="不给看"
      ></a>
      <a
        href="#"
        target="_blank"
        class="iconfont icon-tubiaozhizuo-"
        title="不给看"
      ></a>
      <el-popover
        placement="bottom"
        title="微信扫一扫添加好友"
        :width="150"
        trigger="click"
      >
        <template #reference>
          <a class="iconfont icon-weixin"></a>
        </template>
        <img
          src="@/assets/img/weixin.jpg"
          width="150"
          height="150"
          alt="微信二维码"
        />
      </el-popover>
      <el-popover
        placement="bottom"
        title="QQ扫一扫添加好友"
        :width="150"
        trigger="click"
      >
        <template #reference>
          <a class="iconfont icon-QQ"></a>
        </template>
        <img
          src="@/assets/img/QQ.png"
          width="150"
          height="150"
          alt="QQ二维码"
        />
      </el-popover>
    </div>
    <div class="button">
      <a href="#" target="_blank">DOWNLOAD CV</a>
    </div>
  </div>
</template>
<script>
export default {
  name: "Personal"
}
</script>
<style lang="less">
#Personal {
  width: 100%;
  height: 240px;
  background-color: #e1e1e1;
  margin-bottom: 10px;
  border-radius: 5px;
  .top {
    width: 100%;
    height: 100px;
    img {
      overflow: hidden;
      float: left;
      width: 60px;
      height: 60px;
      margin-top: 20px;
      margin-left: 30px;
      border: 2px solid #fff;
      border-radius: 50%;
    }
    .name {
      float: right;
      margin-top: 35px;
      margin-right: 60px;
    }
  }
  .icon {
    width: 100%;
    display: flex;
    margin: 20px;
    a {
      flex: 1;
      text-decoration: none;
      color: #000;
    }
  }
  .button {
    width: 100%;
    padding: 20px 0;
    border-top: 1px Dotted #aaa;
    a {
      display: block;
      width: 65%;
      height: 40px;
      border-radius: 23px;
      margin: 0 auto;
      box-shadow: 0 0 0 #888;
      font-family: "Quicksand";
      font-size: 14px;
      text-align: center;
      line-height: 40px;
      font-weight: 700;
      color: #000;
      letter-spacing: 1px;
      background-color: #77c4e7;
      transition: box-shadow 0.3s;
      text-decoration: none;
      &:hover {
        box-shadow: 0 2px 10px #888;
      }
    }
  }
}
</style>