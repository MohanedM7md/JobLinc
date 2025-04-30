import { SubmitHandler, useForm } from "react-hook-form";
import { NewCertificate } from "interfaces/userInterfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { addCertificate } from "@services/api/userProfileServices";
import { months } from "@utils/months";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import z from "zod";

interface AddCertificateProps {
  onUpdate: () => void;
  onClose: () => void;
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
      message: "Issue date must be before expiration date", //Root error, message doesn't get printed, at a loss
      path: ["expirationYear"],
    },
  );

type CertificateFields = z.infer<typeof schema>;

export default function AddCertificate(props: AddCertificateProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CertificateFields>({
    resolver: zodResolver(schema),
  });

  const addCertificateMutation = useMutation({
    mutationFn: addCertificate,
    onSuccess: () => {
      props.onUpdate();
      props.onClose();
    },
  });

  const isProcessing = addCertificateMutation.status === "pending";

  const onSubmit: SubmitHandler<CertificateFields> = (data) => {
    const newCertificate: NewCertificate = {
      name: data.name,
      organization: data.organization,
      issueDate: new Date(data.issueYear, data.issueMonth - 1, 1),
      expirationDate: new Date(
        data.expirationYear,
        data.expirationMonth - 1,
        1,
      ),
    };

    toast.promise(addCertificateMutation.mutateAsync(newCertificate), {
      loading: "Adding certificate...",
      success: "Certificate added successfully!",
      error: (error) => error.message,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 bg-lightGray rounded-lg text-charcoalBlack"
    >
      <div className="mb-4">
        <label className="text-sm font-medium text-charcoalBlack">Name</label>
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
        <label className="text-sm font-medium text-charcoalBlack">
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
        <label className="text-sm font-medium text-charcoalBlack">
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
        <label className="text-sm font-medium text-charcoalBlack">
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
            {errors.expirationMonth?.message || errors.expirationYear?.message}
          </p>
        )}
      </div>
      {errors.root && (
        <p className="text-sm font-medium text-red-600 mt-1">
          {errors.root.message}
        </p>
      )}
      <div className="flex space-x-2">
        <button
          type="submit"
          className="bg-crimsonRed text-warmWhite px-4 py-1.5 rounded-3xl cursor-pointer hover:bg-red-700 transition duration-400 ease-in-out"
          disabled={isProcessing}
        >
          {isProcessing ? "Adding..." : "Add"}
        </button>
      </div>
    </form>
  );
}
