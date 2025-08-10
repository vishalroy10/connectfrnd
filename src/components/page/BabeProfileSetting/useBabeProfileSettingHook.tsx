import { useContext } from 'react';
import BabeProfileSettingContext from './BabeProfileSettingContext';

const UseBabeProfileSettingHook = () => {
  const context = useContext(BabeProfileSettingContext);
  if (!context) throw new Error('context must be use inside provider');
  return context;
};

export default UseBabeProfileSettingHook;
