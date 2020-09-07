interface loadingInterface {
  loadingFun: any;
  errorFunc?: Function;
  isConsole?: boolean
}

/**
 * loadingFun 接收一个loading类需要包含init close方法
 */
export default ({loadingFun, errorFunc, isConsole}: loadingInterface) => (target: any, key: PropertyKey, descriptor: PropertyDescriptor & ThisType<any>): any => {
  const method = descriptor.value
  descriptor.value = async function(...args: any) {
    loadingFun.init()
    try {
      await method.apply(this, args)
    } catch (error) {
      if (errorFunc) {
        errorFunc(error)
      }
      if (isConsole) {
        console.error(error)
      }
    } finally {
      loadingFun.close()
    }
  }
}
