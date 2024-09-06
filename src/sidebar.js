//import icon from "./icon.jpg";
import noted from "./noted.png";

import { dueDateMenu } from "./dueDateMenu.js";
import { displayProjectList } from "./projectList.js";

function sidebar () {
    const content = document.querySelector(".sidebar");
    const logoDiv = document.createElement("div");
    logoDiv.setAttribute("class","logoDiv");

    const appTitle = document.createElement("p");
    appTitle.setAttribute("class","appTitle");
    appTitle.textContent = "Snowted";

    const notedImg = document.createElement("img");
    notedImg.setAttribute("id","noted-image");
    notedImg.src = noted;

    const author = document.createElement("p");
    author.setAttribute("class","author");
    author.innerHTML = 'made by: <a href="https://github.com/ADDikt88/" target="_blank">github/ADDikt88</a>';
    
    logoDiv.appendChild(appTitle);
    logoDiv.appendChild(notedImg);
    logoDiv.appendChild(author);

    content.appendChild(logoDiv);
    content.appendChild(displayProjectList());
    //content.appendChild()
}

export {sidebar};