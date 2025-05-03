import { Mail, Phone, User } from "lucide-react";

interface ContactInfoProps {
  userId: string;
  phoneNumber: string;
  email: string;
}

export default function ContactInfo(props: ContactInfoProps) {
  return (
    <div className= "rounded-lg p-4 max-w-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Contact Information
      </h3>

      <div className="space-y-3">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <Mail className="text-blue-600 w-5 h-5" />
          </div>
          <a
            href={`mailto:${props.email}`}
            className="text-blue-600 hover:underline"
          >
            {props.email}
          </a>
        </div>

        <div className="flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <Phone className="text-green-600 w-5 h-5" />
          </div>
          <a href={`tel:${props.phoneNumber}`} className="text-gray-700">
            {props.phoneNumber ? props.phoneNumber : "No Phone number linked to account"}
          </a>
        </div>

        <div className="flex items-center">
          <div className="bg-purple-100 p-2 rounded-full mr-3">
            <User className="text-purple-600 w-5 h-5" />
          </div>
          <a
            href={`${window.location.origin}/profile/${props.userId}`}
            className="text-blue-600 hover:underline truncate"
          >
            {window.location.origin}/profile/{props.userId}
          </a>
        </div>
      </div>
    </div>
  );
}
