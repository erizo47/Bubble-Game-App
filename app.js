const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')

let score = 0
let time = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame() {
    setInterval(descreaseTime, 1000)
    setTimeout(time)
    createRandomCircle()
}

function descreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let currentTime = --time
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }
        setTime(currentTime)
    }
}
function setTime (value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<div class='finish-game'><h1>Ваш счёт: <span class='primary'>${score}</span></h1><a class='play-again'>Нажмите чтобы сыграть ещё раз</a></div>`
    board.addEventListener('click', ()=> {
        playAgain()
    })
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 40)
    const {width, height} = board.getBoundingClientRect()

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    const color1 = getRandomNumber(0, 250)
    const color2 = getRandomNumber(0, 250)
    const color3 = getRandomNumber(0, 250)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = `rgb(${color1}, ${color2}, ${color3})`
    circle.style.boxShadow = `0 0 2px rgb(${color1}, ${color2}, ${color3}), 0 0 5px rgb(${color1}, ${color2}, ${color3})`
    board.append(circle)
}
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function playAgain() {
    window.location.reload()
}

function winGame() {
    function kill() {
        const circle = document.querySelector('.circle')
            if (circle) {
                circle.click()
            }
    }
    setInterval(kill, getRandomNumber(20, 150))
}

const winSwitch = document.querySelector('.win-switch')

winSwitch.addEventListener('click', () => {
    winSwitch.style.opacity = '0'
    winGame()
})