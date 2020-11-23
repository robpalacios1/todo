const formulario = document.getElementById('formulario');
const input = document.getElementById('input')
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

//let tareas = {
//    1606095359472: {
//        id: 1606095359472,
//        texto: 'Tarea #1',
//        estado: false
//    },
//    1606095451321: {
//        id: 1606095451321,
//        texto: 'Tarea #2',
//        estado: false
//    }
//}

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

    if (Object.values(tareas).length === 0) {
        listaTarea.innerHTML = `
        <div class="alert alert-dark text-center">
            ✌ No hay Tareas Para Mostrar ✌
        </div>
        `
        return
    }

    listaTarea.innerHTML = '';
    Object.values(tareas).forEach(tarea => {
        const clone = template.cloneNode(true)
        clone.querySelector('p').textContent = tarea.texto;

        if(tarea.estado) {
            clone.querySelector('.alert').classList.replace('alert-warning', 'alert-primary')
            clone.querySelectorAll('.fas')[0].classList.replace('fa-check-circle', 'fa-undo-alt')
            clone.querySelector('p').style.textDecoration = 'line-through'
        }

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

    if (e.target.classList.contains('fa-minus-circle')) {
        delete tareas[e.target.dataset.id]
        pintarTareas()
    }

    if (e.target.classList.contains('fa-undo-alt')) {
        console.log(e.target.dataset.id)
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }

    e.stopPropagation()
}