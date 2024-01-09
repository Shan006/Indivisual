import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/user/root";
import Company from "./routes/admin/company/company";
import Phone from "./routes/admin/phone/Phone";
import Category from "./routes/admin/templateCategory/Category";
import Template from "./routes/admin/template/Template";
import Case from "./routes/admin/case/Case";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/admin/company",
    element: <Company/>,
  },
  {
    path: "/admin/phone",
    element: <Phone/>,
  },
  {
    path: "/admin/category",
    element: <Category/>,
  },
  {
    path: "/admin/template",
    element: <Template/>,
  },
  {
    path: "/admin/case",
    element: <Case/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);