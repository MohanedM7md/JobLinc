import { CertificateInterface } from "interfaces/userInterfaces";
import { useState, useEffect } from "react";
import "material-icons";
import { useParams } from "react-router-dom";
import Modal from "./../../Authentication/Modal";
import {
  getCertificate,
  deleteCertificate,
} from "@services/api/userProfileServices";
import ConfirmAction from "../../utils/ConfirmAction";
import UserCertificate from "./UserCertificate";
import AddCertificate from "./AddCertificate";
import EditCertificate from "./EditCertificate";

export default function FullCertificates() {
  const { userId } = useParams();
  const [certificates, setCertificates] = useState<CertificateInterface[]>([]);
  const [addCertificateModal, setAddCertificateModal] =
    useState<boolean>(false);
  const [editCertificateData, setEditCertificateData] =
    useState<CertificateInterface | null>(null);
  const [confirmDeleteData, setConfirmDeleteData] = useState<string | null>(
    null,
  );

  useEffect(() => {
    updateCertificates();
  }, [userId]);

  async function updateCertificates() {
    if (userId) {
      const updatedCertificates = await getCertificate();
      setCertificates(updatedCertificates);
    }
  }

  async function handleDeleteCertificate(certificateId: string) {
    await deleteCertificate(certificateId);
    updateCertificates();
  }

  return (
    <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-medium text-xl mb-4">Certificates</h1>
        <button
          onClick={() => setAddCertificateModal(true)}
          className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600 -mt-5"
        >
          add
        </button>
      </div>
      {certificates.map((cert, index) => (
        <div key={cert.id} className="relative">
          <UserCertificate certificate={cert} />
          <button
            className="material-icons absolute top-0 right-0 text-xl p-1 rounded-full hover:bg-gray-600 mr-1"
            onClick={() => setEditCertificateData(cert)}
          >
            edit
          </button>
          <button
            className="material-icons-outlined absolute top-0 right-15 text-crimsonRed text-xl p-1 rounded-full hover:bg-gray-600 mr-1"
            onClick={() => setConfirmDeleteData(cert.id)}
          >
            delete
          </button>
          {index < certificates.length - 1 && (
            <div className="border-b border-gray-500 w-11/12 mx-auto mt-2 mb-3"></div>
          )}
        </div>
      ))}
      {confirmDeleteData !== null && (
        <ConfirmAction
          action={() => {
            handleDeleteCertificate(confirmDeleteData);
            setConfirmDeleteData(null);
          }}
          onClose={() => setConfirmDeleteData(null)}
        />
      )}
      <Modal
        isOpen={!!editCertificateData}
        onClose={() => setEditCertificateData(null)}
      >
        {editCertificateData && (
          <EditCertificate
            {...editCertificateData}
            onClose={() => setEditCertificateData(null)}
            onUpdate={updateCertificates}
          />
        )}
      </Modal>
      <Modal
        isOpen={addCertificateModal}
        onClose={() => setAddCertificateModal(false)}
      >
        <AddCertificate
          onUpdate={updateCertificates}
          onClose={() => setAddCertificateModal(false)}
        />
      </Modal>
    </div>
  );
}
