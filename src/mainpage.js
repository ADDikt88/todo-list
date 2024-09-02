//import icon from "./icon.jpg";
/*****
 * This is the main page of the to do list app and displays the current project and it's to do list.
 */

function mainpage () {
    const content = document.querySelector(".main-page");
       
    displayProjectHeader (content, defaultProject);
    displayToDoItems (content, defaultProject);
  
    
}

function createProject (title, description, toDoItems) {

    return {
        title, description, toDoItems,
    }

}

function createToDo (title, description, priority, status) {

    function changeStatus (){
        if (status)
            this.status = false;
        else
            this.status = true;
    }

    return {
        title, description, priority, status, changeStatus,
    }

}

let listOfItems = [];
listOfItems.push(createToDo("First to do item", "Create an HTML file", "high", false));

let defaultProject = createProject ("Default", "This is a default project description", listOfItems);

function addToDo(currenTaskList, currentProject, container) {

    let taskTitle = document.querySelector("#taskTitle").value;
    let taskDescription = document.querySelector("#taskDescription").value;
    let prioirtyLevel = document.querySelector("#priorityLevel").value;

    //newBook.id = myLibrary.length;
    
    
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

        currentProject.toDoItems.push(createToDo(taskTitle, taskDescription, prioirtyLevel, false));
        console.log("UPDATED");
        const position = defaultProject.toDoItems.length - 1;
        updateToDoItems (defaultProject, container, position);
        //e.preventDefault();
        //libraryContainer.appendChild(myLibrary[myLibrary.length - 1].createBook());
        return true;
    }
};

function addAction(container, addToDoItemBtn, currentProject) {
    const dialog = document.querySelector("#addItemDialog");
    const confirmBtn = document.querySelector("#confirmBtn");
    const closeDialogBtn = document.querySelector("#closeDialogBtn");

    addToDoItemBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    // When the user clicks the confirm button, close the dialog
    confirmBtn.addEventListener('click', (e) => {
        //add an item function
        console.log("CONFIRM");
        if(addToDo(listOfItems, currentProject, container))
        {
            
            dialog.close();
            console.log("Close dialogue");
        }
        e.preventDefault();        
        

    });

    // When the user clicks the close button, close the dialog
    closeDialogBtn.addEventListener('click', (e) => {
        dialog.close();
    });

    
}

    







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
    content.appendChild(toDoContainer);

    const addToDoItemBtn = document.createElement("button");
    toDoContainer.appendChild(addToDoItemBtn);
    addToDoItemBtn.textContent = "Add Task";

    updateToDoItems (currentProject, toDoContainer, 0);
    addAction(toDoContainer, addToDoItemBtn, currentProject);


}

function updateToDoItems (currentProject, container, position) {

    const toDoItem = document.createElement("div");
    toDoItem.setAttribute("id", "taskID_" + position)
    container.appendChild(toDoItem);

    const statusDiv = document.createElement("div");
    statusDiv.textContent = "Complete?";
    statusDiv.style.display = "flex";
    const status = document.createElement("input");
    status.setAttribute("type", "checkbox");
    statusDiv.appendChild(status);

    const toDoTitle = document.createElement("div");
    const toDoDescription = document.createElement("div");
    const priorityLevel = document.createElement("div");

    toDoTitle.textContent = currentProject.toDoItems[position].title;
    toDoDescription.textContent = currentProject.toDoItems[position].description;
    priorityLevel.textContent = currentProject.toDoItems[position].priority;

    toDoItem.appendChild(statusDiv);
    toDoItem.appendChild(toDoTitle);
    toDoItem.appendChild(toDoDescription);
    toDoItem.appendChild(priorityLevel);

    //Checkbox listener for status
    statusDiv.addEventListener("change", function(e) {
        if (e.target.checked) {
            toDoItem.style.backgroundColor = "#a9f7c7";
        } else {
            toDoItem.style.backgroundColor = "";
        }
    });

    console.log(currentProject.toDoItems);

}


export {mainpage, defaultProject};