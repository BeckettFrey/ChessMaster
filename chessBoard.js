for (let i = 0; i < 32; i++) {
  document.getElementById(int2grid(i)).style.backgroundColor = "white";
}
for (let j = 32; j < 64; j++) {
  document.getElementById(int2grid(j)).style.backgroundColor = "black";
}
//Turn starting blocks white/ black.
//Helper Methods.
//var colorTurn = "w";
function containsPiece(coordinate) {
  console.log(coordinate);
  if (document.getElementById(coordinate).childNodes.length > 0) {
    return true;
  }
  return false;
}
//Converts 0-63 to A0-H7
function int2grid(num) {
  return int2Letter(Math.floor(num / 8)) + (num % 8);
  console.log();
}
//Converts 0-7 to Letter A-H
function int2Letter(num) {
  if (num == 0) {
    return "A";
  }
  if (num == 1) {
    return "B";
  }
  if (num == 2) {
    return "C";
  }
  if (num == 3) {
    return "D";
  }
  if (num == 4) {
    return "E";
  }
  if (num == 5) {
    return "F";
  }
  if (num == 6) {
    return "G";
  }
  if (num == 7) {
    return "H";
  }
  return "A";
}
//Helps with piece move verification methods. (Grid shift)
function nextChar(c) {
  return String.fromCharCode(c.charCodeAt(0) + 1);
}
function prevChar(c) {
  return String.fromCharCode(c.charCodeAt(0) - 1);
}
//
//
//
//
//Code for pawn to queen switch.
//checks if endzones for pawns.
function checkEndZone(FR, TO) {
  var coors = TO.split("");
  if ((coors[0] == "A") | (coors[0] == "H")) {
    document.getElementById(FR).childNodes[1].remove();
    var p2;
    while (p2 != "knight" && p2 != "queen") {
      p2 = prompt("Would like this piece to become a queen, or a knight?");
    }

    if (p2 == "knight") {
      pawToKnight(TO);
      return true;
    } else {
      pawnToQueen(TO);
      return true;
    }
  }
  return false;
}

function pawToKnight(TO) {
  var coors = TO.split("");
  if (coors[0] == "A") {
    document.getElementById("extraWK").style.display = "block";
    document.getElementById(TO).appendChild(document.getElementById("extraWK"));
  } else {
    document.getElementById("extraBK").style.display = "block";
    document.getElementById(TO).appendChild(document.getElementById("extraBK"));
  }
}
function pawnToQueen(TO) {
  var coors = TO.split("");
  if (coors[0] == "A") {
    document.getElementById("extraWQ").style.display = "block";
    document.getElementById(TO).appendChild(document.getElementById("extraWQ"));
  } else {
    document.getElementById("extraBQ").style.display = "block";
    document.getElementById(TO).appendChild(document.getElementById("extraBQ"));
  }
}
//Returns Boolean True if legit move, false if not. Erases conquered pieces.
function oppositeColo(colo) {
  if (colo == "W") {
    return "B";
  } else {
    return "W";
  }
}
//Passed from ^^^
var coloMove = "W";

function moveInit(FR, TO) {
  var skip = false;
  if (document.getElementById(FR).childNodes[1].id == coloMove) {
    if (!checkAndAlterDestination(TO, FR)) {
      alert("No dice!");
    } else {
      if (verPmove(FR, TO)) {
        coloMove = oppositeColo(coloMove);
        if (document.getElementById(FR).childNodes[1].id == "W") {
          document.getElementById(TO).style.backgroundColor = "black";
        } else {
          document.getElementById(TO).style.backgroundColor = "white";
        }
        if (
          document.getElementById(FR).childNodes[1].getAttribute("p") == "pawn"
        ) {
          if (checkEndZone(FR, TO) == true) {
            skip = true;
          }
        }
        var newParent = document.getElementById(TO);
        var oldParent = document.getElementById(FR);
        if (skip == false) {
          if (containsPiece(TO)) {
            while (newParent.childNodes.length > 0) {
              newParent.childNodes[0].remove();
            }
          }
          move(oldParent, newParent);
        }
      } else {
        alert("Take another look at the rules.");
      }
    }
  } else {
    if (coloMove == "W") {
      alert("White's move.");
    } else {
      alert("Blacks's move.");
    }
  }
}
//Passed from ^^^
function move(oldParent, newParent) {
  while (oldParent.childNodes.length > 0) {
    newParent.appendChild(oldParent.childNodes[0]);
  }
}
function checkAndAlterDestination(iD, moveriD) {
  //Check if landing place is empty.
  if (!(document.getElementById(iD).childNodes.length > 0)) {
    return true;
  }
  //Color of moving piece.
  let coloFR = document.getElementById(moveriD).childNodes[1].id;
  console.log(coloFR);
  //Color of piece on landing place.
  let coloTO = document.getElementById(iD).childNodes[1].id;
  console.log(coloTO);
  //Check if the landing piece is the same color as moving piece.
  if (coloTO == coloFR) {
    return false;
  }
  return true;
}
//
//
//
//
//
//Passes to specific piece function. Assumes empty or opposite color obtaining space.
function verPmove(FR, TO) {
  let peace = document.getElementById(FR).childNodes[1].getAttribute("p");
  console.log(FR);

  switch (peace) {
    case "pawn":
      return movePawn(FR, TO);
      break;
    case "rook":
      return moveRook(FR, TO);

      break;
    case "knight":
      console.log(moveKnight(FR, TO));
      console.log("knightt");
      return moveKnight(FR, TO);

      break;
    case "bishop":
      return moveBishop(FR, TO);

      break;
    case "king":
      return moveKing(FR, TO);
      break;
    case "queen":
      return moveQueen(FR, TO);
      break;
    default:
      return movePawn(FR, TO);
  }
}
//
//
//
//
//
//Piece move verification.
//
//Boolean Move verification for specific pieces.
function moveRook(FR, TO) {
  var chars1 = FR.split("");
  var chars2 = TO.split("");
  var changingC1 = FR.split("");
  let clear = true;
  let found = false;
  if (chars2[0] == chars1[0]) {
    if (chars2[1] == changingC1[1]++) {
      return true;
    }
    if (chars2[1] == changingC1[1]) {
      return true;
    }
  }
  if (chars2[1] == chars1[1]) {
    if (chars2[0] == nextChar(changingC1[0])) {
      return true;
    }
    if (chars2[0] == prevChar(changingC1[0])) {
      return true;
    }
  }
  //Horizontal move.
  if (chars1[0] == chars2[0]) {
    //check clear right.
    changingC1[1]++;
    while (changingC1[1] != chars2[1] && changingC1[1] < 8) {
      if ((changingC1[1] = chars2[1])) {
        found = true;
        break;
      }
      if (containsPiece(chars1[0] + changingC1[1])) {
        clear = false;
      }
      changingC1[1]++;
    }
    if (found) {
      if (clear == true) {
        return true;
      }
    } else {
      clear = true;
    }
    changingC1 = chars1;
    changingC1[1] -= 1;
    //check clear left.
    while (changingC1[1] != chars2[1] && changingC1[1] >= 0) {
      if ((changingC1[1] = chars2[1])) {
        found = true;
        break;
      }
      if (containsPiece(chars1[0] + changingC1[1])) {
        clear = false;
      }
      changingC1[1]++;
    }
    if (found) {
      if (clear == true) {
        return true;
      }
    } else {
      clear = true;
    }
    changingC1 = chars1;
  }

  if (chars1[1] == chars2[1]) {
    console.log("ESAHBCHS");
    changingC1[0] = nextChar(changingC1[0]);
    while (changingC1[0] != chars2[0] && changingC1[1] != "I") {
      if ((changingC1[0] = chars2[0])) {
        found = true;
        break;
      }
      if (containsPiece(changingC1[0] + chars1[1])) {
        clear = false;
      }
      changingC1[0] = nextChar(changingC1[0]);
    }
    if (found) {
      if (clear == true) {
        return true;
      }
    } else {
      clear = true;
    }
    changingC1 = chars1;
    changingC1[0] = prevChar(changingC1[0]);
    while (changingC1[0] != chars2[0] && changingC1[1] != "'") {
      if ((changingC1[0] = chars2[0])) {
        found = true;
        break;
      }
      if (containsPiece(changingC1[0] + chars1[1])) {
        clear = false;
      }
      changingC1[0] = prevChar(changingC1[0]);
    }
  }
  if (found) {
    if (clear == true) {
      return true;
    }
  } else {
    return false;
  }
}
function movePawn(FR, TO) {
  if (document.getElementById(FR).childNodes[1].id == "W") {
    return movePawnW(FR, TO);
  }
  return movePawnB(FR, TO);
}
//Helper.

function movePawnW(FR, TO) {
  var coordinateFR = FR.split("");
  var coordinateTO = TO.split("");
  var shiftFRup = FR.split("");
  var shiftFRdwn = FR.split("");
  shiftFRdwn[1] -= 1;
  shiftFRup[1]++;
  if ((coordinateTO[1] == shiftFRdwn[1]) | (coordinateTO[1] == shiftFRup[1])) {
    if (coordinateTO[0] == prevChar(coordinateFR[0]) && containsPiece(TO)) {
      document.getElementById(FR).childNodes[1].setAttribute("used", "yes");
      return true;
    }
    return false;
  }

  if (document.getElementById(FR).childNodes[1].getAttribute("used") == "no") {
    if (coordinateFR[1] == coordinateTO[1]) {
      if (prevChar(prevChar(coordinateFR[0])) == coordinateTO[0]) {
        // &&!containsPiece(coordinateTO)
        document.getElementById(FR).childNodes[1].setAttribute("used", "yes");
        return true;
      }
    }
  }
  if (coordinateFR[1] == coordinateTO[1]) {
    if (prevChar(coordinateFR[0]) == coordinateTO[0] && !containsPiece(TO)) {
      document.getElementById(FR).childNodes[1].setAttribute("used", "yes");
      return true;
    }
    console.log("here2");
    return false;
  }
  console.log("here3");
  return false;
}
//Helper.
function movePawnB(FR, TO) {
  var coordinateFR = FR.split("");
  var coordinateTO = TO.split("");
  var shiftFRup = FR.split("");
  var shiftFRdwn = FR.split("");
  shiftFRdwn[1] -= 1;
  shiftFRup[1]++;
  console.log("{}");
  console.log(shiftFRdwn[1]);
  console.log(shiftFRup[1]);
  console.log(coordinateTO[1]);
  console.log("{}");
  if ((coordinateTO[1] == shiftFRdwn[1]) | (coordinateTO[1] == shiftFRup[1])) {
    console.log(19);

    if (coordinateTO[0] == nextChar(coordinateFR[0]) && containsPiece(TO)) {
      console.log(20);
      document.getElementById(FR).childNodes[1].setAttribute("used", "yes");
      return true;
    }
    return false;
  }

  if (document.getElementById(FR).childNodes[1].getAttribute("used") == "no") {
    if (coordinateFR[1] == coordinateTO[1]) {
      if (nextChar(nextChar(coordinateFR[0])) == coordinateTO[0]) {
        // &&!containsPiece(coordinateTO)
        document.getElementById(FR).childNodes[1].setAttribute("used", "yes");
        return true;
      }
    }
  }
  if (coordinateFR[1] == coordinateTO[1]) {
    if (nextChar(coordinateFR[0]) == coordinateTO[0] && !containsPiece(TO)) {
      document.getElementById(FR).childNodes[1].setAttribute("used", "yes");
      return true;
    }
    console.log("here2");
    return false;
  }
  console.log("here3");
  return false;
}

function moveKnight(FR, TO) {
  let origin = FR;
  var chars1 = FR.split("");
  var tf = false;
  let counter = 2;
  while (chars1[0] != "I" && chars1[1] < 8 && counter > 0) {
    console.log(1);
    if (counter == 2) {
      chars1[0] = nextChar(chars1[0]);
    }
    chars1[1]++;
    counter--;
    if (counter == 0) {
      origin = chars1[0] + chars1[1];
    }
  }
  if (origin == TO) {
    tf = true;
  }
  origin = 0;
  counter = 2;
  chars1 = FR.split("");
  while (chars1[0] != "i" && chars1[1] >= 0 && counter > 0) {
    if (counter == 2) {
      chars1[0] = nextChar(chars1[0]);
    }
    chars1[1]--;
    counter--;
    if (counter == 0) {
      origin = chars1[0] + chars1[1];
    }
  }
  if (origin == TO) {
    tf = true;
  }
  origin = 0;
  counter = 2;
  chars1 = FR.split("");
  while (chars1[0] != "'" && chars1[1] < 8 && counter > 0) {
    chars1[0] = prevChar(chars1[0]);
    if (counter == 2) {
      chars1[1]--;
    }
    counter--;
    if (counter == 0) {
      origin = chars1[0] + chars1[1];
    }
  }
  if (origin == TO) {
    tf = true;
  }
  origin = 0;
  counter = 2;
  chars1 = FR.split("");
  while (chars1[0] != "'" && chars1[1] < 8 && counter > 0) {
    chars1[0] = prevChar(chars1[0]);
    if (counter == 2) {
      chars1[1]++;
    }
    counter--;
    if (counter == 0) {
      origin = chars1[0] + chars1[1];
    }
  }
  if (origin == TO) {
    tf = true;
  }
  origin = 0;
  counter = 2;
  chars1 = FR.split("");
  while (chars1[0] != "'" && chars1[1] < 8 && counter > 0) {
    if (counter == 2) {
      chars1[0] = prevChar(chars1[0]);
    }
    chars1[1]--;
    counter--;
    if (counter == 0) {
      origin = chars1[0] + chars1[1];
    }
  }
  if (origin == TO) {
    tf = true;
  }
  origin = 0;
  counter = 2;
  chars1 = FR.split("");
  while (chars1[0] != "i" && chars1[1] < 8 && counter > 0) {
    chars1[0] = nextChar(chars1[0]);

    if (counter == 2) {
      chars1[1]++;
    }
    counter--;
    if (counter == 0) {
      origin = chars1[0] + chars1[1];
    }
  }
  if (origin == TO) {
    tf = true;
  }
  origin = 0;
  counter = 2;
  chars1 = FR.split("");
  while (chars1[0] != "i" && chars1[1] >= 0 && counter > 0) {
    chars1[0] = nextChar(chars1[0]);
    if (counter == 2) {
      chars1[1]--;
    }
    counter--;
    if (counter == 0) {
      origin = chars1[0] + chars1[1];
    }
  }
  if (origin == TO) {
    tf = true;
  }
  origin = 0;
  counter = 2;
  chars1 = FR.split("");
  while (chars1[0] != "'" && chars1[1] < 8 && counter > 0) {
    chars1[0] = prevChar(chars1[0]);
    if (counter == 2) {
      chars1[1]++;
    }

    counter--;
    if (counter == 0) {
      origin = chars1[0] + chars1[1];
    }
  }
  if (origin == TO) {
    tf = true;
  }
  origin = 0;
  counter = 2;
  chars1 = FR.split("");
  while (chars1[0] != "'" && chars1[1] < 8 && counter > 0) {
    if (counter == 2) {
      chars1[0] = prevChar(chars1[0]);
    }

    chars1[1]++;

    counter--;
    if (counter == 0) {
      origin = chars1[0] + chars1[1];
    }
  }
  if (origin == TO) {
    tf = true;
  }
  return tf;
}

function moveQueen(FR, TO) {
  if (moveBishop(FR, TO)) {
    return true;
  }
  if (moveRook(FR, TO)) {
    return true;
  }
  return false;
}
function moveKing(FR, TO) {
  var chars1 = FR.split("");
  var chars2 = TO.split("");
  if (
    (chars2[1] == chars1[1]++) |
    (chars2[1] == (chars1[1] -= 2)) |
    (chars2[1] == chars1[1]++)
  ) {
    if (
      (chars2[0] == nextChar(chars1[0])) |
      (chars2[0] == prevChar(chars1[0])) |
      (chars2[0] == chars1[0])
    ) {
      return true;
    }
  }
  return false;
}
function moveBishop(FR, TO) {
  let origin = FR;
  var chars1 = FR.split("");
  let clearPath = true;
  var tf = false;
  chars1[0] = nextChar(chars1[0]);
  chars1[1]++;
  while (chars1[0] != "I" && chars1[1] < 8) {
    origin = chars1[0] + chars1[1];
    if (origin == TO) {
      tf = true;
      break;
    }
    if (containsPiece(origin)) {
      clearPath = false;
    }
    chars1[0] = nextChar(chars1[0]);
    chars1[1]++;
  }
  if (tf == false) {
    clearPath = true;
  } else {
    if ((clearPath = true)) {
      return true;
    } else {
      return false;
    }
  }
  chars1 = FR.split("");
  chars1[0] = prevChar(chars1[0]);
  chars1[1]++;
  while (chars1[0] != "'" && chars1[1] < 8) {
    origin = chars1[0] + chars1[1];
    if (origin == TO) {
      tf = true;
      break;
    }
    if (containsPiece(origin)) {
      clearPath = false;
    }
    chars1[0] = prevChar(chars1[0]);
    chars1[1]++;
  }
  if (tf == false) {
    clearPath = true;
  } else {
    if ((clearPath = true)) {
      return true;
    } else {
      return false;
    }
  }
  chars1 = FR.split("");
  chars1[0] = prevChar(chars1[0]);
  chars1[1] -= 1;

  while (chars1[0] != "@" && chars1[1] >= 0) {
    origin = chars1[0] + chars1[1];
    console.log(origin);
    if (origin == TO) {
      tf = true;
      break;
    }
    if (containsPiece(origin)) {
      clearPath = false;
    }
    chars1[0] = prevChar(chars1[0]);
    chars1[1] -= 1;
  }
  if (tf == false) {
    clearPath = true;
  } else {
    if ((clearPath = true)) {
      return true;
    } else {
      return false;
    }
  }
  chars1 = FR.split("");
  chars1[0] = nextChar(chars1[0]);
  chars1[1]++;
  chars1[1] -= 1;
  chars1[1] -= 1;
  while (chars1[0] != "I" && chars1[1] >= 0) {
    origin = chars1[0] + chars1[1];
    if (origin == TO) {
      tf = true;
      break;
    }
    if (containsPiece(origin)) {
      clearPath = false;
    }
    chars1[0] = nextChar(chars1[0]);
    chars1[1] -= 1;
  }
  if (tf == false) {
    return false;
  } else {
    if ((clearPath = true)) {
      return true;
    } else {
      return false;
    }
  }
}
//
//
//
//
// Click event listeners for each block.
//
//
let space = document.querySelectorAll("button");
for (let i = 0; i < 64; i++) {
  space[i].addEventListener("click", () => selectPiece(int2grid(i)));
}
var oneSelected;
var swtch = false;
//event1on();
function selectPiece(place) {
  if (swtch == false) {
    oneSelected = place;
    swtch = true;
  } else {
    swtch = false;
    moveInit(oneSelected, place);
  }
}
