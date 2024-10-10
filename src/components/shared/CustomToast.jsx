import { FaCheckCircle } from "react-icons/fa"; // Import the success icon

const CustomToast = ({ title, message }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <FaCheckCircle style={{ color: "green", marginRight: "10px" }} size={24} />
    <div>
      <strong className="text-green-500">{title}</strong>
      <div>{message}</div>
    </div>
  </div>
);

export default CustomToast;
