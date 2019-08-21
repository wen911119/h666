export const number = value => {
  if (value && typeof value !== 'number') {
    return '必须是数字'
  }
}

export const string = value => {
  if (value && typeof value !== 'string') {
    return '必须是文字'
  }
}

export const required = value => {
  if (Array.isArray(value)) return value.length > 0 ? undefined : '必填'
  return value ? undefined : '必填'
}

// 这个通过受控的input实现
export const int = num => {
  if (num && num % 1 !== 0) {
    return '必须是整数'
  }
}

export const min = minNum => num => {
  if (num && num < minNum) {
    return `必须大于等于${minNum}`
  }
}

export const max = maxNum => num => {
  if (num && num > maxNum) {
    return `必须小于等于${maxNum}`
  }
}

export const range = (minNum, maxNum) => num => {
  if (num && (num < minNum || num > maxNum)) {
    return `必须填写${minNum}~${maxNum}范围内的数值`
  }
}

export const minLenght = length => str => {
  if (str && str.length < minLenght) {
    return `字数必须大于等于${minLenght}`
  }
}

export const maxLenght = length => str => {
  if (str && str.length > maxLenght) {
    return `字数必须小于等于${maxLenght}`
  }
}
