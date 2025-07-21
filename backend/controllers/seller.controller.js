import jwt from "jsonwebtoken";

// Seller login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ message: "Login successful", success: true });
    } else {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }
  } catch (error) {
    console.error("Error in sellerLogin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Seller logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });

    res.json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Error in sellerLogout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Check if seller is authenticated
export const isAuthSeller = (req, res) => {
  try {
    res.status(200).json({ success: true, message: "You are authenticated as seller" });
  } catch (error) {
    console.error("Error in isAuthSeller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
