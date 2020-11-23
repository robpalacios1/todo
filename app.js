const formulario = document.getElementById('formulario');
const input = document.getElementById('input')
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

let tareas = {}

document.addEventListener('DOMContentLoaded', () => {
    pintarTareas();
})

listaTarea.addEventListener('click', (e) => {
    btnAccion(e);
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log(e.target[0].value);
    //console.log(e.target.querySelector('input').value);
    //console.log(input.value)
    setTarea(e);
})

const setTarea = (e) => {
    if(input.value.trim() === '') {
        console.log('esta vacio')
        return
    }
    
    const tarea = {
        id: Date.now(),
        texto: input.value,
        estado: false
    }
    tareas[tarea.id] = tarea
    //console.log(tareas)
    formulario.reset()
    input.focus()
    pintarTareas()
}

const pintarTareas = () => {
    listaTarea.innerHTML = '';
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto;
        clone.querySelectorAll('.fas')[0].dataset.id = tarea.id
        clone.querySelectorAll('.fas')[1].dataset.id = tarea.id
        fragment.appendChild(clone)
    })
    listaTarea.appendChild(fragment)
}

const btnAccion = (e) => {
    //console.log(e.target.classList.contains('fa-check-circle'));
    if (e.target.classList.contains('fa-check-circle')) {
       console.log(e.target.dataset.id)
       tareas[e.target.dataset.id].estado = true
       pintarTareas()
    }
    e.stopPropagation()
}