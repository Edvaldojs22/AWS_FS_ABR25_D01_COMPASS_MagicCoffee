let dataItems = [];
let dataFeedbacks = [];

async function searchData() {
  try {
    const [responseItems, responseFesdbacks] = await Promise.all([
      fetch("../data/all-items.json"),
      fetch("../data/feedbacks.json"),
    ]);

    if (!responseItems.ok || !responseFesdbacks.ok)
      throw new Error("Error loading JSON");

    const jsonDataItems = await responseItems.json();
    const jsonDataFeedbacks = await responseFesdbacks.json();

    dataItems = jsonDataItems.data;
    dataFeedbacks = jsonDataFeedbacks.data;
    dataItmesNew(dataItems);
    updateTable(dataItems);
    pushFeedbaks();
    $("#carrosel").slick({
      arrows: true,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow:
        '<button type="button" class="slick-prev"> <img class="imgArrawLeft"  src="assets/img/left-arrow.png" alt=""></button>',
      nextArrow:
        '<button type="button" class="slick-next"><img class="imgArrawRight"  src="assets/img/right-arrow.png"</button>',
    });
  } catch (error) {
    console.log("Erro:", error);
  }
}

searchData();

function dataItmesNew(items) {
  const dashboardCards = document.querySelector(".dashboardCards");
  items.forEach((item) => {
    if (item.is_new) {
      const card = document.createElement("div");
      card.classList.add("card");
      const img = document.createElement("img");
      img.src = item.imagem_url;

      const cardAtributes = document.createElement("div");
      cardAtributes.classList.add("cardAtributes");
      const textName = document.createElement("p");
      textName.textContent = item.name;
      const textPercentage = document.createElement("p");
      textPercentage.textContent = `${item.ingredients_ratio[0].ingredient} ${item.ingredients_ratio[0].percentage}% | ${item.ingredients_ratio[1].ingredient} ${item.ingredients_ratio[1].percentage}%`;

      const textValue = document.createElement("p");

      textValue.textContent = `R$ ${convertToReal(item.price).toFixed(2)}`;
      const button = document.createElement("button");
      button.textContent = "Order now";
      button.classList.add("buttonOrder");

      cardAtributes.appendChild(textName);
      cardAtributes.appendChild(textPercentage);
      cardAtributes.appendChild(textValue);
      cardAtributes.appendChild(button);

      card.appendChild(img);
      card.appendChild(cardAtributes);

      dashboardCards.appendChild(card);
    }
  });
}

function updateTable(items) {
  const tableBody = document.querySelector("#tableBody");
  tableBody.innerHTML = "";

  items.forEach((item) => {
    let price = convertToReal(item.price);
    const tr = document.createElement("tr");
    tr.classList.add("trTbody");

    const itemName = document.createElement("td");
    itemName.classList.add("nameTbody");
    itemName.textContent = item.name;

    const itemType = document.createElement("td");
    itemType.classList.add("typeTbody");
    itemType.textContent = item.type;

    const itemPrice = document.createElement("td");
    itemPrice.classList.add("priceTbody");
    itemPrice.textContent = `R$ ${price.toFixed(2)}`;

    tr.appendChild(itemName);
    tr.appendChild(itemType);
    tr.appendChild(itemPrice);

    tableBody.appendChild(tr);
  });
}

function convertToReal(value) {
  return 5.66 * value;
}

const buttonFilter = document.querySelectorAll(".buttonFilter");
buttonFilter[0].style.backgroundColor = "#F9C06A";
buttonFilter[0].style.color = "#aa8558";
buttonFilter[0].style.transform = "translateY(-8px)";
buttonFilter[0].style.color = "#000000";
const loadigBoxs = document.querySelector(".loading");

buttonFilter.forEach((filterButton) =>
  filterButton.addEventListener("click", (event) => {
    loadigBoxs.style.display = "flex";
    tableBody.style.opacity = "0";

    buttonFilter.forEach((button) => {
      button.style.backgroundColor = "";
      button.style.color = "#aa8558";
      button.style.transform = "translateY(0)";
    });
    event.target.style.backgroundColor = "#F9C06A";
    event.target.style.color = "#000000";
    event.target.style.transform = "translateY(-8px)";

    setTimeout(() => {
      loadigBoxs.style.display = "none";
      tableBody.style.opacity = "1";

      const typeToFilter = filterButton.getAttribute("data-type");

      if (typeToFilter === "All") {
        updateTable(dataItems);
      } else {
        const filteredItems = dataItems.filter(
          (item) => item.type === typeToFilter
        );
        updateTable(filteredItems);
      }
    }, 2500);
  })
);

function pushFeedbaks() {
  const painelFeedbak = document.querySelector("#carrosel");

  dataFeedbacks.forEach((element) => {
    painel = document.createElement("div");
    painel.classList.add("painel");

    text = document.createElement("p");
    text.textContent = element.message;

    painelText = document.createElement("div");
    painelText.classList.add("painelText");

    textName = document.createElement("p");
    textName.textContent = element.full_name;

    textProfession = document.createElement("p");
    textProfession.textContent = element.profession;

    img = document.createElement("img");
    img.src = element.image_url;

    painel.appendChild(text);
    painelText.appendChild(textName);
    painelText.appendChild(textProfession);
    painel.appendChild(painelText);
    painel.appendChild(img);

    painelFeedbak.appendChild(painel);
  });
}

let saved;
const textApproved = document.querySelector(".textApproved");
const iconLoading = document.querySelector(".iconLoading");
const buttonEmail = document.querySelector("#buttonEmail");
const inputEmail = document.querySelector("#email");
let emailValue;

function setSubscribedUI() {
  textApproved.style.display = "block";
  buttonEmail.style.backgroundColor = "#ff0000";
  buttonEmail.style.color = "black";
  buttonEmail.textContent = "Unsubscribe";
}

function setUnsubscribedUI() {
  textApproved.style.display = "none";
  buttonEmail.style.backgroundColor = "#F9C06A";
  buttonEmail.style.color = "";
  buttonEmail.textContent = "Subscribe";
}

function showMessage(message, color = "#ffffff") {
  textApproved.textContent = message;
  textApproved.style.display = "block";
  textApproved.style.color = color;
}

function hideMessage(delay = 4500) {
  setTimeout(() => {
    textApproved.style.display = "none";
  }, delay);
}

function showLoading() {
  iconLoading.style.display = "block";
  buttonEmail.textContent = "";
}

function hideLoading() {
  iconLoading.style.display = "none";
}

window.addEventListener("DOMContentLoaded", () => {
  saved = localStorage.getItem("savedEmail");
  inputEmail.value = saved;

  if (inputEmail.value !== "") {
    setSubscribedUI();
  } else {
    setUnsubscribedUI();
  }
});

inputEmail.addEventListener("input", () => {
  emailValue = inputEmail.value;

  if (saved === emailValue) {
    setSubscribedUI();
  } else {
    setUnsubscribedUI();
  }
});

function validateEmail(event) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regex.test(inputEmail.value)) {
    if (
      inputEmail.value === saved &&
      buttonEmail.textContent === "Unsubscribe"
    ) {
      showLoading();
      textApproved.style.display = "none";

      setTimeout(() => {
        localStorage.clear();
        saved = "";
        hideLoading();
        setUnsubscribedUI();
        inputEmail.value = "";
        showMessage("Email removed.");
      }, 2000);

      hideMessage();
    } else {
      showLoading();

      setTimeout(() => {
        hideLoading();
        localStorage.setItem("savedEmail", inputEmail.value);
        saved = inputEmail.value;
        setUnsubscribedUI();
        showMessage("Successfully accomplished.");
        inputEmail.value = "";
      }, 2000);

      hideMessage();
    }
  } else {
    showLoading();

    setTimeout(() => {
      hideLoading();
      buttonEmail.textContent = "Subscribe";
      inputEmail.value = "";
      inputEmail.placeholder = "Invalid email";
      inputEmail.classList.add("inpuntError");
      inputEmail.focus();
    }, 2000);
  }
}

const menu = document.querySelector(".menu");
const containerMenu = document.querySelector(".containerMenu");
const lines = document.querySelectorAll(".line1, .line2");
const title = document.querySelector("#title");

let teste = false;

menu.addEventListener("click", () => {
  lines.forEach((l) => {
    l.classList.toggle("active");
  });

  if (teste) {
    containerMenu.classList.remove("containerMenuShow");
    teste = false;
    title.style.color="white"
    lines.forEach((l) => {
      l.style.background = "#ffffff";
    });
  } else {
    containerMenu.classList.add("containerMenuShow");
    teste = true;
    title.style.color ="#000000"
    lines.forEach((l) => {
      l.style.background = "black";
    });
  }

});
