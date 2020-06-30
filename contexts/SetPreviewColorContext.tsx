import { createContext } from 'react';
import Color from '../models/Color';

let notSure: any  = null;

export const SetPreviewColorContext = createContext({
    setPreviewColor: (newPreviewColor: Color) => {},
    initSetPreviewColor: notSure,
  });