function render(messageId, messageText){

  const messageDiv = document.createElement('div'); //same
  messageDiv.classList.add('message'); //same
  messageDiv.id=messageId

  const newMessage = document.createElement('li'); //same
  newMessage.innerText=messageText;
  newMessage.classList.add('message-item'); //same
  messageDiv.appendChild(newMessage); //same

  //delete button
  const deleteButton = document.createElement('button'); //same
  deleteButton.innerHTML="delete"; //same
  deleteButton.classList.add("delete-button") //same
  messageDiv.appendChild(deleteButton); //same
  document.getElementById('message-list').appendChild(messageDiv) //same
  document.getElementById('message-list').addEventListener('click',deleteMessage) //same

}



const getData = async () => {
  const response = await fetch('messages');
  const data = await response.json();
  data.forEach(element => {
    if(!document.getElementById(element._id)) render(element._id, element.message)
    

  })
}

function deleteMessage(e){

  const item=e.target;  
  const toBeDeleted =item.parentElement;
  const messageID = toBeDeleted.id;
  console.log('Deleted: ',e.target.parentElement)
  deleteFromDB(messageID)

  function deleteFromFront(){

  }
  
  
  // toBeDeleted.remove();
// }
}


const deleteFromDB = async (messageID)=>{
  console.log('Look here! ', messageID)
  const toBeDeleted = {_id: messageID}
  const response = await fetch('/api',{
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(toBeDeleted)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    document.getElementById(messageID).remove();
  })

  
}

window.onload=function(){
  getData()
  document.getElementById('save').addEventListener('click',addMessage)
}
setInterval(()=>getData(), 2000)

function addMessage(event){

  event.preventDefault();

 
  const data = {message: document.getElementById('new-message').innerText, password: document.getElementById('pass').value}
  if(data){
  fetch('/api', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);


  const messageText=document.getElementById('desc').value;
  render(data._id, messageText)


  //clear the input box
  document.getElementById('desc').value="";
  document.getElementById('pass').value=""




  })
  .catch((error) => {
    console.error('Error:', error);
  });

}}