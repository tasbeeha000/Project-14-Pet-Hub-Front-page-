

document.addEventListener("DOMContentLoaded", function () {
  let ProductList = document.querySelectorAll(".product");
  let inputBar = document.getElementById("inputBar");

  const productListData = Array.from(ProductList).map((product) => {
    const name = product.querySelector(".pName").innerHTML.toLowerCase();
    return { name, element: product };
  });

  const fuseOptions = {
    keys: ["name"],
  };

  const fuse = new Fuse(productListData, fuseOptions);

  function ProductSearch() {
    let searchItem = inputBar.value.toLowerCase();
    const searchResults = fuse.search(searchItem);

    let hasMatch = false;

    for (let i = 0; i < productListData.length; i++) {
      if (searchItem == "") {
        productListData[i].element.classList.add("show");
        productListData[i].element.classList.remove("hide");
        hasMatch = true;
      } else if (
        searchResults.some((result) => result.item === productListData[i])
      ) {
        productListData[i].element.classList.add("show");
        productListData[i].element.classList.remove("hide");
        hasMatch = true;
      } else {
        productListData[i].element.classList.remove("show");
        productListData[i].element.classList.add("hide");
      }
    }

    let NoResult = document.getElementById("no-result");

    if (!hasMatch && searchItem !== "") {
      NoResult.classList.remove("hide");
      NoResult.classList.add("show-result");
    } else {
      NoResult.classList.remove("show-result");
      NoResult.classList.add("hide");
    }
  }

  inputBar.addEventListener("input", ProductSearch);
});

let humburgerIcon = document.getElementById("humIcon");
let MenuBtn = document.getElementById("MenuButton");
let ResponsiveMenu = document.getElementById("ResMenu");

const breakpoint = 700;

function toggleHamburgerIcon() {
  if (window.innerWidth <= breakpoint) {
    humburgerIcon.classList.remove("hide");
    MenuBtn.classList.add("hide");
  } else {
    humburgerIcon.classList.add("hide");
    MenuBtn.classList.remove("hide");
    ResponsiveMenu.classList.add("hide");
  }
}

function ShowResponsiveNav() {
  ResponsiveMenu.classList.toggle("hide");
}
humburgerIcon.addEventListener("click", ShowResponsiveNav);

// toggleHamburgerIcon();

window.addEventListener("resize", toggleHamburgerIcon);
