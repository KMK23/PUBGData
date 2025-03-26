import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Stats = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          통계
        </Typography>
        <Typography variant="body1" paragraph>
          이 페이지는 추후 추가될 예정입니다.
        </Typography>
      </Box>
    </Container>
  );
};

export default Stats;
