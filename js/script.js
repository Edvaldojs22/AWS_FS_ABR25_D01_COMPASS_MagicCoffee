const dataItems = [];
const dataFeedbacks = [];

async function searchData(params) {
  try {
    const response = await fetch("../data/all-items.json");
    if (!response.ok) throw new Error("Error loading JSON");
    const jsonData = await response.json();
    updateTable(jsonData.data);
  } catch (error) {
    console.log("Erro:", error);
  }
}

function updateTable(items) {
  console.log(items.length)
  const tableBody = document.querySelector("#tableBody");
  
  items.forEach((items) => {
    let price = convertToReal(items.price)
    const tr = document.createElement("tr");
    const itemName = document.createElement("td");
    itemName.textContent = items.name;

    const itemType = document.createElement("td");
    itemType.textContent = items.type;

    const itemPreice = document.createElement("td");
    itemPreice.textContent = `R$ ${price.toFixed(2)}`;

    tr.appendChild(itemName);
    tr.appendChild(itemType);
    tr.appendChild(itemPreice);

    tableBody.appendChild(tr);
  });
}

searchData();


function  convertToReal(value) {
  return   5.66 * value
}

// 5,66