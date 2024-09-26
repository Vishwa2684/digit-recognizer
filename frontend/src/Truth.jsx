import React from 'react';
import { Box, Typography, Grid, Stack, LinearProgress } from '@mui/material';

const PredictionProgress = ({ predictions }) => {
  // 
  return (
    <Box color="#fff" sx={{ width:'400px',backgroundColor: '#fff', padding: 2, borderRadius: 2 }}>
      <Typography variant="h6" color='#333'>Predictions</Typography>
      <Grid container direction="column" spacing={2}>
        {/* Map through the predictions array and create a progress bar for each prediction */}
        {predictions.map((prediction, index) => {
          const value = Math.min(prediction * 100, 100); // Scale prediction to 0-100%
          return (
            <Grid item key={index}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="body2" color="textSecondary" sx={{ minWidth: '20px' }}>{index}</Typography>
                <Box sx={{ width: '100%', height: '30px' }}>
                  {/* Set width to 100% */}
                  <LinearProgress variant="determinate" value={value} sx={{ height: '30px', borderRadius: 5 }} /> {/* Height and border-radius remain the same */}
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ minWidth: '50px' }}>{`${value.toFixed(2)}%`}</Typography>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Box>
);

};

export default PredictionProgress;
