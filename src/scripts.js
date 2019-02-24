console.clear()

let king, challenger
const pointLimit = 5
const serveLimit = 2
let serveCounter = 0
let kingIsServing = true

const players = [
	{ name: 'Ryan', score: 0 },
  { name: 'Rods', score: 0 },
  { name: 'Andrew', score: 0 },
  { name: 'Andrew2', score: 0 },
  { name: 'Andrew3', score: 0 },
  { name: 'Andrew4', score: 0 },
  { name: 'Andrew5', score: 0 },
  { name: 'Andrew6', score: 0 },
 ]
const currentScore = [
  { name: 'king', points: 0 },
  { name: 'challenger', points: 0 },
]

function chooseKing() {
	return players[Math.floor(Math.random() * players.length)]
}

function chooseChallenger() {
  const playersLeft = players.filter(player => player !== king)
  return playersLeft[Math.floor(Math.random() * playersLeft.length)]
}

function playersLeft() {
	const noKing = players.filter(player => player !== king)
  const noChallengers = noKing.filter(player => player !== challenger)
	return noChallengers
}

king = chooseKing()
challenger = chooseChallenger()
let currentQueue = playersLeft()
updateScores()

const kingName = document.querySelector('.king .name')
const challengerName = document.querySelector('.challenger .name')
kingName.innerHTML = king.name
challengerName.innerHTML = challenger.name

const kingScore = document.querySelector('.king .score')
const challengerScore = document.querySelector('.challenger .score')
kingScore.innerHTML = currentScore[0].points
challengerScore.innerHTML = currentScore[1].points

document.querySelector('.king').addEventListener('click', function() {
	updateServe()
	currentScore[0].points++
  if (currentScore[0].points === pointLimit) {
    king.score++
    currentQueue.push(challenger)
    challenger = currentQueue[0]
    currentQueue.shift()
    if (king.score === pointLimit) {
      alert(`winner winner, ${king.name} wins!!`)
      resetGame()
    }
    resetMatch()    
  }
  kingScore.innerHTML = currentScore[0].points
})
document.querySelector('.challenger').addEventListener('click', function() {
	updateServe()
  currentScore[1].points++
  if (currentScore[1].points === pointLimit) {
	  challenger.score++
    if (challenger.score === pointLimit) {
	    alert(`winner winner, ${challenger.name} wins!!`)
      resetGame()
    }
    currentQueue.push(king)
    king = challenger
    challenger = currentQueue[0]
    currentQueue.shift()
    resetMatch()
  }
  challengerScore.innerHTML = currentScore[1].points
})

document.querySelector('.reset').addEventListener('click', function() {
  document.querySelector('.king .icon-serve').style.display = 'block'
  document.querySelector('.challenger .icon-serve').style.display = 'none'
  resetGame()
  resetMatch()
})

function changeServe () {
	kingIsServing = !kingIsServing
	const king = document.querySelector('.king')
	const challenger = document.querySelector('.challenger')
  if (kingIsServing) {
    document.querySelector('.king .icon-serve').style.display = 'block'
    document.querySelector('.challenger .icon-serve').style.display = 'none'
    king.classList.add('serving')
    challenger.classList.remove('serving')
  } else {
    document.querySelector('.king .icon-serve').style.display = 'none'
    document.querySelector('.challenger .icon-serve').style.display = 'block'
		challenger.classList.add('serving')
    king.classList.remove('serving')
  }
}

function updateServe() {
	serveCounter++
  if (serveCounter === 2) { 
  	serveCounter = 0 
    changeServe()
  }
}

function resetMatch() {
  currentScore[0].points = 0
  currentScore[1].points = 0
  kingScore.innerHTML = currentScore[0].points
	kingName.innerHTML = king.name
  challengerScore.innerHTML = currentScore[1].points
	challengerName.innerHTML = challenger.name
  updateScores()
}

function resetGame() {
  currentScore[0].points = 0
  currentScore[1].points = 0
  for (var i = 0; i < players.length; i++) {
  	players[i].score = 0
  }
  document.querySelector('.king .icon-serve').style.display = 'block'
  document.querySelector('.challenger .icon-serve').style.display = 'none'
  updateScores()
}

function updateScores() {
  kingIsServing = true
  serveCounter = 0
	let queueHTML = ''
  queueHTML += `<li>${king.name} - score: ${king.score}</li>`
  queueHTML += `<li>${challenger.name} - score: ${challenger.score}</li>`
  queueHTML += `<li class="divider">========</li>`
  for (var i = 0; i < currentQueue.length; i++) {
    queueHTML += `<li>${ currentQueue[i].name } - score: ${currentQueue[i].score}</li>`
  }
  document.querySelector('.queue ul').innerHTML = queueHTML
}
