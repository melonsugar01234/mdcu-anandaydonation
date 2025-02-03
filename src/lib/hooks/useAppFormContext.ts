import { useFormContext } from 'react-hook-form';
// Types
import { FormValues } from '../types';
export default function useAppFormContext() {
  return useFormContext<FormValues>();
}