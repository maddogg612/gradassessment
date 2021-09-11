const getData = async () => {
  const response = await fetch('messages');
  const data = await response.json();
  data.forEach(element => {
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.id=element._id
    const newMessage = document.createElement('li');
    newMessage.innerText=element.message;
    newMessage.classList.add('message-item');
    messageDiv.appendChild(newMessage);

    //delete button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML="delete";
    deleteButton.classList.add("delete-button")
    messageDiv.appendChild(deleteButton);
    document.getElementById('message-list').appendChild(messageDiv)
    document.getElementById('message-list').addEventListener('click',deleteMessage)

  })
}
getData()
// const messageList=document.getElementById('message-list')
// document.getElementById('message-list').addEventListener('click',deleteMessage)
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
  const response = await fetch('/',{
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(toBeDeleted)
  });
  /*deleting here causes a frontend error: Uncaught (in promise) SyntaxError: Unexpected end of JSON input at deleteFromDB (index.js:58), 
  but it all works. Without this there are no errors
  a try catch block or conditional to see if there is data causes all deletions to fail.
  If I leave the DOM deletion in deleteMessage there are no errors, but even non matching items get deleted until page refresh.
  I know I am short circuiting the fetch request, but this causes the page to behave as it should. If you are reviewing please advise,
  as I am obsessing over this.
  */
  const data = await response.json();
  console.log(data);
  document.getElementById(messageID).remove();
}

window.onload=function(){
  document.getElementById('save').addEventListener('click',addMessage)
}



function addMessage(event){

  event.preventDefault();

  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  
  const newMessage = document.createElement('li');
  newMessage.innerText=document.getElementById('desc').value;
  newMessage.classList.add('message-item');
  messageDiv.appendChild(newMessage);

  //delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML="delete";
  deleteButton.classList.add("delete-button")
  messageDiv.appendChild(deleteButton);



  const data = {message: newMessage.innerText, password: document.getElementById('pass').value}
  fetch('/', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);

  document.getElementById('message-list').appendChild(messageDiv)
  document.getElementById('message-list').addEventListener('click',deleteMessage)

  //add id 
 
  messageDiv.id=data._id


  //clear the input box
  document.getElementById('desc').value="";
  document.getElementById('pass').value=""




  })
  .catch((error) => {
    console.error('Error:', error);
  });

}