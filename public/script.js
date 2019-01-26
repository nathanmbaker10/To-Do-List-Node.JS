function newItemClicked() {
  var taskNameBox = document.getElementById("taskNameBox")
  var dueDateBox = document.getElementById("dueDateBox")
  taskNameBox.placeholder = "Task Name"
  dueDateBox.placeholder = "Due Date"
  console.log("Hello")
  var taskObject = {
    name: document.getElementById("taskNameBox").value,
    dueDate: document.getElementById("dueDateBox").value
  };
  taskNameBox.value = ""
  dueDateBox.value = ""
  taskLength++;
  console.log("Task Length: " + taskLength);
  $.ajax ({
        url: 'https://to-do-list-node-albinson.herokuapp.com/additem?name=' + taskObject.name + '&dueDate=' + taskObject.dueDate,
        type: "POST",
        success: populateTable
})
}

function populateTable(taskData) {
  console.log("Populate!");
  document.getElementById("taskTable").innerHTML = ""
  var taskTable = document.getElementById("taskTable")
  taskLength = taskData.length
  console.log("Server task length:" + taskLength);
  for (var i = 0; i < taskData.length; i++) {
    console.log()
    addRow(taskData[i].name, taskData[i].dueDate, taskData[i]["_id"])
  }
  addButtonOnClick()
}

$(document).ready(function(){
    addButtonOnClick()
  })

function addRow(name, dueDate, id){
  var newRow = document.createElement("tr");
  var itemCell = document.createElement("td");
  var dueDateCell = document.createElement("td");
  var removeCell = document.createElement("td");
  var removeButton = document.createElement("button")
  removeButton.id = id
  removeButton.classList.add("removeButton")
  removeButton.innerHTML = "X"
  itemCell.innerHTML = name
  dueDateCell.innerHTML = dueDate
  removeCell.appendChild(removeButton)
  newRow.appendChild(itemCell);
  newRow.appendChild(dueDateCell)
  newRow.appendChild(removeCell)
  document.getElementById("taskTable").appendChild(newRow)
}

function addButtonOnClick(){
  $(".removeButton").on('click', function(){
    $.ajax ({
        url: 'https://to-do-list-node-albinson.herokuapp.com/buttonclick?id=' + this.id,
        type: "POST",
        success: populateTable
       })
    })
}
