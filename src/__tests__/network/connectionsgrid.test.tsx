import { render, screen, waitFor } from "@testing-library/react";
import ConnectionsGrid from "../../components/MyNetwork/ConnectionsGrid";
import { getNetworkFeed } from "../../services/api/networkServices";
import { Mock, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

vi.mock("../../services/api/networkServices");

describe("ConnectionsGrid Component", () => {
  const mockConnects = [
    {
      lincbuttonid: "1",
      profilePicture: "test-profile-1.jpg",
      userName: "User 1",
      userBio: "Bio 1",
      mutuals: "3 mutual friends",
    },
    {
      lincbuttonid: "2",
      profilePicture: "test-profile-2.jpg",
      userName: "User 2",
      userBio: "Bio 2",
      mutuals: "2 mutual friends",
    },
  ];

  test("renders ConnectCard components for fetched data", async () => {
    (getNetworkFeed as Mock).mockResolvedValue(mockConnects);

    render(<ConnectionsGrid />);

    await waitFor(() => {
      const user1Name = screen.getByText("User 1");
      const user2Name = screen.getByText("User 2");
      expect(user1Name).toBeInTheDocument();
      expect(user2Name).toBeInTheDocument();
    });
  });

  test("handles empty fetch response gracefully", async () => {
    (getNetworkFeed as Mock).mockResolvedValue([]);

    render(<ConnectionsGrid />);

    await waitFor(() => {
      const grid = screen.getByRole("grid");
      expect(grid.childElementCount).toBe(0);
    });
  });

  test("handles fetch errors gracefully", async () => {
    (getNetworkFeed as Mock).mockRejectedValue(new Error("Network error"));

    render(<ConnectionsGrid />);

    await waitFor(() => {
      const grid = screen.getByRole("grid");
      expect(grid.childElementCount).toBe(0);
    });
  });
});