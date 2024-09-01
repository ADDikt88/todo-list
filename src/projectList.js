//import {defaultProject} from "./sidebar.js"



//function 



function displayProjectList () {
    const projectListContainer = document.createElement("div");
    projectListContainer.setAttribute("class", "project-list");
    
    const defaultProjectButton = document.createElement("button");
    defaultProjectButton.textContent = "Default Project";
    projectListContainer.appendChild(defaultProjectButton);

    return projectListContainer;
}

export {displayProjectList};