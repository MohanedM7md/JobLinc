import { render, screen, cleanup, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll } from "vitest";
import Jobs_And_Hiring from "../../components/Jobs&hiring/Jobs_And_Hiring";
import "@testing-library/jest-dom/vitest";

// First, mock react-hot-toast at the top level with a factory function
vi.mock('react-hot-toast', async () => {
    const actual = await vi.importActual('react-hot-toast');
    return {
        ...actual,
        default: {
            success: vi.fn(),
            error: vi.fn()
        }
    };
});

describe("Jobs_And_Hiring Component", () => {
    beforeAll(() => {
        // Mock JobApplicationModal
        vi.mock("../../components/Jobs&hiring/JobApplicationModal", () => ({
            __esModule: true,
            default: vi.fn(({ isOpen, onClose }) =>
                isOpen ? (
                    <div data-testid="job-application-modal">
                        <button onClick={onClose}>Close Modal</button>
                    </div>
                ) : null
            ),
        }));

        // Mock react-router Link
        vi.mock("react-router-dom", () => ({
            Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
                <a href={to}>{children}</a>
            ),
        }));

        window.matchMedia = vi.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));
    });

    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
        render(<Jobs_And_Hiring />);
    });

    afterEach(() => {
        cleanup();
    });

    it("renders the main heading and search inputs", () => {
        expect(screen.getByText("Find your next job")).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Search job titles, companies, or keywords")
        ).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Location")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    });

    it("displays initial job listings", async () => {
        await waitFor(() => {
            const jobTitles = screen.getAllByText(/Senior Software Engineer|Product Manager|UX Designer/);
            expect(jobTitles.length).toBeGreaterThanOrEqual(3);
        });
    });

    it("allows selecting a job to view details", async () => {
        const jobListings = screen.getAllByText("Product Manager");
        const leftPanelListing = jobListings.find(el =>
            el.closest('.lg\\:w-2\\/5')
        );

        if (!leftPanelListing) throw new Error("Could not find job listing in left panel");

        await userEvent.click(leftPanelListing);

        await waitFor(() => {
            expect(
                screen.getByText((content, element) => {
                    return content.includes('product manager') ||
                        content.includes('drive the development');
                })
            ).toBeInTheDocument();
            expect(screen.getByText("Healthcare benefits")).toBeInTheDocument();
        });
    });

    it("shows apply button for unapplied jobs", async () => {
        const jobListings = screen.getAllByText("Senior Software Engineer");
        const leftPanelListing = jobListings.find(el =>
            el.closest('.lg\\:w-2\\/5')
        );

        if (!leftPanelListing) throw new Error("Could not find job listing in left panel");

        await userEvent.click(leftPanelListing);
        expect(screen.getByRole("button", { name: "Apply now" })).toBeInTheDocument();
    });

    it("shows application status for applied jobs", async () => {
        const jobListings = screen.getAllByText("Product Manager");
        const leftPanelListing = jobListings.find(el =>
            el.closest('.lg\\:w-2\\/5')
        );

        if (!leftPanelListing) throw new Error("Could not find job listing in left panel");

        await userEvent.click(leftPanelListing);
        expect(screen.getByText(/Your application status:/i)).toBeInTheDocument();
        const pendingStatus = screen.getAllByText("Pending");
        expect(pendingStatus.length).toBeGreaterThan(0);
    });

    it("opens application modal when Apply now is clicked", async () => {
        const jobListings = screen.getAllByText("Senior Software Engineer");
        const leftPanelListing = jobListings.find(el =>
            el.closest('.lg\\:w-2\\/5')
        );

        if (!leftPanelListing) throw new Error("Could not find job listing in left panel");

        await userEvent.click(leftPanelListing);
        await userEvent.click(screen.getByText("Apply now"));

        await waitFor(() => {
            expect(screen.getByTestId("job-application-modal")).toBeInTheDocument();
        });
    });

    // it("allows saving and unsaving jobs", async () => {
    //     // Get the toast mock from the module
    //     const toast = (await import('react-hot-toast')).default;

    //     const jobListings = screen.getAllByText("Senior Software Engineer");
    //     const leftPanelListing = jobListings.find(el =>
    //         el.closest('.lg\\:w-2\\/5')
    //     );

    //     if (!leftPanelListing) throw new Error("Could not find job listing in left panel");

    //     await userEvent.click(leftPanelListing);

    //     const saveButton = screen.getByRole("button", { name: /Save/i });

    //     // First click - save
    //     await userEvent.click(saveButton);

    //     await waitFor(() => {
    //         expect(saveButton).toHaveTextContent("Saved");
    //         expect(toast.success).toHaveBeenCalled();
    //     });

    //     // Second click - unsave
    //     await userEvent.click(saveButton);
    //     await waitFor(() => {
    //         expect(saveButton).toHaveTextContent("Save");
    //         expect(toast.success).toHaveBeenCalledWith("This job is no longer saved");
    //     });
    // });

    // it("filters jobs based on remote option", async () => {
    //     const remoteCheckbox = screen.getByLabelText("Remote");
    //     await userEvent.click(remoteCheckbox);

    //     await waitFor(() => {
    //         // Get the job listings container
    //         const jobListingsContainer = screen.getByTestId('job-listings-container');

    //         // Find only the job listing cards within the container
    //         const jobCards = within(jobListingsContainer).getAllByRole('listitem');

    //         // Verify we have exactly 2 remote jobs (Senior Software Engineer and UX Designer)
    //         expect(jobCards.length).toBe(2);

    //         // Verify the correct jobs are shown
    //         const remoteJobTitles = within(jobListingsContainer).getAllByText(/Senior Software Engineer|UX Designer/);
    //         expect(remoteJobTitles.length).toBe(2);

    //         // Verify non-remote jobs are not shown
    //         const nonRemoteJobs = within(jobListingsContainer).queryAllByText(/Product Manager|Data Scientist/);
    //         expect(nonRemoteJobs.length).toBe(0);
    //     });
    // });

    it("shows job highlights when a job is selected", async () => {
        const jobListings = screen.getAllByText("Senior Software Engineer");
        const leftPanelListing = jobListings.find(el =>
            el.closest('.lg\\:w-2\\/5')
        );

        if (!leftPanelListing) throw new Error("Could not find job listing in left panel");

        await userEvent.click(leftPanelListing);
        expect(screen.getByText("Job highlights")).toBeInTheDocument();
        expect(screen.getByText("Competitive salary")).toBeInTheDocument();
        expect(screen.getByText("Flexible work schedule")).toBeInTheDocument();
    });

    it("shows similar jobs section", async () => {
        const jobListings = screen.getAllByText("Senior Software Engineer");
        const leftPanelListing = jobListings.find(el =>
            el.closest('.lg\\:w-2\\/5')
        );

        if (!leftPanelListing) throw new Error("Could not find job listing in left panel");

        await userEvent.click(leftPanelListing);
        expect(screen.getByText("Similar jobs")).toBeInTheDocument();
        const similarProductManagers = screen.getAllByText("Product Manager");
        expect(similarProductManagers.length).toBeGreaterThan(0);
        const similarUXDesigners = screen.getAllByText("UX Designer");
        expect(similarUXDesigners.length).toBeGreaterThan(0);
    });
});