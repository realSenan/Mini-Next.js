import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
function Home() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Mini Next" }),
    /* @__PURE__ */ jsx("p", { children: "SSR works." })
  ] });
}
export {
  Home as default
};
