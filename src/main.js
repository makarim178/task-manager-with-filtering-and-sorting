const PRIORITY_ORDER_VALUE = {
  'high': 3,
  'medium': 2,
  'low': 1
}

export let tasks = []

export function addTask (task, priority) {
  // Add a new task and render the updated list
  tasks.push({
    id: Date.now(),
    task,
    priority,
    createdAt: Date.now()
  })
  renderTasks()
}

export function deleteTask (taskId) {
  // Remove the task with the given ID and render the updated list
  tasks = tasks.filter(task => task.id != taskId)
  renderTasks()
}

export function filterTasks (priority) {
  // return filtered tasks
  return priority === 'all' ? tasks : tasks.filter(task => task.priority === priority)
}

export function sortTasks (tasks, sortBy) {
  // return sorted tasks
  if (sortBy === 'priority') return tasks.sort((a,b) => PRIORITY_ORDER_VALUE[b.priority] - PRIORITY_ORDER_VALUE[a.priority])
  else if (sortBy === 'time') return tasks.sort((a,b) => b.createdAt - a.createdAt)
  return tasks
}

export function selectedOptions () {
  const filterSelect = document.getElementById('filter-select')
  const sortSelect = document.getElementById('sort-select')

  return {
    filterOption: filterSelect.value,
    sortOption: sortSelect.value
  }
}

// Expects a task object
export function createTaskElement (task) {
  const li = document.createElement('li')

  li.className = `priority-${task.priority}`
  li.innerHTML = `
    <span>${task.task}</span>
    <span class="priority-label">${task.priority}</span>
    <button class="delete-btn" data-id="${task.id}">Delete</button>
  `
  return li
}

export function renderTasks () {
  const taskList = document.getElementById('task-list')
  const { filterOption, sortOption } = selectedOptions()

  let renderList = filterTasks(filterOption)
  renderList = sortTasks(renderList, sortOption)
  
  taskList.innerHTML = ''

  renderList.forEach(task => {
    const taskElement = createTaskElement(task)
    taskList.appendChild(taskElement)
    const deleteElement = taskElement.querySelector('.delete-btn')
    deleteElement.addEventListener('click', event => deleteTask(event.target.dataset.id))
  })
}

export function main () {
  const addTaskBtn = document.getElementById('add-task-btn')
  const taskInput = document.getElementById('task-input')
  const prioritySelect = document.getElementById('priority-select')
  const filterSelect = document.getElementById('filter-select')
  const sortSelect = document.getElementById('sort-select')
  // Add event listeners and handle task addition, filtering, and sorting here

  addTaskBtn.addEventListener('click', () => {
    let task = taskInput.value.trim()
    if (!task) return
    addTask(task, prioritySelect.value)
    taskInput.value = ""
  })

  filterSelect.addEventListener('change', renderTasks)
  sortSelect.addEventListener('change', renderTasks)
}