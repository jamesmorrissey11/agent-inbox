import assert from "node:assert/strict";
import test from "node:test";
import type { MutableRefObject } from "react";
import type { HumanInterrupt } from "./types";
import { createDefaultHumanResponse, normalizeDeploymentUrl } from "./utils";

test("normalizes local deployment URLs without a scheme", () => {
  assert.equal(
    normalizeDeploymentUrl("localhost:2024"),
    "http://localhost:2024"
  );
});

test("preserves valid schemes and removes surrounding whitespace and trailing slashes", () => {
  assert.equal(
    normalizeDeploymentUrl(" https://example.us.langgraph.app/// "),
    "https://example.us.langgraph.app"
  );
});

test("returns an empty value for blank input", () => {
  assert.equal(normalizeDeploymentUrl("   "), "");
});

test("invitation interrupts expose accept and ignore controls", () => {
  const interrupt: HumanInterrupt = {
    action_request: { action: "Accept invitation?", args: { name: "Ada" } },
    config: {
      allow_accept: true,
      allow_ignore: true,
      allow_edit: false,
      allow_respond: false,
    },
  };
  const initialValues = {
    current: {},
  } as MutableRefObject<Record<string, string>>;

  const result = createDefaultHumanResponse([interrupt], initialValues);

  assert.equal(result.defaultSubmitType, "accept");
  assert.equal(result.hasAccept, true);
  assert.deepEqual(
    result.responses.map((response) => response.type),
    ["ignore", "accept"]
  );
});

test("message interrupts expose edit, accept, and ignore controls", () => {
  const interrupt: HumanInterrupt = {
    action_request: {
      action: "Reply?",
      args: { suggested_reply: "Approved draft" },
    },
    config: {
      allow_accept: true,
      allow_ignore: true,
      allow_edit: true,
      allow_respond: false,
    },
  };
  const initialValues = {
    current: {},
  } as MutableRefObject<Record<string, string>>;

  const result = createDefaultHumanResponse([interrupt], initialValues);

  assert.equal(result.defaultSubmitType, "accept");
  assert.equal(result.hasAccept, true);
  assert.deepEqual(
    result.responses.map((response) => response.type),
    ["edit", "ignore", "accept"]
  );
  assert.deepEqual(initialValues.current, {
    suggested_reply: "Approved draft",
  });
});
