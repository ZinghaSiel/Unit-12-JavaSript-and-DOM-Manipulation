// from data.js
var tableData = data;

tbody = d3.select("tbody");
tableData.forEach(function(element) {
row = tbody.append("tr");
row.html(`<td>${element['datetime']}</td>
          <td>${element['city']}</td>
          <td>${element['state']}</td>
          <td>${element['country']}</td>
          <td>${element['shape']}</td>
          <td>${element['durationMinutes']}</td>
          <td>${element['comments']}</td>`);
})

// Define Variables
var button = d3.select("#filter-btn");
var inputField1 = d3.select("#datetime");
var inputField2 = d3.select("#city");
var tbody = d3.select("tbody");
var resetbtn = d3.select("#reset-btn");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

button.on("click", () => {
  d3.event.preventDefault();
  var inputDate = inputField1.property("value").trim();
  var inputCity = inputField2.property("value").toLowerCase().trim();
  var filterDate = data.filter(data => data.datetime === inputDate);
  console.log(filterDate)
  var filterCity = data.filter(data => data.city === inputCity);
  console.log(filterCity)
  var filterData = data.filter(data => data.datetime === inputDate && data.city === inputCity);
  console.log(filterData)

  tbody.html("");

  let response = {
    filterData, filterCity, filterDate
  }
  if (response.filterData.length !== 0) {
    populate(filterData);
  }
    else if (response.filterData.length === 0 && ((response.filterCity.length !== 0 || response.filterDate.length !== 0))){
      populate(filterCity) || populate(filterDate);
  
    }
    else {
      tbody.append("tr").append("td").text("No results found!"); 
    }
});

resetbtn.on("click", () => {
  tbody.html("");
  populate(data)
  console.log("Table reset")
});
