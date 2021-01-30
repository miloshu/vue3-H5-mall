// 设置 rem 函数
function resetFontSize() {
  // 获取屏幕的宽度  // 320 默认大小16px; 320px = 20rem; 每个元素px基础上/16
  let windowW = document.documentElement.clientWidth
  // 是以iphone5作为参考
  let scale = windowW / 320
  let newSize = 10 * scale
  console.log(newSize, 'fontSize')
  document.getElementsByTagName('html')[0].style.fontSize = newSize + 'px'
}
// 初始化
resetFontSize()
// 当浏览器大小更新
window.addEventListener('resize', resetFontSize, false)

