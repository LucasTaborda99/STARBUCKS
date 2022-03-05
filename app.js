// SCROLL SUAVE

// Identificar o clique no menu
// Tudo que começa com jogo da velha em nav-menu ele vai pegar
const menuItens = document.querySelectorAll('#nav-menu a[href^="#"]')
//console.log(menuItens);

// Verificar o item que foi clicado e fazer referência com o alvo
menuItens.forEach(item => {
  item.addEventListener('click', scrollToIdOnClick)
})

// Verificar a distância entre o alvo e o topo
function getScrollTopByHref(element) {
  const id = element.getAttribute('href')
  return document.querySelector(id).offsetTop
}

// Animar o scroll até o alvo
function scrollToIdOnClick(event) {
  event.preventDefault()
  const to = getScrollTopByHref(event.target)

  scrollToPosition(to)
}

// Fazer o scroll suave
function scrollToPosition(to) {
  // Roda em alguns navegadores
  /* window.scroll({
    top: to,
    behavior: 'smooth'
  })*/
  smoothScrollTo(0, to, 800)
}

// Função já pronta para funcionar o smooth no scroll suave em todos os navegadores
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset
  const startY = window.scrollY || window.pageYOffset
  const distanceX = endX - startX
  const distanceY = endY - startY
  const startTime = new Date().getTime()

  duration = typeof duration !== 'undefined' ? duration : 400

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from
  }

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime
    const newX = easeInOutQuart(time, startX, distanceX, duration)
    const newY = easeInOutQuart(time, startY, distanceY, duration)
    if (time >= duration) {
      clearInterval(timer)
    }
    window.scroll(newX, newY)
  }, 1000 / 60) // 60 fps
}
