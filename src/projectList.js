import {mainpage, displayProjectHeader, displayToDoItems} from "./mainpage.js";
import trashIcon from "./trash.svg";

let listOfItems = [];
let defaultProject = createProject ("Default Project", "This is a default project description.", listOfItems, undefined, undefined);
let projectList = [defaultProject];
let selectedProjectID = 0;

//function 
function createProject (title, description, toDoItems, selfBtn, delBtn) {

    function editProj (newTitle, newDesc) {
        this.title = newTitle;
        this.description = newDesc;
    }

    return {
        title, description, toDoItems, editProj, delBtn, selfBtn,
    }

}

//This function adds a NEW project
function newProject(container) {

    let projTitle = document.querySelector("#projTitle").value;
    let projDescription = document.querySelector("#projDescription").value;

    if (projTitle < 1)
    {
        alert("Please enter a new project title");
        console.log("TRY AGAIN");
        return false;
    }
    else 
    {   
        if (projDescription < 1)
            projDescription = "_";

        const emptyList = [];
        projectList.push(createProject(projTitle, projDescription, emptyList, 
            undefined));
        console.log("ADDING NEW PROJECT");
        const position = projectList.length - 1;
        updateProjects (container, position);
        const content = document.querySelector(".main-page");
        content.innerHTML = "";
        mainpage();
        console.log(projectList);
        return true;
      
        
    }
};

//This function SWITCHES to a project
function switchProject(projectID) {
    console.log("SWITCHING PROJECTS");

    selectedProjectID = projectID;
    const content = document.querySelector(".main-page");
    content.innerHTML = "";
    mainpage();
    return true;        
};

function displayProjectList () {
    
    const projectListContainer = document.createElement("div");
    projectListContainer.setAttribute("class", "project-list");

    const addProjectBtn = document.createElement("button");
    addProjectBtn.setAttribute("class","add-project-btn");
    projectListContainer.appendChild(addProjectBtn);
    addProjectBtn.textContent = "Add Project +";
    
    const dialogForm = document.querySelector("#addProjectForm");
    const dialog = document.querySelector("#addProjectDialog");

    addProjectBtn.addEventListener('click', (e) => {
        dialogForm.reset();
        // When the user clicks the confirm button, close the dialog
        projConfirmBtn.onclick = function(e) {
            //add an item function
            console.log("CONFIRM");
            if(newProject(projectListContainer))
                dialog.close();
            e.preventDefault();
        }

        // When the user clicks the close button, close the dialog
        projCloseDialogBtn.onclick = function(e) {
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

        
    const defaultProjectButton = document.createElement("button");
    defaultProjectButton.setAttribute("class", "projDiv");
    defaultProjectButton.setAttribute("id", "projID_" + 0);
    const defaultProjectBtnText = document.createElement("p");

    defaultProjectBtnText.textContent = defaultProject.title;
    defaultProjectButton.appendChild(defaultProjectBtnText);
    projectListContainer.appendChild(defaultProjectButton);
    

    const trashIconImg = document.createElement("img");
    trashIconImg.src = trashIcon;
    trashIconImg.height = "20";
    defaultProjectButton.appendChild(trashIconImg);
    defaultProjectButton.addEventListener('click', (e) => {
        // dialogForm.reset();
        // When the user clicks the confirm button, close the dialog
        const currentButton = e.currentTarget.id;
        const currentButtonID = currentButton.split('_')[1];
        switchProject(currentButtonID);
        e.preventDefault();
    });
    projectList[0].selfBtn = defaultProjectButton;
    
    return projectListContainer;
}



function updateProjects (container, position) {

    //Create Project Item
    const projectItem = document.createElement("button");
    projectItem.setAttribute("class", "projDiv");
    projectItem.setAttribute("id", "projID_" + position);

    const projectItemText = document.createElement("p");

    projectItemText.textContent = projectList[position].title;

    projectItem.appendChild(projectItemText);
    
    const trashIconImg = document.createElement("img");
    trashIconImg.src = trashIcon;
    trashIconImg.height = "20";
    
    projectItem.appendChild(trashIconImg);
    container.appendChild(projectItem);

    selectedProjectID = position;

    //Create Self Selection Button
    

    projectItem.addEventListener('click', (e) => {
        // dialogForm.reset();
        // When the user clicks the confirm button, close the dialog
        const currentButton = e.currentTarget.id;
        const currentButtonID = currentButton.split('_')[1];
        
        switchProject(currentButtonID);
        e.preventDefault();
    });
    projectList[selectedProjectID].selfBtn = projectItem;

    console.log(projectList[position]);

}



export {displayProjectList, selectedProjectID, createProject, projectList};