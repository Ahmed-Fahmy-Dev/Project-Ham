//////////////THE BELOW ARE ALL DOM ELEMENTS NEEDED FOR OUR SCRIPT/////////////////////

const servicesTabsList = document.querySelector(".services-tabs--list");
const servicesTabsCollection = document.querySelectorAll(".services-tab");
const servicesContentCollection = document.querySelectorAll(
  ".services-content--wrapper"
);
const triangle = document.querySelector(".triangle");

/////////HIDING ALL TABS EXCEPT FIRST ONE HEN LOADING THE PAGE BY JQUERY////////
$(".services-content--wrapper:not(:first-of-type)").slideUp();

///////////////////////EVENT LISTENERS///////////////////////////////////////////////////
servicesTabsList.addEventListener("click", (event) => {
  if (
    event.target !== event.currentTarget &&
    !event.target.classList.contains("services-tab--active")
  ) {
    event.currentTarget
      .querySelector(".services-tab--active")
      .classList.remove("services-tab--active");
    event.target.classList.add("services-tab--active");
    triangle.remove();
    event.target.append(triangle);

    $("[data-flag='true']").slideUp();
    document.querySelector("[data-flag=true]").dataset.flag = "false";

    servicesContentCollection.forEach((content) => {
      if (content.dataset.subject == event.target.dataset.subject) {
        content.dataset.flag = "true";
        $(content).slideDown();
      }
    });
  }
});
