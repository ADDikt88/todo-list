//import icon from "./icon.jpg";
/*****
 * This is the main page of the to do list app and displays the current project and it's to do list.
 */

function mainpage () {
    const content = document.querySelector(".main-page");
       
    displayProjectHeader (content);
    displayToDoItems (content);
    

    
}

function createProject (title, description, toDoItems) {


    
    return {
        title, description, toDoItems,
    }

}

function createToDo (title, description, priority) {

    return {
        title, description, priority
    }

}

let listOfItems = [];
listOfItems.push(createToDo("First to do item", "Create an HTML file", "high"));

let defaultProject = createProject ("Default", "This is a default project description", listOfItems);

function addToDo(currenTaskList, e, dialog) {

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

        defaultProject.toDoItems.push(createToDo(taskTitle, taskDescription, prioirtyLevel));
        console.log("UPDATED");
        updateToDoItems();
        //e.preventDefault();
        //libraryContainer.appendChild(myLibrary[myLibrary.length - 1].createBook());
        return true;
    }
};

function addAction(container, addToDoItemBtn) {
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
        if(addToDo(listOfItems, e, dialog))
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
function displayProjectHeader (content) {
    const projectHeader = document.createElement("div");
    content.appendChild(projectHeader);
    
    const projectTitle = document.createElement("div");
    const projectDescription = document.createElement("div");
    projectTitle.textContent = defaultProject.title;
    projectDescription.textContent = defaultProject.description;
    projectHeader.appendChild(projectTitle);
    projectHeader.appendChild(projectDescription);
}

function displayToDoItems (content) {
    const toDoContainer = document.createElement("div");
    toDoContainer.setAttribute("class", "to-do-container");
    content.appendChild(toDoContainer);

    const addToDoItemBtn = document.createElement("button");
    toDoContainer.appendChild(addToDoItemBtn);
    addToDoItemBtn.textContent = "Add Task";

    const toDoItem = document.createElement("div");
    toDoContainer.appendChild(toDoItem);

    const toDoTitle = document.createElement("div");
    const toDoDescription = document.createElement("div");
    const priorityLevel = document.createElement("div");

    toDoTitle.textContent = defaultProject.toDoItems[0].title;
    toDoDescription.textContent = defaultProject.toDoItems[0].description;
    priorityLevel.textContent = defaultProject.toDoItems[0].priority;
    toDoItem.appendChild(toDoTitle);
    toDoItem.appendChild(toDoDescription);
    toDoItem.appendChild(priorityLevel);

    addAction(toDoContainer, addToDoItemBtn);


}

function updateToDoItems () {
    const toDoContainer = document.querySelector(".to-do-container");
    const toDoItem = document.createElement("div");
    toDoContainer.appendChild(toDoItem);

    const toDoTitle = document.createElement("div");
    const toDoDescription = document.createElement("div");
    const priorityLevel = document.createElement("div");

    toDoTitle.textContent = defaultProject.toDoItems[defaultProject.toDoItems.length-1].title;
    toDoDescription.textContent = defaultProject.toDoItems[defaultProject.toDoItems.length-1].description;
    priorityLevel.textContent = defaultProject.toDoItems[defaultProject.toDoItems.length-1].priority;

    toDoItem.appendChild(toDoTitle);
    toDoItem.appendChild(toDoDescription);
    toDoItem.appendChild(priorityLevel);

    console.log(defaultProject.toDoItems);

}


export {mainpage, defaultProject};