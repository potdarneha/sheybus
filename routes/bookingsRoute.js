const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Bookings = require("../models/bookingModel");
const Bus = require("../models/busModel");
// const stripe = require("stripe")(process.env.stripe_key);
const { v4: uuidv4 } = require("uuid");

// book a seat
router.post("/book-seat", authMiddleware, async (req, res) => {
  try {
    const newBooking = new Bookings({
      ...req.body,
      transactionId: "1234",
      user: req.body.userId,
    });
    await newBooking.save();
    const bus = await Bus.findById(req.body.bus);
    bus.seatsBooked = [...bus.seatsBooked, ...req.body.seats];
    await bus.save();

    res.status(200).send({
      message: "Booking Succesful",
      data: newBooking,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking Failed",
      data: error,
      success: false,
    });
  }
});

// make payment

// router.post("/make-payment", authMiddleware, async (req, res) => {
//   try {
//     const { token, amount } = req.body;
//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });
//     const payment = await stripe.charges.create(
//       {
//         amount: amount,
//         currency: "inr",
//         customer: customer.id,
//         receipt_email: token.email,
//       },
//       {
//         idempotencyKey: uuidv4(),
//       }
//     );
//     if (payment) {
//       res.status(200).send({
//         message: "Payment Successful",
//         data: {
//           transactionId: payment.source.id,
//         },
//         success: true,
//       });
//     } else {
//       res.status(500).send({
//         message: "Payment Failed",
//         data: error,
//         success: false,
//       });
//     }
//   } catch (error) {
//     console.log(error);

//     res.status(500).send({
//       message: "Payment Failed",
//       data: error,
//       success: false,
//     });
//   }
// });

// get bookings by user id
router.post("/get-bookings-by-user-id", authMiddleware, async (req, res) => {
  try {
    const bookings = await Bookings.find({ user: req.body.userId })
      .populate("bus")
      .populate("user");
    res.status(200).send({
      message: "Booking fetched Succesfully",
      data: bookings,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "Booking fetch Failed",
      data: error,
      success: false,
    });
  }
});

module.exports = router;
