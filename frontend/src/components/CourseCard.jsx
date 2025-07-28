import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import {useNavigate} from "react-router-dom";
import { useCourseIdStore } from '../contexts/courseId.context';

export default function CourseCard({ courseId, title, description, thumbnail_url, price }) {
  //console.log(courseId)
  const navigate = useNavigate();
  let storeCourseId = useCourseIdStore((state) => state.setCurrentCourseId)

  const handleLectures = () => {
    storeCourseId({courseId: courseId, coursePrice: price})
    navigate('lectures')
  }

  return (
    <Card sx={{ maxWidth: 345, margin: 1, width: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={thumbnail_url || "https://images.stockcake.com/public/4/7/b/47ba1ec5-aaa8-4797-b9c9-1723cc71877c_large/late-night-studying-stockcake.jpg"}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description?.length > 100 ? description.slice(0, 100) + '…' : description}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ marginTop: 1, fontWeight: 'bold', color: 'primary.main' }}
          >
            ₹{price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleLectures}
        >
          Show Lectures
        </Button>
      </CardActions>
    </Card>
  );
}
