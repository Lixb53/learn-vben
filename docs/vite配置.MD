## Vite的loadEnv方法
- 检查process.cwd()路径下.env.development.local、.env.development、.env.local、.env这四个环境文件。
- 输出NODE_ENV和VITE_开头的键值对。
- VITE_开头的键值对后面的不会覆盖前面的。
- NODE_ENV的值后面的会覆盖前面的。
loadEnv方法返回根目录下.env对应环境的配置

## vben中的wrapperEnv方法
> loadEnv读取的布尔类型是一个字符串。该函数可以转换为布尔类型

## utils文件夹关联依赖
```
yarn add lodash-es moment crypto-js vue-types
yarn add @types/lodash-es @types/crypto-js --dev
```

- [lodash-es的npm首页](https://www.npmjs.com/package/lodash-es)：JS好用的函数集
- [crypto-js的npm首页](https://www.npmjs.com/package/crypto-js)：加密库
- [moment中文官网](http://momentjs.cn/)
- [vue-types的npm首页](https://www.npmjs.com/package/vue-types)：vue-types是受React启发的Vue.js组件的可配置prop类型定义的集合prop-types

- auth/index.ts
> 这个工具类封装了认证相关的设置和获取方法
- cache/inde.ts
> 这个文件提供了一些方便我们创建 （操作Storage的类） 的方法
- cache/memory.ts
> 这个类定义Memory的数据结构和内部的操作方法。
- cache\persistent.ts
> 这个文件提供了外界操作Storage和Memory的方法
- cache\storageCache.ts
> 这个类封装了对Storage的操作。
- event\index.t
> 这个工具类主要监听元素大小变化的工具类。
- factory\createAsyncComponent.tsx
> 这个组件主要是用来动态创建组件使用的。
- file\*.ts
> 这个工具类还是挺实用，操作文件的一些工具方法


## build文件夹下typeing.d.ts文件
> 允许导入Json  这段代码，写在哪都行。TS都会加载到
[TS通用模块声明](https://www.typescriptlang.org/docs/handbook/modules.html#wildcard-module-declarations)
[TS的高级类型Record](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeystype)

## vite配置
> build/vite文件夹下放置所有和vite配置有关的文件
- server.proxy: createProxy()
> build/vite/proxy.ts   将二维数组格式的信息转换成一下格式
```
// 字符串简写写法
'/foo': 'http://localhost:4567/foo',
// 选项写法
'/api': {
  target: 'http://jsonplaceholder.typicode.com',
  changeOrigin: true,
  rewrite: (path) => path.replace(/^\/api/, '')
},
// 正则表达式写法
'^/fallback/.*': {
  target: 'http://jsonplaceholder.typicode.com',
  changeOrigin: true,
  rewrite: (path) => path.replace(/^\/fallback/, '')
}
```
- server.hmr
> 这个就是配置Vite的热更新的   设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层。
- build.minify
> 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认为 Terser，虽然 Terser 相对较慢，但大多数情况下构建后的文件体积更小。ESbuild 最小化混淆更快但构建后的文件相对更大。
- build.polyfillDynamicImport
> 是否自动注入动态导入polyfill。
polyfill会自动注入到每个index.html条目的代理模块中。如果通过build.rollupOptions.input配置成使用非html的自定义条目，那么就需要手动导入自定义条目中的polyfill
Vite使用ES动态导入作为代码分割点。生成的代码还将使用动态导入来加载异步块。然而，本机ESM动态导入支持是在ESM之后通过脚本标记实现的，并且这两个特性在浏览器支持方面存在差异。Vite会自动注入一个轻量级的动态导入填充来消除这种差异
- build.terserOptions
> 传递给 Terser 的更多 [minify 选项](https://terser.org/docs/api-reference#minify-options)。
- build.brotliSize
> 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
- build.chunkSizeWarningLimit
> chunk 大小警告的限制（以 kbs 为单位）。
> 类似功能: [LimitChunkCountPlugin](https://webpack.js.org/plugins/limit-chunk-count-plugin/)
在编写代码时，您可能已经添加了许多代码拆分点以按需加载内容。编译后，您可能会注意到一些块太小了-造成更大的HTTP开销。LimitChunkCountPlugin可以通过合并来对您的块进行后处理。
- [css.preprocessorOptions](https://www.pipipi.net/vite/config/#css-preprocessoroptions)
> 指定传递给 CSS 预处理器的选项
### less配置
[lessjs-配置项](http://lesscss.org/usage/#less-options)
src\design文件夹中定义了VbenAdmin所有 全局样式 和 全局less变量 。其中分为两大类：
src\design\index.less：全局样式，在main.ts中使用。
src\design\config.less：全局变量，在vite.config.ts中使用。
至于该文件夹下的其他文件，都被直接或间接的引入到了index.less、config.less中。
### vite颜色
[Ant Design Colors首页](https://ant.design/docs/spec/colors)

- plugins
> 将要用到的插件数组  由于项目使用的vite插件。数量大，所以提取到build/vite/plugin单独管理
- [optimizeDeps.include](https://cn.vitejs.dev/config/#optimizedeps-exclude)
> 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。

- http-server
项目编译之后的静态文件是不能直接本地访问的。因为本地访问使用的是file:///协议。而file:///不支持跨域和一些其他特性。比如JavaScript模块、PWA等等。
那么此时就需要换一种访问本地文件的方式了，就是让本地成为一个服务器。通过http来访问。
http-server就可以实现以http形式访问本地文件的目的，但是这个依赖不保证安全，只用于本地测试。
http-server的npm首页：命令行启动一个本地服务器。不安全，但是可以用来测试
> 直接配置脚本命令使用 
```test:gzip: "http-server dist --cors --gzip -c-1"```



### vite插件
> build/vite/plugin 下配置
- @vitejs-plugin-legacy
> Vite默认的浏览器支持基线是原生ESM。该插件为不支持原生ESM的传统浏览器提供支持
- vite-plugin-html
> 一个为index.html提供minify和基于EJS模板功能的Vite插件。
- [vite-plugin-svg-icon](#安装使用svg)
> 用于生成 svg 雪碧图.
- [vite-plugin-mock](https://www.npmjs.com/package/vite-plugin-mock)
>vite 的数据模拟插件，是基于 vite.js 开发的。 并同时支持本地环境和生产环境。 Connect 服务中间件在本地使用，mockjs 在生产环境中使用。[配置](#mock)
- [vite-plugin-purge-icons](https://www.npmjs.com/package/vite-plugin-purge-icons)
> 将我们所使用的Iconify图标都已html的dom节点形式保存在html中，这样我们就可以不发送http请求就可以使用图标了[配置](#iconify图标使用)
- [vite-plugin-style-import](https://www.npmjs.com/package/vite-plugin-style-import)
> 该插件可按需导入组件库样式，由于 vite 本身已按需导入了组件库，因此仅样式不是按需导入的，因此只需按需导入样式即可。
- [rollup-plugin-visualizer](https://www.npmjs.com/package/rollup-plugin-visualizer)
> 依赖分析插件  yarn add rollup-plugin-visualizer @types/rollup-plugin-visualizer --dev
- [vite-plugin-theme](https://www.npmjs.com/package/vite-plugin-theme)
> 用于动态更改界面主题色的 vite 插件。
- [vite-plugin-imagemin](https://www.npmjs.com/package/vite-plugin-imagemin)
> 一个压缩图片资源的vite插件
- [vite-plugin-compression](https://www.npmjs.com/package/vite-plugin-compression)
> vite-plugin-compress的增强版, 压缩用的
- [vite-plugin-pwa](https://www.npmjs.com/package/vite-plugin-pwa)
> PWA一些技术集成


### 动态配置环境变量
> 当打包完项目之后，项目的环境变量就不可以变了。此时如果想修改一下项目的基础API路径，那么需要修改.env文件，然后再次打包一遍。这么做很麻烦。所以VbenAdmin将环境变量抽离出来。当项目打包完成之后，如果想修改环境变量，那么可以直接修改dist包下的_app.config.js文件。 以下实现
**编写生成配置文件的程序**
> build/script/buildConf.ts
- 安装fs-extra
```yarn add fs-extra @types/fs-extra --dev```
> [fs-extra的npm首页](https://www.npmjs.com/package/fs-extra)  fs-extra添加本机fs模块中未包含的文件系统方法。
[Node-Api-fs](http://nodejs.cn/api/fs.html)
- chalk
> [chalk](https://www.npmjs.com/package/chalk)是一个颜色的插件。可以通过chalk.blue(‘hello world’)来改变颜色
**编写脚本触发文件**
> build/script/postBuild.ts
- 安装yargs
```yarn add yargs @types/yargs -D```
> [yargs](https://www.npmjs.com/package/yargs)：读取你执行的命令行命令中的参数选项。
- 安装esno
> [esno](https://www.npmjs.com/package/esno): 命令行执行一个TS文件  编写脚本命令时使用
```yarn add esno -D```
- 安装croll-env
> cross-env这是一款运行跨平台设置和使用环境变量的脚本。
```yarn add cross-env -D```

### 安装使用svg
```yarn add vite-plugin-svg-icons -D```
- 创建配置
> build\vite\plugin\svgSprite.ts
- 添加配置
> build\vite\plugin\index.ts
- main.ts导入
> src/main.ts
```import 'vite-plugin-svg-icons/register';```
- 创建Svg组件
> src\components\Icon\src\SvgIcon.vue

### mock
- mock\_util.ts：里面封装的是数据请求结构类型。
- mock\_createProductionServer.ts：用于配置生产环境动态Mock的js文件，文档中有说。
- 其他的：都是Mock用例。每一个js、ts。都要默认导出一个MockMethod类型的数组。每一项MockMethod就是拦截的一个方法。MockMethod的response对应方法的return将会被Mock实例处理。也就是说，你可以在return的对象中使用Mock规则

### iconify图标使用
```base
yarn add @iconify/iconify
yarn add vite-plugin-purge-icons @iconify/json --dev
```
- 插件配置
>build\vite\plugin\index.ts引入purgeIcons()即可
- 脚本配置
> 生成图标脚本只是将指定模块的图标的icon名字输出，方便图标选择器选择图标使用的。也就是说，就算你不生成图标也是可以使用图标的。
```yarn add @purge-icons/generated inquirer @types/inquirer -D```
[inquirer的npm首页](https://www.npmjs.com/package/inquirer)
[@purge-icons/generated的npm首页](https://www.npmjs.com/package/@purge-icons/generated)
- 编写图标生成JS
> [fs.ensureDir()方法](https://github.com/jprichardson/node-fs-extra/blob/HEAD/docs/ensureDir.md)
- 编写脚本
> 目前只是生成图标Key的集合，没有图标组件和图标选择组件，这些工作都还只是铺垫。
```"gen:icon": "esno ./build/generate/icon/index.ts"```