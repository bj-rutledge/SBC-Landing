import { SbcOutputData } from '../types';

export interface SbcOutputDataContextProps {
  data: SbcOutputData | null;
  loading: boolean;
  error: string | null;
}
