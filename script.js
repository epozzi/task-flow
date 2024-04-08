const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textareaTarefa = document.querySelector('.app__form-textarea');
const ulTarefa = document.querySelector('.app__section-task-list')

const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task__item');

    const checkImage = document.createElement('img');
    checkImage.setAttribute('src', './images/Check_branco.svg');
    checkImage.setAttribute('alt', 'check tarefa');


    const paragraph = document.createElement('p');
    paragraph.innerText = tarefa.descricao;
    paragraph.classList.add('app__section-task__item-text')

    const taskButton = document.createElement('button');
    taskButton.classList.add('app__section-task__item-button');

    const editImage = document.createElement('img')
    editImage.setAttribute('src', './images/edit.png')
    editImage.setAttribute('alt', 'editar')

    taskButton.append(editImage);

    li.append(checkImage, paragraph, taskButton);

    return li;
}

function carregarTarefa(tarefa) {
    const taskListElement = criarElementoTarefa(tarefa);
    ulTarefa.append(taskListElement);
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

formAdicionarTarefa.addEventListener('submit', (e) => {
    e.preventDefault();

    tarefa = {
        descricao: textareaTarefa.value
    }

    const listaTarefas = localStorage.getItem('tarefas');

    if (listaTarefas && listaTarefas.includes(JSON.stringify(tarefa))) {
        alert('Tarefa repetida')
        return;
    }

    tarefas.push(tarefa);
    carregarTarefa(tarefa)
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
})

btnCancelar.addEventListener('click', () => {
    textareaTarefa.value = '';
    formAdicionarTarefa.classList.toggle('hidden');
})

tarefas.forEach(tarefa => {
    carregarTarefa(tarefa)
})