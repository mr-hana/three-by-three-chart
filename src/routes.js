import React from "react";
import IndexPage from "./pages/IndexPage";
import NewPage from "./pages/NewPage";
import RandomPage from "./pages/RandomPage";

export default [
  {
    name: "",
    path: "/",
    exact: true,
    component: props => <IndexPage {...props} />,
    isMenu: false,
    onlyCreated: true,
  },
  {
    name: "Center",
    path: "/center",
    component: props => <IndexPage {...props} />,
    isMenu: true,
    onlyCreated: true,
  },
  {
    name: "Random",
    path: "/random",
    component: props => <RandomPage {...props} />,
    isMenu: true,
    onlyCreated: true,
  },
  {
    name: "New",
    path: "/new",
    component: props => <NewPage {...props} />,
    isMenu: true,
    onlyCreated: false,
  }
];