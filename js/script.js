let dataItems = [];

async function searchData() {
  try {
    const response = await fetch("../data/all-items.json");
    if (!response.ok) throw new Error("Error loading JSON");
    const jsonData = await response.json();
    dataItems = jsonData.data;
    updateTable(dataItems);
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
