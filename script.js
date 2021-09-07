const imagesContainer = document.getElementById("images-field");
const sliderSelection = document.getElementById("slider-control");
const KEY = "23274766-a1e4914992371cc8e0fa2878e";
let slider = [];
let indexNum = 0;
let isClick = false;

// loadImages: to get images from api;
const loadImages = async () => {
  slider = [];
  clearInterval(sliderImage);
  imagesContainer.textContent = "";
  const searchField = document.getElementById("search-input");
  const url = `https://pixabay.com/api/?key=${KEY}&q=${searchField.value}&image_type=photo&pretty=true`;
  const res = await fetch(url);
  const data = await res.json().catch((error) => {
    console.log(error);
  });
  searchField.value = "";
  if (data.total === 0) {
    console.log("Your result dosen't found");
    return;
  }
  setImages(data.hits);
};

// setImages: to set images  on html doc;
const setImages = (arr) => {
  arr.forEach((elem) => {
    const { largeImageURL, tags, id } = elem;
    const identity = tags.split(",");
    const div = document.createElement("div");
    div.classList.add("p-0", "col-lg-3", "col-md-4", "col-sm-6", "col-12");
    div.setAttribute("onclick", `singleImage(this,${id})`);
    div.innerHTML = `<img width="257px" src=${largeImageURL} alt= '${identity[0]}-image'/>`;
    imagesContainer.appendChild(div);
  });
  // show slider control-
  sliderSelection.style.display = "block";
};

// singleImgae: to selec single images-
const singleImage = async (event, id) => {
  event.childNodes[0].style.border = "3px solid red";
  const url = `https://pixabay.com/api/?key=${KEY}&id=${id}&image_type=photo&pretty=true`;
  const res = await fetch(url);
  const data = await res.json();
  const imageUrl = data.hits[0].largeImageURL;
  slider.push(imageUrl);
  // visible clearly create-slider btn & slider function calling
  const createSlider = document.getElementById("create-slider");
  createSlider.removeAttribute("disabled");
  isClick = true;
  createSlider.addEventListener("click", setSlider);
};

// setSlider: to set setSingleImage as in slider-
const setSlider = () => {
  imagesContainer.textContent = "";
  const item = document.createElement("div");
  item.classList.add("w-75", "h-25", "mx-auto");
  item.innerHTML = `<img width="100%" height ="400px" src = ${slider[indexNum]} style="object-fit:cover;"/>`;
  imagesContainer.appendChild(item);
  sliderSelection.style.display = "none";
  if (isClick === true) {
    slideStart();
  }
};

let sliderImage;

let slideStart = () => {
  isClick = false;
  const duration = document.getElementById("duration-input").value || 1000;
  if (duration < 500) {
    alert("Plese set duration time more than 500ms!");
    imagesContainer.textContent = "";
    return;
  }
  sliderImage = setInterval(() => {
    if (indexNum === slider.length - 1) {
      indexNum = 0;
    } else {
      indexNum++;
    }
    console.log(indexNum);
    setSlider();
  }, duration);
};
