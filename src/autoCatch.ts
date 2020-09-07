interface OptionsInterface {
  type: string;
  message?: string
}

const errorCatch: {
  [key: string]: any
} = {
  error: (error: any, message: string) => console.error(`${error} Message: ${message || '没有详细描述信息'}`),
  warn: (error: any, message: string) => console.warn(`${error} Message: ${message || '没有详细描述信息'}`),
  log: (error: any, message: string) => console.log(`${error} Message: ${message || '没有详细描述信息'}`)
}

const defaultCatch = (error: any, errorFunc?: (error: any) => void, options: OptionsInterface = {type: 'error'}): any => {
  if (errorFunc) {
    return errorFunc(error)
  }
  return errorCatch[options.type](error, options.message || '')
}
 
export default ({
  errorFunc,
  options
}: {errorFunc?: (error: any) => void, options?: OptionsInterface}) => (target: any, key: PropertyKey, descriptor: PropertyDescriptor & ThisType<any>): any => {
  const method = descriptor.value
  descriptor.value = async function(...args: any) {
    try {
      await method.apply(this, args)
    } catch (error) {
      defaultCatch(error, errorFunc, options)
    }
  }
}
