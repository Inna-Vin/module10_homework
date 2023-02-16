const chatUrl = 'wss://echo-ws-service.herokuapp.com'

function chatMessage() {
  const divStatus = document.querySelector(".status")
  const divChat = document.querySelector(".chat")
  const input = document.querySelector(".message")
  const btnSend = document.querySelector(".send")
  const btnGEO = document.querySelector(".geo-location")
  
  const websocket = new WebSocket(chatUrl)
  
  websocket.onopen = () => {
    divStatus.innerText = "Соединение установленно :)"
  }
  
  websocket.onmessage = (event) => {
    writeToChat(event.data, true)
  }
  
  websocket.onerror = () => {
    divStatus.innerText = "При попытке установить соединение произошла ошибка :("
  }
  
  btnSend.addEventListener ("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    websocket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }
  
  function writeToChat(message, isRecieved) {
   let textMessage = `<div class="${isRecieved? "recieved" : "send"}">${message}</div>`;
    divChat.innerHTML += textMessage;
  }
  
  btnGEO.addEventListener ("click", sendGeo);
  
  function sendGeo() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(locationSuccess)
    } else { 
      divStatus.innerText = "Ваш браузер не поддерживает определение местоположения"
    }
  
  function locationSuccess (position) {
    //console.log('position', position);
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;
    divChat.innerHTML += `<div class="send"><a class="link" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Я нахожусь здесь</a></div>`;
  }
  }
  
}

document.addEventListener("DOMContentLoaded", chatMessage)