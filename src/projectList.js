import {mainpage, displayProjectHeader, displayToDoItems} from "./mainpage.js";
import trashIcon from "./trash.svg";

let listOfItems = [];
let defaultProject = createProject ("All Tasks", "This is where all your tasks will be stored. Feel free to add a task. You currently cannot edit a task's project (coming soon...)", listOfItems, undefined, undefined);
let todaysProject = createProject ("Today", "These are today's tasks. Adding a task here will automatically categorize it as due today", listOfItems, undefined, undefined);
let upcomingProject = createProject ("High Priority", "These are high priority tasks. Adding a task here will automatically categorize it as high priority", listOfItems, undefined, undefined);
let projectList = [defaultProject, todaysProject, upcomingProject];
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
            projDescription = "";

        const emptyList = [];
        projectList.push(createProject(projTitle, projDescription, emptyList, 
            undefined));
        console.log("ADDING NEW PROJECT");
        const position = projectList.length - 1;
        updateProjects (container, position);
        //selectedProjectID = position;
        const content = document.querySelector(".main-page");
        content.innerHTML = "";

        const select = document.querySelector("#editProjectSelect");
        console.log(select);
      
        const newProjOption = document.createElement("option");
        newProjOption.value = position;
        newProjOption.text = projectList[position].title;
        select.appendChild(newProjOption);

        mainpage();
        console.log(projectList);
        return true;
      
        
    }
};

//This function SWITCHES to a project
function switchProject(projectID) {
    console.log("SWITCHING PROJECTS" +  projectID);

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
    
    addProjectBtn.textContent = "New Project +";
    
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

    
    function defaultButtons (id, name ) {
        const defaultProjectButton = document.createElement("button");
        defaultProjectButton.setAttribute("class", "projDiv");
        defaultProjectButton.setAttribute("id", "projID_" + id);
        const defaultProjectBtnText = document.createElement("p");

        defaultProjectBtnText.textContent = name;
        defaultProjectButton.appendChild(defaultProjectBtnText);        

        // const trashIconImg = document.createElement("img");
        // trashIconImg.src = trashIcon;
        // trashIconImg.height = "20";

        //Project Listener
        //defaultProjectButton.appendChild(trashIconImg);
        defaultProjectButton.addEventListener('click', (e) => {
            // dialogForm.reset();
            // When the user clicks the confirm button, close the dialog
            const currentButton = e.currentTarget.id;
            const currentButtonID = currentButton.split('_')[1];
            switchProject(currentButtonID);
            e.preventDefault();
        });
        projectList[id].selfBtn = defaultProjectButton;

        projectListContainer.appendChild(defaultProjectButton);
    }

    defaultButtons(0, projectList[0].title);
    defaultButtons(1, projectList[1].title);
    defaultButtons(2, projectList[2].title);
    
    projectListContainer.appendChild(addProjectBtn);
    
    return projectListContainer;
}


function updateProjects (container, position) {

    //Create Project Item
    const projectItem = document.createElement("div");
    projectItem.setAttribute("class", "projDiv");
    projectItem.setAttribute("id", "projID_" + position);
    

    const projectItemBtn = document.createElement("button");
    projectItemBtn.setAttribute("class", "projSelfBtn");
    projectItemBtn.setAttribute("id", "projID_" + position + "_btn");
    projectItemBtn.textContent = projectList[position].title;

    projectItem.appendChild(projectItemBtn);
    

    container.appendChild(projectItem);

    selectedProjectID = position;
    console.log ("Project " + selectedProjectID);

    //Create Self Selection Button
    projectItemBtn.addEventListener('click', (e) => {
        // dialogForm.reset();
        // When the user clicks the confirm button, close the dialog
        const currentButton = e.currentTarget.id;
        const currentButtonID = currentButton.split('_')[1];
        
        switchProject(currentButtonID);
        e.preventDefault();
    });
    projectList[selectedProjectID].selfBtn = projectItemBtn;


    const trashIconImg = document.createElement("img");
    trashIconImg.src = trashIcon;
    trashIconImg.height = "20";
    
    projectItem.appendChild(trashIconImg);

    trashIconImg.setAttribute("class", "projDelBtn");
    trashIconImg.setAttribute("id", "projID_" + selectedProjectID + "_del");

    projectList[selectedProjectID].delBtn = trashIconImg;

    trashIconImg.addEventListener('click', (e) => {
        if (confirm("Are you sure you want to remove this project?") == true) {
            const chosenButton = e.currentTarget.id;
            const chosenButtonID = chosenButton.split('_')[1];

            let projToRemoveID = "#projID_" + chosenButtonID;
            let projToRemove = document.querySelector(projToRemoveID);
            container.removeChild(projToRemove);
            console.log ("Delete this project " + chosenButtonID);

            const select = document.querySelector("#editProjectSelect");
            console.log(chosenButtonID);
        
            const options = [...select.options];
            const optionsIndex = options.findIndex(option => option.value == chosenButtonID);
            select.remove(optionsIndex);

            projectList.splice(chosenButtonID,1);

            let projDivs = document.querySelectorAll(".projDiv");
            let projSelfBtns = document.querySelectorAll(".projSelfBtn");
            let projDelBtns = document.querySelectorAll(".projDelBtn");
            

            for (let k = 3; k < projectList.length; k++)
            {
                projDivs[k].setAttribute("id", "projID_" + k);
                projSelfBtns[k-3].setAttribute("id", "projID_" + k + "_btn");
                projDelBtns[k-3].setAttribute("id", "projID_" + k + "_del");
            }

            //displayProjectList();
            


            if (selectedProjectID > chosenButtonID)
                selectedProjectID = selectedProjectID - 1;

            else if (selectedProjectID == chosenButtonID) {
                console.log ("SAME PROJECT");
                selectedProjectID = 0;
                switchProject(selectedProjectID);
            }
                
            console.log(projectList);
        }
        
        e.preventDefault();
    });


    console.log(projectList[position]);

}



export {displayProjectList, selectedProjectID, createProject, projectList};