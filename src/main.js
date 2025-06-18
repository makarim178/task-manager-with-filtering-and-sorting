export let tasks = []

const PRIORITY_VALUE = {
  'low': 1,
  'medium': 2,
  'high': 3
}

function clearInput() {
  const taskInput = document.getElementById('task-input')
  taskInput.value = ''
}

export function addTask (task, priority) {
  // Add a new task and render the updated list
  tasks.push({
      id: Date.now(),
      task,
      priority,
      createdAt: Date.now()
    })
}

// function removeDeleteBtnEvents() {
//   const deleteBtns = document.querySelectorAll('.delete-btn')
  
// }

export function deleteTask (taskId) {
  // Remove the task with the given ID and render the updated list
  tasks = tasks.filter(task => task.id != taskId)
  renderTasks(tasks)
}

export function filterTasks (priority) {
  // return filtered tasks
  if (priority !== 'all') {
    renderTasks(tasks.filter(task => task.priority === priority))
  } else renderTasks(tasks)
}

const sortByPriority = tasks => tasks.sort((a,b) => PRIORITY_VALUE[b.priority] - PRIORITY_VALUE[a.priority])
const sortByTime = tasks => tasks.sort((a,b) => b.createdAt - a.createdAt)

export function sortTasks (tasks, sortBy) {
  // return sorted tasks
  if (tasks.length < 2) return

  if(sortBy === 'priority') renderTasks(sortByPriority(tasks))
  else renderTasks(sortByTime(tasks))
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

export function renderTasks (renderTasksList) {
  const taskList = document.getElementById('task-list')
  const filterSelect = document.getElementById('filter-select')
  const sortSelect = document.getElementById('sort-select')

  let documentFragment = document.createDocumentFragment()
  renderTasksList.forEach(task => documentFragment.appendChild(createTaskElement(task)))
  taskList.replaceChildren(documentFragment)
}


export function main () {
  const addTaskBtn = document.getElementById('add-task-btn')
  const taskInput = document.getElementById('task-input')
  const prioritySelect = document.getElementById('priority-select')
  const filterSelect = document.getElementById('filter-select')
  const sortSelect = document.getElementById('sort-select')
  
  // Add event listeners and handle task addition, filtering, and sorting here
  const handleClickAddTask = event => {
    event.preventDefault()
    const task = taskInput.value.trim()
    if (task) {
      addTask(task, prioritySelect.value)
      renderTasks([...tasks])
      clearInput()
      const deleteBtns = document.querySelectorAll('.delete-btn')
      for(let deleteBtn of deleteBtns) deleteBtn.addEventListener('click', handleDeleteBtnClick)
    }
  }

  const handleFilterChange = event => {
    event.preventDefault()
    filterTasks(event.target.value)
  }

  const handleSortChange = event => {
    event.preventDefault()
    sortTasks([...tasks], sortSelect.value)
  }
  
  const handleDeleteBtnClick = event => {
    deleteTask(event.target.dataset.id)
  }

  addTaskBtn.addEventListener('click', handleClickAddTask)
  filterSelect.addEventListener('change', handleFilterChange)
  sortSelect.addEventListener('change', handleSortChange)
}
