import Fuse from "https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs";

import getData from "../../libs/getUsers.js";

 // function pagination(pageNumber) {
  //   const pageSize = 20;
  //   const skipPage = (pageNumber - 1) * pageSize;

  //   return skipPage;
  // }

let selectedDesignation = null;

const buildTable = (data) => {
  const tableBody = document.querySelector(".table_body table tbody");

  // Error handling for missing table element
  if (!tableBody) {
    console.error('Error: Table element with ID "myTable" not found.');
    return; // Exit if table element is not found
  }

  // Function for creating table rows using template literals
  function createTableRow(user) {
    const template = `
      <tr>
        <td>${user.name} ${user.surname}</td>
        <td>${user.designation}</td>
        <td>${user.department}</td>
      </tr>
    `;

    const row = document.createElement("tr");
    row.innerHTML = template.trim(); // Trim leading/trailing whitespace

    return row;
  }

  const tableRows10 = data.slice(0, 20).map(createTableRow); // Create table rows with map
  tableBody.append(...tableRows10); // Efficiently append rows using spread syntax
};

const createDropDownMenu = (data) => {
  const dropDownMenu = document.querySelector(".drop_down_menu");
  const selectBtn = dropDownMenu.querySelector(".select-btn");
  const optionsContainer = dropDownMenu.querySelector(".options");
  const sBtn_text = dropDownMenu.querySelector(".sBtn-text");

  selectBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle("active");
  });

  const createOptions = (user) => {
    const dropDownTemplate = `
      <span>${user.designation}</span>
    `;

    const li = document.createElement("li");
    li.innerHTML = dropDownTemplate.trim();

    return li
  };

  console.log(data)
  const dropDownOptions = data.map(createOptions);
  optionsContainer.append(...dropDownOptions);
  console.log(dropDownMenu)

  dropDownOptions.forEach((option) => {
    option.addEventListener("click", () => {
      let selectedOption = option.querySelector("span").innerText;

      selectedDesignation = selectedOption;
      console.log(selectedOption)
      sBtn_text.innerText = selectedOption;
      dropDownMenu.classList.remove("active");
    });
  });
};

createDropDownMenu(await getData());

console.log(selectedDesignation)

buildTable(await getData());



//--------------------------------------------------------------------//

// const fuse = await new Fuse( cachedData, {
//   keys: ["name", "surname", "department", "disignation"],
// });

// console.log(fuse)

// const search = document.querySelector(".input-group input"),
//   table_rows = document.querySelectorAll("tbody tr"),
//   table_headings = document.querySelectorAll("thead th");

// // 1. Searching for specific data of HTML table
// search.addEventListener("input", searchTable);

// function searchTable() {
//   table_rows.forEach((row, i) => {
//     let table_data = row.textContent.toLowerCase(),
//       search_data = search.value.toLowerCase();

//     row.classList.toggle("hide", table_data.indexOf(search_data) < 0);
//     row.style.setProperty("--delay", i / 25 + "s");
//   });

//   document.querySelectorAll("tbody tr:not(.hide)").forEach((visible_row, i) => {
//     visible_row.style.backgroundColor =
//       i % 2 == 0 ? "transparent" : "#0000000b";
//   });
// }
