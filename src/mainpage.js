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

    function editItem (newTitle, newDesc, newPriority) {
        this.title = newTitle;
        this.description = newDesc;
        this.priority = newPriority;
    }

    return {
        title, description, priority, status, changeStatus, editItem,
    }

}

let listOfItems = [];
listOfItems.push(createToDo("First to do item", "Create an HTML file", "high", false));

let defaultProject = createProject ("Default", "This is a default project description", listOfItems);

function addToDo(currenTaskList, currentProject, container) {

    let taskTitle = document.querySelector("#taskTitle").value;
    let taskDescription = document.querySelector("#taskDescription").value;
    let priorityLevel = document.querySelector("#priorityLevel").value;

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

        currentProject.toDoItems.push(createToDo(taskTitle, taskDescription, priorityLevel, false));
        console.log("UPDATED");
        const position = defaultProject.toDoItems.length - 1;
        updateToDoItems (defaultProject, container, position);
        //libraryContainer.appendChild(myLibrary[myLibrary.length - 1].createBook());
        return true;
    }
};


function editToDo(currentProject, container, position) {

    //newBook.id = myLibrary.length;    


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

        currentProject.toDoItems[position].editItem(taskTitle, taskDescription,priorityLevel);
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
        dialogForm.reset();
        // When the user clicks the confirm button, close the dialog
        confirmBtn.onclick = function(e) {
            //add an item function
            console.log("CONFIRM");
            if(addToDo(listOfItems, currentProject, toDoContainer))
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

    updateToDoItems (currentProject, toDoContainer, 0);

}

function updateToDoItems (currentProject, container, position) {

    //Create Task Item
    const toDoItem = document.createElement("div");
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
    status.style.transform = "scale(1.5)";
    status.style.margin = "5px";
    titleDiv.appendChild(status);

    //Checkbox listener for status
    status.addEventListener("change", function(e) {
        if (e.target.checked) {
            toDoItem.style.backgroundColor = "#a9f7c7";
        } else {
            toDoItem.style.backgroundColor = "";
        }
    });

    //create edit/delete element
    const editDelDiv = document.createElement("div");
    editDelDiv.style.display = "flex";
    editDelDiv.style.justifyContent = "space-around";
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editDelDiv.appendChild(editBtn);

    const dialogForm = document.querySelector("#addActionForm");
    const dialog = document.querySelector("#addItemDialog");




    editBtn.addEventListener('click', (e) => {
        // dialogForm.reset();
        // When the user clicks the confirm button, close the dialog

        document.querySelector("#taskTitle").value = currentProject.toDoItems[position].title;
        document.querySelector("#taskDescription").value = currentProject.toDoItems[position].description;
        document.querySelector("#priorityLevel").value = currentProject.toDoItems[position].priority;
        
        confirmBtn.onclick = function(e) {
            //add an item function
            console.log("CONFIRM");
            if(editToDo(currentProject, container, position)){
                dialog.close();
                toDoTitle.textContent = currentProject.toDoItems[position].title;
                toDoDescription.textContent = currentProject.toDoItems[position].description;
                priorityLevel.textContent = currentProject.toDoItems[position].priority;
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
    delBtn.textContent = "Delete";
    editDelDiv.appendChild(delBtn);

    //Checkbox listener for status
    // statusDiv.addEventListener("change", function(e) {
    //     if (e.target.checked) {
    //         toDoItem.style.backgroundColor = "#a9f7c7";
    //     } else {
    //         toDoItem.style.backgroundColor = "";
    //     }
    // });




    //Append all items

    toDoItem.appendChild(titleDiv);
    titleDiv.appendChild(toDoTitle);
    toDoItem.appendChild(toDoDescription);
    toDoItem.appendChild(priorityLevel);
    toDoItem.appendChild(editDelDiv);



    console.log(currentProject.toDoItems);

}


export {mainpage, defaultProject};