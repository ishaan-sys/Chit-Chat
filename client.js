const socket = io('http://localhost:8001');

const form = document.getElementById('send-container');
const messageInput =  document.getElementById('messageInp');
const messageContainer =  document.querySelector(".container");

const append = (message, postion)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add('position');
    messageContainer.append(messageElement);

}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'message right');
    socket.emit('send', message);
    messageInput.value = ''

})
const name = prompt("Enter you name to join Chit-Chat_Ishaan's chatting app");
socket.emit('new-user-joined', name)

socket.on('user-joined', name =>{
append(`${name} joined the chat`)
    
})

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'message left')    
    
})
