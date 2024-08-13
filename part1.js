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
let shipPlayer = []
let shipComputer = []
coordsWithShips.push(shipPlayer)
coordsWithShips.push(shipComputer)
export let attackedCoords = []
let attackPlayer = []
let attackComputer = []
attackedCoords.push(attackPlayer)
attackedCoords.push(attackComputer)
export let playerCoordsRaw = []

export function Gameboard(shipCoords, hitCoords, player){
    this.shipCoords = shipCoords
    this.hitCoords = hitCoords
    this.player = player
}
export const Player = new Gameboard(shipPlayer, attackedCoords, 1)
export const Computer = new Gameboard(shipComputer, attackedCoords, 0)

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
        let realCoord = Number(futureCoord)
        let information = {coord: realCoord, ship: shipName}
        Player.shipCoords.push(information)
        let buttonGray = document.getElementById('L'+futureCoord)
        buttonGray.style = "background-color:gray"
        runThroughs++
    }

}

//This is quite possibly the worst way to do this, but I need to finish this project and move on
export function computerShipPlace(coord, shipName){
    let information = {coord: coord, ship: shipName}
    Computer.shipCoords.push(information)
}

export function computerFleetPlace(){
    computerShipPlace(12, Carrier)
    computerShipPlace(13, Carrier)
    computerShipPlace(14, Carrier)
    computerShipPlace(15, Carrier)
    computerShipPlace(16, Carrier)
    computerShipPlace(44, Battleship)
    computerShipPlace(54, Battleship)
    computerShipPlace(64, Battleship)
    computerShipPlace(74, Battleship)
    computerShipPlace(62, Cruiser)
    computerShipPlace(72, Cruiser)
    computerShipPlace(82, Cruiser)
    computerShipPlace(67, Submarine)
    computerShipPlace(68, Submarine)
    computerShipPlace(69, Submarine)
    computerShipPlace(38, Destroyer)
    computerShipPlace(39, Destroyer)
    console.log(coordsWithShips)
    part3.playerAttack()
}

export function placeFleet() {
    function alertSystem(){
        if (runThroughs === 5) alert('THE CARRIER HAS BEEN PLACED. MOVING ALONG TO BATTLESHIP');
        if (runThroughs === 9) alert('THE BATTLESHIP HAS BEEN PLACED. MOVING ALONG TO CRUISER');
        if (runThroughs === 12) alert('THE CRUISER HAS BEEN PLACED. MOVING ALONG TO SUBMARINE');
        if (runThroughs === 15) alert('THE SUBMARINE HAS BEEN PLACED. MOVING ALONG TO DESTROYER');
        if (runThroughs === 17){alert('THE DESTROYER HAS BEEN PLACED. THAT WAS THE LAST SHIP!');
        let deleter = 1
        computerFleetPlace()
        function noMoreFleet(ID){
            let deleteID = 'L'+ID
            let buttonBoop = document.getElementById(deleteID)
            buttonBoop.disabled = true
            deleter++
            if(deleter == 101){return}
            else{noMoreFleet(deleter)}
        }
        noMoreFleet(deleter)
        
    }
    }
    if (runThroughs >= 0 && runThroughs <= 4){placeShip(Carrier);
    } else if (runThroughs >= 5 && runThroughs <= 8){placeShip(Battleship);
    } else if (runThroughs >= 9 && runThroughs <= 11){placeShip(Cruiser);
    } else if (runThroughs >= 12 && runThroughs <= 14){placeShip(Submarine);
    } else if (runThroughs >= 15 && runThroughs <= 16){placeShip(Destroyer);
    }
    alertSystem()
}

export function receiveAttack(player, coord){
    let checker = 0
    let checkLength = coordsWithShips[player].length
    let attackCoords = Number(coord)
    console.log(`Someone has attacked ${attackCoords}`)
    if(attackedCoords[player].includes(attackCoords) == 1){
        alert('This has already been attacked!  Try again!')
        return
    }
    attackedCoords[player].push(attackCoords)
    function checkSpaces(){
        if(checker == 17){
            console.log('Miss')
            if(player == 1){part3.computerAttack}
            else if(player == 0){part3.playerAttack}
            return
        }
        let hitCoord = coordsWithShips[player][checker].coord
        if(hitCoord == attackCoords){
            console.log('HIT')
            console.log(coordsWithShips)
            coordsWithShips[player][checker].ship.hits++
            if(coordsWithShips[player][checker].ship.hits == coordsWithShips[checker][1].length){
                coordsWithShips[player][checker].ship.sink++
                alert('The ship has been destroyed!  Blub, blub, blub!')
            }
            if(player == 1){part3.computerAttack}
            else if(player == 0){part3.playerAttack}
        }
        else if(checker == checkLength){
            console.log('ERROR: REFER TO LOOP IN CHECKSPACES FUNCTION')
            console.log(attackedCoords)
        }
        else{
            console.log(hitCoord)
            checker++
            checkSpaces()
        }
    }
    checkSpaces()
}
//insert if statements in CheckSpaces to make it switch to whoevers turn it is
