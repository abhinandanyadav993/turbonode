import express from "express";
import userRoutes from './user.routes';
import productRoutes from './product.routes';
// import paymentRoutes from './payment.routes';
import orderRoutes from './order.routes';
import reviewRoutes from './review.routes';
import shippingRoutes from './shipping.routes'

const app = express();

app.use('/users', userRoutes);
app.use('/products', productRoutes);
// app.use('/payments', paymentRoutes);
app.use('/orders', orderRoutes);
app.use("/shippings", shippingRoutes);
app.use("reviews", reviewRoutes);



export default app;
