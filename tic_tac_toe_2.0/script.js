const p1 = document.getElementById('place-1')
const p2 = document.getElementById('place-2')
const p3 = document.getElementById('place-3')
const p4 = document.getElementById('place-4')
const p5 = document.getElementById('place-5')
const p6 = document.getElementById('place-6')
const p7 = document.getElementById('place-7')
const p8 = document.getElementById('place-8')
const p9 = document.getElementById('place-9')



const againButton = document.querySelector(".btn-play-again");
const turnSpan = document.querySelector('.turn-span');
const message = document.querySelector('.message');



document.querySelector('.play-against-buttons').addEventListener('click', function (e) {
    if (e.target.classList.contains('human-player')) {

        document.querySelector('.container').style.display = "block"
        document.querySelector(".play-against-buttons").style.display = "none"
        document.querySelector(".play-against-buttons").classList.add("human-chose")
        //this will show if the x turn should be random
    }
    else if (e.target.classList.contains('pc-player')) {
        document.querySelector('.container').style.display = "block"
        document.querySelector(".play-against-buttons").style.display = "none"
        document.querySelector(".play-against-buttons").classList.add("pc-chose")

    }
})


document.querySelector('.grid-container').addEventListener('click', ticTacToe)
//maybe change the listener to listen to the container instead of the grid contianer
//so we can disable the message


// function ticTacToe(e) {
//     //name change 
//     if (e.target.classList.contains("square-used")) {
//         message.classList.add("text-danger");
//         message.textContent = "spot already used!";
//     }
//     else if (e.target.classList.contains("square")) {
//         message.innerHTML = "";
//         e.target.classList.add("square-used");
//         console.log("square pressed");
//         //can remove
//         markSquare(e.target);
//     }
// }


function ticTacToe(e) {
    //name change 
    // if (document.querySelector(".play-against-buttons").classList.contains("pc-chose")&& turnSpan.classList.contains('circle-turn')) {
    //     let pcPick=Math.ceil(Math.random()*9);
    //     console.log(pcPick);

    // }
    if (e.target.classList.contains("square-used")) {
        message.classList.add("text-danger");
        message.textContent = "spot already used!";
    }
    else if (e.target.classList.contains("square")) {
        message.innerHTML = "";
        e.target.classList.add("square-used");
        console.log("square pressed");
        //can remove
        markSquare(e.target);
    }
}


function markSquare(square) {

    console.log(square.id);
    //can remove
    if (turnSpan.classList.contains('circle-turn')) {
        // square.textContent = "circle";
        square.innerHTML = `<img  class="circle-pic" src="pictures/0.png" alt="circle">`;
        //change to make a circle
        square.classList.add("circle-used");

        if (!checkIfEnded("circle")) {

            // new code
            if (document.querySelector(".play-against-buttons").classList.contains("pc-chose")) {
                let pcPick = Math.ceil(Math.random() * 9);
                console.log("x will be " + pcPick);

                if (document.getElementById(`place-${pcPick}`).classList.contains("square-used")) {
                    console.log("taken");



                }


                while (document.getElementById(`place-${pcPick}`).classList.contains("square-used")) {
                    pcPick = Math.ceil(Math.random() * 9);
                    console.log("square was used .new x is " + pcPick);

                }
                document.getElementById(`place-${pcPick}`).innerHTML = `<img  class="x-pic" src="pictures/x.png" alt="x">`;
                document.getElementById(`place-${pcPick}`).classList.add("square-used");
                document.getElementById(`place-${pcPick}`).classList.add("x-used");

                if (checkIfEnded("x")) {
                    document.querySelector('.grid-container').removeEventListener('click', ticTacToe);
                    againButton.style.display = "block";
                }
            }

            else {
                turnSpan.classList.toggle('circle-turn')
                turnSpan.classList.toggle('x-turn')
                turnSpan.innerHTML = `<img class="x-pic" src="pictures/x.png" alt="x">`;
            }
            //new code
            //  turnSpan.classList.toggle('circle-turn')
            //  turnSpan.classList.toggle('x-turn')
            //  turnSpan.innerHTML = `<img class="x-pic" src="pictures/x.png" alt="x">`;



        }
        else {
            document.querySelector('.grid-container').removeEventListener('click', ticTacToe)
            againButton.style.display = "block";
        }
    }
    else if (turnSpan.classList.contains('x-turn')) {
        square.innerHTML = `<img class="x-pic" src="pictures/x.png" alt="x">`;

        square.classList.add("x-used");

        if (!checkIfEnded("x")) {
            turnSpan.classList.toggle('circle-turn')
            turnSpan.classList.toggle('x-turn')
            turnSpan.innerHTML = `<img class="circle-pic" src="pictures/0.png" alt="circle">`;
            // turnSpan.textContent = 'circle';


        }
        else {
            document.querySelector('.grid-container').removeEventListener('click', ticTacToe);
            againButton.style.display = "block";
        }

    }
}

function checkIfEnded(turn) {
    switch (true) {
        case checkDiagnols(turn):
            if (document.querySelector(".play-against-buttons").classList.contains("pc-chose")&& turn === "x") {
                message.textContent = "pc wins!";
                message.classList.remove("text-danger");
                message.classList.add("text-success");
                return true;
            }
           
            message.textContent = turn + " wins!";
            message.classList.remove("text-danger");
            message.classList.add("text-success");
            return true
            

        case checkRows(turn):
            if (document.querySelector(".play-against-buttons").classList.contains("pc-chose")&& turn === "x") {
                message.textContent = "pc wins!";
                message.classList.remove("text-danger");
                message.classList.add("text-success");
                return true;
            }
            message.textContent = turn + " wins!";
            message.classList.remove("text-danger");
            message.classList.add("text-success");
            return true;

        case checkColumns(turn):
            if (document.querySelector(".play-against-buttons").classList.contains("pc-chose")&& turn === "x") {
                message.textContent = "pc wins!";
                message.classList.remove("text-danger");
                message.classList.add("text-success");
                return true;
               
            }
            message.textContent = turn + " wins!";
            message.classList.remove("text-danger");
            message.classList.add("text-success");
            return true;

        case checkIfDraw(turn):
            message.textContent = "its a draw!";
            message.classList.remove("text-danger");
            message.classList.add("text-success");



            return true;

        default:
            return false;
    }
}


function checkDiagnols(turn) {
    //maybe turn this into foreach loop?
    if (p1.classList.contains(`${turn}-used`) && p5.classList.contains(`${turn}-used`) && p9.classList.contains(`${turn}-used`)) {
        return true;

    }
    if (p3.classList.contains(`${turn}-used`) && p5.classList.contains(`${turn}-used`) && p7.classList.contains(`${turn}-used`)) {
        return true;
    }
    else
        return false;
}


function checkRows(turn) {
    //maybe turn this into foreach loop?
    if (p1.classList.contains(`${turn}-used`) && p2.classList.contains(`${turn}-used`) && p3.classList.contains(`${turn}-used`)) {
        return true;
    }
    if (p4.classList.contains(`${turn}-used`) && p5.classList.contains(`${turn}-used`) && p6.classList.contains(`${turn}-used`)) {
        return true;
    }
    if (p7.classList.contains(`${turn}-used`) && p8.classList.contains(`${turn}-used`) && p9.classList.contains(`${turn}-used`)) {
        return true;
    }
    else
        return false;
}


function checkColumns(turn) {
    //maybe turn this into foreach loop?
    if (p1.classList.contains(`${turn}-used`) && p4.classList.contains(`${turn}-used`) && p7.classList.contains(`${turn}-used`)) {
        return true;
    }
    if (p2.classList.contains(`${turn}-used`) && p5.classList.contains(`${turn}-used`) && p8.classList.contains(`${turn}-used`)) {
        return true;
    }
    if (p3.classList.contains(`${turn}-used`) && p6.classList.contains(`${turn}-used`) && p9.classList.contains(`${turn}-used`)) {
        return true;
    }
    else
        return false;
}

function checkIfDraw() {
    if (p1.classList.contains("square-used") && p2.classList.contains("square-used") && p3.classList.contains("square-used")
        && p4.classList.contains("square-used") && p5.classList.contains("square-used") && p6.classList.contains("square-used")
        && p7.classList.contains("square-used") && p8.classList.contains("square-used") && p9.classList.contains("square-used")) {
        return true;
    }
    else
        return false;
}


againButton.addEventListener('click', function () {

   document.querySelector(".play-against-buttons").style.display = "block";
   document.querySelector('.container').style.display = "none";
   document.querySelector(".play-against-buttons").classList.remove("pc-chose")
   document.querySelector(".play-against-buttons").classList.remove("human-chose")
   
   
    p1.className = "square"
    p1.innerHTML = "";
    p2.className = "square"
    p2.innerHTML = "";
    p3.className = "square"
    p3.innerHTML = "";
    p4.className = "square"
    p4.innerHTML = "";
    p5.className = "square"
    p5.innerHTML = "";
    p6.className = "square"
    p6.innerHTML = "";
    p7.className = "square"
    p7.innerHTML = "";
    p8.className = "square"
    p8.innerHTML = "";
    p9.className = "square"
    p9.innerHTML = "";
    document.querySelector('.grid-container').addEventListener('click', ticTacToe);
    againButton.style.display = "none";
    message.innerHTML = "";
    turnSpan.innerHTML = `<img  class="circle-pic" src="pictures/0.png" alt="circle">`;
    turnSpan.className = "turn-span circle-turn"
});