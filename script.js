document.addEventListener("DOMContentLoaded", function () {
    let ProductList = document.querySelectorAll(".product");
    let inputBar = document.getElementById("inputBar");

    // Your list of items to search through
    const productListData = Array.from(ProductList).map((product) => {
      const name = product.querySelector(".pName").innerHTML.toLowerCase();
      return { name, element: product };
    });

    // Set up the options for fuzzy search
    const fuseOptions = {
      keys: ["name"],
    };

    // Create a new instance of Fuse with your data and options
    const fuse = new Fuse(productListData, fuseOptions);

    function ProductSearch() {
      let searchItem = inputBar.value.toLowerCase();

      // Perform the fuzzy search
      const searchResults = fuse.search(searchItem);

      for (let i = 0; i < productListData.length; i++) {
        if (searchItem == "") {
          productListData[i].element.classList.add("show");
          productListData[i].element.classList.remove("hide");
        } else if (
          searchResults.some((result) => result.item === productListData[i])
        ) {
          productListData[i].element.classList.add("show");
          productListData[i].element.classList.remove("hide");
        } else {
          productListData[i].element.classList.remove("show");
          productListData[i].element.classList.add("hide");
        }
      }
    }

    inputBar.addEventListener("input", ProductSearch);
  });