import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import styles from '../onboarding.module.css';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#FFD443',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#FFD443',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#F0F0F0',
    borderTopWidth: 4,
    borderRadius: 1,
  },
}));

const steps = [0, 1, 2, 3, 4, 5];
export default function HeaderSteps({ step }: any) {
  return (
    <Stack className={styles.steps_sick}>
      <Stepper activeStep={step} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}></Step>
        ))}
      </Stepper>
    </Stack>
  );
}
