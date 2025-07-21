import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    const { sellerToken } = req.cookies;

    if (!sellerToken) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    // Ensure it's the correct seller
    if (decoded.email === process.env.SELLER_EMAIL) {
      req.seller = decoded.email;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized seller", success: false });
    }

  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Invalid token", success: false });
  }
};
