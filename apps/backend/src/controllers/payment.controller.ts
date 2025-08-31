import { Request, Response } from "express";
import Payment  from "../models/payment.model";
import Order from "../models/order.model";
 import { stripe } from "../config/stripe";


export class PaymentController {
  // Create new payment
  static async createPayment(req: Request, res: Response) {
    try {
      const { orderId, amount, method } = req.body;

      // Ensure order exists
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const payment = new Payment({
        orderId,
        amount,
        method,
        status: "PENDING",
        createdAt: new Date(),
      });

      await payment.save();
      res.status(201).json(payment);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get all payments
  static async getPayments(req: Request, res: Response) {
    try {
      const payments = await Payment.find().populate("orderId");
      res.json(payments);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Get single payment by ID
  static async getPaymentById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const payment = await Payment.findById(id).populate("orderId");
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.json(payment);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  // Update payment status (CONFIRMED, FAILED, REFUNDED)
  static async updatePaymentStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const payment = await Payment.findById(id);
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }

      payment.status = status;
      await payment.save();

      // 🔄 Update related order status automatically
      if (status === "CONFIRMED") {
        await Order.findByIdAndUpdate(payment.orderId, { status: "PAID" });
      } else if (status === "FAILED") {
        await Order.findByIdAndUpdate(payment.orderId, { status: "PAYMENT_FAILED" });
      } else if (status === "REFUNDED") {
        await Order.findByIdAndUpdate(payment.orderId, { status: "REFUNDED" });
      }

      res.json(payment);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }




   static async createCheckoutSession(req: Request, res: Response) {
      try {
        const { orderId, amount, currency = "usd" } = req.body;

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency,
                product_data: { name: `Order ${orderId}` },
                unit_amount: Math.round(amount * 100), // cents
              },
              quantity: 1,
            },
          ],
          success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
        });

        // Save payment with PENDING status
        const payment = new Payment({
          orderId,
          amount,
          method: "CARD",
          status: "PENDING",
          stripeSessionId: session.id,
        });
        await payment.save();

        res.json({ url: session.url });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    }

    // 2. Stripe Webhook
    static async stripeWebhook(req: Request, res: Response) {
      try {
        const sig = req.headers["stripe-signature"];
        const event = stripe.webhooks.constructEvent(
          req.body,
          sig as string,
          process.env.STRIPE_WEBHOOK_SECRET as string
        );

        if (event.type === "checkout.session.completed") {
          const session = event.data.object as any;

          const payment = await Payment.findOne({ stripeSessionId: session.id });
          if (payment) {
            payment.status = "CONFIRMED";
            await payment.save();

            await Order.findByIdAndUpdate(payment.orderId, { status: "PAID" });
          }
        }

        if (event.type === "payment_intent.payment_failed") {
          const intent = event.data.object as any;
          const payment = await Payment.findOne({ stripePaymentIntent: intent.id });
          if (payment) {
            payment.status = "FAILED";
            await payment.save();

            await Order.findByIdAndUpdate(payment.orderId, { status: "PAYMENT_FAILED" });
          }
        }

        res.json({ received: true });
      } catch (err: any) {
        console.error("Webhook Error:", err.message);
        res.status(400).send(`Webhook Error: ${err.message}`);
      }
    }

      static async refundPayment(req: Request, res: Response) {
        try {
          const { id } = req.params;

          const payment = await Payment.findById(id);
          if (!payment) return res.status(404).json({ message: "Payment not found" });
          if (payment.status !== "CONFIRMED")
            return res.status(400).json({ message: "Only confirmed payments can be refunded" });

          // Refund via Stripe
          const refund = await stripe.refunds.create({
            payment_intent: payment.stripePaymentIntent,
          });

          payment.status = "REFUNDED";
          await payment.save();

          await Order.findByIdAndUpdate(payment.orderId, { status: "REFUNDED" });

          res.json({ message: "Refund successful", refund });
        } catch (err: any) {
          res.status(500).json({ error: err.message });
        }
      }
}
