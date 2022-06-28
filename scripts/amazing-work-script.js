const graphicDesign = [];
const webDesign = [];
const landingPages = [];
const wordpress = [];

/**
 * fills arrays with images located in local folders instead of writing the arrays manually
 * @param {array} array - the array that we want to fill
 * @param {string} path - the folder name and part of each image name in the images path
 */

const fillImageArray = (array, path) => {
  for (let i = 1; i <= 36; i++) {
    array.push(`./assets/images/our-amazing-work/${path}/${path}${i}.jpg`);
  }
};

fillImageArray(graphicDesign, "graphic-design");
fillImageArray(webDesign, "web-design");
fillImageArray(landingPages, "landing-pages");
fillImageArray(wordpress, "wordpress");

// an Array consisting of all created arrays from different image categories
const all = [graphicDesign, webDesign, landingPages, wordpress];

const categoryObject = {
  all,
  graphicDesign,
  webDesign,
  landingPages,
  wordpress,
};

//////////////////////////////////////////////////////////////////////////////////////////////////
// THE BELOW ARE ALL DOM ELEMENTS AND VARIABLES DECLARED THAT WE WILL NEED IN OUR SCRIPT
/////////////////////////////////////////////////////////////////////////////////////////////////

let currentCategory = "all";
const workGalleryContainer = document.querySelector(".work-gallery-wrapper");
const workTabsContainer = document.querySelector(".work-tabs--list");
const loadMore = document.querySelector(".work-gallery-wrapper+button");
const preloader = document.querySelector(".amazing-work .loader");
let allArrayRandomIndex;
let categoryArrayRandomIndex;
let imageSource;
let cardBackText;
let arrayLength;
let hiddenCards;

////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * a function that creates the DOM elements and adds them to the DOM
 * @param {string} imgSrc src link of the image
 * @param {string} text   text to be added in back of the card
 */

const createCardandAddToDom = (imgSrc, text) => {
  workGalleryContainer.insertAdjacentHTML(
    "beforeend",
    `<div class="work-card">
        <div class="front">
          <img
            src="${imgSrc}"
            alt=""
            class="work-image"
          />
        </div>
        <div class="back">
          <div class="circle-wrapper">
            <div class="circle">
              <img src="./assets/icons/chain.svg" alt="chain" />
            </div>
            <div class="circle">
              <img src="./assets/icons/square.jpg" alt="square" />
            </div>
          </div>
          <h3 class="work-header">creative design</h3>
          <p class="work-text">${text}</p>
        </div>
      </div>`
  );
};

/**
 * create the gallery by adding the HTML to the DOM and show it on the page
 * @param {string} currentCategory - string that matches one of the arrays in the categoryObject
 */

const createAndShowGallery = (currentCategory) => {
  if (currentCategory == "all") {
    arrayLength = 36;

    for (i = 0; i < arrayLength; i++) {
      allArrayRandomIndex = Math.floor(Math.random() * 4);
      categoryArrayRandomIndex = Math.floor(Math.random() * 36);
      imageSource =
        categoryObject[currentCategory][allArrayRandomIndex][
          categoryArrayRandomIndex
        ];

      switch (allArrayRandomIndex) {
        case 0:
          cardBackText = "Graphic Design";
          break;
        case 1:
          cardBackText = "Web Design";
          break;
        case 2:
          cardBackText = "Landing Pages";
          break;
        case 3:
          cardBackText = "Wordpress";
          break;
      }

      createCardandAddToDom(imageSource, cardBackText);
    }
  } else {
    arrayLength = categoryObject[currentCategory].length;

    for (i = 0; i < arrayLength; i++) {
      imageSource = categoryObject[currentCategory][i];

      createCardandAddToDom(imageSource, cardBackText);
    }
  }

  // HIDE ALL IMAGES AFTER THE FIRST DEFAULT 12 IMAGES SHOWN
  for (j = 12; j < arrayLength; j++) {
    workGalleryContainer
      .querySelectorAll(".work-card")
      [j].classList.add("hide-element");
  }
  // JQUERY FLIP CARD ANIMATION
  $(".work-card").flip({
    axis: "y",
    trigger: "hover",
    speed: "750",
  });
};

createAndShowGallery(currentCategory);

//////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////EVENT LISTENERS/////////////////////////////////////////////////

// CATEGORY TABS EVENT LISTENER
workTabsContainer.addEventListener("click", (event) => {
  if (
    event.target !== event.currentTarget &&
    !event.target.classList.contains("work-tab--active")
  ) {
    //   SHOW THE RELATED GALLERY
    workGalleryContainer.innerHTML = "";
    currentCategory = event.target.dataset.category;
    if (currentCategory != "all") {
      cardBackText = event.target.innerText;
    }
    createAndShowGallery(currentCategory);

    // CHANGE TAB STYLE
    event.currentTarget
      .querySelector(".work-tab--active")
      .classList.remove("work-tab--active");
    event.target.classList.add("work-tab--active");

    // SHOW LOAD MORE BUTTON
    loadMore.classList.remove("hide-element");
  }
});

//   LOAD MORE BUTTON EVENT LISTENER
loadMore.addEventListener("click", (event) => {
  hiddenCards = workGalleryContainer.querySelectorAll(".hide-element");
  event.target.classList.add("hide-element");
  preloader.classList.remove("hide-element");

  if (hiddenCards.length == 24) {
    setTimeout(function () {
      preloader.classList.add("hide-element");
      for (let i = 0; i < 12; i++) {
        hiddenCards[i].classList.remove("hide-element");
      }
      event.target.classList.remove("hide-element");
    }, 2000);
  } else if (hiddenCards.length == 12) {
    event.target.classList.add("hide-element");

    setTimeout(function () {
      preloader.classList.add("hide-element");

      hiddenCards.forEach((hiddenCard) => {
        hiddenCard.classList.remove("hide-element");
      });
    }, 2000);
  }
});
