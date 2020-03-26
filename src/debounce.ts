const debounce = (fn: Function, rateTime: number) => {
  let timer: any = null
  return function () {
    // 通过this 和 arguments获取函数的作用域和变量
    const args = arguments
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, rateTime)
  }
}

export default (wait = 300) => (target: any, key: PropertyKey, descriptor: PropertyDescriptor & ThisType<any>): any => {
  descriptor.value = debounce(descriptor.value, wait)
}