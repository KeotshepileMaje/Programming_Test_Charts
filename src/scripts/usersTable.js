import getData from "../../libs/getUsers.js";
import pagination from "../../libs/pagination.js";


const buildTable = async (data, pageNumber) => {
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

  // Calculate start and end indices for pagination
  const startIndex = (pageNumber - 1) * 10;
  const endIndex = pageNumber * 10;

  // Create and append table rows for the users in the current page
  for (let i = startIndex; i < endIndex && i < data.length; i++) {
    const rowHtml = createTableRow(data[i]);
    tableBody.insertAdjacentHTML("beforeend", rowHtml);
  }
};

const createDropDownMenu = (data) => {
  const dropDownMenu = document.querySelector(".drop_down_menu");
  const selectBtn = dropDownMenu.querySelector(".select-btn");
  const optionsContainer = dropDownMenu.querySelector(".options");
  const sBtn_text = dropDownMenu.querySelector(".sBtn-text");

  selectBtn.addEventListener("click", () => {
    dropDownMenu.classList.toggle("active");
  });

  const createOptions = (designation) => {
    const dropDownTemplate = `
      <span>${designation}</span>
    `;

    const li = document.createElement("li");
    li.innerHTML = dropDownTemplate.trim();

    return li;
  };

  const designations = data
    .map((user)=> user.designation)
  const noDuplicateDesignations = [...new Set(designations)];

  const dropDownOptions = noDuplicateDesignations.map(createOptions);
  optionsContainer.append(...dropDownOptions);

  dropDownOptions.forEach((option) => {
    option.addEventListener("click", () => {
      let selectedOption = option.querySelector("span").innerText;

      const selectedDesignation = selectedOption;
      console.log(selectedOption);
      sBtn_text.innerText = selectedOption;
      dropDownMenu.classList.remove("active");

      // Filter users based on selected designation
      const filteredUsers = data.filter(
        (user) => user.designation === selectedDesignation
      );

      pagination(filteredUsers.length, function (newPage) {
        buildTable(filteredUsers, newPage);
      });
    });
  });
};


// Modify handleSearchInput function to accept data as a parameter
async function handleSearchInput(data) {
  const fuse = new Fuse(data, {
    keys: ["name", "surname", "designation", "department"],
    threshold: 0.2,
  }); // Initialize Fuse with data
  const searchInput = document.getElementById("search_input");

  searchInput.addEventListener("input", function (event) {
    const searchTerm = event.target.value.trim();

    const result = fuse.search(searchTerm);
    console.log(result);
    if (searchTerm === "") {
      pagination(data.length, function (newPage) {
        buildTable(data, newPage);
      });
    } else {
      // Extract user information from search results
      const users = result.map((item) => item.item);
      // Rebuild the table with user information
      pagination(users.length, function (newPage) {
        buildTable(users, newPage);
      });
    }
  });
}

// Using this IIFE method and wraping all my functions that need to get 
// data aware to fetch data only once and use it on all the functions.
(async function () {
  const data = await getData();
  console.log("Data length:", data.length); // Check if data is populated

  createDropDownMenu(data);
  
  handleSearchInput(data);

  pagination(data.length, function (newPage) {
    buildTable(data, newPage);
  });
})();
