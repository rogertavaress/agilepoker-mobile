import React from 'react';

import { MeetProvider } from './meet';

const AppProvider: React.FC = ({ children }) => {
  return <MeetProvider>{children}</MeetProvider>;
};

export default AppProvider;
