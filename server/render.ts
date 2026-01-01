import React from "react";
import { renderToString } from "react-dom/server";
import { loadPage } from "./loadPage.ts";

export const renderPage = async (url: string) => {
  const Page = await loadPage(url);

  const content = renderToString(React.createElement(Page));

  return `
    <!DOCTYPE html>
    <html>
      <body>
        <div id="root" data-page="${url}">${content}</div>
        <script type="module" src="/client/hydrate.jsx"></script>
      </body>
    </html>
  `;
};
