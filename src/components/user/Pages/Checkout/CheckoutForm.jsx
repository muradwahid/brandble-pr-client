import { useForm } from "react-hook-form";
import { useState } from "react";

const CheckoutForm = () => {
  // Destructure methods from useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  // State to manage submission status and messages
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  // Function to handle form submission
  const onSubmit = async (data) => {
    setSubmissionStatus("loading");
    setSubmissionMessage("Submitting your billing information...");

    try {
      // Simulate API call
      const response = await fetch("https://muradwahid.com/api/v1/billing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmissionStatus("success");
        setSubmissionMessage("Billing information submitted successfully!");
        reset(); // Reset form fields on successful submission
      } else {
        const errorData = await response.json();
        setSubmissionStatus("error");
        setSubmissionMessage(
          `Submission failed: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(`An error occurred: ${error.message}`);
    }
  };

  const inputCls = ``
  return (
    <div>
      <div className=" font-sans">
        <div className="bg-white w-full max-w-md">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                {...register("fullName", { required: "Full Name is required" })}
                className={`${inputCls} ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Address Line 1 */}
            <div>
              <label
                htmlFor="address1"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address Line 1
              </label>
              <input
                type="text"
                id="address1"
                {...register("address1", {
                  required: "Address Line 1 is required",
                })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.address1 ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="123 Main St"
              />
              {errors.address1 && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address1.message}
                </p>
              )}
            </div>

            {/* Address Line 2 (Optional) */}
            <div>
              <label
                htmlFor="address2"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                id="address2"
                {...register("address2")}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Apartment, Suite, etc."
              />
            </div>

            {/* City */}
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                {...register("city", { required: "City is required" })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="New York"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* State/Province */}
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State/Province
              </label>
              <input
                type="text"
                id="state"
                {...register("state", {
                  required: "State/Province is required",
                })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="NY"
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.state.message}
                </p>
              )}
            </div>

            {/* Zip/Postal Code */}
            <div>
              <label
                htmlFor="zipCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Zip/Postal Code
              </label>
              <input
                type="text"
                id="zipCode"
                {...register("zipCode", {
                  required: "Zip/Postal Code is required",
                })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.zipCode ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="10001"
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.zipCode.message}
                </p>
              )}
            </div>

            {/* Country */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                {...register("country", { required: "Country is required" })}
                className={`mt-1 block w-full px-4 py-2 border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                placeholder="USA"
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.country.message}
                </p>
              )}
            </div>

            {/* Phone Number (Optional) */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                {...register("phone", {
                  pattern: {
                    value:
                      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                    message: "Invalid phone number format",
                  },
                })}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              disabled={submissionStatus === "loading"}
            >
              {submissionStatus === "loading"
                ? "Submitting..."
                : "Save Billing Information"}
            </button>
          </form>

          {/* Submission Status Message */}
          {submissionStatus && (
            <div
              className={`mt-6 p-3 rounded-md text-center text-sm ${
                submissionStatus === "success"
                  ? "bg-green-100 text-green-800"
                  : submissionStatus === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {submissionMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
