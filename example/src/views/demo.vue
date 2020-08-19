<template>
  <div>
    <ul class="decorator">
      <li>
        <div>
          <h3>AutoCatch 自动捕获异常</h3>
          <p>AutoCatch errorFunc 传入自定义方法</p>
          <p>AutoCatch options 传入自定义type message</p>
          <p>AutoCatch default 默认</p>
        </div>
        <button @click="autoCatch_errorFunc">AutoCatch errorFunc</button>
        <button @click="autoCatch_options">AutoCatch options</button>
        <button @click="autoCatch_default">AutoCatch default</button>
      </li>
      <li>
        <h3>Debounce 防抖</h3>
        <p>在一段时间内，函数只会被调用一次。</p>
        <button @click="debounce_fun">Debounce</button>
      </li>
      <li>
        <h3>Throttle 节流</h3>
        <p>在 wait 秒内最多执行一次函数</p>
        <button @click="throttle_fun">Throttle</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Debounce, Throttle, AutoCatch, Loading } from 'va-decorator';
import LoadingInstance from './loading';

const wrapper = () => {
  return new Promise((resolve, reject) => {
    const clearTime = setTimeout(() => {
      if (Math.random() < 0.2) {
        resolve({
          name: 'Hello Decorator',
        });
      } else {
        reject(new Error('这是一个错误!!!'));
      }
      clearTimeout(clearTime)
    }, 1000);
  });
};
const loading = new LoadingInstance();

@Component({
})
export default class Demo extends Vue {
  @Loading({loadingFun: loading})
  @AutoCatch({
    errorFunc: (error) => {
      console.error(error, 'errorFunc');
    },
  })
  private async autoCatch_errorFunc() {
    const data = await wrapper();
    console.log('收到数据：', data);
  }
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
  private async autoCatch_options() {
    const data = await wrapper();
    console.log('收到数据：', data);
  }
  @AutoCatch({})
  private async autoCatch_default() {
    const data = await wrapper();
    console.log('收到数据：', data);
  }
  @Debounce()
  private debounce_fun() {
    console.log('debounce');
  }
  @Throttle(1000)
  private throttle_fun() {
    console.log('throttle');
  }
}
</script>

<style lang="scss">
.decorator {
  list-style: none;
}
</style>
