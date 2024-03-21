const buildTable = (data) => {
  var table = document.getElementById("myTable");

  // The loop to display the users is currently imperative
  // I am going to later make it declarative
  for (var i = 0; i < 10; i++) {
    var row = `
    <tr>
        <td>${data[i].name} ${data[i].surname}</td>
        <td>${data[i].designation}</td>
        <td>${data[i].department}</td>
    </tr>
    `;
    table.innerHTML += row.trim();
  }
}

fetch("../../utils/users.json")
    .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not successful");
        }
        return res.json()       
    })
    .then((data) =>buildTable(data))
    .catch((error) => console.error('Something went wrong', error))
