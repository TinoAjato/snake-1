let scoreBlock
let score = 0
let blockFlag = false
let speedBlock

const config = {
	sizeCell: 16,
	sizeBerry: 16 / 4,
	speed: 200
}

const snake = {
	x: 16,
	y: 16,
	dx: config.sizeCell,
	dy: 0,
	tails: [],
	maxTails: 3,
	speed: config.speed
}

let berry = {
	x: 0,
	y: 0,
	acceleration: 1.5
}

function incScore() {
	score++
	drawScore()
}

function drawScore() {
	scoreBlock.innerHTML = score
}

function _speed() {
	speedBlock.innerHTML = 'delay = ' + snake.speed
}


function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}


let canvas = document.querySelector('#game-canvas')
let context = canvas.getContext('2d')

scoreBlock = document.querySelector('.game-score .score-count')
speedBlock = document.querySelector('.speed')

drawScore()

let mSecondsPassed = 0
let oldTimeStamp = 0

function gameLoop(timeStamp) {

	mSecondsPassed = (timeStamp - oldTimeStamp)
	mSecondsPassed = Math.min(mSecondsPassed, snake.speed)

	if (mSecondsPassed < snake.speed) {
	  requestAnimationFrame(gameLoop)
	  return
	}

	oldTimeStamp = timeStamp

	blockFlag = false

	_speed()

	context.clearRect(0, 0, canvas.width, canvas.height)

	drawBerry()
	drawSnake()

	requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)

function randomPositionBerry() {
	berry.x = getRandomInt(0, canvas.width / config.sizeCell) * config.sizeCell
	berry.y = getRandomInt(0, canvas.height / config.sizeCell) * config.sizeCell
}

function drawSnake() {

	snake.x += snake.dx
	snake.y += snake.dy

	collisionBorder()

	snake.tails.unshift({x: snake.x, y: snake.y})

	if(snake.tails.length > snake.maxTails) {
		snake.tails.pop()
	}

	snake.tails.forEach( function(elem, index) {
		if(index == 0) {
			context.fillStyle = '#fa0556'
		} else {
			context.fillStyle = '#a00034'
		}

		context.fillRect(elem.x, elem.y, config.sizeCell, config.sizeCell)

		if(elem.x === berry.x && elem.y === berry.y) {
			snake.maxTails++
			incScore()
			randomPositionBerry()
			snake.speed -= berry.acceleration
		}
		
		for(let i = index + 1; i < snake.tails.length; i++) {
			if(elem.x == snake.tails[i].x && elem.y == snake.tails[i].y) {
				confirm('scope ' + score)
				refreshGame()
			}
		}
	})
}

function drawBerry() {
	context.beginPath()
	context.fillStyle = '#a00034'
	context.arc(berry.x + (config.sizeCell / 2), berry.y + (config.sizeCell / 2), config.sizeBerry, 0, 2 * Math.PI)
	context.fill()
}

function refreshGame() {
	score = 0
	drawScore()

	snake.x = 160
	snake.y = 160
	snake.tails = []
	snake.maxTails = 3
	snake.dx = config.sizeCell
	snake.dy = 0
	snake.speed = config.speed

	randomPositionBerry()
}

document.addEventListener('keydown', function(e) {

	if(blockFlag) return

	blockFlag = true

	if(e.code == 'KeyW' && snake.dy == 0) {
		snake.dy = -config.sizeCell
		snake.dx = 0
	} else if(e.code == 'KeyS' && snake.dy == 0) {
		snake.dy = config.sizeCell
		snake.dx = 0
	} else if(e.code == 'KeyA' && snake.dx == 0) {
		snake.dx = -config.sizeCell
		snake.dy = 0
	} else if(e.code == 'KeyD' && snake.dx == 0) {
		snake.dx = config.sizeCell
		snake.dy = 0
	}
})

function collisionBorder() {
	if(snake.x < 0) {
		snake.x = canvas.width - config.sizeCell
	} else if(snake.x >= canvas.width) {
		snake.x = 0
	}

	if(snake.y < 0) {
		snake.y = canvas.height - config.sizeCell
	} else if(snake.y >= canvas.height) {
		snake.y = 0
	}
}