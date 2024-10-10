import { FaExclamationCircle } from "react-icons/fa";
const ErrorToast = ({ title, message }) => (
  <div className="flex items-center">
    <FaExclamationCircle className="text-red-500 mr-2" size={24} />
    <div>
      <strong className="text-red-500">{title}</strong>
      <div>{message}</div>
    </div>
  </div>
);

export default ErrorToast;
