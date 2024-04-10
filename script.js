const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const btnCancelar = document.querySelector('.app__form-footer__button--cancel');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textareaTarefa = document.querySelector('.app__form-textarea');
const ulTarefa = document.querySelector('.app__section-task-list')
const taskItem = document.querySelector('.app__section-task__item')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let selectedTask = null;
let liSelectedTask = null;

function createTaskElement(tarefa) {

    // nested function
    // declarei dentro da função pois fora dela não tem acesso aos elementos criado por ela
    const toggleHiddenFormTask = () => {
        checkCircleImage.classList.toggle('hidden')
        paragraph.classList.toggle('hidden')
        formTask.classList.toggle('hidden')
        editTaskButton.classList.toggle('hidden')
    }

    const applyCompleteTaskStyles = () => {
        li.classList.remove('app__section-task__item-active')
        li.classList.add('app__section-task__item-complete')
        li.setAttribute('disabled', 'disabled')
        checkCircleImage.setAttribute('src', './images/check_green.svg')
        editTaskButton.setAttribute('disabled', 'disabled')
    }

    const li = document.createElement('li');
    li.classList.add('app__section-task__item');

    const checkCircleImage = document.createElement('img');
    checkCircleImage.setAttribute('src', './images/check_white.svg');
    checkCircleImage.setAttribute('alt', 'check tarefa');

    const paragraph = document.createElement('p');
    paragraph.textContent = tarefa.descricao;
    paragraph.classList.add('app__section-task__item-text')

    const editTaskButton = document.createElement('button');
    editTaskButton.classList.add('app__section-task__item-button');

    editTaskButton.onclick = (e) => {
        // adicionado para não contar como clique no item li
        e.stopPropagation();
        toggleHiddenFormTask();
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
        toggleHiddenFormTask();
    }

    const formTaskHeader = document.createElement('div');
    formTaskHeader.classList.add('app__form-head');

    const formTaskTitle = document.createElement('h2');
    formTaskTitle.classList.add('app__form-label');
    formTaskTitle.innerText = 'Editar Tarefa';

    const formTaskHeaderCompleteBtn = document.createElement('button');
    formTaskHeaderCompleteBtn.classList.add('app__form-header__button');
    formTaskHeaderCompleteBtn.setAttribute('type', 'button');
    formTaskHeaderCompleteBtn.innerText = 'Concluir';

    const checkImage = document.createElement('img');
    checkImage.setAttribute('src', './images/check.svg');
    checkImage.setAttribute('alt', 'check tarefa');

    formTaskHeaderCompleteBtn.prepend(checkImage);

    formTaskHeaderCompleteBtn.onclick = () => {
        applyCompleteTaskStyles();
        toggleHiddenFormTask()

        tarefa = {
            descricao: tarefa.descricao,
            complete: true
        }

        updateTask(tarefa)
    }

    const formTaskCloseEditButton = document.createElement('button');
    // por ter a mesma classe que o botao de editar, a funcao onclick vai funcionar para os dois botões
    // o comentário a cima é burrice, o que acontecia é que como não adicionei o type button,
    // estava contando como submit do formulário. Atualizava a página e por isso voltava ao estado original.
    formTaskCloseEditButton.classList.add('app__section-task__item-button');
    formTaskCloseEditButton.setAttribute('type', 'button');

    formTaskCloseEditButton.onclick = (e) => {
        // adicionado para não contar como clique no item li
        e.stopPropagation()
        toggleHiddenFormTask()
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

    const formTaskFooterDeleteBtn = document.createElement('button');
    formTaskFooterDeleteBtn.classList.add('app__form-footer__button');
    formTaskFooterDeleteBtn.setAttribute('type', 'button');
    formTaskFooterDeleteBtn.innerText = 'Deletar';

    const deleteImage = document.createElement('img');
    deleteImage.setAttribute('src', './images/delete.png');
    deleteImage.setAttribute('alt', 'deletar');

    formTaskFooterDeleteBtn.prepend(deleteImage);

    formTaskFooterDeleteBtn.onclick = () => {
        const removeTaskConfirm = confirm('Remover tarefa?')
        if (removeTaskConfirm){
            deleteTask(tarefa);
            ulTarefa.removeChild(li)
        }
    }

    const formTaskFooterSaveBtn = document.createElement('button');
    formTaskFooterSaveBtn.classList.add('app__form-footer__button');
    formTaskFooterSaveBtn.classList.add('app__form-footer__button--confirm');
    formTaskFooterSaveBtn.innerText = 'Salvar';

    const saveImage = document.createElement('img');
    saveImage.setAttribute('src', './images/save.png');
    saveImage.setAttribute('alt', 'salvar');

    formTaskFooterSaveBtn.prepend(saveImage);

    formTaskHeader.append(formTaskTitle, formTaskHeaderCompleteBtn, formTaskCloseEditButton)
    formTaskFooter.append(formTaskFooterDeleteBtn, formTaskFooterSaveBtn);

    formTask.append(formTaskHeader, formTasktextarea, formTaskFooter);

    li.append(checkCircleImage, paragraph, editTaskButton, formTask);

    li.onclick = () => {
        if (tarefa.complete) {
            return
        }

        document.querySelectorAll('.app__section-task__item-active')
            .forEach(li => li.classList.remove('app__section-task__item-active'))

        if (selectedTask == tarefa) {
            selectedTask = null
            liSelectedTask = null
            return
        }

        selectedTask = tarefa
        liSelectedTask = li
        li.classList.add('app__section-task__item-active')
    }

    if (tarefa.complete) {
        applyCompleteTaskStyles()
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

function updateTask(tarefa) {
    tarefas = tarefas.map(t => {
        if (t.descricao === tarefa.descricao) {
            return tarefa
        }
        return t
    })
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