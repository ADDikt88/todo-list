//import icon from "./icon.jpg";
import {projectList, selectedProjectID} from "./projectList.js";
import trashIcon from "./trash.svg";
import editIcon from "./edit.svg";


/*****
 * This is the main page of the to do list app and displays the current project and it's to do list.
 */


function mainpage () {
    const content = document.querySelector(".main-page");
    let currentProject = projectList[selectedProjectID];
    console.log(projectList + currentProject + selectedProjectID);
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
            taskDescription = "";

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
            taskDescription = "";

        currentProject.toDoItems[position].editItem(taskTitle, taskDescription, priorityLevel);
        console.log("UPDATED");
        return true;
    }
};

/****
 * These functions display the project header and the to-do-list frame
 */

function saveText(inputElement, currentProject) {
    const text = inputElement.value;
    console.log("Saved Project Info!");

}

function displayProjectHeader (content, currentProject) {
    const projectHeader = document.createElement("div");
    content.appendChild(projectHeader);
    
    const projectTitle = document.createElement("input");
    projectTitle.setAttribute("id","proj-title");
    projectTitle.setAttribute("type","text");
    projectTitle.setAttribute("autocomplete","off");

   


    projectTitle.addEventListener('change', function (e) {
        saveText(projectTitle, currentProject);
            currentProject.title = projectTitle.value;
            const currentProjectTitle = document.querySelector("#projID_" + selectedProjectID + " p");
            currentProjectTitle.textContent = projectTitle.value;
            projectTitle.blur();
            e.preventDefault();
    });
    
    const projectDescription = document.createElement("textarea");
    projectDescription.setAttribute("id","proj-desc");
    projectDescription.setAttribute("autocomplete","off");
    projectDescription.setAttribute("placeholder","Add a description...");
    projectDescription.setAttribute("rows","4");



    projectDescription.addEventListener('change', function(e) {
            currentProject.description = projectDescription.value;
            projectDescription.blur();
            e.preventDefault();
        });

    
    projectTitle.value = currentProject.title;
    projectDescription.value = currentProject.description;
    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(projectDescription);
  
}

function displayToDoItems (content, currentProject) {
    const toDoContainer = document.createElement("div");
    toDoContainer.setAttribute("class", "to-do-container");
    content.appendChild(toDoContainer);
    

    const addToDoItemBtn = document.createElement("button");
    addToDoItemBtn.setAttribute("class", "add-to-do-btn");
    toDoContainer.appendChild(addToDoItemBtn);
    addToDoItemBtn.textContent = "Add Task +";
    
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
      
        dialogForm.addEventListener('keydown', function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        });

        e.preventDefault();
    });

    
    for (let k = 0; k < (currentProject.toDoItems).length; k++)
    {
        console.log(currentProject.title);
        updateToDoItems(currentProject, toDoContainer, k);

    }



}

function setCollapsible (collapsibleDiv) {
    collapsibleDiv.addEventListener("click", function() {
        this.classList.toggle("active");
        const content = this.nextElementSibling;
        if (content.style.display === 'block'){
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        } 
    });

}

function updateToDoItems (currentProject, container, position) {

    //Create Task Item
    const toDoItem = document.createElement("div");
    toDoItem.setAttribute("class", "taskDiv");
    toDoItem.setAttribute("id", "projID_" + selectedProjectID + "_taskID_" + position);
    container.appendChild(toDoItem);

    //Create STATIC elements
    const toDoTitle = document.createElement("button");
    toDoTitle.setAttribute("class", "to-do-title");
    const toDoDescription = document.createElement("textarea");
    toDoDescription.setAttribute("class", "to-do-desc");
    toDoDescription.setAttribute("autocomplete","off");
    toDoDescription.setAttribute("rows","4");
    toDoDescription.setAttribute("placeholder", "Add some notes for this task...");
    

    toDoDescription.addEventListener('change', function(e) {
        currentProject.toDoItems[position].description = toDoDescription.value;
        toDoDescription.blur();
        e.preventDefault();
    });


    const priorityLevel = document.createElement("div");
    priorityLevel.setAttribute("class", "prio-flag");

    toDoTitle.textContent = currentProject.toDoItems[position].title;
    toDoTitle.style.fontSize = "1.5rem";
    toDoDescription.textContent = currentProject.toDoItems[position].description;
    priorityLevel.textContent = currentProject.toDoItems[position].priority;

    //Create FUNCTIONAL elements
    //create status element
    const titleDiv = document.createElement("div");
    titleDiv.setAttribute("class","task-title-div");
    //statusDiv.textContent = "Complete?";

    
    const status = document.createElement("input");
    status.style.width = "auto";
    status.setAttribute("type", "checkbox");
    status.setAttribute("class", "status-input");
    status.setAttribute("id", "projID_" + selectedProjectID + "_statusID_" + position);
    status.checked = currentProject.toDoItems[position].status;
    if (status.checked)
    {
        toDoItem.style.backgroundColor = "#a9f7c7";
    }

    currentProject.toDoItems[position].checkmark = status;


  

    //Checkbox listener for status
    status.addEventListener("change", function(e) {
        const currentCheck = e.target.id;
        const currentCheckID = currentCheck.split('_')[3];

        if (e.target.checked) {
            toDoItem.style.backgroundColor = "#a9f7c7";
            currentProject.toDoItems[currentCheckID].status = true;
            toDoTitle.style.backgroundColor = "#a9f7c7";
        } else {
            toDoItem.style.backgroundColor = "";
            toDoTitle.style.backgroundColor = "";
            currentProject.toDoItems[currentCheckID].status = false;
        }

    });

   

    //create edit/delete element
    const editDelDiv = document.createElement("div");
    editDelDiv.setAttribute("class", "edit-del-div");

    const editBtn = document.createElement("img");
    editBtn.src = editIcon;
    editBtn.height = "25";
    editBtn.setAttribute("class", "editBtn");
    editBtn.setAttribute("id", "projID_" + selectedProjectID + "_editID_" + position);

    currentProject.toDoItems[position].editBtn = editBtn;
    
    editBtn.textContent = "Edit";
    editDelDiv.appendChild(editBtn);

    const dialogForm = document.querySelector("#addActionForm");
    const dialog = document.querySelector("#addItemDialog");


    editBtn.addEventListener('click', (e) => {
        // dialogForm.reset();
        // When the user clicks the confirm button, close the dialog
        const currentButton = e.target.id;
        const currentButtonID = currentButton.split('_')[3];
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



    const delBtn = document.createElement("img");
    delBtn.src = trashIcon;
    delBtn.height = "25";
    delBtn.setAttribute("class", "delBtn");
    delBtn.setAttribute("id", "projID_" + selectedProjectID + "_delID_" + position);

    currentProject.toDoItems[position].delBtn = delBtn;

    delBtn.textContent = "Delete";
    editDelDiv.appendChild(delBtn);

    delBtn.addEventListener('click', (e) => {
        if (confirm("Are you sure you want to remove this task?") == true) {
            const currentButton = e.target.id;
            const currentButtonID = currentButton.split('_')[3];

            let taskToRemoveID = "#projID_" + selectedProjectID + "_taskID_" + currentButtonID;
            let taskToRemove = document.querySelector(taskToRemoveID);
            container.removeChild(taskToRemove);
            currentProject.toDoItems.splice(currentButtonID,1);
            
            let taskDivs = document.querySelectorAll(".taskDiv");
            let editBtns = document.querySelectorAll(".editBtn");
            let delBtns = document.querySelectorAll(".delBtn");
            let statusCheckmarks = document.querySelectorAll(".status-input");

            for (let k = 0; k < currentProject.toDoItems.length; k++)
            {
                taskDivs[k].setAttribute("id", "projID_" + selectedProjectID + "_taskID_" + k);
                editBtns[k].setAttribute("id", "projID_" + selectedProjectID + "_editID_" + k);
                delBtns[k].setAttribute("id", "projID_" + selectedProjectID + "_delID_" + k);
                statusCheckmarks[k].setAttribute("id", "projID_" + selectedProjectID + "_statusID_" + k);
            }

            console.log(currentProject.toDoItems);
        }
        e.preventDefault();
    });


    //Append all items
    toDoItem.appendChild(status)
    toDoItem.appendChild(titleDiv);
    titleDiv.appendChild(toDoTitle);
    titleDiv.appendChild(toDoDescription);
    toDoItem.appendChild(priorityLevel);
    toDoItem.appendChild(editDelDiv);

    setCollapsible(toDoTitle);
    console.log(currentProject.toDoItems);


}




export {mainpage, displayProjectHeader, displayToDoItems};