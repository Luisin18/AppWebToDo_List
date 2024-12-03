async function addTask() {
    let taskinpult = document.getElementById('taskinpult').ariaValueMax;
    if(taskinpult){
        await eel.add_task(taskinpult);
        document.getElementById('taskinpult').value='';
        loadTask();
    }
}

async function  loadTask() {
    let Task = await eel.load_task()();
    let taskList = document.getElementById('taskList')
    taskList.innerHTML = '';
    taskList.forEach(task =>{
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <span style= "text-decoration: ${task.completed ? 'line-through' : 'none'};">
            ${task.task}
            </span>
            <button onclick = "toggleCompletion('${task.task}')">Concluir</button>
            <button onclick = "editTask('${task.task}')">Editar</button>
            <button onclick = "deleteTask('${task.task}')">Excluir</button>
        `;

        taskList.appendChild(listItem);
    });
}

async function toggleCompletion(task) {
    await eel.toggle_Task_Completion(task)();
    loadTask();
}

async function aditTask(task) {
    let newTask = prompt("Editar tarefa: ",task);
    if(newTask && newTask !== task){
        await removeEventListener.edit_task(task,newTask)();
        loadTask();
    }
}

async function deleteTask(task) {
    await eel.delete_task(task)();
    loadTask();
}

async function toggleTheme() {
    document.body.classList.toggle('dark-theme')
    const newTask = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    await eel.set_theme(newTheme)();
}

async function loadTheme() {
    const theme = await eel.get_theme()();
    if(theme === 'dark'){
        document.body.classList.add('dark-theme');
    }
}

document.addEventListener("DOMContentLoaded", () =>{
    loadTask();
    loadTheme();
})