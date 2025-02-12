import { format } from "date-fns";

const Messages = () => {
  const submissions = [
    {
      name: "Akshata H",
      phone: "8277653593",
      email: "akshatahiremani1995@gmail.com",
      timestamp: "2025-02-03T15:00:00",
      message: "We are into E-com, looking for startup.",
    },
    {
      name: "asd ad",
      phone: "827765354",
      email: "tajzveriya@gmail.com",
      timestamp: "2025-01-20T15:30:00",
      message: "sda",
    },
    {
      name: "taj n",
      phone: "827765354",
      email: "zaveriyataj@yuvamytr.com",
      timestamp: "2025-01-28T15:30:00",
      message: "hjgjgj",
    },
    {
      name: "taj shariff",
      phone: "",
      email: "zaveriyataj@yuvamytr.com",
      timestamp: "2025-12-16T13:00:00",
      message: "hello",
    },
    {
      name: "tttt fdfdgf",
      phone: "",
      email: "zaveriyataj@yuvamytr.com",
      timestamp: "2025-01-16T14:30:00",
      message: "skjhkds",
    },
    {
      name: "taj zav",
      phone: "",
      email: "zaveriyataj@yuvamytr.com",
      timestamp: "2025-01-24T15:00:00",
      message: "skjhakx",
    },
    {
      name: "taj r",
      phone: "",
      email: "zaveriyataj@yuvamytr.com",
      timestamp: "",
      message: "jygyufufyufuf",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 hidden md:table">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Contact Info
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date & Time
              </th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Message
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 sm:px-6 py-4 text-sm font-medium text-gray-900">{submission.name}</td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                  <div>{submission.phone || "N/A"}</div>
                  <div className="text-blue-600">{submission.email}</div>
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">
                  {submission.timestamp ? format(new Date(submission.timestamp), "MMM d, yyyy h:mm a") : "N/A"}
                </td>
                <td className="px-4 sm:px-6 py-4 text-sm text-gray-500">{submission.message}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="grid gap-4 md:hidden">
          {submissions.map((submission, index) => (
            <div key={index} className="border border-gray-200 p-4 rounded-lg bg-white shadow-sm">
              <p className="text-sm font-medium text-gray-900">{submission.name}</p>
              <p className="text-xs text-gray-500">{submission.phone || "N/A"}</p>
              <p className="text-xs text-blue-600">{submission.email}</p>
              <p className="text-xs text-gray-500 mt-1">
                {submission.timestamp ? format(new Date(submission.timestamp), "MMM d, yyyy h:mm a") : "N/A"}
              </p>
              <p className="text-sm text-gray-700 mt-2">{submission.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messages;