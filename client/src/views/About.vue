<template>
  <div id="About">
    <!--about me-->
    <article>
      <h2>ABOUT ME</h2>
      <p>你说如果算力+算法足够牛应该就可以推演出未来吧</p>
      <p></p>
      <p>...</p>
    </article>

    <!--about site-->
    <article>
      <h2>ABOUT SITE</h2>
      <p><code>前  端：</code><span class="code">Vue + Element</span></p>
      <p><code>后  端：</code><span class="code">Node  + Express + Mongodb</span></p>
      <p class="border"><code>服务器：</code><a target="_blank" href="https://www.aliyun.com/1111/new?userCode=xqfx5ty6">阿里云ECS</a></p>
      <p></p>
      <p></p>
    </article>

    <!--ABOUT COPYRIGHT-->
    <article>
      <h2>ABOUT COPYRIGHT</h2>
      <p>源码开源：<a href="" target="_blank"></a></p>
      <p>在注明出处的前提下，本站文章允许非商业用途的转载。</p>
    </article>

    <!--OTHER-->
    <article>
      <h2>OTHER</h2>
      <p>lixiao要努力变强！！<a href="/#contact">contact me</a> 如果你想联系我。或者可以在👈左侧边栏微信QQ找到我的联系方式哦。</p>
    </article>
  </div>
</template>

<script>
export default {
  name: "About"
}
</script>

<style lang="less" scoped>
#About {
  flex: 1;

  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: Quicksand;

    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }

    p {
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
      &.border{
        border-bottom: 1px dotted rgb(170, 170, 170);
      }
    }

    code{
      text-indent: 0;
      display: inline-block;
      font-family: "Quicksand";
      font-size: 14px;
    }
    span.code{
      color: #bd4147;
      background-color: rgba(27, 31, 35, 0.05);
      font-weight: 700;
    }
    a{
      color: #409eff;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}

</style>




