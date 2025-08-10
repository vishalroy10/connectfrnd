import { useContext } from 'react';
import OnboardingContext from './OnboardingContext';

const UseOnboardingHook = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('context must be use inside provider');
  return context;
};

export default UseOnboardingHook;
