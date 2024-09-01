import todayIcon from "./home.svg";

function dueDateMenu () {
    const dueDateMenuContainer = document.createElement("div");
    dueDateMenuContainer.setAttribute("class", "due-date-menu");
    
    const dueDateMenu = document.createElement("ul");
    dueDateMenuContainer.appendChild(dueDateMenu);

    const todayNav = document.createElement("li");
    todayNav.style.display ="flex";
    dueDateMenu.appendChild(todayNav);


    const todayIconImg = document.createElement("img");
    todayIconImg.src = todayIcon;
    todayIconImg.height = "40";
    todayNav.appendChild(todayIconImg);

    const todayIconText = document.createElement("p");
    todayIconText.textContent = "Today";
    todayNav.appendChild(todayIconText);

    return dueDateMenuContainer;

}

export {dueDateMenu};