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
        title, description, toDoItems
    }

}

function createToDo (title, description, priority) {

    return {
        title, description, priority
    }

}

let listOfItems = [];
listOfItems.push(createToDo("First to do item", "Create an HTML file", "high"));

const defaultProject = createProject ("Default", "This is a default project description", listOfItems);



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
    content.appendChild(toDoContainer);
    const toDoItem = document.createElement("div");
    toDoContainer.appendChild(toDoItem);

    const toDoTitle = document.createElement("div");
    const toDoDescription = document.createElement("div");
    toDoTitle.textContent = defaultProject.toDoItems[0].title;
    toDoDescription.textContent = defaultProject.toDoItems[0].description;
    toDoItem.appendChild(toDoTitle);
    toDoItem.appendChild(toDoDescription);
}


export {mainpage, defaultProject};