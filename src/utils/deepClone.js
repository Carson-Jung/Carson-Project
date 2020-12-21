export function deepClone (target, map = new Map()) {
  if (target instanceof Array || (target !== null && typeof target === 'object')) {
    // map中存在对应的克隆对象,直接将其返回
    let cloneTarget = map.get(target)
    if (cloneTarget) {
      return cloneTarget // 不要对同一个对象进行多次clone
    }
    // 创建克隆对象
    if (target instanceof Array) {
      cloneTarget = []
      // 保存到map容器
      map.set(target, cloneTarget)
      // 向数组添加元素
      target.forEach((item, index) => {
        cloneTarget[index] = deepClone(item, map)
      })
    } else {
      cloneTarget = {}
      // 保存到map容器
      map.set(target, cloneTarget)
      // 向对象添加属性
      for (const key in target) {
        if (target.hasOwnProperty(key)) {
          cloneTarget[key] = deepClone(target[key], map) // 对属性值进行递归处理
        }
      }
    }
    return cloneTarget
  } else {
    return target
  }
}
