const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textareaTarefa = document.querySelector('.app__form-textarea');
const ulTarefa = document.querySelector('.app__section-task-list')
const taskItem = document.querySelector('.app__section-task__item')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let selectedTask = null;

function createTaskElement(tarefa) {
    const li = document.createElement('li');
    li.classList.add('app__section-task__item');

    const checkImage = document.createElement('img');
    checkImage.setAttribute('src', './images/Check_branco.svg');
    checkImage.setAttribute('alt', 'check tarefa');

    const paragraph = document.createElement('p');
    paragraph.textContent = tarefa.descricao;
    paragraph.classList.add('app__section-task__item-text')

    const editTaskButton = document.createElement('button');
    editTaskButton.classList.add('app__section-task__item-button');

    editTaskButton.onclick = (e) => {
        // adicionado para não contar como clique no item li
        e.stopPropagation();
        checkImage.classList.toggle ('hidden')
        paragraph.classList.toggle('hidden')
        formTask.classList.toggle('hidden')
        editTaskButton.classList.toggle('hidden')
    }

    const editImage = document.createElement('img');
    editImage.setAttribute('src', './images/edit.png');
    editImage.setAttribute('alt', 'editar');

    editTaskButton.append(editImage);

    const formTask = document.createElement('form');
    formTask.classList.add('app__form-edit-task')
    formTask.classList.add('hidden')

    formTask.onclick = (e) => {
        // adicionado para não contar como clique no item li
        e.stopPropagation();
    }

    formTask.onsubmit = (e) => {
        e.preventDefault()

        tarefa.descricao = formTasktextarea.value
        paragraph.textContent = tarefa.descricao
        saveTasks()

        checkImage.classList.toggle ('hidden')
        paragraph.classList.toggle('hidden')
        formTask.classList.toggle('hidden')
        editTaskButton.classList.toggle('hidden')
    }

    const formTaskHeader = document.createElement('div');
    formTaskHeader.classList.add('app__form-head');

    const formTaskTitle = document.createElement('h2');
    formTaskTitle.classList.add('app__form-label');
    formTaskTitle.innerText = 'Editar Tarefa';

    const formTaskCloseEditButton = document.createElement('button');
    // por ter a mesma classe que o botao de editar, a funcao onclick vai funcionar para os dois botões
    // o comentário a cima é burrice, o que acontecia é que como não adicionei o type button,
    // estava contando como submit do formulário. Atualizava a página e por isso voltava ao estado original.
    formTaskCloseEditButton.classList.add('app__section-task__item-button');
    formTaskCloseEditButton.setAttribute('type', 'button');

    formTaskCloseEditButton.onclick = (e) => {
        // adicionado para não contar como clique no item li
        e.stopPropagation();
        checkImage.classList.toggle ('hidden')
        paragraph.classList.toggle('hidden')
        formTask.classList.toggle('hidden')
        editTaskButton.classList.toggle('hidden')
    }


    const closeImage = document.createElement('img');
    closeImage.setAttribute('src', './images/close.png');
    closeImage.setAttribute('alt', 'fechar');

    formTaskCloseEditButton.append(closeImage);

    const formTasktextarea = document.createElement('textarea');
    formTasktextarea.classList.add('app__form-textarea');
    formTasktextarea.setAttribute('required', '');
    formTasktextarea.setAttribute('rows', '4');
    formTasktextarea.innerText = tarefa.descricao;

    const formTaskFooter = document.createElement('footer');
    formTaskFooter.classList.add('app__form-footer');

    const formTaskFooterDelete = document.createElement('button');
    formTaskFooterDelete.classList.add('app__form-footer__button');
    formTaskFooterDelete.setAttribute('type', 'button');
    formTaskFooterDelete.innerText = 'Deletar';

    const deleteImage = document.createElement('img');
    deleteImage.setAttribute('src', './images/delete.png');
    deleteImage.setAttribute('alt', 'deletar');

    formTaskFooterDelete.prepend(deleteImage);

    formTaskFooterDelete.onclick = () => {
        const removeTaskConfirm = confirm('Remover tarefa?')
        if (removeTaskConfirm){
            deleteTask(tarefa);
            ulTarefa.removeChild(li)
        }
    }

    const formTaskFooterConfirm = document.createElement('button');
    formTaskFooterConfirm.classList.add('app__form-footer__button');
    formTaskFooterConfirm.classList.add('app__form-footer__button--confirm');
    formTaskFooterConfirm.innerText = 'Salvar';

    const saveImage = document.createElement('img');
    saveImage.setAttribute('src', './images/save.png');
    saveImage.setAttribute('alt', 'salvar');

    formTaskFooterConfirm.prepend(saveImage)

    formTaskHeader.append(formTaskTitle, formTaskCloseEditButton)
    formTaskFooter.append(formTaskFooterDelete, formTaskFooterConfirm);

    formTask.append(formTaskHeader, formTasktextarea, formTaskFooter);

    li.append(checkImage, paragraph, editTaskButton, formTask);

    li.onclick = () => {
        document.querySelectorAll('.app__section-task__item-active')
            .forEach(li => li.classList.remove('app__section-task__item-active'))

        if (selectedTask == tarefa) {
            selectedTask = null
            return
        }

        selectedTask = tarefa;
        li.classList.add('app__section-task__item-active');
    }


    return li;
}

function loadTask(tarefa) {
    const taskListElement = createTaskElement(tarefa);
    ulTarefa.append(taskListElement);
}

function saveTasks() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function deleteTask(tarefa) {
    tarefas = tarefas.filter(t => t != tarefa)
    saveTasks();
}

function loadTaskList() {
    tarefas.forEach(tarefa => {
        loadTask(tarefa)
    })
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
    loadTask(tarefa)
    saveTasks();
})

btnCancelar.addEventListener('click', () => {
    textareaTarefa.value = '';
    formAdicionarTarefa.classList.toggle('hidden');
})

loadTaskList();