import Modal from "../Authentication/Modal";

interface Action {
  action: () => void;
  onClose: () => void;
}

export default function ConfirmAction(props: Action) {
  return (
    <Modal isOpen={true} onClose={props.onClose}>
      <div className="bg-lightGray p-4 rounded-lg text-charcoalBlack">
        <h1 className="font-medium text-2xl">Are you sure?</h1>
        <span className="text-mutedSilver">This action can't be reversed</span>
        <div className="flex justify-between mt-4">
          <button
            className="bg-crimsonRed text-white px-4 py-2 rounded-lg hover:bg-red-600"
            onClick={() => {
              props.action();
              props.onClose();
            }}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 text-warmWhite px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700"
            onClick={props.onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
