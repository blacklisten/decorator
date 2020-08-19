
const throttle = (fn:Function, rateTime:number) => {
  let prev = Date.now() - rateTime
  return (...args:any[]) => {
    if(Date.now() - prev >= rateTime){
      fn.apply(this, args)
      prev = Date.now()
    }
  }
}

export default (wait = 300) => (target: any, key: PropertyKey, descriptor: PropertyDescriptor & ThisType<any>): any => {
  descriptor.value = throttle(descriptor.value, wait)
}
