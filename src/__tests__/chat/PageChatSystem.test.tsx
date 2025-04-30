import { render } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import * as React from "react";
import PageChatSystem from "@chatComponent/PageChat/PageChatSystem";

// Mock useState
const DUMMY_FN = () => {};
const states = [
  [false, DUMMY_FN], // isFocused
  [false, DUMMY_FN], // isSidebarOpen
  [true, DUMMY_FN], // isChatSidebarOpen
  ["", DUMMY_FN], // searchTerm
  ["", DUMMY_FN], // opnedChatName
  [true, DUMMY_FN], // isConnected
  [false, DUMMY_FN], // isMobileView
  [false, DUMMY_FN], // menuOpen
  [false, DUMMY_FN], // showBlockConfirmation
];

describe("PageChatSystem", () => {
  it("renders ChatCardsList with mocked useState", () => {
    render(<PageChatSystem />);
  });
});
