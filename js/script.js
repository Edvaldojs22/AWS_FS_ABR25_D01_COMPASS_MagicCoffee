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
    const tr = document.createElement("tr");
    const itemName = document.createElement("td");
    itemName.textContent = items.name;

    const itemType = document.createElement("td");
    itemType.textContent = items.type;

    const itemPreice = document.createElement("td");
    itemPreice.textContent = items.price;

    tr.appendChild(itemName);
    tr.appendChild(itemType);
    tr.appendChild(itemPreice);

    tableBody.appendChild(tr);
  });
}

searchData();
