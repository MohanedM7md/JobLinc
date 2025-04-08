import { CertificateInterface } from "interfaces/userInterfaces";

interface CertificateProps {
  certificate: CertificateInterface;
}

export default function UserCertificate(props: CertificateProps) {
  const formattedIssueDate = new Date(
    props.certificate.issueDate,
  ).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const formattedExpirationDate = props.certificate.expirationDate
    ? new Date(props.certificate.expirationDate).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "No Expiration";

  return (
    <div className="flex flex-row mx-1">
      <div className="flex flex-col">
        <span className="font-medium -m-0.5">{props.certificate.name}</span>
        <span className="text-sm -m-0.5 mt-0.5">
          {props.certificate.organization}
        </span>
        <span className="text-sm -m-0.5 text-mutedSilver">
          {formattedIssueDate} - {formattedExpirationDate}
        </span>
      </div>
    </div>
  );
}
