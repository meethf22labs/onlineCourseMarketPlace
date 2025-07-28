const Payment = require("../models/payment");
//const Enrollment = require("../models/enrollment");

const createPayment = async (req, res) => {
  try {
    const { course_id, amount, status } = req.body;
    const userId = req.user.id;

    const newPayment = await Payment.create({
      user_id: userId,
      course_id: course_id,
      amount: amount,
      status: status
    });

    // if (status === "success") {
    //   await Enrollment.update(
    //     { status: "in_progress" },
    //     { where: { user_id: userId, course_id } }
    //   );
    // }

    return res.status(201).send({ message: "Payment recorded.", payment: newPayment });
  } catch (error) {
    console.error("Error creating payment:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

const getPayments = async (req, res) => {
  try {
    const userId = req.user.id;
    const payments = await Payment.findAll({ where: { user_id: userId } });
    return res.status(200).send(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createPayment, getPayments };
