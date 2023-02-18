/*
w = flag determining if pageYOffset was 0 before trying scroll below it
h = last pageYOffset
*/

export const disablePageRefreshFacility = () => {
  let w: any
  let h = 0
  document.addEventListener(
    'touchstart',
    function (e) {
      if (e.touches.length != 1) return
      h = e.touches[0].clientY
      w = window.pageYOffset === 0

      // testLabel is DOM element just to show the current pageYOffset - for test
      //testLabel.innerHTML=window.pageYOffset;
    },
    false
  )
  document.addEventListener(
    'touchmove',
    function (e) {
      let y = e.touches[0].clientY,
        d = y - h
      h = y
      if (w) {
        w = 0
        if (d > 0) return e.preventDefault()
      }
      if (window.pageYOffset === 0 && d > 0) return e.preventDefault()
    },
    false
  )
}
