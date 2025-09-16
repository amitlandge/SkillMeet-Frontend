import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

// Dummy data for courses
const courses = [
  {
    title: "Web Development",
    desc: "Learn fullstack development from expert tutors.",
    img: "https://media.licdn.com/dms/image/v2/D5612AQGvXXjCBq-Etg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1688710312431?e=2147483647&v=beta&t=VcJ32B4UgNZ0IxGIqklVdjvATtNWVhZmW39gpn8Um0g",
  },
  {
    title: "Data Science",
    desc: "Master data analysis and machine learning.",
    img: "https://www.naukri.com/campus/career-guidance/wp-content/uploads/2023/11/what-is-data-science.jpg",
  },
  {
    title: "Graphic Design",
    desc: "Unleash your creativity with design tools.",
    img: "https://prerit.org/wp-content/uploads/2023/11/wp-GRAPHIC-DESIGN.jpg",
  },
];

export default function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background:
            "linear-gradient(135deg, var(--primary-900) 10%, var(--primary-800) 100%)",
          color: "white",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Welcome to SkillMeet
          </Typography>
          <Typography variant="h6" paragraph>
            Connecting learners with expert tutors to unlock potential and build
            new skills.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              bgcolor: "white",
              color: "black",
              "&:hover": { bgcolor: "white" },
            }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Courses Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Popular Courses
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {courses.map((course, i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={course.img}
                  alt={course.title}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Box sx={{ backgroundColor: "#f9f9f9", py: 8 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            About SkillMeet
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            SkillMeet is a platform that connects passionate learners with
            skilled tutors. Whether you’re starting a new career, upgrading your
            skills, or exploring hobbies, we’ve got expert tutors to guide you.
          </Typography>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Why Choose Us?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">✅ Expert Tutors</Typography>
            <Typography color="text.secondary">
              Learn from industry professionals with real-world experience.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">✅ Flexible Learning</Typography>
            <Typography color="text.secondary">
              Choose your own pace, schedule, and mode of learning.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">✅ Affordable Pricing</Typography>
            <Typography color="text.secondary">
              High-quality education that fits your budget.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: "#222", color: "white", py: 4, mt: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} SkillMeet. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
