import React from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCourseIdStore } from "../contexts/courseId.context";
import { enqueueSnackbar } from "notistack";
import api_url from "../apiConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PaymentModal({ open, onClose }) {
  const currentCoursePrice = useCourseIdStore(
    (state) => state.currentCourseId.coursePrice
  );
  const currentCourseId = useCourseIdStore(
    (state) => state.currentCourseId.courseId
  );

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api_url}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          amount: currentCoursePrice,
          course_id: currentCourseId,
          status: "success",
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status !== 201) {
        enqueueSnackbar({ message: response.error.error, variant: "error" });
      } else {
        enqueueSnackbar({ message: data.message, variant: "success" });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar({ message: error.message, variant: "error" });
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6">Payment Gateway</Typography>
          <Typography sx={{ mt: 2 }}>
            Make the payment to enroll into the course..
          </Typography>
          <form className="flex flex-col gap-6">
            <h1 className=" text-xl">
              Amount: ₹
              <span className=" text-green-600">{currentCoursePrice}</span>
            </h1>
            <div>
              <button
                className=" bg-green-500 enrollButton rounded-xl text-xl cursor-pointer hover:bg-green-600"
                onClick={handlePayment}
              >
                Make Payment
              </button>
              <button className=" bg-red-500 enrollButton rounded-xl text-xl cursor-pointer hover:bg-red-600">
                cancel
              </button>
            </div>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
