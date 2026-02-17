import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

interface Alumni {
  name: string;
  rollNumber: string;
  department?: string;
  yearOfGraduation?: number;
  lastOrganization?: string;
  currentLocationIndia?: string;
  currentOverseasLocation?: string;
  country?: string;
  batch?: string;
  gender?: string;
  yearOfEntry?: number;
  programName?: string;
  specialization?: string;
  lastPosition?: string;
  natureOfJob?: string;
  email?: string;
  phone?: string;
  linkedIn?: string;
  twitter?: string;
  instagram?: string;
  facebook?: string;
  achievements?: string;
  collegeClubs?: string;
  photoLink?: string;
}

interface UpdateDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  alumni: Alumni;
  onSubmit: (updatedData: Partial<Alumni>) => Promise<void>;
}

const UpdateDetailsDialog: React.FC<UpdateDetailsDialogProps> = ({
  isOpen,
  onClose,
  alumni,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Alumni>({ ...alumni });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update formData when alumni prop changes to prefill existing data
  useEffect(() => {
    if (isOpen) {
      console.log("UpdateDetailsDialog opened with alumni data:", alumni);
      setFormData({ ...alumni });
      console.log("FormData set to:", alumni);
    }
  }, [alumni, isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit(formData);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Failed to submit update request",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({ ...alumni });
      setSubmitError(null);
      setSubmitSuccess(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-2 border-gray-700">
        {/* Header */}
        <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-b-2 border-gray-700">
          <h2 className="text-2xl font-bold text-white">
            Update Alumni Details
          </h2>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="bg-green-900/50 border-b-2 border-green-700 px-6 py-4">
            <p className="text-green-200 font-semibold">
              ✓ Update request submitted successfully! It will be reviewed by
              our team.
            </p>
          </div>
        )}

        {/* Error Message */}
        {submitError && (
          <div className="bg-red-900/50 border-b-2 border-red-700 px-6 py-4">
            <p className="text-red-200 font-semibold">✗ {submitError}</p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 py-6"
        >
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Roll Number * (Read-only)
                  </label>
                  <input
                    type="text"
                    name="rollNumber"
                    value={formData.rollNumber}
                    disabled
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender || ""}
                    onChange={handleChange}
                    placeholder="e.g., Male, Female, Other"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone || ""}
                    onChange={handleChange}
                    placeholder="+91 1234567890"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department || ""}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Program Name
                  </label>
                  <input
                    type="text"
                    name="programName"
                    value={formData.programName || ""}
                    onChange={handleChange}
                    placeholder="e.g., B.Tech, M.Tech, MBA"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization || ""}
                    onChange={handleChange}
                    placeholder="e.g., Information Technology"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Year of Entry
                  </label>
                  <input
                    type="number"
                    name="yearOfEntry"
                    value={formData.yearOfEntry || ""}
                    onChange={handleChange}
                    placeholder="e.g., 2015"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Year of Graduation
                  </label>
                  <input
                    type="number"
                    name="yearOfGraduation"
                    value={formData.yearOfGraduation || ""}
                    onChange={handleChange}
                    placeholder="e.g., 2019"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Professional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Position
                  </label>
                  <input
                    type="text"
                    name="lastPosition"
                    value={formData.lastPosition || ""}
                    onChange={handleChange}
                    placeholder="e.g., Software Engineer, Manager"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Organization
                  </label>
                  <input
                    type="text"
                    name="lastOrganization"
                    value={formData.lastOrganization || ""}
                    onChange={handleChange}
                    placeholder="e.g., Google, Microsoft"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nature of Job
                  </label>
                  <input
                    type="text"
                    name="natureOfJob"
                    value={formData.natureOfJob || ""}
                    onChange={handleChange}
                    placeholder="e.g., Full-time, Freelance"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Location (India)
                  </label>
                  <input
                    type="text"
                    name="currentLocationIndia"
                    value={formData.currentLocationIndia || ""}
                    onChange={handleChange}
                    placeholder="e.g., Bangalore, Mumbai"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Current Location (Overseas)
                  </label>
                  <input
                    type="text"
                    name="currentOverseasLocation"
                    value={formData.currentOverseasLocation || ""}
                    onChange={handleChange}
                    placeholder="e.g., San Francisco, USA"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country || ""}
                    onChange={handleChange}
                    placeholder="e.g., INDIA"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Social Media
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={formData.linkedIn || ""}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter || ""}
                    onChange={handleChange}
                    placeholder="https://twitter.com/yourhandle"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    name="instagram"
                    value={formData.instagram || ""}
                    onChange={handleChange}
                    placeholder="https://instagram.com/yourhandle"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook || ""}
                    onChange={handleChange}
                    placeholder="https://facebook.com/yourprofile"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Achievements
                  </label>
                  <textarea
                    name="achievements"
                    value={formData.achievements || ""}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Notable achievements and awards"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    College Clubs
                  </label>
                  <textarea
                    name="collegeClubs"
                    value={formData.collegeClubs || ""}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Mention clubs/chapters you were associated with"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Photo Link
                  </label>
                  <input
                    type="url"
                    name="photoLink"
                    value={formData.photoLink || ""}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-800 px-6 py-4 flex items-center justify-between border-t-2 border-gray-700">
          <p className="text-sm text-gray-400">
            Your update request will be reviewed by our team before being
            applied.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || submitSuccess}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : submitSuccess ? (
                "✓ Submitted"
              ) : (
                "Submit Update Request"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDetailsDialog;
