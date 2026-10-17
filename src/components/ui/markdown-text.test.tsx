import assert from "node:assert/strict";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { MarkdownText } from "./markdown-text";

test("applies className to a wrapper instead of react-markdown", () => {
  const html = renderToStaticMarkup(
    <MarkdownText className="review-description">
      {"Review **this action**"}
    </MarkdownText>
  );

  assert.match(html, /^<div class="review-description">/);
  assert.match(html, /<strong>this action<\/strong>/);
});
