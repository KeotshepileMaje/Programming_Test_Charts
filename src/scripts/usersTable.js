import getData from "../../libs/getUsers.js";

let selectedDesignation = null;

const buildTable = async (data) => {
  const tableBody = document.querySelector(".table_body table tbody");

  // Error handling for missing table element
  if (!tableBody) {
    console.error('Error: Table element with ID "myTable" not found.');
    return; // Exit if table element is not found
  }

  // Clear existing table rows
  tableBody.innerHTML = "";

  // Function for creating table rows using template literals
  function createTableRow(user) {
    const template = `
            <tr>
                <td>${user.name} ${user.surname}</td>
                <td>${user.designation}</td>
                <td>${user.department}</td>
            </tr>
        `;

    return template;
  }

  // Create and append table rows for each user in data
  data.forEach((user) => {
    const rowHtml = createTableRow(user);
    tableBody.insertAdjacentHTML("beforeend", rowHtml);
  });
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

    return li;
  };

  console.log(data);
  const dropDownOptions = data.map(createOptions);
  optionsContainer.append(...dropDownOptions);
  console.log(dropDownMenu);

  dropDownOptions.forEach((option) => {
    option.addEventListener("click", () => {
      let selectedOption = option.querySelector("span").innerText;

      selectedDesignation = selectedOption;
      console.log(selectedOption);
      sBtn_text.innerText = selectedOption;
      dropDownMenu.classList.remove("active");

      // Filter users based on selected designation
      const filteredUsers = data.filter(
        (user) => user.designation === selectedDesignation
      );

      buildTable(filteredUsers);

    });
  });
};

// Wrap your code within an asynchronous function for proper execution
(async function () {
  const data = await getData(); // Fetch data only once

  createDropDownMenu(data);
  buildTable(data);
  handleSearchInput(data);
})();

// Modify handleSearchInput function to accept data as a parameter
async function handleSearchInput(data) {
  const fuse = new Fuse(data, {
    keys: ["name", "surname", "designation", "department"],
    threshold: 0.2,
  }); // Initialize Fuse with data
  const searchInput = document.getElementById("search_input");
  const tableBody = document.querySelector(".table_body table tbody");

  searchInput.addEventListener("input", function (event) {
    const searchTerm = event.target.value.trim();

    const result = fuse.search(searchTerm);
    console.log(result);
    if (searchTerm === "") {
      console.log("data...f.");
      buildTable(data);
    } else {
      // Extract user information from search results
      const users = result.map((item) => item.item);
      // Rebuild the table with user information
      buildTable(users);
    }
  });
}

// createDropDownMenu(await getData());

// buildTable(await getData());

// async function handleSearchInput() {
//   const fuse = new Fuse(await getData(), {
//     keys: ["name", "surname", "designation", "department"],
//     threshold: 0.2,
//   }); // Initialize Fuse with data
//   const searchInput = document.getElementById("search_input");

//   searchInput.addEventListener("input", function (event) {
//     const searchTerm = event.target.value.trim();
//     const result = fuse.search(searchTerm);

//     buildTable(result)

//     console.log(result);
//   });
// }

// // Call the function to handle search input
// handleSearchInput();

//--------------------------------------------------------------------//

// function pagination(pageNumber) {
//   const pageSize = 20;
//   const skipPage = (pageNumber - 1) * pageSize;

//   return skipPage;
// }
