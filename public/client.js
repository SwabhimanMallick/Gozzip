const socket = io()

let naam;
let textarea = document.querySelector('#textarea')
let chatField = document.querySelector('.chatField')



do{
   naam = prompt("Enter your name:")
}while(!naam)

textarea.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        sendChat(e.target.value)
    }
})

function sendChat(ch){
    let msg = {
        user: naam,
        message: ch.trim()
    }

    appendChat(msg, 'outgoing')
    textarea.value = ''
    scroll();

    socket.emit('message', msg)
}


function appendChat(msg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'chat')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML = markup
    chatField.appendChild(mainDiv)

}


socket.on('message', (msg)=>{
    appendChat(msg, 'incoming')
    scroll();
})


function scroll(){
    chatField.scrollTop = chatField.scrollHeight
}