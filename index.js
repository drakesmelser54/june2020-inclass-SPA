import { Header, Nav, Main, Footer } from "./components";
import * as state from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";

const router = new Navigo(location.origin);

router
  .on({
    "/": () => render(state.Home),
    ":page": params => {
      let routeEntered = params.page;
      let formattedRoute = capitalize(routeEntered);
      let pieceOfState = state[formattedRoute];
      render(pieceOfState);
    }
  })
  .resolve();

axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
  state.Blog.posts = response.data;
  if (router.lastRouteResolved().params) {
    const currentPage = router.lastRouteResolved().params.page;
    render(state[currentPage]);
  }
});

function render(st = state.Home) {
  document.querySelector("#root").innerHTML = `
  ${Header(st)}
  ${Nav(state.Links)}
  ${Main(st)}
  ${Footer()}
  `;

  router.updatePageLinks();

  addPicOnFormSubmit(st);
}

function addPicOnFormSubmit(st) {
  if (st.page === "Register") {
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      let inputList = event.target.elements;

      let newPicObject = {
        title: inputList[1].value,
        url: inputList[0].value
      };

      state.Gallery.pictures.push(newPicObject);

      render(state.Gallery);
    });
  }
}

// add menu toggle to bars icon in nav bar
document.querySelector(".fa-bars").addEventListener("click", () => {
  document.querySelector("nav > ul").classList.toggle("hidden--mobile");
});
