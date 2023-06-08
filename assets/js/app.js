// //Datos primitivos
// 5 //number
// 'String' //string
// false //boolean

// {} //Objeto
// [] //Array(Objeto)


// const Persona = () => {
// }
// const obj2 = new Object

// console.log(typeof obj1 === typeof obj2 )

// localStorage
//(Solo guarda datos como string)

// array vacio para almacenar las tareas
let tareas = []

// selecciona el elemento con el atributo id y lo asigna a la variable title
const title = document.getElementById('title')

// selecciona el elemento con el atributo id y lo asigna a la variable desc
const desc = document.getElementById('desc')

// selecciona el elemento con el atributo id y lo asigna a la variable boton
const boton = document.getElementById('boton')

// selecciona el elemento con el atributo id y lo asigna a la variable cuerpoTabla
const tabla = document.getElementById('cuerpoTabla')

// selecciona el elemento con el atributo id y lo asigna a la variable form
const form = document.getElementById('form')

// selecciona el elemento con el id y lo guarda en la variable actualizar
const actualizar = document.getElementById('actualizar')

// se cargan las tareas desde el local storage y enlitarlas al cargar la página
traerLS()
listar()

// edición de tarea
let editMode = false;
let idEditing = null;
// se agrega un evento al botón de creación de tarea
boton.addEventListener('click', crear)
// Función para crear una nueva tarea
function crear (e) {
  e.preventDefault()
  // crea un id único para la tarea
  let id = Date.now()
  // crear un objeto de tarea con los valores del formulario
  const tarea= {
    id,
    title: title.value,
    desc: desc.value,
    completed: false
  }
// agrega la tarea al array
// actualiza la tabla de tarea
// reinicia el formulario
  tareas.push(tarea)
  listar()
  resetForm()
// guarda las tareas en el local storage
  saveLS()
}
// carga las tareas desde el local storage
function traerLS () {
  // Obtiene las tareas guardadas en el local storage y las pasa como un array de objetos
  tareas = JSON.parse(localStorage.getItem('tareas'))

  if(tareas) {
    tareas = tareas
  } else {
    tareas = []
  }
}
// guarda las tareas en el local storage
function saveLS () {
  localStorage.setItem('tareas',JSON.stringify(tareas))
}

// muestra las tareas en la tabla
function listar () {
  // limpia el contenido de la tabla
  tabla.innerHTML = ''
  // Itera sobre cada tarea y agregar una fila a la tabla para cada tarea
  tareas.forEach( tarea => {
        // Determina el estado de la tarea, completado o pendiente
    const estado = tarea.completed ? 'Completado' : 'Registrado';
    // Agrega una nueva fila a la tabla con los datos de la tarea
    tabla.innerHTML += `
    <tr>
    <td>${tarea.title}</td>
    <td>${tarea.desc}</td>
    <td>${estado}</td>
    <td>
      <button class="editar-btn" onclick="editarFila(${tarea.id})">Editar</button>
      <button class="eliminar-btn" onclick="eliminarFila(${tarea.id})">Eliminar</button>
    </td>
  </tr>
`;
});
}
// reinicia el formulario
function resetForm () {
  form.reset()
}
// elimina una tarea
function eliminarFila (id) {
  // encuentra el indice de la tarea en el array de tareas
  const index = tareas.findIndex((el) => el.id == id)
// elimina la tarea del array
  tareas.splice(index, 1)
  // guarda los cambios en el local storage y actualiza la tabla
  saveLS()
  traerLS()
  listar()

}
// modo edicion de una tarea
function editarFila (id) {
  // activa edición y almacena el id de la tarea que se está editando
  editMode = true;
  editMode = true;
  idEditing = id;
  // oculta el botón de crear y muestra el botón de actualización
  boton.classList.add('hide');
  actualizar.classList.remove('hide');
  // encuentra el índice de la tarea en el array de tareas
  const index = tareas.findIndex((el) => el.id == id)

  const tarea = tareas[index]
  // completa los campos de la tabla con los valores de la tarea
  title.value = tarea.title
  desc.value = tarea.desc
}
// actualiza una tarea
function edit (e) {
  e.preventDefault()
  // encuentra el índice de la tarea en el array de tareas en edición
  const index = tareas.findIndex((el) => el.id == idEditing)
  // crea un objeto de tarea con los nuevos valores la tabla
  const tarea = {
    id: idEditing,
    title: title.value,
    desc: desc.value,
    completed: false
  }
  // reemplaza la tarea anterior con la tarea actualizada
  tareas[index] = tarea
  // guardar los cambios en local storage, actualiza la tabla y reiniciar el formulario
  saveLS()
  traerLS()
  listar()
  resetForm()
  // desactiva el modo de edición y restablecer el id edición
  editMode = false;
  idEditing = null;
  // muestra el botón de creación y ocultar el botón de actualización
  boton.classList.remove('hide');
  actualizar.classList.add('hide');
}
// agrega un evento al botón de actualización
actualizar.addEventListener('click', edit)

// funcion de reloj
function actualizarReloj() {
  var fechaActual = new Date();
  var hora = fechaActual.getHours();
  var minutos = fechaActual.getMinutes();
  var segundos = fechaActual.getSeconds();

  hora = hora < 10 ? "0" + hora : hora;
  minutos = minutos < 10 ? "0" + minutos : minutos;
  segundos = segundos < 10 ? "0" + segundos : segundos;

  document.getElementById("reloj").innerHTML = hora + ":" + minutos + ":" + segundos;
}
// Funcioón para actualizar el reloj a la hora actual
setInterval(actualizarReloj, 1000);

// Función obtener la fecha
function getCurrentDate() {
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return day + '/' + month + '/' + year;
}

// Función para visualizar fecha
function updateDateDisplay() {
  var dateDisplay = document.getElementById('date-display');
  dateDisplay.textContent = getCurrentDate();
}

// Actualizador de fecha
window.onload = updateDateDisplay;