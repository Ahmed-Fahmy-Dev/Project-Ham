/////////////////////////////////////////////////////////////////////////////////
// THE BELOW OBJECT AND ARRAY ARE CREATED TO ADD MORE FUNCTIONALITY AND A DYNAMIC APPROACH TO OUR WEBSITE INSTEAD OF ADDING ALL ELEMENTS TO THE HTML, THE BELOW CODE IS MORE UNIVERSAL.
/////////////////////////////////////////////////////////////////////////////////

const thumbnailsObject = {
  hassan: {
    name: "Hassan",
    job: "UX Designer",
    review:
      "Integer dignissim, augue tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis.",
    thumbnailSrc: "./assets/images/what-people-say/thumb1.png",
    avatarSrc: "./assets/images/what-people-say/person1.png",
    alt: "Hassan",
  },

  john: {
    name: "John",
    job: "Front-End Developer",
    review:
      "Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis.",
    thumbnailSrc: "./assets/images/what-people-say/thumb2.png",
    avatarSrc: "./assets/images/what-people-say/person2.png",
    alt: "John",
  },

  bob: {
    name: "Bob",
    job: "Project Manager",
    review:
      "Integer dignissim, augue tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctu.",
    thumbnailSrc: "./assets/images/what-people-say/thumb3.png",
    avatarSrc: "./assets/images/what-people-say/person3.png",
    alt: "Bob",
  },

  mary: {
    name: "Mary",
    job: "Data Analyst",
    review:
      "Integer dignissim, augue tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa. Morbi pulvinar odio eget aliquam facilisis. Tempus ultricies luctus, quam dui laoreet sem, non dictum odio nisi quis massa.",
    thumbnailSrc: "./assets/images/what-people-say/thumb4.png",
    avatarSrc: "./assets/images/what-people-say/person4.png",
    alt: "Mary",
  },
};

const thumbnailsArray = [
  thumbnailsObject.hassan,
  thumbnailsObject.john,
  thumbnailsObject.bob,
  thumbnailsObject.mary,
];

/////////////////////////////////////////////////////////////////////////////////

const thumbnailContainer = document.querySelector(".thumbnail-container");

/**
 * a function that makes the thumbnail container more dynamic, in the future if we need to add more reviewers we dont have to change the HTML but just add their details in the above object and Array and the function will add them to the layout.
 * @param {array} array - any array that contains objects with the above key value schema.
 */
const addThumbnails = (array) => {
  for (let i = 0; i < array.length; i++) {
    thumbnailContainer.insertAdjacentHTML(
      "beforeend",
      `<img
    class="thumbnail"
    src= ${array[i].thumbnailSrc}
    alt=${array[i].alt}
    data-index=${i}
  />`
    );
  }
  thumbnailContainer.firstElementChild.classList.add("selected-thumbnail");
  thumbnailContainer.lastElementChild.classList.add("deselected-thumbnail");
};

addThumbnails(thumbnailsArray);

/////////////////////////////////////////////////////////////////////////////////
// THE BELOW ARE DOM ELEMENTS and VARIABLES WE NEED TO WORK ON OUR SECTION ://///
/////////////////////////////////////////////////////////////////////////////////

const avatar = document.querySelector(".avatar");
const carousel = document.querySelector(".carousel-wrapper");
const reviewerName = document.querySelector(".reviewer-name");
const job = document.querySelector(".reveiwer-job");
const text = document.querySelector(".reviewer-text");
const thumbnailCollection = document.querySelectorAll(".thumbnail");
const reviewerDataContainer = carousel.querySelector(".reviewer-data-wrapper");
let currentAvatar = 0;
let timeoutId;
let selectedThumbnail;
let deselectedThumbnail;
/**
 * @param {number} index the argument which is used to select which image to show.
 
 * @description a function that sets the source and alt attributes of the avatar
 */

const setAndShowAvatar = (index) => {
  avatar.setAttribute("src", `${thumbnailsArray[index].avatarSrc}`);
  avatar.setAttribute("alt", `${thumbnailsArray[index].alt}`);
};

setAndShowAvatar(currentAvatar);

/**
 * @description a function that cycles between selected thumbnails
 * @param {number} index the argument which is used to select which thumbnail to show.
 */

const selectThumbnail = (index) => {
  selectedThumbnail = thumbnailContainer.querySelector(".selected-thumbnail");
  deselectedThumbnail = thumbnailContainer.querySelector(
    ".deselected-thumbnail"
  );

  deselectedThumbnail.classList.remove("deselected-thumbnail");
  selectedThumbnail.classList.add("deselected-thumbnail");
  selectedThumbnail.classList.remove("selected-thumbnail");
  thumbnailCollection[index].classList.add("selected-thumbnail");
};

/**
 * @description a function that fills and shows the name, job, and review of each reviewer.
 * @param {number} index the argument which is used to select which text to show.
 */

const changeReviewerContent = (index) => {
  reviewerName.innerText = `${thumbnailsArray[index].name}`;
  job.innerText = `${thumbnailsArray[index].job}`;
  text.innerText = `${thumbnailsArray[index].review}`;
};

changeReviewerContent(currentAvatar);

//////////////////////////////////EVENT LISTENER/////////////////////////////////////

carousel.addEventListener("click", (event) => {
  if (event.target.tagName == "BUTTON") {
    if (event.target.dataset.direction == "next") {
      currentAvatar += 1;
      if (currentAvatar >= thumbnailsArray.length) {
        currentAvatar = 0;
      }
    } else {
      currentAvatar -= 1;
      if (currentAvatar < 0) {
        currentAvatar = thumbnailsArray.length - 1;
      }
    }
  } else if (event.target.classList.contains("thumbnail")) {
    currentAvatar = +event.target.dataset.index;
  }

  clearTimeout(timeoutId);
  $(avatar).fadeOut(350);
  $(reviewerDataContainer).fadeOut(350);

  timeoutId = setTimeout(() => {
    setAndShowAvatar(currentAvatar);
    changeReviewerContent(currentAvatar);
    $(avatar).fadeIn(350);
    $(reviewerDataContainer).fadeIn(350);
  }, 350);
  selectThumbnail(currentAvatar);
});
