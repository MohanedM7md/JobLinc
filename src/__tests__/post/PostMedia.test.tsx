import { render } from "@testing-library/react";
import PostMedia from "../../components/Posts/PostMedia";
import { describe, it, expect } from "vitest";

describe("PostMediat", () => {
  it("renders correctly with one picture", () => {
    const pics = ["pic1.jpg"];
    const { container } = render(<PostMedia pics={pics} />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(1);
    expect(images[0].src).toContain("pic1.jpg");
  });

  it("renders correctly with two pictures", () => {
    const pics = ["pic1.jpg", "pic2.jpg"];
    const { container } = render(<PostMedia pics={pics} />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(2);
    expect(images[0].src).toContain("pic1.jpg");
    expect(images[1].src).toContain("pic2.jpg");
  });

  it("renders correctly with three pictures", () => {
    const pics = ["pic1.jpg", "pic2.jpg", "pic3.jpg"];
    const { container } = render(<PostMedia pics={pics} />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(3);
    expect(images[0].src).toContain("pic1.jpg");
    expect(images[1].src).toContain("pic2.jpg");
    expect(images[2].src).toContain("pic3.jpg");
  });

  it("renders correctly with four pictures", () => {
    const pics = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg"];
    const { container } = render(<PostMedia pics={pics} />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(4);
    expect(images[0].src).toContain("pic1.jpg");
    expect(images[1].src).toContain("pic2.jpg");
    expect(images[2].src).toContain("pic3.jpg");
    expect(images[3].src).toContain("pic4.jpg");
  });

  it("renders correctly with five pictures", () => {
    const pics = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg"];
    const { container } = render(<PostMedia pics={pics} />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(5);
    expect(images[0].src).toContain("pic1.jpg");
    expect(images[1].src).toContain("pic2.jpg");
    expect(images[2].src).toContain("pic3.jpg");
    expect(images[3].src).toContain("pic4.jpg");
    expect(images[4].src).toContain("pic5.jpg");
  });

  it("renders correctly with more than five pictures", () => {
    const pics = [
      "pic1.jpg",
      "pic2.jpg",
      "pic3.jpg",
      "pic4.jpg",
      "pic5.jpg",
      "pic6.jpg",
    ];
    const { container } = render(<PostMedia pics={pics} />);
    const images = container.querySelectorAll("img");
    expect(images.length).toBe(6);
    expect(images[0].src).toContain("pic1.jpg");
    expect(images[1].src).toContain("pic2.jpg");
    expect(images[2].src).toContain("pic3.jpg");
    expect(images[3].src).toContain("pic4.jpg");
    expect(images[4].src).toContain("pic5.jpg");
    expect(images[5].src).toContain("pic6.jpg");
  });
});
