import Modal from "../../../components/Authentication/Modal";
import { render, screen, cleanup, waitFor} from "@testing-library/react";
import {describe, it, expect, vi, afterEach} from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

describe("Modal Component", () => {
    afterEach(cleanup);

    it("renders modal when isOpen is true", () => {
        render(
          <Modal isOpen={true} onClose={vi.fn()}>
            <p>Modal Content</p>
          </Modal>
        );
    
        expect(screen.getByText("Modal Content")).toBeInTheDocument();
      });

    it("does not render when isOpen is false", () => {
        render(<Modal isOpen={false} onClose={vi.fn()}>
            <p>Test Child</p>
        </Modal> );
    
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("closes when clicking the close button", async () => {
        const onCloseMock = vi.fn();
        render(
          <Modal isOpen={true} onClose={onCloseMock}>
            <p>Modal Content</p>
          </Modal>
        );
      
        const user = userEvent.setup();
        const closeButton = screen.getByTestId("close-button");
      
        await user.click(closeButton);
      
        // Wait for the event to propagate and verify it was called
        await waitFor(() => expect(onCloseMock).toHaveBeenCalled());
      });

      it("renders children when provided", () => {
        render(
          <Modal isOpen={true} onClose={vi.fn()}>
            <p>Test Child</p>
          </Modal>
        );
    
        expect(screen.getByText("Test Child")).toBeInTheDocument();
      });


      it("closes when clicking outside the modal", async () => { 
        const onCloseMock = vi.fn();
        render(
          <Modal isOpen={true} onClose={onCloseMock}>
            <p>Modal Content</p>
          </Modal>
        );
      

        const user = userEvent.setup();
        
        const backgroundOverlay = screen.getByTestId("modal-overlay");
        await user.click(backgroundOverlay);

      

        await waitFor(() => expect(onCloseMock).toHaveBeenCalled());
      });

  });