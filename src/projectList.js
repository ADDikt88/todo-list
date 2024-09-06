import {mainpage, displayProjectHeader, displayToDoItems} from "./mainpage.js";
//import {projectListTemp} from "./index.js";
import trashIcon from "./trash.svg";
import goldStarIcon from  "./goldstar.svg";
import excMarkIcon from  "./exc.svg";
import allBoxIcon from  "./allBox.svg";
let projectList = [];

let listOfItems = [];

let selectedProjectID = 0;

//let masterTaskID = 0;

function init() {
    if (localStorage.getItem("projectList")) {
        const JSONString = localStorage.getItem("projectList");
        projectList = JSON.parse(JSONString);
        
        console.log("LOADED " + projectList);
        
    }
    else{
        let defaultProject = createProject ("All Tasks", "This is where all your tasks will be stored. Feel free to add a new task, set a priority, and pick a due date. If you make a project, you can assign tasks to them, too!", listOfItems, {}, {});
        let todaysProject = createProject ("Today", "These are today's tasks (and also include any tasks past their due date). Adding a task here will automatically categorize it as due today.", listOfItems, {}, {});
        let upcomingProject = createProject ("High Priority", "These are high priority tasks. Adding a task here will automatically categorize it as high priority.", listOfItems, {}, {});

        projectList = [defaultProject, todaysProject, upcomingProject];


    }
}

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


        localStorage.setItem("projectList", JSON.stringify(projectList));
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
    localStorage.setItem("projectList", JSON.stringify(projectList));
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

    
    function defaultButtons (id, name, projIconImg ) {
        const defaultProjectButton = document.createElement("button");
        defaultProjectButton.setAttribute("class", "projDiv");
        defaultProjectButton.setAttribute("id", "projID_" + id);
        const defaultProjectBtnText = document.createElement("p");

        defaultProjectBtnText.textContent = name;


        
        defaultProjectButton.appendChild(projIconImg);
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

    const allBoxIconImg = document.createElement("img");
    allBoxIconImg.src = allBoxIcon;
    allBoxIconImg.height = "30";
    defaultButtons(0, projectList[0].title, allBoxIconImg);

    const goldStarIconImg = document.createElement("img");
    goldStarIconImg.src = goldStarIcon;
    goldStarIconImg.height = "27";
    defaultButtons(1, projectList[1].title, goldStarIconImg);

    const excMarkIconImg = document.createElement("img");
    excMarkIconImg.src = excMarkIcon;
    excMarkIconImg.height = "27";
    defaultButtons(2, projectList[2].title, excMarkIconImg);
    
    projectListContainer.appendChild(addProjectBtn);

   

    
    for (let j = 3; j < projectList.length; j++)
        updateProjects (projectListContainer, j);

    //Add in dialog options and re-factor
    const select = document.querySelector("#editProjectSelect");

     for (let i = 3; i < projectList.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.text = projectList[i].title;        
        select.appendChild(option);
    }
    
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

            //Delete dialog option and re-factor
            const select = document.querySelector("#editProjectSelect");
            console.log(chosenButtonID);
        
            const options = [...select.options];
            const optionsIndex = options.findIndex(option => option.value == chosenButtonID);
            select.remove(optionsIndex);

            for (let i = 1; i < select.options.length; i++) {
                select.options[i].value = i+2;
            }

            //Delete project tasks from master list (REVERSE TO AVOID SKIPPING)
            for (let i = projectList[0].toDoItems.length - 1; i >= 0; i--) {
                if(projectList[0].toDoItems[i].projID == chosenButtonID) {
                    projectList[0].toDoItems.splice(i,1);
                }
            }

            projectList.splice(chosenButtonID,1);

            //Re-ID all projects
            for (let j = 3; j < projectList.length; j++) {
                for (let k = 0; k < projectList[j].toDoItems.length; k++) {
                    projectList[j].toDoItems[k].projID = j;

                    for (let l = 0; l < projectList[0].toDoItems.length; l++) {
                        if(projectList[0].toDoItems[l].taskID == projectList[j].toDoItems[k].taskID) {
                            projectList[0].toDoItems[l].projID = j;
                        }
                    }
                }
            }

            // //Re-ID all projects in master list
            
            // for (let l = 0; l < projectList[0].toDoItems.length; l++) {
            //     for (let j = 3; j < projectList.length; j++) {
            //         for (let k = 0; k < projectList[j].toDoItems.length; k++) {
            //             if(projectList[0].toDoItems[l].taskID == projectList[j].toDoItems[k].taskID) {
            //                 projectList[0].toDoItems[l].projID = j;
            //             }
            //         }
            //     }
            // }

            

                      

            //Re-ID the buttons
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
            //mainpage();

            localStorage.setItem("projectList", JSON.stringify(projectList));
            if (selectedProjectID > chosenButtonID){
                selectedProjectID = selectedProjectID - 1;
                mainpage();
            }

            else if (selectedProjectID == chosenButtonID) {
                console.log ("SAME PROJECT");
                selectedProjectID = 0;
                switchProject(selectedProjectID);
            }

              
            console.log(projectList);
        }
        
        e.preventDefault();
    });

    localStorage.setItem("projectList", JSON.stringify(projectList));
    console.log(projectList[position]);

}



export {displayProjectList, selectedProjectID, createProject, projectList, init};