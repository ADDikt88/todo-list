//import icon from "./icon.jpg";
import {projectList, selectedProjectID} from "./projectList.js";


/*****
 * This is the main page of the to do list app and displays the current project and it's to do list.
 */

//let currentProject = projectList[selectedProjectID];
//listOfItems.push(createToDo("First to do item", "Create an HTML file", "high", false));

function mainpage () {
    const content = document.querySelector(".main-page");
    let currentProject = projectList[selectedProjectID];
    displayProjectHeader (content, currentProject);
    displayToDoItems (content, currentProject);
 
}

function createToDo (title, description, priority, editBtn, delBtn, checkmark, status) {


    function editItem (newTitle, newDesc, newPriority) {
        this.title = newTitle;
        this.description = newDesc;
        this.priority = newPriority;
    }

    return {
        title, description, priority, status, editItem, editBtn, delBtn, checkmark,
    }

}




//These two functions add or edit the to do list
function addToDo(currentProject, container) {

    let taskTitle = document.querySelector("#taskTitle").value;
    let taskDescription = document.querySelector("#taskDescription").value;
    let priorityLevel = document.querySelector("#priorityLevel").value;

    console.log(currentProject.title);
    if (taskTitle < 1)
    {
        alert("Please enter a new task title");
        console.log("TRY AGAIN");
        
        return false;
    }
    else 
    {   
        if (taskDescription < 1)
            taskDescription = "_";

        currentProject.toDoItems.push(createToDo(taskTitle, taskDescription, priorityLevel, 
            undefined, undefined, undefined, false));
        console.log("UPDATED");
        const position = currentProject.toDoItems.length - 1;
        updateToDoItems (currentProject, container, position);
        return true;
        
        
    }
};


function editToDo(currentProject, container, position) {

    let taskTitle = document.querySelector("#taskTitle").value;
    let taskDescription = document.querySelector("#taskDescription").value;
    let priorityLevel = document.querySelector("#priorityLevel").value;
    
    if (taskTitle < 1)
    {
        alert("Please enter a new task title");
        console.log("TRY AGAIN");
        return false;
    }
    else 
    {   
        if (taskDescription < 1)
            taskDescription = "_";

        currentProject.toDoItems[position].editItem(taskTitle, taskDescription, priorityLevel);
        console.log("UPDATED");
        return true;
    }
};

/****
 * These functions display the project header and the to-do-list frame
 */
function displayProjectHeader (content, currentProject) {
    const projectHeader = document.createElement("div");
    content.appendChild(projectHeader);
    
    const projectTitle = document.createElement("div");
    const projectDescription = document.createElement("div");
    projectTitle.textContent = currentProject.title;
    projectDescription.textContent = currentProject.description;
    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(projectDescription);
  
}

function displayToDoItems (content, currentProject) {
    const toDoContainer = document.createElement("div");
    toDoContainer.setAttribute("class", "to-do-container");
    toDoContainer.style.display = "flex";
    toDoContainer.style.flexDirection = "column";
    toDoContainer.style.gap = "10px";
    content.appendChild(toDoContainer);
    

    const addToDoItemBtn = document.createElement("button");
    toDoContainer.appendChild(addToDoItemBtn);
    addToDoItemBtn.textContent = "Add Task";
    
    const dialogForm = document.querySelector("#addActionForm");
    const dialog = document.querySelector("#addItemDialog");

    addToDoItemBtn.addEventListener('click', (e) => {
        console.log("add task clicked");
        dialogForm.reset();
        // When the user clicks the confirm button, close the dialog
        confirmBtn.onclick = function(e) {
            //add an item function
            console.log("CONFIRM");
            if(addToDo(currentProject, toDoContainer))
                dialog.close();
            e.preventDefault();
        }

        // When the user clicks the close button, close the dialog
        closeDialogBtn.onclick = function(e) {
            dialog.close();
            e.preventDefault();
        }
        dialog.showModal();
      
        e.preventDefault();
    });

    //updateToDoItems (currentProject, toDoContainer, 0);

}

function updateToDoItems (currentProject, container, position) {

    //Create Task Item
    const toDoItem = document.createElement("div");
    toDoItem.setAttribute("class", "taskDiv");
    toDoItem.setAttribute("id", "taskID_" + position);
    toDoItem.style.padding = "5px";
    toDoItem.style.margin = "5px";
    container.appendChild(toDoItem);

    //Create STATIC elements
    const toDoTitle = document.createElement("div");
    const toDoDescription = document.createElement("div");
    const priorityLevel = document.createElement("div");

    toDoTitle.textContent = currentProject.toDoItems[position].title;
    toDoTitle.style.fontSize = "1.5rem";
    toDoDescription.textContent = currentProject.toDoItems[position].description;
    priorityLevel.textContent = currentProject.toDoItems[position].priority;

    //Create FUNCTIONAL elements
    //create status element
    const titleDiv = document.createElement("div");
    //statusDiv.textContent = "Complete?";
    titleDiv.style.display = "flex";
    titleDiv.style.alignItems = "center";
    titleDiv.style.justifyContent = "flex-start";
    titleDiv.style.gap = "5px";
    
    const status = document.createElement("input");
    status.style.width = "auto";
    status.setAttribute("type", "checkbox");
    status.setAttribute("class", "statusInput");
    status.setAttribute("id", "statusID_" + position);
    currentProject.toDoItems[position].checkmark = status;

    status.style.transform = "scale(1.5)";
    status.style.margin = "5px";
    titleDiv.appendChild(status);

    //Checkbox listener for status
    status.addEventListener("change", function(e) {
        const currentCheck = e.target.id;
        const currentCheckID = currentCheck.split('_')[1];

        if (e.target.checked) {
            toDoItem.style.backgroundColor = "#a9f7c7";
            currentProject.toDoItems[currentCheckID].status = true;
        } else {
            toDoItem.style.backgroundColor = "";
            currentProject.toDoItems[currentCheckID].status = false;
        }

    });

   

    //create edit/delete element
    const editDelDiv = document.createElement("div");
    editDelDiv.style.display = "flex";
    editDelDiv.style.justifyContent = "space-around";
    
    const editBtn = document.createElement("button");
    editBtn.setAttribute("class", "editBtn");
    editBtn.setAttribute("id", "editID_" + position);

    currentProject.toDoItems[position].editBtn = editBtn;
    
    editBtn.textContent = "Edit";
    editDelDiv.appendChild(editBtn);

    const dialogForm = document.querySelector("#addActionForm");
    const dialog = document.querySelector("#addItemDialog");


    editBtn.addEventListener('click', (e) => {
        // dialogForm.reset();
        // When the user clicks the confirm button, close the dialog
        const currentButton = e.target.id;
        const currentButtonID = currentButton.split('_')[1];
        document.querySelector("#taskTitle").value = currentProject.toDoItems[currentButtonID].title;
        document.querySelector("#taskDescription").value = currentProject.toDoItems[currentButtonID].description;
        document.querySelector("#priorityLevel").value = currentProject.toDoItems[currentButtonID].priority;
        
        confirmBtn.onclick = function(e) {
            //add an item function
            console.log("CONFIRM");
            if(editToDo(currentProject, container, currentButtonID)){
                dialog.close();
                toDoTitle.textContent = currentProject.toDoItems[currentButtonID].title;
                toDoDescription.textContent = currentProject.toDoItems[currentButtonID].description;
                priorityLevel.textContent = currentProject.toDoItems[currentButtonID].priority;
            }
                
            e.preventDefault();
        }

        // When the user clicks the close button, close the dialog
        closeDialogBtn.onclick = function(e) {
            dialog.close();
            e.preventDefault();
        }
        dialog.showModal();
      
        e.preventDefault();
    });




    const delBtn = document.createElement("button");
    delBtn.setAttribute("class", "delBtn");
    delBtn.setAttribute("id", "delID_" + position);

    currentProject.toDoItems[position].delBtn = delBtn;

    delBtn.textContent = "Delete";
    editDelDiv.appendChild(delBtn);

    delBtn.addEventListener('click', (e) => {
        if (confirm("Are you sure you want to remove this task?") == true) {
            const currentButton = e.target.id;
            const currentButtonID = currentButton.split('_')[1];

            let taskToRemoveID = "#taskID_" + currentButtonID;
            let taskToRemove = document.querySelector(taskToRemoveID);
            container.removeChild(taskToRemove);
            currentProject.toDoItems.splice(currentButtonID,1);
            
            let taskDivs = document.querySelectorAll(".taskDiv");
            let editBtns = document.querySelectorAll(".editBtn");
            let delBtns = document.querySelectorAll(".delBtn");
            let statusCheckmarks = document.querySelectorAll(".statusInput");

            for (let k = 0; k < currentProject.toDoItems.length; k++)
            {
                taskDivs[k].setAttribute("id", "taskID_" + k);
                editBtns[k].setAttribute("id", "editID_" + k);
                delBtns[k].setAttribute("id", "delID_" + k);
                statusCheckmarks[k].setAttribute("id", "statusID_" + k);
            }

            console.log(currentProject.toDoItems);
        }
        e.preventDefault();
    });


    //Append all items

    toDoItem.appendChild(titleDiv);
    titleDiv.appendChild(toDoTitle);
    toDoItem.appendChild(toDoDescription);
    toDoItem.appendChild(priorityLevel);
    toDoItem.appendChild(editDelDiv);



    console.log(currentProject.toDoItems);

}


export {mainpage, displayProjectHeader, displayToDoItems};