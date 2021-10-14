1、用cmd创建vue项目：vue create client       

2、创建组件，在components里创建，在html里写入template，在template里写的就是这个组件的内容，然后在js区域到处

```vue3
<template>
<h5>捉进是废物</h5>
</template>

<script>
export default {
  name: "zhuojin"
}
</script>

<style scoped>

</style>
```

随后在需要这个组件的组件里先导入：

```vue3
<script>

//引入
import zhuojin from "@/components/zhuojin";

export default {
  name: "HelloWorld",
  //挂载
  components: {
    zhuojin
  }
}
</script>
```

然后在导入好的这个组件里的html区域里写入刚刚导入的组件作为标签名就可以代替组件的内容了

```vue3
<template>
  <h4>Hello World!</h4>
  <zhuojin></zhuojin>
  或者
  <zhuojin/>
</template>
```

3、子向父传值的自定义事件

```vue3
<button @click="clickFn">子组件的按钮</button>
```

```vue3
methods: {
    clickFn() {
      //触发自定义事件
      this.$emit("changeVal",{user:"",pwd:""})
    }
  }
}
```

监听按钮点击事件，点击触发clickFn()，触发自定义事件

```
emits: {
    //验证函数，需要返回一个布尔值
    changeVal({user,pwd}){
      if (!user || !pwd){
        console.warn("用户名和密码为空")//警告，但是不会影响渲染
        return false
      }
      return true
    }
  }
```

emits选项，用来统一管理虽有自定义事件

也可以在父组件的子组件标签里监听这个自定义事件，监听到了可以设置触发的函数

```
<HelloWorld
    @changeVal="val ++"
  ></HelloWorld>
```

4、父传子

可以在父组件的子组件标签里绑定要传的数据

```vue3 
<HelloWorld
    :val="val"
 ></HelloWorld>
```

然后在子组件里用props选项接收，可以用数组类型接收也可以用对象的形式接收，数据后面判断类型

```
props: {
    val: Number
  }
```

接收好数据之后就可以直接在子组件里使用父组件里的数据了

5、后代传值，在需要传出值的组件用provide，它的一个对象，this不指向实例，加上return就可以用this了

```
provide(){
    return {
      msg: this.msg
    }
```

在需要使用数据的组件使用inject，就可以在标签里直接使用这个数据了

```
inject: ['msg']
```

###### 这种provide和inject不支持响应式

如果需要把provide和inject里的数据变成响应式的：

```
setup() {
    //ref让基础数据类型变为响应式
    let msg = ref(100)
    //reactive让对象/数组 变为响应式
    let author = reactive({
      name: "zj",
      age: 18
    })

    //为后代组件提供msg数据
    provide("msg",msg)
    provide("author",author)

    //让当前组件自己也能用msg
    return {
      msg,author
    }
  }
```

然后在需要使用到数据的组件注入，注入好之后就可以在子组件的标签直接使用了

```
setup(){
    let msg = inject("msg")
    let author = inject("author")
    return {
      msg,author
    }
  }
```

6、mixin全局混入

在main.js，注册好之后就可以在所有的组件里使用这里面的数据了，但是这个数据都是不支持响应式的，如果自身组件里有相同的数据名，已自身的数据优先

```
import {createApp} from 'vue'
import App from './App.vue'
//为所有组件添加选项
createApp(App).mixin({
  data() {
    return {
      goudan: "狗蛋"
    }
  }
}).mount('#app')
```

7、动态组件

component标签里的is就是要渲染的组件名，如果切换组件后，在前一个组件的操作就会清除

```
<component :is="tab"></component>
```

持久化组件

加上了keep-alive标签之后就可以保持状态

```
<keep-alive>
      <component :is="tab"></component>
</keep-alive>
```

8、router

先在views写好需要渲染的页面，然后在router>index.js注册路由

```
{
    //地址栏里面显示的路由地址
    path: '/123456',
    //为路由命名，可以在代码里面通过name来配置路由链接
    name: 'Article',
    //指定当前路由对应的组件是哪一个
    component: () => import('../views/Article')
  },
  {//动态路由
    path: '/user/:id',
    name: 'User',
    component: () => import('../views/User')
  },
  //用于匹配所有没有定义过的路由 -- 404
  {
    path: "/:pathMatch(.*)*",//所有未匹配到的路由
    name: "404",
    component: () => import('../views/404')
  }
```

在需要使用的使用router-link和router-view；如果需要切换连接和视图位置调换，则把标签位置换一下

```
<router-link to="/123456">zj</router-link> 
<router-link :to="{name:'Article'}">文章</router-link>//动态绑定
<router-link :to="{name:'Article',params:{id:{["123,"456]}}">文章</router-link>//动态绑定
<router-view/>
```

9、动态路由：然后在router>index.js注册动态路由

```
{//动态路由
    path: '/user/:id',//在id后也可以加正则匹配规则，例(\d)只有数字才可以
    name: 'User',
    component: () => import('../views/User')
  }
```

```
<router-link to="/user/zj">用户--zj</router-link>
```

$route.params.id就是：/zj

点击链接之后地址就换成：http://localhost:8080/#/user/zj了，等于说是user模板下的子路由，样式直接设置user

404：404的匹配路径放在最后，因为代码从上到下，而404是匹配以上之外的所有路由

```
{
    path: "/:pathMatch(.*)*",//所有未匹配到的路由，pathMatch是自定义的，然后加个正则匹配规则
    name: "404",
    component: () => import('../views/404')
  }
```

10、路由嵌套

先在views写好子路由

然后router>index.js注册路由和子路由

```
{
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin'),
    //子路由
    children: [
      {
        path: 'user',
        component: () => import('../views/admin/AdminUser')
      },
      {
        path: 'article',
        component: () => import('../views/admin/AdminArticle')
      },
      {
        path: 'message',
        component: () => import('../views/admin/AdminMessage')
      }
    ]
  }
```

随后在父路由里写入router-link,再加上router-view，子路由的页面就渲染出来了

```
<template>
  <h1>这是Admin主页</h1>
  <router-link to="/admin/user">用户管理</router-link> |
  <router-link to="/admin/article">文章管理</router-link> |
  <router-link to="/admin/message">留言管理</router-link>
  <router-view></router-view>
</template>
```

10、编程式导航，指通过函数的方式来跳转页面

```
<button @click="fn">点击10次后跳转到首页</button>
```

```
methods: {
    fn(){
      this.num ++

      //判断num是否等于10
      if (this.num >= 10){
        // this.$router.push("/") //指在历史页面里添加一个需要渲染的页面
        // this.$router.replace("/")//指把当前的页面代替成需要渲染的页面，不在历史记录保存
        this.$router.go(-2)//“-”指倒退几步的渲染页面，“+”指前进到第几个页面
      }
    }
  }
```

11、命名视图

在一个组件中需要渲染几个组件的页面，在router>index.js注册路由，在组件里添加上需要渲染的组件

```
{
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      LeftSide: () => import('../views/LeftSide'),
      RightSide: () => import('../views/RightSide')
    }
  }
```

12、重定向：redirect ,指的是不满足条件的时候跳转到指定的路由地址

13、别名：alias，指给路由再定义的其他路由地址，可以定义多个

```
alias: ['/index.html', '/main']
```

14、路由守卫

​		全局守卫

```
//全局路由守卫在router>index.js或者在main.js全局定义
router.beforeEach((to, from) => {
  if (to.meta.admin){

    //这里就可以写鉴权代码，鉴权不通过的话，就return false
    return false
  }

  console.log(to.meta.title)
  document.title = to.meta.title
  //当某些条件不满足的时候，可以阻止路由的跳转
  //return false
})

/*router.afterEach((to, from) => {
  console.log(to);
  console.log(from);
})*/
```

独享守卫：可以写在router>index.js里，但是写在自己的组件里更清晰

```
{
    path: '/admin/:id',
    meta: {
      title: "后台管理页面",
      admin: true
    },
    component: () => import('../views/Admin'),
    /*//路由独享守卫
    beforeEnter(to, from){
      console.log(to);
      console.log(from);
  
      return false
    }*/
  }
```

```
export default {
  name: "Admin",

  beforeRouteEnter(to,from){    //进入前
    console.log("Enter");
    console.log(to);
    console.log(from);

    //enter里面不可以访问 this -- 因为此时组件实例还没有创建
    console.log(this)
  },
  beforeRouteUpdate(to, from){    //更新前
    console.log("Update");
    console.log(to);
    console.log(from);

    console.log(this)
  },
  beforeRouteLeave(to, from){     //离开前
    console.log("Leave");
    console.log(to);
    console.log(from);

    console.log(this)
  }
}
```

15、meta    描述的元数据

```
{
    path: '/admin/:id',
    meta: {
      title: "后台管理页面",
      admin: true
}
router.beforeEach((to, from) => {
  if (to.meta.admin){

    //这里就可以写鉴权代码，鉴权不通过的话，就return false
    return false
  }

  console.log(to.meta.title)
  document.title = to.meta.title
  //当某些条件不满足的时候，可以阻止路由的跳转
  //return false
})
```

16、Vuex    相当于一个全局的数据库

```
import {createStore} from 'vuex'

export default createStore({

  //写数据的，类似于data的写法
  state: {
    name: "如沐",
    age: 18,
    sex: "女",
    company: {
      name: "zj",
      address: "bj",
      tel: "123456"
    }
  },

  //类似于组件中的computed方法
  getters: {
    //第一个形参用于访问state
    Age(state) {
      return state.age + '岁'
    }
  },

  //用来管理数据的更变逻辑 -- 类似于methods
  mutations: {
    addAge(state) {
      state.age++
    },
    /*//不要在mutations里面处理异步事件
    asyncAddAge(state) {
      setTimeout(()=>{
        state.age ++
      },2000)
    }*/
  },

  //用于触发mutations -- 一般在处理异步事件的时候使用
  actions: {
    //第一个形参是上下文context
    asyncAddAge(context) {
      setTimeout(()=>{
        context.commit('addAge')
      },2000)
    }
  },
  modules: {users,goods,company}//可以把每个不相关的数据资料进行打包后导出
})
```

可以在组件里使用$store.state加属性名直接访问，在组件里的方法需要加上this.$store

简写：

```
<script>

import {mapState} from "vuex"

console.log(mapState(['name', 'age']));

export default {
  name: 'Home',
  data(){
    return {
      num: "100",
    }
  },
  // computed: mapState(['name', 'age', 'sex'])
  computed: {
    ...mapState(['name', 'age', 'sex']),

    cNum: function(){
      return this.num + 'px'
    }
  }
}
</script>
```

使用mapState在computed计算选项里把参数取出来就可以在组件里直接用{{name}}等数据了

如果需要直接在组件里使用vuex里的方法 ，那么就需要用到mapMutations

```
<script>
import {mapState, mapMutations, mapActions} from 'vuex'

console.log(mapMutations(['addAge']));

export default {
  name: "Contact",
  computed: {
    ...mapState(['age'])
  },
  methods: {
    ...mapMutations(['addAge']),
    ...mapActions(['asyncAddAge']),

    fn() {
      //可以这样改变 vuex 的数据，但是不允许
      //this.$store.state.age ++

      //直接的触发mutations定义的方法
      // this.$store.commit('addAge')

      // this.addAge()
    }
  }
}
</script>

```



mapState --- data()

getters --- computer

mutations --- methods      

导出了很多数据的时候需要写明你使用的是哪个模块的数据

```
<script>

import {mapState} from 'vuex'

export default {
  name: 'Home',
  computed: {
    //这种需要到打包数据模块的时候加上namespaced: true
    ...mapState('goodModule',['name']),
    ...mapState("companyModule",['name'])
    //不加namespaced: true，那么在组件使用的时候需要加上goodModule，例：goodModule.name
    ...mapState(['goodModule'])
  }
}
</script>
```

如果两个模块里有相同的属性，那么后面的会覆盖前面的









实战：1、

创建文件夹后先格式化 npm init -y

vue add element-plus

引入相对路径的需要：photo: require("../../assets/img/tx1.png")，有写照片格式不支持

```
:style="{

     backgroundImage: `url(${item.photo})`,

    }"
```

样式写了固定宽度后弹性盒模型就不会成效

```
//main.js
import axios from "axios"

app.config.globalProperties.$axios = axios
全局引入，平常就可以用$axios
```



###  js 事件的三阶段     阻止冒泡

- 捕获阶段

- 目标阶段:执行当前对象的事件处理程序

- 冒泡阶段

  js:

  - 阻止事件冒泡： `event.stopPropagation()` 或 `event.cancelBubble = true (IE)`
  - 阻止浏览器默认行为： `event.preventDefault()`

  vue：

  - `@click.stop` : 阻止事件冒泡
  - `@click.prevent` : 阻止事件默认行为
  - `@click.self` : 事件只作用在元素本身，而不是其子元素

