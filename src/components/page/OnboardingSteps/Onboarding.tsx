import React from 'react';
import { Box } from '@mui/material';

import HeaderSteps from './components/HeaderSteps';
import styles from './onboarding.module.css';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import StartCard from './components/startCard';
import UseOnboardingHook from './useOnboardingHook';
import { OnboardingType } from './OnboardingContext';

const Onboarding = () => {
  const { currentUser, step, chooseServicesModal, priceLimitModal }: OnboardingType = UseOnboardingHook();
  return (
    <>
      <Box className={styles.headerContainer}>
        {(+currentUser?.completedStep !== 0 && step == 0) || currentUser?.completedStep == 5 ? (
          <StartCard />
        ) : (
          <Box className={styles.centeredBox}>
            {!chooseServicesModal && !priceLimitModal && (
              <Box>
                <HeaderSteps step={step} />
              </Box>
            )}
            <Box>
              {step === 1 && <Step1 />}
              {step === 2 && <Step2 />}
              {step === 3 && <Step3 />}
              {step === 4 && <Step4 />}
              {step === 5 && <Step5 />}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
export default Onboarding;
