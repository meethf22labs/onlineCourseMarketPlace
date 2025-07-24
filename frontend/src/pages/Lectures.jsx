import React, { useEffect, useState } from "react";
import api_url from "../apiConfig";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Grid,
  Link,
} from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

const Lectures = () => {
  const [lectures, setLectures] = useState([]);
  const location = useLocation();
  const { courseId } = location.state || {};

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await fetch(
          `${api_url}/courses/${courseId}/lectures`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          console.error("Network response was not ok");
          setLectures([]);
          return;
        }
        const data = await response.json();
        console.log(data);

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

    if (courseId) {
      fetchLectures();
    } else {
      setLectures([]);
    }
  }, [courseId]);

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f9fafb", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
      >
        Lectures
      </Typography>

      {lectures.length === 0 ? (
        <Typography variant="h6" sx={{ textAlign: "center", mt: 8 }}>
          No lectures available for this course.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
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
                {/* Thumbnail */}
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", md: 300 },
                    height: { xs: 200, md: "auto" },
                    objectFit: "cover",
                  }}
                  image={
                    lecture.thumbnail_url ||
                    "https://images.stockcake.com/public/4/7/b/47ba1ec5-aaa8-4797-b9c9-1723cc71877c_large/late-night-studying-stockcake.jpg"
                  }
                  alt={lecture.title}
                />

                {/* Content */}
                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "bold" }}
                  >
                    {lecture.title}
                  </Typography>

                  <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
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
