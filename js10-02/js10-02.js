//Задание 2.
//Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 

const btn = document.querySelector(".button")

btn.addEventListener('click', () => {
  alert (`Ширина экрана (браузера) - ${window.innerWidth}px, высота - ${window.innerHeight}px`)
  alert (`Ширина экрана (монитора) - ${window.screen.width}px, высота - ${window.screen.height}px`)
})