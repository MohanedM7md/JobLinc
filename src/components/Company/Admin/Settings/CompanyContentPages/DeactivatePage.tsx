import ConfirmationModal from "@components/chat/UI/ConfirmationModal";
import { deleteCompany } from "@services/api/companyServices";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeactivatePage() {
    const [deleteCompanyModal, setDeleteCompanyModal] = useState(false);
    const navigate = useNavigate();
    async function handleConfirm() {
        try {
            const response = await deleteCompany();
            if (response?.status === 204) {

            toast.success("Company deleted successfully.");
            navigate("/home");
            } else {
            toast.error("Unexpected response. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting company", error);
            toast.error("An error occurred while deleting the company.");
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl font-semibold text-red-600 mb-4">
            Deactivate Company
            </h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
                You are about to permanently delete your company account and all related data, including company posts, job listings, and any associated activities. This action is irreversible. "Business takes time to grow just like plants — if you water them correctly, the results will amaze you. ☘
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
            <button
                onClick={() => setDeleteCompanyModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-all w-full sm:w-auto"
            >
                Delete Company
            </button>
            </div>
        </div>

        {deleteCompanyModal && (
            <ConfirmationModal
            isOpen={deleteCompanyModal}
            onClose={() => setDeleteCompanyModal(false)}
            onConfirm={handleConfirm}
            title="Are you sure?"
            >
            <p className="text-gray-700">
                This action will permanently delete your company and remove all associated posts,
                jobs, and data. Are you sure you want to continue?
            </p>
            </ConfirmationModal>
        )}
        </div>
    );
}

export default DeactivatePage;
