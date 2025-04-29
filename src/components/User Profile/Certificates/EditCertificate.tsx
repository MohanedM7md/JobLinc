import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CertificateInterface } from "interfaces/userInterfaces";
import {
  editCertificate,
  deleteCertificate,
} from "@services/api/userProfileServices";
import { months } from "@utils/months";
import ConfirmAction from "../../utils/ConfirmAction";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod";
import { useState } from "react";

interface EditCertificateProps extends CertificateInterface {
  onClose: () => void;
  onUpdate: () => void;
}

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    organization: z.string().min(1, "Organization is required"),
    issueMonth: z.coerce
      .number()
      .min(1, "Invalid issue month")
      .max(12, "Invalid issue month"),
    issueYear: z.coerce.number().min(1900, "Invalid issue year"),
    expirationMonth: z.coerce
      .number()
      .min(1, "Invalid expiration month")
      .max(12, "Invalid expiration month"),
    expirationYear: z.coerce.number().min(1900, "Invalid expiration year"),
  })
  .refine(
    (data) =>
      data.issueYear < data.expirationYear ||
      (data.issueYear === data.expirationYear &&
        data.issueMonth < data.expirationMonth),
    {
      message: "Issue date must be before expiration date",
      path: ["expirationYear"],
    },
  );

type CertificateFields = z.infer<typeof schema>;

export default function EditCertificate(props: EditCertificateProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: props.name,
      organization: props.organization,
      issueMonth: new Date(props.issueDate).getMonth() + 1,
      issueYear: new Date(props.issueDate).getFullYear(),
      expirationMonth: new Date(props.expirationDate).getMonth() + 1,
      expirationYear: new Date(props.expirationDate).getFullYear(),
    },
  });

  const editCertificateMutation = useMutation({
    mutationFn: editCertificate,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const deleteCertificateMutation = useMutation({
    mutationFn: deleteCertificate,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const isProcessing =
    editCertificateMutation.status === "pending" ||
    deleteCertificateMutation.status === "pending";

  const onSubmit: SubmitHandler<CertificateFields> = (data) => {
    const editedCertificate: CertificateInterface = {
      id: props.id,
      name: data.name,
      organization: data.organization,
      issueDate: new Date(data.issueYear, data.issueMonth - 1, 1),
      expirationDate: new Date(
        data.expirationYear,
        data.expirationMonth - 1,
        1,
      ),
    };

    toast.promise(editCertificateMutation.mutateAsync(editedCertificate), {
      loading: "Saving certificate...",
      success: "Certificate edited successfully!",
      error: (error) => error.message,
    });
  };

  async function handleDelete() {
    toast.promise(deleteCertificateMutation.mutateAsync(props.id), {
      loading: "Deleting certificate...",
      success: "Certificate deleted successfully!",
      error: (error) => error.message,
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 bg-lightGray rounded-lg"
      >
        <div className="mb-4">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full px-2 py-1 border rounded-lg"
          />
          {errors.name && (
            <p className="text-sm font-medium text-red-600 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">
            Organization
          </label>
          <input
            type="text"
            {...register("organization")}
            className="w-full px-2 py-1 border rounded-lg"
          />
          {errors.organization && (
            <p className="text-sm font-medium text-red-600 mt-1">
              {errors.organization.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">
            Issue Date
          </label>
          <div className="flex gap-2">
            <select
              {...register("issueMonth")}
              className="w-1/2 px-2 py-1 border rounded-lg"
            >
              <option value={0}>Month</option>
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              {...register("issueYear")}
              className="w-1/2 px-2 py-1 border rounded-lg"
            >
              <option value={0}>Year</option>
              {Array.from(
                { length: 50 },
                (_, i) => new Date().getFullYear() - i,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {(errors.issueMonth || errors.issueYear) && (
            <p className="text-sm font-medium text-red-600 mt-1">
              {errors.issueMonth?.message || errors.issueYear?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="text-sm font-medium">
            Expiration Date
          </label>
          <div className="flex gap-2">
            <select
              {...register("expirationMonth")}
              className="w-1/2 px-2 py-1 border rounded-lg"
            >
              <option value={0}>Month</option>
              {months.map((month, index) => (
                <option key={index + 1} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>
            <select
              {...register("expirationYear")}
              className="w-1/2 px-2 py-1 border rounded-lg"
            >
              <option value={0}>Year</option>
              {Array.from(
                { length: 50 },
                (_, i) => new Date().getFullYear() - i,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          {(errors.expirationMonth || errors.expirationYear) && (
            <p className="text-sm font-medium text-red-600 mt-1">
              {errors.expirationMonth?.message ||
                errors.expirationYear?.message}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out"
            disabled={isProcessing}
          >
            {isProcessing ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => setShowConfirmDelete(true)}
            className="bg-gray-500 text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-gray-700 transition duration-400 ease-in-out"
            disabled={isProcessing}
          >
            {isProcessing ? "Deleting..." : "Delete"}
          </button>
        </div>
      </form>
      {showConfirmDelete && (
        <ConfirmAction
          action={handleDelete}
          onClose={() => setShowConfirmDelete(false)}
        />
      )}
    </>
  );
}
