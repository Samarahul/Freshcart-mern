import Order from "../models/order.model.js";
import Product from "../models/product.models.js";

//place order COD:/api/order/cod

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.user;
    const { items, address } = req.body;

    // Validation
    if (!items || items.length === 0 || !address) {
      return res.status(400).json({
        success: false,
        message: "Items and address are required",
      });
    }

    // ✅ Calculate amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      amount += product.offerPrice * item.quantity;
    }

    // Add 2% tax
    amount += Math.floor((amount * 2) / 100);

    // ✅ Place order
    await Order.create({
      userId,
      items,
      address,
      amount,
      paymentType: "COD",
      isPaid: false,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



//order details for individual user :/api/orders/user

export const getUserOrders=async (req,res)=>{
    try{
        const userId=req.user;
        const orders=await Order.find({
            userId,
            $or:[{paymentType:"COD"},{isPaid:true}]
        }).populate("items.product address").sort({createdAt:-1});
        res.status(200).json({
            message:"User orders fetched successfully",
            success:true,
            orders,
        });

    }
    catch(e){
        console.error("Error fetching user Orders:",error);
        res.status(500).json({message:"Internal server error"});
    }
};

//get all orders for admin :/api/order/seller
export const getAllOrders=async(req,res)=>{
    try{
        const orders = await Order.find({
  $or: [{ paymentType: "COD" }, { isPaid: true }]
})
  .populate("items.product address")
  .sort({ createdAt: -1 });

    }
    catch(e){
        console.error("Error fetching user Orders:",error);
        res.status(500).json({message:"Internal server error"});
    }
};