import NetworkModal from "../../components/MyNetwork/NetworkModal";
import { useState } from "react";
interface BlockCardProps {
    firstName: string;
    lastName: string;
}

function BlockCard(props: BlockCardProps) {
    const [modalOpen, setModalOpen] = useState(true);
    const handleCloseModal = () => {
        setModalOpen(false);
    }
    const handleOpenModal = () => {
        setModalOpen(true);
    }
    return(
        <NetworkModal isOpen={modalOpen} onClose={handleCloseModal}>
            <div className="grid grid-rows-10 bg-white border-gray-200 rounded-md">
                <div className="border-b-2 border-gray-200 row-span-2">
                    <h3 className="font-semibold p-4 text-lg">Block</h3>
                </div>
                <div className="row-span-6">
                    <p className="font-semibold pl-4 pt-4 text-md">You're about to block {props.firstName} {props.lastName}</p>
                    <p className="pl-4 text-md">You'll no longer be connected, and will lose any endorsements or recommendations from this person</p>
                </div>
                <div className="flex items-center justify-end space-x-4 border-t-2 border-gray-200 row-span-2">
                    <button className="cursor-pointer border-2 px-5 py-0.5 rounded-full 
                    font-semibold hover:bg-lightGray hover:outline-1
                    text-darkGray border-darkGray mt-2"
                    onClick={handleCloseModal}>
                        Back
                    </button>
                    <button className="cursor-pointer border-2 px-5 py-0.5 rounded-full 
                    font-semibold hover:bg-lightGray hover:outline-1
                    text-crimsonRed border-crimsonRed mt-2">
                        Block
                    </button>
                </div>
            </div>
        </NetworkModal>
    );
}
export default BlockCard;
