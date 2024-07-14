document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("simple-search");
  searchInput.addEventListener("input", (event) => {
    document.title = `${event.target.value} - Search` || "Default Title";
    // history.pushState(null,null)
  });
});

document
  .getElementById("search-form")
  .addEventListener("submit", function (event) {
    /// Category Value
    let currentCategoryValue =
      document.getElementById("category-dropdown").value;
    let previousCategoryValue = document.getElementById(
      "previous-category-dropdown"
    ).value;

    if (currentCategoryValue == previousCategoryValue) {
      /// Search Value
      let previousSearchValue =
        document.getElementById("previous-search").value;
      let currentSearchValue = document.getElementById("simple-search").value;
      // alert(
      //   `Name Query Current: ${currentSearchValue} Previous: ${previousSearchValue}`
      // );
      if (currentSearchValue === previousSearchValue) {
        return event.preventDefault();
      }
      previousSearchValue = currentSearchValue;
      return;
    }
    previousCategoryValue = currentCategoryValue;
    // alert(
    //   `Category Query Current: ${currentCategoryValue} Previous: ${previousCategoryValue}`
    // );
  });
