import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import FloatingChatSidebar from "@chatComponent/FloatingChat/FloatingChatSidebar";
import { useAppSelector } from "@store/hooks";

// Mock the necessary dependencies
vi.mock("@store/hooks", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("@hooks/useChats", () => ({
  default: () => ({
    setOpnedChats: vi.fn(),
  }),
}));

vi.mock("@services/api/ChatSocket", () => ({
  connectToChat: vi.fn(),
  disconnectChatSocket: vi.fn(),
}));

describe("FloatingChatSidebar", () => {
  it("toggles active state when header is clicked", () => {});

  it("renders SearchBar and ConnectionsDropdown", () => {});

  it("switches between ChatCardsList and NetWorksChatList when search is focused", () => {});
});
