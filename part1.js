import * as part2 from './part2.js'
import * as part3 from './part3.js'

//ALL VARIABLE NONSENSE GOES HERE
//Function used to make ships
export function Ship(length, hits, sink, name, coordsArray){
    this.length = length
    this.hits = hits
    this.sink = sink
    this.name = name
    this.coordsArray = coordsArray
}
export let shipCoords = []
export const Destroyer = new Ship(2, 0, 0, 'Destroyer', shipCoords)
export const Submarine = new Ship(3, 0, 0, 'Submarine', shipCoords)
export const Cruiser = new Ship(3, 0, 0, 'Cruiser', shipCoords)
export const Battleship = new Ship(4, 0, 0, 'Battleship', shipCoords)
export const Carrier = new Ship(5, 0, 0, 'Carrier', shipCoords)


export let lastClicked = 0

export let clickHistory = []
export let coordsWithShips = []
export let attackedCoords = []
export let playerCoordsRaw = []

export function Gameboard(shipCoords, hitCoords, player){
    this.shipCoords = shipCoords
    this.hitCoords = hitCoords
    this.player = player
}
export const Player = new Gameboard(coordsWithShips, attackedCoords, 1)
export const Computer = new Gameboard(coordsWithShips, attackedCoords, 0)

export let spotsRemaining = 0
export let runThroughs = 0

export function placeShip(shipName){
    let futureCoord = clickHistory[runThroughs]
    let infoBox = document.querySelector('.info')
    infoBox.textContent = `You are currently placing the ${shipName.name} which has a total of ${shipName.length} coordinates!`
    let indexOfTest = playerCoordsRaw.indexOf(futureCoord)
    playerCoordsRaw.push(futureCoord)
    if(indexOfTest != -1){
        alert('You can only use a coordinate once, and you have already picked this space!  Try again!')
        clickHistory.pop()
    }
    else{
        shipName.coordsArray.push(futureCoord)
        let information = {coord: futureCoord, ship: shipName}
        Player.shipCoords.push(information)
        console.log(Player.shipCoords)
        let buttonGray = document.getElementById('L'+futureCoord)
        buttonGray.style = "background-color:gray"
        runThroughs++
    }

}


export function placeFleet() {
    function alertSystem(){
        if (runThroughs === 5) alert('THE CARRIER HAS BEEN PLACED. MOVING ALONG TO BATTLESHIP');
        if (runThroughs === 9) alert('THE BATTLESHIP HAS BEEN PLACED. MOVING ALONG TO CRUISER');
        if (runThroughs === 12) alert('THE CRUISER HAS BEEN PLACED. MOVING ALONG TO SUBMARINE');
        if (runThroughs === 15) alert('THE SUBMARINE HAS BEEN PLACED. MOVING ALONG TO DESTROYER');
        if (runThroughs === 17) alert('THE DESTROYER HAS BEEN PLACED. THAT WAS THE LAST SHIP!');
    }
    if (runThroughs >= 0 && runThroughs <= 4){placeShip(Carrier);
    } else if (runThroughs >= 5 && runThroughs <= 8){placeShip(Battleship);
    } else if (runThroughs >= 9 && runThroughs <= 11){placeShip(Cruiser);
    } else if (runThroughs >= 12 && runThroughs <= 14){placeShip(Submarine);
    } else if (runThroughs >= 15 && runThroughs <= 16){placeShip(Destroyer);
    } else if (runThroughs == 17){}
    alertSystem()
}

export function receiveAttack(){
        
    let checker = 0
    let checkLength = coordsWithShips.length
    let attackCoords = clickedButton
    if(attackedCoords.includes(attackCoords) == 1){
        console.log('This has already been attacked!')
        receiveAttack()
    }
    attackedCoords.push(attackCoords)
    function checkSpaces(){
        let hitCoord = coordsWithShips[checker][0]
        if(hitCoord == attackCoords){
            console.log(coordsWithShips)
            coordsWithShips[checker][1].hits++
            if(coordsWithShips[checker][1].hits == coordsWithShips[checker][1].length){
                coordsWithShips[checker][1].sink++
                console.log('The ship has been destroyed!  Blub, blub, blub!')
            }
        }
        else if(checker == checkLength){
            console.log('ERROR: REFER TO LOOP IN CHECKSPACES FUNCTION')
        }
        else{
            console.log(hitCoord)
            checker++
            console.log
            checkSpaces()
        }
    }
    checkSpaces()
}

