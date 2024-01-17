document.addEventListener('DOMContentLoaded', () => {
  // Set the min attribute of the date input to the current date
  const currentDate = new Date().toISOString().split('T')[0];
  document.getElementById('task-deadline').min = currentDate;

  loadTasks();
});

let tasks = [];

function loadTasks() {
  const tasksList = document.getElementById('tasks-list');
  tasksList.innerHTML = '';

  const prioritySections = ['high', 'medium', 'low'];

  prioritySections.forEach(priority => {
    const priorityTasks = tasks.filter(task => task.priority === priority);

    if (priorityTasks.length > 0) {
      const prioritySection = document.createElement('div');
      prioritySection.className = 'priority-section';
      prioritySection.innerHTML = `
        <h3>${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</h3>
        <ul id="${priority}-tasks-list"></ul>
      `;
      tasksList.appendChild(prioritySection);

      const priorityTasksList = document.getElementById(`${priority}-tasks-list`);
      priorityTasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'task';
        listItem.innerHTML = `
          <div class="checkbox-container">
            <input type="checkbox" class="task-checkbox" onclick="toggleTaskCompletion(${tasks.indexOf(task)})" ${task.completed ? 'checked' : ''}>
            <label class="checkbox-label"></label>
          </div>
          <span>${task.name}</span>
          <span>Deadline: ${task.deadline}</span>
          <span>Priority: ${task.priority}</span>
          <button onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
        `;
        if (task.completed) {
          listItem.classList.add('completed');
        }
        priorityTasksList.appendChild(listItem);
      });
    }
  });
}

function addTask() {
  const taskNameInput = document.getElementById('task-name');
  const taskDeadlineInput = document.getElementById('task-deadline');
  const taskPriorityInput = document.getElementById('task-priority');

  const taskName = taskNameInput.value;
  const taskDeadline = taskDeadlineInput.value;
  const taskPriority = taskPriorityInput.value;

  if (taskName && taskDeadline && taskPriority) {
    const newTask = { name: taskName, deadline: taskDeadline, priority: taskPriority, completed: false };
    tasks.push(newTask);
    
    // Clear input fields
    taskNameInput.value = "";
    taskDeadlineInput.value = "";
    taskPriorityInput.value = "";

    // Reload tasks after adding a new one
    loadTasks();
  } else {
    alert('Please fill in all fields.');
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  
  // Reload tasks after deleting one
  loadTasks();
}

function toggleTaskCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  loadTasks();
}
