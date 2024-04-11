class Math {
  static sum(a, b) {
    return a + b
  }

  static diff(a, b) {
    return a - b
  }

  static sumArray(array) {
    return array.reduce((x, y) => x + y)
  }
}

module.exports = Math