import express from "express";

import {
    placeOrderCash,
    placeOrderStripe,
    placeOrderRazorPay,
    allOrders, userOrders,
    adminUpdateStatus
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

//admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post('/status', adminAuth, adminUpdateStatus);

//Payment Features
orderRouter.post('/place', authUser, placeOrderCash);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorPay);

//User Feature
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;