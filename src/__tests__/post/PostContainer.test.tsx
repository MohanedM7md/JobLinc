import { describe, it, expect, vi, Mock } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PostContainer from "../../components/Posts/PostContainer";
import { getFeed } from "../../services/api/postServices";
import { PostInterface } from "../../interfaces/postInterfaces";

vi.mock("../../services/api/postServices", () => ({
  getFeed: vi.fn(),
}));

describe("PostContainer", () => {
  it("successfully sends data down to postcards", async () => {
    const mockPosts: PostInterface[] = [
      {
        postId: "1",
        userId: "user1",
        firstname: "John",
        lastname: "Doe",
        profilePicture: "profile1.jpg",
        headline: "Developer",
        text: "Content 1",
        likes: 10,
        comments: 2,
        reposts: 1,
        pics: ["pic1.jpg"],
      },
      {
        postId: "2",
        userId: "user2",
        firstname: "Jane",
        lastname: "Doe",
        profilePicture: "profile2.jpg",
        headline: "Designer",
        text: "Content 2",
        likes: 20,
        comments: 3,
        reposts: 2,
        pics: ["pic2.jpg"],
      },
    ];

    (getFeed as Mock).mockResolvedValueOnce(mockPosts);
    render(
      <Router>
        <PostContainer />
      </Router>,
    );

    const postElements = await screen.findAllByText(/Content \d/);
    expect(postElements).toHaveLength(mockPosts.length);
    mockPosts.forEach((post) => {
      expect(screen.getByText(post.text)).toBeInTheDocument();
    });
  });
});
