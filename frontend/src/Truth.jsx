
import React from 'react';
import { LinearProgress, Stack, Typography, Box, Grid } from '@mui/material';

export default function Truth({ predictions }) {
  return (
    <Box color="#fff">
      <Typography variant="h6">Prediction Progress</Typography>
      <Grid container direction="column" spacing={2}>
        {/* Map through the predictions array and create a progress bar for each prediction */}
        {predictions.map((prediction, index) => {
          const value = Math.min(prediction * 100, 100); // Scale prediction to 0-100%
          return (
            <Grid item key={index}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ width: '80%', height: '20px' }}>
                  <LinearProgress variant="determinate" value={value} />
                </Box>
                <Typography variant="body2" color="textSecondary" sx={{ minWidth: '50px' }}>{`${value.toFixed(2)}%`}</Typography>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
