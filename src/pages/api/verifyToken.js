import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { token } = req.body; // Receive the token from the client-side

  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);
    return res.status(200).json({ email: decoded.email, role: decoded.role });
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
