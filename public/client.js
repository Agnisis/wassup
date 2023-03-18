const socket=io();


let messageArea=document.querySelector('.message-area');
let name;

let textarea=document.querySelector('#textarea');
do{
   name= prompt('please enter your name')
}while(!name);


textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendmessage(e.target.value)
    }
})


function sendmessage(message){
    msg={
        user:name,
        message:message.trim()
    }

    //Append
    appendMessage(msg,'outgoing');
    textarea.value="";
    scrolltobottom();

    socket.emit('message',msg)
}

function appendMessage(msg,type){
    
    let maindiv=document.createElement('div');
    let className=type;
    maindiv.classList.add(className,'message');
    let markup=`
    <h4> ${msg.user}</h4>
    <p>${msg.message}</p>
    `

    maindiv.innerHTML=markup;

    messageArea.appendChild(maindiv);
}



//recive

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming');
    scrolltobottom();
})


function scrolltobottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}