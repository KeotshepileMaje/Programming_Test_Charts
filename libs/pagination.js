export default function pagination(numberOfUsers, callback) {
  let newPage = 1; // Declare newPage variable inside the pagination function
  callback(newPage);
  const paginationList = document.getElementById("pagination_list");
  let totalPages = Math.ceil(numberOfUsers / 10); // Change this to the total number of pages you have
  let activePage = 1; // Initialize active page
  let displayedPages = 5; // Maximum number of pages to display

  // Function to create page numbers
  function createPageNumbers() {
    paginationList.innerHTML = ""; // Clear previous page numbers
    let startingPage = Math.max(1, activePage - Math.floor(displayedPages / 2));
    let endingPage = Math.min(totalPages, startingPage + displayedPages - 1);

    if (endingPage - startingPage < displayedPages - 1) {
      startingPage = Math.max(1, endingPage - displayedPages + 1);
    }

    // Add first page if not already present and activePage is not the first page
    if (startingPage > 1) {
      const firstPage = document.createElement("li");
      firstPage.textContent = 1;
      firstPage.classList.add("page_number");
      firstPage.id = 1;
      paginationList.appendChild(firstPage);

      if (activePage !== 1) {
        const ellipsis = document.createElement("li");
        ellipsis.textContent = "...";
        paginationList.appendChild(ellipsis);
      }
    }
    // Add intermediate pages
    for (let i = startingPage; i <= endingPage; i++) {
      const page = document.createElement("li");
      page.textContent = i;
      page.classList.add("page_number");
      page.id = i;
      paginationList.appendChild(page);
    }

    // Add ellipsis if necessary
    if (endingPage < totalPages) {
      const ellipsis = document.createElement("li");
      ellipsis.textContent = "...";
      paginationList.appendChild(ellipsis);

      // Add last page if not already present and activePage is not the last page
      const lastPage = document.createElement("li");
      lastPage.textContent = totalPages;
      lastPage.classList.add("page_number");
      lastPage.id = totalPages;
      paginationList.appendChild(lastPage);
    }

    document.getElementById(activePage).classList.add("active_page");
  }

  // Initial creation of page numbers
  createPageNumbers();

  const pageNumbers = document.querySelectorAll(".page_number");
  const prevButton = document.querySelector(".prev");
  const nextButton = document.querySelector(".next");

  // Function to handle updating active page
  function updateActivePage(newPage) {
    // Remove active_page class from all page numbers
    pageNumbers.forEach(function (num) {
      num.classList.remove("active_page");
    });

    // Add active_page class to the new active page
    document.getElementById(newPage).classList.add("active_page");
    activePage = newPage;
    createPageNumbers();
  }
  // Event listener for Prev button
  prevButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (activePage > 1) {
      updateActivePage(activePage - 1);
      callback(activePage); // Call the callback function with the newPage value
    }
  });

  // Event listener for Next button
  nextButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (activePage < totalPages) {
      updateActivePage(activePage + 1);
      callback(activePage); // Call the callback function with the newPage value
    }
  });

  // Event listener for page numbers
  paginationList.addEventListener("click", function (event) {
    if (event.target && event.target.matches(".page_number")) {
      newPage = parseInt(event.target.textContent);
      updateActivePage(newPage);
      callback(newPage); // Call the callback function with the newPage value
    }
  });
}
