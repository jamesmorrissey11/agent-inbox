import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { WelcomeInboxDescription } from "./welcome-inbox-description";

test("welcome description uses phrasing content that is valid inside DialogDescription", () => {
  const html = renderToStaticMarkup(<WelcomeInboxDescription />);

  assert.match(html, /<span class="block">/);
  assert.match(html, /To get started/);
  assert.match(html, /Check out our docs/);
  assert.doesNotMatch(html, /<p/);
});
