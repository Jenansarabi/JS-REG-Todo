const form = document.querySelector('#form');
const input = document.querySelector('#input');
const output = document.querySelector('#output');

let todos = [];
//Använt fetch jsonplaceholder , begränsa idtodos från 200 till 15
//_start=0&_limit=5 
const fetchTodos = () => {
  
  fetch('https://jsonplaceholder.typicode.com/todos?_start=0&_limit=5')
  .then(res => res.json())
  .then(data => {
    todos = data.splice(0,10);
    console.log(todos);
    listTodos();
  })
}

fetchTodos();


//Skapa input och output addbtn.

const NewtoDO = (todo) => {

  let card = document.createElement('div');
  card.classList.add('card', 'p-2', 'my-3', 'todo');
  card.id="output";

  let innerCard = document.createElement('div');
  innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');
  innerCard.id=todo.id;


  let task = document.createElement('h3');
  task.classList.add('task');
  task.innerText = todo.title;

  

  let button = document.createElement('button');
  button.classList.add('btn', 'btn-danger');
  button.innerText = 'Delete';


  innerCard.appendChild(task);
  innerCard.appendChild(button);

  card.appendChild(innerCard);
  output.appendChild(card);
}


const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {


    NewtoDO(todo);
  })
}
//Skicka info till databasen

const createTodo = (title) => {

  fetch('https://jsonplaceholder.typicode.com/todos',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.id= Date.now();
    todos.unshift(data);
    listTodos();
  })

}


  //Lysna om det finns tasktitle,
  // Input ska inte vara tomt.
  //Valdering ska försvinna efter adding task
form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value !='')
  {
  createTodo(input.value);
  input.value = ''; 
  input.classList.add('is-valid');
  input.classList.remove('is-invalid');
  }
  else {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
  };

})

//Skapat click och completed variable att checka completed task.

output.addEventListener('click', e => {

  if(e.target.classList.contains('task'))
  {
    e.target.parentNode.classList.add('completed');
    //toggleComplete(e.target.parentNode.id);

    
  }
  if(e.target.classList.contains('btn-danger'))
  {
    if(e.target.parentNode.classList.contains('completed'))
    {
      deleteTodo(e.target.parentNode.id);
 

    }else
    {
      return false;
    }
    //alert('this is button'+e.target.parentNode.id);
}
 

})

//Ska det vara completed  då kan clicka på  delete för att tabort det.
const toggleComplete = (id) => {
  todos.map(todo => {
    if(todo.id == id){
      todo.completed =!todo.completed
    }
    return todo
    
  });
  listTodos(todos);

}

const deleteTodo = id => {
  todos = todos.filter(todo => todo.id !=id);
  listTodos(todos);
}

