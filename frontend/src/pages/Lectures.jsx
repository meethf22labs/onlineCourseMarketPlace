import React, { useEffect, useState } from "react";
import api_url from "../apiConfig";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { enqueueSnackbar } from "notistack";
import PaymentModal from "../components/paymentModal";
import { useCourseIdStore } from "../contexts/courseId.context";
import { useUserStore } from "../contexts/loggedInUser.context";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  const currentCourseId = useCourseIdStore((state) => state.currentCourseId?.courseId);
  const currentLoggedInUser = useUserStore((state) => state.loggedInUser?.id);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(
          `${api_url}/courses/${currentCourseId}/lectures`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          enqueueSnackbar({ message: data.error || "Failed to load lectures", variant: "error" });
          setLectures([]);
          return;
        }

        if (Array.isArray(data)) {
          setLectures(data);
        } else {
          console.warn("Lectures API did not return an array:", data);
          setLectures([]);
        }
      } catch (error) {
        console.error("Error fetching lectures:", error);
        setLectures([]);
      }
    };

    if (currentCourseId) {
      fetchLectures();
    }
  }, [currentCourseId]);

  useEffect(() => {
    const checkEnrolled = async () => {
      try {
        const response = await fetch(`${api_url}/payments`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (Array.isArray(data)) {
          const enrolledStatus = data.some((payment) =>
              payment.user_id === currentLoggedInUser &&
              payment.course_id === currentCourseId
          );
          setEnrolled(enrolledStatus);
        } else {
          console.warn("Payments API did not return an array:", data);
          setEnrolled(false);
        }
      } catch (error) {
        console.error("Error while checking enrollment:", error);
        enqueueSnackbar({ message: "Failed to check enrollment", variant: "error" });
        setEnrolled(false);
      }
    };

    if (currentCourseId && currentLoggedInUser) {
      checkEnrolled();
    }
  }, [currentCourseId, currentLoggedInUser]);

  // ✅ Modal handlers
  const handleEnrollClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Lectures
        {!enrolled && (
          <button
            className="bg-blue-600 text-white text-2xl font-medium px-3 py-1.5 rounded-2xl cursor-pointer ml-3 hover:bg-blue-400 transition-all enrollButton"
            onClick={handleEnrollClick}
          >
            Enroll Now
          </button>
        )}
      </Typography>

      {/* Payment Modal */}
      <PaymentModal open={modalOpen} onClose={handleModalClose} />

      {/* Lectures List */}
      {lectures.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 8 }}>
          No lectures available for this course.
        </Typography>
      ) : (
        <Grid container spacing={2} justifyContent="center">
          {lectures.map((lecture) => (
            <Grid item xs={12} key={lecture.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "stretch",
                  boxShadow: 3,
                  borderRadius: 3,
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", md: 200 },
                    height: { xs: 100, md: "auto" },
                    objectFit: "cover",
                  }}
                  image={
                    lecture.thumbnail_url ||
                    "https://images.stockcake.com/public/4/7/b/47ba1ec5-aaa8-4797-b9c9-1723cc71877c_large/late-night-studying-stockcake.jpg"
                  }
                  alt={lecture.title}
                />

                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {lecture.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ mb: 2, color: "text.secondary" }}
                  >
                    {lecture.description || "No description available."}
                  </Typography>

                  <Typography
                    variant="subtitle1"
                    sx={{ mb: 1, fontWeight: "medium" }}
                  >
                    Duration: {lecture.duration} minutes
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <OndemandVideoIcon color="primary" />
                    {enrolled ? (
                      <Link
                        href={lecture.video_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      >
                        Watch Video
                      </Link>
                    ) : (
                      <Typography sx={{ color: "gray", fontWeight: "bold" }}>
                        Payment Required
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Lectures;

