function projectList () {
    const projectListContainer = document.createElement("div");
    projectListContainer.setAttribute("class", "project-list");
    
    const defaultProjectButton = document.createElement("button");
    defaultProjectButton.textContent = "Default Project";
    projectListContainer.appendChild(defaultProjectButton);

    return projectListContainer;
}

export {projectList};