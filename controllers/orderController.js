import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";


const placeOrderCash = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now(),
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {orderData: {}})

        res.json({success: true, message: 'Order Placed'});

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}

const placeOrderStripe = async (req, res) => {
    try {

    } catch (error) {

    }
}

const placeOrderRazorPay = async (req, res) => {
    try {

    } catch (error) {

    }
}

const allOrders = async (req, res) => {
    try {

    } catch (error) {

    }
}

const userOrders = async (req, res) => {
    try {
        const {userId} = req.body;

        const foundOrders = await orderModel.find({userId})
        res.json({success: true, foundOrders});
    } catch (error) {
        console.log(error);
        res.status(400).json({success: false, message: error.message});
    }
}

const adminUpdateStatus = async (req, res) => {
    try {

    } catch (error) {

    }
}

export { placeOrderCash, placeOrderStripe, placeOrderRazorPay, allOrders, userOrders, adminUpdateStatus };