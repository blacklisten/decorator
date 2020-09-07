# va-decorator

自定义的一些构造器

**安装**

```shell
npm install va-decorator --save
yarn add va-decorator --save
```

**使用**

```js
import { Debounce, Throttle, AutoCatch, Loading } from 'va-decorator';
```

## AutoCatch

为`Function`自动添加`**try catch**`，拥有三种模式，更灵活的定义

**参数**

```ts
interface OptionsInterface {
  type: string; // default error
  message?: string // default 没有详细描述信息
}

{
  errorFunc?: (error: any) => void, 
  options?: OptionsInterface
}
```

**使用**

1. 自定义`Function`

```ts
@AutoCatch({
  errorFunc: (error) => {
    console.error(error, 'errorFunc');
  },
})
```

2. 自定义`options`

```ts
/**
 * type: error(default)、warn、log
 */
@AutoCatch({
  options: {
    type: 'warn',
    message: 'options',
  },
})
```

3. default

```ts
/**
 * 默认情况下，将没有自定义message输出，默认使用options模式
 * message: 没有详细描述信息  (default)
 */
@AutoCatch({})
```

## Loading

loading构造器，传入一个`class`实例，需要拥有`init`、`close`方法

**参数**

```ts
interface loadingInterface {
  loadingFun: any;
  errorFunc?: Function; // 自定义输出方法
  isConsole?: boolean // 是否使用默认console  默认为error
}
{ loadingFun, errorFunc, isConsole }: loadingInterface
```

**使用**

已`Element-ui`为例

loading class

```ts
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/loading.css';
import 'element-ui/lib/theme-chalk/icon.css';
import { LoadingServiceOptions, ElLoadingComponent } from 'element-ui/types/loading';
import Vue from 'vue';

export default class LoadingInstance extends Vue {
  public loadingInstance: ElLoadingComponent | undefined;
  public options: LoadingServiceOptions = {
    fullscreen: true,
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  };
  constructor(options?: LoadingServiceOptions) {
    super();
    if (options) {
      this.options = options;
    }
  }
  public init() {
    this.loadingInstance = Loading.service(this.options);
  }
  public close() {
    this.$nextTick(() => {
      this.loadingInstance?.close();
    });
  }
}
```

```ts
import LoadingInstance from './loading';
const loading = new LoadingInstance();

@Loading({loadingFun: loading})

@Loading({
  loadingFun: loading,
  errorFunc: (error: any) => {
    console.error(error + 'loading errorFun');
  },
})
```

## Debounce

防抖

**参数**

```js
wait = 300 // default 300
```

**使用**

```ts
@Debounce()
@Debounce(5000)
```

## Throttle

节流

**参数**

```js
wait = 300 // default 300
```

**使用**

```js
@Throttle()
@Throttle(5000)
```

## FAQ

1. 'this' implicitly has type 'any' because it does not have a type annotation. tsconfig.json =>  "noImplicitThis": false

2. 当@Loading与@AutoCatch同时使用，只会调用后者的catch

```ts
/**
 * 当使用多个装饰器时，catch只存在一个
 */
@Loading({
  loadingFun: loading,
  errorFunc: (error: any) => {
    console.error(error + 'loading errorFun');
  },
})
@AutoCatch({
  options: {
    type: 'warn',
    message: 'options',
  },
})
```

## 示例

[example](https://github.com/blacklisten/decorator/tree/develop/example)
