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
