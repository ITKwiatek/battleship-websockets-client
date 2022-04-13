
var socket;
function wsConnect(apiUrl) {
    console.log(apiUrl)

    var connectButton = document.getElementById("connectButton");
    console.log("Attempting to connect...");
    socket = new WebSocket(apiUrl);
    socket.onopen = function (event) {
        //updateState();
        console.log("Connected");
    }
}

function sendData(data) {
    socket.send(data);
}


    // function updateState() {
    //     function disable() {
    //         //redirect
    //         console.log("redirecting to start")
    //     }
    //     function enable() {
    //         //redirect
    //         console.log("redirecting to battle")
    //     }
    //     if(!socket){
    //         console.log("!socket");
    //         disable();
    //     } else {
    //         switch(socket.readyState){
    //             case WebSocket.CLOSED:
    //                 console.log("WebSocket.CLOSED");
    //                 disable();
    //                 break;
    //             case WebSocket.CLOSING:
    //                 console.log("WebSocket.CLOSING");
    //                 disable();
    //                 break;
    //             case WebSocket.CONNECTING:
    //                 stateLabel.innerHTML = "Connecting...";
    //                 disable();
    //                 break;
    //             case WebSocket.OPEN:
    //                 console.log("WebSocket.OPEN");
    //                 enable();
    //                 break;
    //             default:
    //                 console.log("default option");
    //                 disable();
    //                 break;
    //         }
    //     }
    // }