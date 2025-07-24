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
        companyId: null,
        companyName: null,
        companyLogo: null,
        text: "Content 1",
        time: new Date(),
        likes: 10,
        comments: 2,
        reposts: 1,
        mediaURL: ["pic1.jpg"],
        repost: null,
      },
      {
        postId: "2",
        userId: null,
        firstname: "",
        lastname: "",
        profilePicture: "profile1.jpg",
        headline: "Developer",
        companyId: "1",
        companyName: "company 1",
        companyLogo: "profile2.jpg",
        text: "Content 1",
        time: new Date(),
        likes: 10,
        comments: 2,
        reposts: 1,
        mediaURL: ["pic2.jpg"],
        repost: null,
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
