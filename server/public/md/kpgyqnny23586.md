# 脚手架

[Vue CLI 官方指南](https://cli.vuejs.org/zh/guide/)

## 1. 使用脚手架

### 1.1 介绍

- 什么是脚手架

  > 脚手架是为了保证各施工过程顺利进行而搭设的工作平台。

  ![](https://bkimg.cdn.bcebos.com/pic/c995d143ad4bd1138349792958afa40f4bfb0521?x-bce-process=image/watermark,image_d2F0ZXIvYmFpa2U5Mg==,g_7,xp_5,yp_5)

- `Vue CLI`

  `Vue CLI`是一个Vue项目的脚手架。

  类似的，`Vue CLI`的作用就是为Vue项目提供一套完整的项目基础架构，我们可以通过它来对项目**进行各种配置**、**安装插件扩展**…

  甚至，它还有一套完全图形化的创建和管理 Vue.js 项目的用户界面，允许我们直接通过界面UI来对项目进行管理。

  这样，我们可以专注在撰写应用上，而不必花好几天去纠结配置的问题。

### 1.2 安装

使用 `npm i -g @vue/cli` 进行安装。

> 后续课程内容以 npm 命令为主，如果习惯使用 yarn 命令，可参考[官方文档](https://cli.vuejs.org/zh/guide/installation.html)

安装之后，你就可以在命令行中访问 `vue` 命令。你可以通过简单运行 `vue`，看看是否展示出了一份所有可用命令的帮助信息，来验证它是否安装成功。

如需**升级**，使用`npm update -g @vue/cli`。

### 1.3 搭建

- **创建一个项目**

  运行以下命令来创建一个项目：

  `vue create project-name`

  > 阅读后续内容时，请注意`Vue CLI`版本，如发现安装的版本与该教案演示版本不同时，请参照[官方文档](https://cli.vuejs.org/zh/guide/installation.html)查阅操作上是否有差别。

  你会得到一个选择预设项preset的命令窗：

  ![](https://static.zzhitong.com/lesson-files/vue/img/5-1.png)

  `2.x`或`3.x`的选项能让你快速的搭建一个新项目原型，而手动选择则提供更多的选项。项目开发中推荐选择**手动配置**。

  **如果选择手动配置**，步骤如下：

  1. 选择各个配置

     **（按 空格键 选择！按 回车键 确认！）**

     ![](https://static.zzhitong.com/lesson-files/vue/img/5-2.png)

     > 初次接触脚手架时，请选择和演示图一样的选项。对脚手架及各个功能有一定的了解后，再根据自身需求选择。

  2. 选择Vue版本

     `Choose a version of Vue.js ...`

     选择需要的Vue.js版本。

  3. 路由模式

     `Use history mode for router?`

     此处询问是否使用`history`路由模式，输入`Y`。

     路由模式会在后续章节介绍。

  4. 选择css预处理器

     `Pick a CSS pre-processor`

     选择一个你喜欢的css预处理器。

  5. 各配置项的位置

     `Where do you prefer placing config for ...`

     此处询问各个插件的配置项放在哪里，推荐`In package.json`。

  6. 是否保存配置

     `Save this as a preset for future projects?`

     此处询问是否保存你自己选择的这个配置项。保存后，后续创建脚手架项目就可以使用这个配置项快速生成。

     输入`y`，继续输入配置项名字即可。

     > ~/.vuerc
     >
     > 被保存的 preset 将会存在用户的 home 目录下一个名为 `.vuerc` 的 JSON 文件里。如果你想要修改被保存的 preset / 选项，可以编辑这个文件。

  上述流程完成后，进入创建的目录，再启动服务即可在浏览器访问对应端口看到脚手架基础模板。

  - 进入目录`cd project-name`
- 启动服务`npm run serve`
  
- **文件目录结构**

  - `node_modules` 项目依赖
  - `public` 
    - `favicon.ico` 图标文件
    - `index.html` 初始html模板
  - `src`
    - `assets` 静态资源，与public不同的是引入方式不同，且这里的资源可以被webpack打包
    - `components` 放置组件的文件夹，里面方式各个`.vue`文件
    - `App.vue` 根组件
    - `main.js`  总配置入口文件
  - `babel.config.js` babel配置文件
  - `package.json`
  - `package-lock.json`

- **通过UI来创建/管理项目**

  你也可以通过 `vue ui` 命令以图形化界面创建和管理项目：

  上述命令会打开一个浏览器窗口，并以图形化界面将你引导至项目创建的流程。

  > 如果你不太喜欢使用命令行工具，完全可以使用 UI 界面来代替上述3.1的创建过程

- **插件与依赖**

  使用`vue add`命令（或者UI界面）来为项目添加插件/依赖。

  **插件**一般是为脚手架提供一些功能，大部分以`@vue/cli`为前缀。

  **依赖**就是项目中使用到的各种包，分为开发依赖和运行依赖。

## 2. 脚手架中的组件

### 2.1 组件结构

基于脚手架开发时，每一个单独的 `.vue` 文件就是一个组件。该文件中可以由三个部分组成：

- `template`标签 -- 用于放置DOM结构
- `script`标签 -- 用于放置js代码与实例配置
- `style`标签 -- 用于方式css样式代码

### 2.2 引入子组件

示例：

```vue
<template>
  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
```

1. 通过 `import xx from "xx/xx.vue"` 引入
2. 在配置中使用 `components` 选项注册
3. 在DOM中使用对应的标签调用子组件

## 3. 组件传值

### 3.1 父子传值

父组件向子组件传值示例：

```vue
<!--父组件-->
<template>
  <ChildComponent :val = "msg"></ChildComponent>
</template>

<script>
import ChildComponent from "@/components/ChildComponent";
export default {
  data(){
    return {
      msg: "Something..."
    }
  },
  components: {ChildComponent}
}
</script>
```

```vue
<!--子组件-->
<template>
  <div>
    {{ val }}
  </div>
</template>

<script>
export default {
  props: ["val"]
}
</script>
```

父组件中使用**标签属性的形式**传递数据给子组件，子组件使用`props`选项来接收父组件传过来的数据。

> 注意：props的形式是单向的，父级对应数据的更新会下流到子组件中，而子级的更新不会回流到父级。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

> 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身**将会**影响到父组件的状态。

我们可以为组件的 prop 指定验证要求，例如你知道的这些类型。如果有一个需求没有被满足，则 Vue 会在浏览器控制台中警告你。这在开发一个会被别人用到的组件时尤其有帮助。

为了定制 prop 的验证方式，你可以为 `props` 中的值提供一个带有验证需求的对象，而不是一个字符串数组。

```json
props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
        type: String,
        required: true
    },
    // 带有默认值的数字
    propD: {
        type: Number,
        default: 100
    },
    // 带有默认值的对象
    propE: {
        type: Object,
        // 对象或数组默认值必须从一个工厂函数获取
        default: function() {
            return { message: 'hello' }
        }
    },
    // 自定义验证函数
    propF: {
        validator: function(value) {
            // 这个值必须匹配下列字符串中的一个
            return ['success', 'warning', 'danger'].indexOf(value) !== -1
        }
    },
    // 具有默认值的函数
    propG: {
        type: Function,
        // 与对象或数组默认值不同，这不是一个工厂函数 —— 这是一个用作默认值的函数
        default: function() {
            return 'Default function'
        }
    }
}
```

### 3.2 子父传值

要从子组件中传输数据给父组件，可以通过**自定义事件**完成：

```vue
<!--子组件-->
<template>
  <button @click="fn">子级按钮</button>
</template>

<script>
export default {
  methods: {
    fn() {
      this.$emit("myEvent")
    }
  }
}
</script>
```

```vue
<!--父组件-->
<template>
  <p>父级值:{{msg}}</p>
  <ChildComponent @myEvent="msg ++"></ChildComponent>
</template>

<script>
import ChildComponent from "@/components/ChildComponent";
export default {
  data(){
    return {
      msg: 10
    }
  },
  components: {
    ChildComponent
  }
}
</script>
```

子组件中可以使用 `emits` 选项定义已发出的事件，这样做可以更好的记录组件应该如何工作，同时也可以对对应的事件添加事件验证：

```json
emits: {
    // 没有验证
    click: null,

    // 验证submit 事件
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
}
```

### 3.3 向后代组件传值

向子组件传值时，可以使用`props`。而如果需要向层次更深的后代组件传值时，如果继续使用`props`，需要逐级一层一层传递，非常的麻烦。

此时我们可以使用一对 `provide` 和 `inject`。无论组件层次结构有多深，父组件都可以作为其所有子组件的依赖提供者。这个特性有两个部分：父组件有一个 `provide` 选项来提供数据，子组件有一个 `inject` 选项来开始使用这些数据。

![](https://v3.cn.vuejs.org/images/components_provide.png)

- 基础传值（非响应式）

  ```json
  //父组件
  export default {
    data() {
      return {
        msg: 10
      }
    },
    provide() {
      return {
        msg: this.msg
      }
    }
  }
  ```

  ```json
  //后代组件
  inject: ['msg']
  ```

- 响应式传值

  如果需要该值响应式的传递，则需要显示的引入`import {provideref,ref,reactive} from "vue"`，然后借助 `setup` 选项：

  ```json
  //父组件
  setup() {
      //处理响应式的基础类型
      let msg = ref(10)
      //处理响应式的对象或数组
      let author = reactive({
        name: "Fly",
        age: 20
      })
      provide("msg",msg)
  	provide("author",author)
  	//组件本身需要使用值时，需要返回
  	return {msg, author}
  }
  ```

  ```json
  //后代组件
  setup() {
      const msg = inject("msg")
      const author = inject("author")
  	//返回的值可以当做数据使用
      return {msg, author}
  }
  ```


## 4. mixin

### 4.1 基础

`mixin`对象中可以包含任意组件选项，当组件使用 mixin 对象时，所有 mixin 对象的选项将被“混合”进入该组件本身的选项。

```js
//mixin.js
export default {
  data() {
    return {
      num: 1
    }
  },
  methods: {
    addNum() {
      this.num ++
    }
  }
}
```

```vue
<!--组件引入-->
<template>
  <h2>{{num}}</h2>
  <button @click="addNum">按钮</button>
</template>

<script>
import myMixin from "@/myMixin";
export default {
  mixins: [myMixin]
}
</script>
```

### 4.2 选项合并

当组件和 mixin 对象含有同名选项时，这些选项将以恰当的方式进行“合并”。

+ 数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
+ 同名钩子函数将合并为一个数组，因此都将被调用。另外，mixin 对象的钩子将在组件自身钩子**之前**调用。
+ 值为对象的选项，例如 `methods`、`components` 和 `directives`，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

### 4.3 全局混入

`mixin`可以全局注入，也就是为当前应用所有的组件都注入。使用时请格外小心！

```js
//main.js
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mixin({
  data(){
    return {
      globalMsg: "Hello Vue!"
    }
  }
}).mount('#app')
```

















