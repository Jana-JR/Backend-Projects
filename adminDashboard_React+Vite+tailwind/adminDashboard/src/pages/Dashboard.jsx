import { Box, Typography, useMediaQuery, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BarChart } from '@mui/x-charts/BarChart';

const chartData = {
  xAxis: [{ data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], scaleType: 'band' }],
  series: [
    {
      data: [400, 300, 200, 278, 189, 239, 349],
      label: 'Users',
    },
    {
      data: [2400, 2210, 2290, 2000, 2181, 2500, 2100],
      label: 'Sales',
    },
  ],
  height: 300,
};

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Dashboard
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" }}
        gap={2}
        mb={4}
      >
        <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>Total Users: 1200</Paper>
        <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>Sales Today: $5400</Paper>
        <Paper elevation={2} sx={{ p: 2, textAlign: "center" }}>Active Sessions: 85</Paper>
      </Box>

      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" mb={2}>Weekly Stats</Typography>
        <BarChart
          xAxis={chartData.xAxis}
          series={chartData.series}
          height={chartData.height}
        />
      </Paper>
    </Box>
  );
}
