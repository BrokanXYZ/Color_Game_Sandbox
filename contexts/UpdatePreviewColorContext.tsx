import { createContext } from 'react';
import Color from '../models/Color';

let notSure: any  = null;

export const UpdatePreviewColorContext = createContext({
    updatePreviewColor: (newPreviewColor: Color) => {},
    setUpdatePreviewColor: notSure,
  });