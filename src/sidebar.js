//import icon from "./icon.jpg";

import { dueDateMenu } from "./dueDateMenu.js";
import { displayProjectList } from "./projectList.js";

function sidebar () {
    const content = document.querySelector(".sidebar");
    content.appendChild(dueDateMenu());
    content.appendChild(displayProjectList());
}

export {sidebar};