import * as part2 from './part2.js'
import * as part1 from './part1.js'

//ALL EVENT LISTENERS GO HERE

//THIS GIVES BUTTONS THE ABILITY TO PLACE SHIPS
let countUp = 1
function applyBoard1(ID){
    let button1Grab = document.getElementById('L'+ID)
    button1Grab.addEventListener("click", function(){
        part1.placeFleet()
    })
    countUp++
    while(countUp != 101){applyBoard1(countUp)}
}
applyBoard1(countUp)



//NOW THE GAME STARTS
export function playerAttack(){
    let informationChange = document.querySelector('.info')
    informationChange.textContent = 'Click an enemy space to attack it!'
    let countUp = 1
    function setUpBoard2(ID){
        let button2Grab = document.getElementById('R'+ID)
        button2Grab.addEventListener("click", function(){
            let attackCoord = button2Grab.textContent
            part1.receiveAttack(1, attackCoord)
        })
        countUp++
        while(countUp != 101){setUpBoard2(countUp)}
    }
    setUpBoard2(1)
}


export function computerAttack(){
    let informationChange = document.querySelector('.info')
    informationChange.textContent = 'It is the computers turn to attack'
    let computerChoice = Math.floor(Math.random() * 101)
    console.log(`The computer is attacking ${computerChoice}`)
    part1.receiveAttack(0, computerChoice)
}
