import { SbcOutputData } from '../models/types';

export interface SbcOutputDataContextProps {
  data: SbcOutputData | null;
  loading: boolean;
  error: string | null;
}
