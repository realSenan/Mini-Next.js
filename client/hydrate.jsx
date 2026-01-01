import React from "react";
import { hydrateRoot } from "react-dom/client";

const container = document.getElementById("root");
const page = container.dataset.page;

// Browser path
const Page = (await import(`/pages${page}.jsx`)).default;

hydrateRoot(container, <Page />);
