// THE BELOW ARE ALL DOM ELEMENTS WE NEED IN OUR SCRIPT

const bestImagesGridContainer = document.querySelector(".best-images--grid");
const gridItemCollection = document.getElementsByClassName("grid-item");
const bottomLoadMore = document.querySelector(".best-images .load ");
const lastPreloader = document.querySelector(".best-images .loader");
let masonry;

// AN ARRAY OF IMAGES TO BE LOADED AFTER CLICKING ON LOAD MORE BUTTON
const moreImagesArray = [
  "./assets/images/best images/load-more/1.jpg",
  "./assets/images/best images/load-more/2.jpg",
  "./assets/images/best images/load-more/3.jpg",
  "./assets/images/best images/load-more/4.jpg",
  "./assets/images/best images/load-more/5.jpg",
  "./assets/images/best images/load-more/6.jpg",
  "./assets/images/best images/load-more/7.jpg",
  "./assets/images/best images/load-more/8.jpg",
];

/**
 * a function to add the images in the array to the DOM in the grid and hide them upon loading the page.
 * @param {object} array array of image sources
 */
const addImagesToDom = (array) => {
  for (i = 0; i < array.length; i++) {
    bestImagesGridContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="grid-item hide-element">
      <img src="${array[Math.floor(Math.random() * 7)]}" alt="best image" />
    </div>`
    );
  }
};

addImagesToDom(moreImagesArray);

// THR MASONRY PLUG IN ARANGING THE IMAGES IN THE GRID WITH IMAGELOADED METHOD TO EXECUTE THE PLUGIN ONLY AFTER ALL IMAGES ARE LOADED IN THE DOM TO AVOID OVERLAPPTING
$(".best-images--grid").imagesLoaded(function () {
  masonry = new Masonry(bestImagesGridContainer, {
    itemSelector: ".grid-item",
    gutter: 13,
    horizontalOrder: true,
  });
});

////////////////EVENT LISTENER ON THE LOAD MORE BUTTON////////////////////////////////
bottomLoadMore.addEventListener("click", (event) => {
  event.target.classList.add("hide-element");
  lastPreloader.classList.remove("hide-element");

  setTimeout(function () {
    lastPreloader.classList.add("hide-element");

    for (item of gridItemCollection) {
      if (item.classList.contains("hide-element")) {
        item.classList.remove("hide-element");
        masonry.layout();
      }
    }
  }, 2000);
});
