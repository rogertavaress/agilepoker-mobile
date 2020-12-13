import React from 'react';

import { MeetProvider } from './meet';
import { SocketProvider } from './socket';

const AppProvider: React.FC = ({ children }) => {
  return (
    <SocketProvider>
      <MeetProvider>{children}</MeetProvider>
    </SocketProvider>
  );
};

export default AppProvider;
