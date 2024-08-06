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
