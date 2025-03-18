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
        postID: "1",
        userID: "user1",
        firstName: "John",
        lastName: "Doe",
        profilePicture: "profile1.jpg",
        headline: "Developer",
        text: "Content 1",
        likes: 10,
        commentsNum: 2,
        reposts: 1,
        pics: ["pic1.jpg"],
      },
      {
        postID: "2",
        userID: "user2",
        firstName: "Jane",
        lastName: "Doe",
        profilePicture: "profile2.jpg",
        headline: "Designer",
        text: "Content 2",
        likes: 20,
        commentsNum: 3,
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
