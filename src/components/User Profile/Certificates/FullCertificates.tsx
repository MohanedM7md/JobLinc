import { CertificateInterface } from "interfaces/userInterfaces";
import { useState, useEffect } from "react";
import "material-icons";
import { useParams } from "react-router-dom";
import Modal from "./../../Authentication/Modal";
import { getCertificate } from "@services/api/userProfileServices";
import UserCertificate from "./UserCertificate";
import AddCertificate from "./AddCertificate";
import EditCertificate from "./EditCertificate";
import { useQuery } from "@tanstack/react-query";

export default function FullCertificates() {
  const { userId } = useParams();
  const [isUser, setIsUser] = useState<boolean>(true);
  const [certificates, setCertificates] = useState<CertificateInterface[]>([]);
  const [addCertificateModal, setAddCertificateModal] =
    useState<boolean>(false);
  const [editCertificateData, setEditCertificateData] =
    useState<CertificateInterface | null>(null);

  const {
    isFetching: isCertificatesFetching,
    isError: isCertificatesError,
    refetch: refetchCertificates,
  } = useQuery({
    queryKey: ["getCertificates"],
    queryFn: getCertificate,
    enabled: false,
  });

  useEffect(() => {
    if (userId === JSON.parse(localStorage.getItem("userState") || "").userId) {
      setIsUser(true);
      updateCertificates();
    } else {
      setIsUser(false);
    }
  }, [userId]);

  async function updateCertificates() {
    if (userId) {
      const { data } = await refetchCertificates();
      setCertificates(data);
    }
  }

  if (isCertificatesFetching) {
    return <div>Loading...</div>;
  }

  if (isCertificatesError) {
    return <div>Error loading certificates</div>;
  }

  return (
    <div className="bg-darkGray my-2 p-4 rounded-lg shadow-md relative text-white w-12/12 lg:w-6/12 m-auto">
      <div className="flex flex-row justify-between items-center">
        <h1 className="font-medium text-xl mb-4">Certificates</h1>
        {isUser && (
          <button
            onClick={() => setAddCertificateModal(true)}
            className="material-icons font-medium text-2xl p-2 rounded-full hover:bg-gray-600 -mt-5"
          >
            add
          </button>
        )}
      </div>
      {certificates.length > 0 ? (
        certificates.map((cert, index) => (
          <div key={cert._id} className="relative">
            <UserCertificate certificate={cert} />
            {isUser && (
              <button
                className="material-icons absolute top-0 right-0 text-xl p-1 rounded-full hover:bg-gray-600 mr-1"
                onClick={() => setEditCertificateData(cert)}
              >
                edit
              </button>
            )}
            {index < certificates.length - 1 && (
              <div className="border-b border-gray-500 w-11/12 mx-auto mt-2 mb-3"></div>
            )}
          </div>
        ))
      ) : (
        <div className="text-mutedSilver font-medium flex justify-center">
          No certificates are registered for this user
        </div>
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
