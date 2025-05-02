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

buttonFilter.forEach((filterButton) =>
  filterButton.addEventListener("click", (event) => {
    console.log(dataFeedbacks);
    buttonFilter.forEach((button) => {
      button.style.backgroundColor = "";
      button.style.color = "#aa8558";
    });

    const typeToFilter = filterButton.getAttribute("data-type");

    event.target.style.backgroundColor = "#F9C06A";
    event.target.style.color = "#000000";
    if (typeToFilter === "All") {
      updateTable(dataItems);
    } else {
      const filteredItems = dataItems.filter(
        (item) => item.type === typeToFilter
      );
      updateTable(filteredItems);
    }
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
