const formulario = document.getElementById('formulario');
const input = document.getElementById('input')
const listaTarea = document.getElementById('lista-tareas');
const template = document.getElementById('template').content;
const fragment = document.createDocumentFragment();

let tareas = {
    1606095359472: {
        id: 1606095359472,
        texto: 'Tarea #1',
        estado: false
    },
    1606095451321: {
        id: 1606095451321,
        texto: 'Tarea #2',
        estado: false
    }
}

//console.log(Date.now())

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
    console.log('click')
    formulario.reset()
    input.focus()
}