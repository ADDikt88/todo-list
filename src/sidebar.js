//import icon from "./icon.jpg";

import { dueDateMenu } from "./dueDateMenu.js";
import { projectList } from "./projectList.js";

function sidebar () {
    const content = document.querySelector(".sidebar");
    content.appendChild(dueDateMenu());
    content.appendChild(projectList());
}

export {sidebar};