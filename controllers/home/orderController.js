import Order from "../../models/Order";
import CustomErrorHandler from "../../services/customErrorHandler";

class OrderController {
    async orders(req, res, next) {
        try {
            const orders = await Order.find({}).populate({ path: 'product', populate: 'product' }).populate('user');
            return res.render('orders', { orders })
        } catch (err) {
            return next(err)
        }
    }
    async orderStatus(req, res, next) {
        const { status, order } = req.body;
        if (!status) {
            return next(CustomErrorHandler.error(400, "Please enter all details"));
        }
        try {
           await Order.findByIdAndUpdate(order, { status }, { new: true });
            return res.redirect('back')
        } catch (err) {
            return next(err);
        }
    }
    async orderInfo(req, res, next) {
        const { orderId } = req.query;
        if (!orderId) {
            return next(CustomErrorHandler.error(400,'Please Fill All Details.'))
        }
        try {
            const order = await Order.findById(orderId).populate({ path: 'product', populate: 'product' }).populate('user');
            return res.render('orderInfo',{order})
        } catch (err) {
            return next(err)
        }
    }
}

export default new OrderController();