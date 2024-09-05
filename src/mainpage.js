//import icon from "./icon.jpg";
import {projectList, selectedProjectID} from "./projectList.js";
import trashIcon from "./trash.svg";
import editIcon from "./edit.svg";
import flagIcon1 from  "./flag1.svg";
import flagIcon2 from  "./flag2.svg";
import flagIcon3 from  "./flag3.svg";
import calendarIcon from  "./calendar.svg";
import goldStarIcon from  "./goldstar.svg";
import { parseISO, differenceInDays, compareAsc, format } from "date-fns";
import { se } from "date-fns/locale";
//format(new Date(2014,1,11), "yyyy-MM-dd");


/*****
 * This is the main page of the to do list app and displays the current project and it's to do list.
 */


function mainpage () {
    const content = document.querySelector(".main-page");
    content.innerHTML = "";
    console.log("HELLO" + selectedProjectID);
    let currentProject = projectList[selectedProjectID];
    console.log(projectList + currentProject + selectedProjectID);
    displayProjectHeader (content, currentProject);
    displayToDoItems (content, currentProject); 
    

    console.log(format(new Date(), "yyyy-MM-dd"));

}

function createToDo (title, description, priority, editBtn, delBtn, checkmark, dueDate, projID, taskID, status) {

    function editItem (newTitle, newDesc, newPriority, newDueDate) {
        this.title = newTitle;
        this.description = newDesc;
        this.priority = newPriority;
        this.dueDate = newDueDate;


    }

    function editProjID (newProj) {
        this.projID = newProj;

    }

    return {
        title, description, priority, status, editItem, editProjID,  editBtn, delBtn, dueDate, projID, taskID, checkmark,
    }

}

//These two functions add or edit the to do list
function addToDo(currentProject) {

    let taskTitle = document.querySelector("#taskTitle").value;
    let taskDescription = document.querySelector("#taskDescription").value;
    let priorityLevel = document.querySelector("#priorityLevel").value;
    let dueDate = document.querySelector("#dueDateInput").value;

    console.log(currentProject.title);
    console.log(dueDate);
    if (taskTitle < 1)
    {
        alert("Please enter a new task title");
        console.log("TRY AGAIN");
        
        return false;
    }
    else 
    {   
        //const position = currentProject.toDoItems.length;
        if (taskDescription < 1)
            taskDescription = "";

        //must add to the all tasks
        let masterTaskID = projectList[0].toDoItems.length;
    
        if (selectedProjectID > 2)
        {
            projectList[0].toDoItems.push(createToDo(taskTitle, taskDescription, priorityLevel, 
                undefined, undefined, undefined, dueDate, selectedProjectID, masterTaskID, false));
            
            currentProject.toDoItems.push(createToDo(taskTitle, taskDescription, priorityLevel, 
                undefined, undefined, undefined, dueDate, selectedProjectID, masterTaskID, false));
        }
        else {
            projectList[0].toDoItems.push(createToDo(taskTitle, taskDescription, priorityLevel, 
                undefined, undefined, undefined, dueDate, 0, masterTaskID, false));
        }

        mainpage();
        return true;
                
    }
};


function editToDo(currentProject, container, position) {

    //console.log("HELP");
    let taskTitle = document.querySelector("#editTaskTitle").value;
    let taskDescription = document.querySelector("#editTaskDescription").value;
    let priorityLevel = document.querySelector("#editPriorityLevel").value;
    let dueDate = document.querySelector("#editDueDateInput").value;
    let newProjSelect = document.querySelector("#editProjectSelect").value;

    //console.log("NEW PROJ ID " + projSelect);
    
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

        currentProject.toDoItems[position].editItem(taskTitle, taskDescription, priorityLevel, dueDate);
        
  
        if (selectedProjectID > 2) {
            //Update all tasks
            //find the proj ID and task ID
            let counter = 0;
            for (let k = 0; k < (projectList[0].toDoItems).length; k++){
                if (projectList[0].toDoItems[k].projID == selectedProjectID) {
                    if (counter == position)
                        projectList[0].toDoItems[k].editItem(taskTitle, taskDescription, priorityLevel, dueDate);
                    else
                        counter++;
                } 
            }


            // if (newProjSelect !== selectedProjectID) {
            //     const newTaskID = projectList[newProjSelect].toDoItems.length;
            //     const newMasterTaskID = projectList[0].toDoItems.length;
            //     //add task to new proj
            //     projectList[newProjSelect].toDoItems.push(createToDo(taskTitle, taskDescription, priorityLevel, 
            //         undefined, undefined, undefined, dueDate, newProjSelect, newTaskID, false)); 
            //     projectList[0].toDoItems.push(createToDo(taskTitle, taskDescription, priorityLevel, 
            //         undefined, undefined, undefined, dueDate, newProjSelect, newMasterTaskID, false)); 


            //     //projectList[selectedProjectID].toDoItems.splice(0,1);
 
            //     //mainpage();

            //}
     
        }

        if (selectedProjectID == 0) {

            const targetProjID = projectList[0].toDoItems[position].projID;
            const masterTaskID = projectList[0].toDoItems[position].taskID;

            //find the proj ID and task ID
            let counter = 0;
            for (let k = 0; k < (projectList[0].toDoItems).length; k++){
                if (projectList[0].toDoItems[k].projID == targetProjID) { //found projectID
                    if (projectList[0].toDoItems[k].taskID == masterTaskID) //found masterTaskID
                        projectList[targetProjID].toDoItems[counter].editItem(taskTitle, taskDescription, priorityLevel, dueDate);
                    else
                        counter++;
                } 
            }

        }



        //mainpage();
        return true;
    }
};


function updateToDoItems (currentProject, container, position, taskItem) {

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
    setPriorityBorder(taskItem.priority, toDoItem);

    if (selectedProjectID == 1 || selectedProjectID == 2) {
        toDoDescription.disabled = true;
    }
    toDoDescription.addEventListener('change', function(e) {
        taskItem.description = toDoDescription.value;

        if (selectedProjectID > 2) {
            //Update all tasks
    
            //find the proj ID and task ID
            let counter = 0;
            for (let k = 0; k < (projectList[0].toDoItems).length; k++){
                if (projectList[0].toDoItems[k].projID == selectedProjectID) {
                    if (counter == position)
                        projectList[0].toDoItems[k].description = toDoDescription.value;
                    else
                        counter++;
                } 
            }
        
        }
    
        if (selectedProjectID == 0) {
    
            const targetProjID = taskItem.projID;
            const masterTaskID = taskItem.taskID;
    
            //projectList[targetProjID].toDoItems[targetTaskID].editItem(taskTitle, taskDescription, priorityLevel, dueDate);
    
            //find the proj ID and task ID
            let counter = 0;
            for (let k = 0; k < (projectList[0].toDoItems).length; k++){
                if (projectList[0].toDoItems[k].projID == targetProjID) { //found projectID
                    if (projectList[0].toDoItems[k].taskID == masterTaskID) //found masterTaskID
                        projectList[targetProjID].toDoItems[counter].description = toDoDescription.value;
                    else
                        counter++;
                } 
            }
        }

        toDoDescription.blur();
        e.preventDefault();
    });
    

    
    toDoTitle.textContent = taskItem.title;
    toDoTitle.style.fontSize = "1.5rem";
    toDoDescription.textContent = taskItem.description;
    
    const dueDate = document.createElement("div");
    setDueDateIcon(taskItem.dueDate, dueDate);

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
    status.checked = taskItem.status;
    if (status.checked)
    {
        toDoItem.style.backgroundColor = "#a9f7c7";
        toDoTitle.style.backgroundColor = "#a9f7c7";
    }

    taskItem.checkmark = status;



    //Checkbox listener for status
    if (selectedProjectID == 1 || selectedProjectID == 2) {
        status.disabled = true;
    }
    status.addEventListener("change", function(e) {
        const currentCheck = e.target.id;
        const currentCheckID = currentCheck.split('_')[3];

        if (e.target.checked) {
            toDoItem.style.backgroundColor = "#a9f7c7";
            //currentProject.toDoItems[currentCheckID].status = true;
            toDoTitle.style.backgroundColor = "#a9f7c7";
            changeCheckStatus(true, currentCheckID);
        } else {
            toDoItem.style.backgroundColor = "";
            toDoTitle.style.backgroundColor = "";
            //currentProject.toDoItems[currentCheckID].status = false;
            changeCheckStatus(false, currentCheckID);
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

    taskItem.editBtn = editBtn;
    
    editBtn.textContent = "Edit";
    editDelDiv.appendChild(editBtn);

    const dialogForm = document.querySelector("#editActionForm");
    const dialog = document.querySelector("#editItemDialog");

    if (selectedProjectID == 0 || selectedProjectID > 2) {
        editBtn.addEventListener('click', (e) => {
            // dialogForm.reset();
            // When the user clicks the confirm button, close the dialog
            const currentButton = e.target.id;
            const currentButtonID = currentButton.split('_')[3];

            
            document.querySelector("#editTaskTitle").value = currentProject.toDoItems[currentButtonID].title;
            document.querySelector("#editTaskDescription").value = currentProject.toDoItems[currentButtonID].description;
            document.querySelector("#editPriorityLevel").value = currentProject.toDoItems[currentButtonID].priority;
            document.querySelector("#editProjectSelect").value = currentProject.toDoItems[currentButtonID].projID;
            document.querySelector("#editDueDateInput").value = currentProject.toDoItems[currentButtonID].dueDate;

            const select = document.querySelector("#editProjectSelect");
            select.disabled = true;
            
            editConfirmBtn.onclick = function(e) {
                //add an item function
                console.log("CONFIRM");
                if(editToDo(currentProject, container, currentButtonID)){
                    dialog.close();
                    // toDoTitle.textContent = currentProject.toDoItems[currentButtonID].title;
                    // toDoDescription.textContent = currentProject.toDoItems[currentButtonID].description;
                    // priorityLevel.textContent = currentProject.toDoItems[currentButtonID].priority;
                    
                    setPriorityBorder(taskItem.priority, toDoItem);
                    setDueDateIcon(taskItem.dueDate, dueDate);
                    mainpage();

            
                }
                    
                e.preventDefault();
            }

            // When the user clicks the close button, close the dialog
            editCloseDialogBtn.onclick = function(e) {
                dialog.close();
                e.preventDefault();
            }
            dialog.showModal();
        
            e.preventDefault();
        });
    }


    const delBtn = document.createElement("img");
    delBtn.src = trashIcon;
    delBtn.height = "25";
    delBtn.setAttribute("class", "delBtn");
    delBtn.setAttribute("id", "projID_" + selectedProjectID + "_delID_" + position);

    taskItem.delBtn = delBtn;

    delBtn.textContent = "Delete";
    editDelDiv.appendChild(delBtn);

    if (selectedProjectID == 0 | selectedProjectID > 2)
    {
        delBtn.addEventListener('click', (e) => {
            if (confirm("Are you sure you want to remove this task?") == true) {
                const currentButton = e.target.id;
                const currentButtonID = currentButton.split('_')[3];
                
                deleteToDo (currentButtonID);
                
                console.log(currentProject.toDoItems);
                mainpage();
            }
            e.preventDefault();
        });

    }
       


    
    
    const projectName = document.createElement("p")
    projectName.setAttribute("class", "proj-name");
    projectName.textContent = projectList[taskItem.projID].title;
    toDoTitle.appendChild(projectName);
    toDoItem.appendChild(status)
    toDoItem.appendChild(titleDiv);
    titleDiv.appendChild(toDoTitle);
    titleDiv.appendChild(toDoDescription);
    toDoItem.appendChild(dueDate);
    toDoItem.appendChild(editDelDiv);
    setCollapsible(toDoTitle);

    









    console.log(currentProject.toDoItems);


}

/****
 * These functions display the project header and the to-do-list frame
 */

function deleteToDo (currentButtonID) {
    //now we have to delete from all tasks
    if (selectedProjectID > 2) {    
        //find the proj ID and task ID
        let counter = 0;
        for (let k = 0; k < (projectList[0].toDoItems).length; k++){
            if (projectList[0].toDoItems[k].projID == selectedProjectID) {
                if (counter == currentButtonID){
                    projectList[0].toDoItems.splice(k,1);
                }
                else
                    counter++;
            } 
        }
        projectList[selectedProjectID].toDoItems.splice(currentButtonID,1);
    }

    if (selectedProjectID == 0) {

        const targetProjID = projectList[0].toDoItems[currentButtonID].projID;
        const masterTaskID = projectList[0].toDoItems[currentButtonID].taskID;

        console.log ("targetP " + targetProjID + " masterTaskID " + masterTaskID);

        if (targetProjID == 0)
            projectList[selectedProjectID].toDoItems.splice(currentButtonID,1);

        else {
            //find the proj ID and task ID
            let counter = 0;
            for (let k = 0; k < (projectList[0].toDoItems).length; k++){
                if (projectList[0].toDoItems[k].projID == targetProjID) { //found projectID
                    if (projectList[0].toDoItems[k].taskID == masterTaskID) //found masterTaskID
                        projectList[targetProjID].toDoItems.splice(counter,1);
                    else
                        counter++;
                } 
            }
            projectList[selectedProjectID].toDoItems.splice(currentButtonID,1);
        }
        

        
    }


}

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
            const currentProjectTitle = document.querySelector("#projID_" + selectedProjectID + "_btn");
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
    //Feature cannot add tasks to today or next 7 days just use for displaying
   
    toDoContainer.appendChild(addToDoItemBtn);
    

    addToDoItemBtn.setAttribute("class", "add-to-do-btn");    
    addToDoItemBtn.textContent = "Add Task +";
    
    const dialogForm = document.querySelector("#addActionForm");
    const dialog = document.querySelector("#addItemDialog");
    if (selectedProjectID == 0 || selectedProjectID > 2) {
        addToDoItemBtn.addEventListener('click', (e) => {
            console.log("add task clicked");
            dialogForm.reset();
            // When the user clicks the confirm button, close the dialog
            confirmBtn.onclick = function(e) {
                //add an item function
                console.log("CONFIRM");
                if(addToDo(currentProject))
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
    }


    

    // if showing today's items
    if (selectedProjectID == 1) {
 
        for (let k = 0; k < (projectList[0].toDoItems).length; k++)
            {
                //console.log(projectList[0].title);
                console.log(parseISO(format(new Date(), "yyyy-MM-dd")));
                console.log("TESTING" + projectList[0].toDoItems);
                let daysDiff = differenceInDays(parseISO(projectList[0].toDoItems[k].dueDate), parseISO(format(new Date(), "yyyy-MM-dd")));
                if (daysDiff <= 0)
                    updateToDoItems(projectList[0], toDoContainer, k, projectList[0].toDoItems[k]);             
        
            }
    }

    // if showing today's items
    else if (selectedProjectID == 2) {
        for (let k = 0; k < (projectList[0].toDoItems).length; k++)
            {
                //console.log(projectList[0].title);
                console.log(parseISO(format(new Date(), "yyyy-MM-dd")));
                console.log("TESTING" + projectList[0].toDoItems);
                let daysDiff = differenceInDays(parseISO(projectList[0].toDoItems[k].dueDate), parseISO(format(new Date(), "yyyy-MM-dd")));
                if (daysDiff <= 7 && daysDiff >= 1)
                    updateToDoItems(projectList[0], toDoContainer, k, projectList[0].toDoItems[k]);             
        
            }
    }

    else {
        for (let k = 0; k < (currentProject.toDoItems).length; k++)
        {
            console.log("CURRENT WORKING: " + currentProject.title);
            updateToDoItems(currentProject, toDoContainer, k, currentProject.toDoItems[k]);    
        }
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

function setDueDateIcon (date, dueDateDiv) {
    //const dueDateDiv = document.createElement("div");
    dueDateDiv.innerHTML = "";
    dueDateDiv.setAttribute("class", "due-date");
    
    const today = format(new Date(), "yyyy-MM-dd");
    
    const parsedDate = parseISO(date);
    const parsedToday = parseISO(today);

    const daysDiff = differenceInDays(parsedDate, parsedToday);
    console.log (parsedDate);
   
    function setIconAndText (iconName, text, dueDateDiv){
        console.log(text);
        const dueImg = document.createElement("img");
        dueImg.src = iconName;
        dueImg.height = "25";
        
        dueDateDiv.append(dueImg);
    
        let dueText = document.createElement("p");
        dueText.textContent = text;
    
        dueDateDiv.append(dueText);
        return dueDateDiv;
    };

    if (daysDiff < 0)
        return setIconAndText(goldStarIcon, "Past Due Date", dueDateDiv);
    else if (daysDiff > 3)
        return setIconAndText(calendarIcon, date, dueDateDiv);
    else {
        switch (daysDiff) {
            case 0: {
                return setIconAndText(goldStarIcon, "Today", dueDateDiv);
            }
            case 1: {
                return setIconAndText(flagIcon1, "1 Day Left", dueDateDiv);
            }
            case 2: {
                return setIconAndText(flagIcon2, "2 Days Left", dueDateDiv);
            };
            case 3: {
                return setIconAndText(flagIcon3, "3 Days Left", dueDateDiv);
            }
            default: {
                let dueText = document.createElement("p");
                dueText.textContent = "No Due Date";
                dueDateDiv.append(dueText);
                return dueDateDiv;
            }

        }

    }
    
}

function setPriorityBorder (priority, element) {
    if (priority == "high")
        element.style.border = "3px solid red";
    else if (priority == "med")
        element.style.border = "3px solid yellow";
    else
        element.style.border = "1px solid black";
    
    return element;
}

function changeCheckStatus (checked, position) {

    //toDoItem.style.backgroundColor = "#a9f7c7";
    projectList[selectedProjectID].toDoItems[position].status = checked;
    //toDoTitle.style.backgroundColor = "#a9f7c7";

    if (selectedProjectID > 2) {
        //Update all tasks

        //find the proj ID and task ID
        let counter = 0;
        for (let k = 0; k < (projectList[0].toDoItems).length; k++){
            if (projectList[0].toDoItems[k].projID == selectedProjectID) {
                if (counter == position)
                    projectList[0].toDoItems[k].status = checked;
                else
                    counter++;
            } 
        }
 
    }

    if (selectedProjectID == 0) {

        const targetProjID = projectList[0].toDoItems[position].projID;
        const masterTaskID = projectList[0].toDoItems[position].taskID;

        //projectList[targetProjID].toDoItems[targetTaskID].editItem(taskTitle, taskDescription, priorityLevel, dueDate);

        //find the proj ID and task ID
        let counter = 0;
        for (let k = 0; k < (projectList[0].toDoItems).length; k++){
            if (projectList[0].toDoItems[k].projID == targetProjID) { //found projectID
                if (projectList[0].toDoItems[k].taskID == masterTaskID) //found masterTaskID
                    projectList[targetProjID].toDoItems[counter].status = checked;
                else
                    counter++;
            } 
        }
    }

}


export {mainpage, displayProjectHeader, displayToDoItems};