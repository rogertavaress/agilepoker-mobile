import React, { createContext, useContext, useState } from 'react';

interface MeetContextData {
  meet: any;
}

const MeetContext = createContext<MeetContextData>({} as MeetContextData);

export const MeetProvider: React.FC = ({ children }) => {
  const [meet, setMeet] = useState('meet');
  return (
    <MeetContext.Provider value={{ meet }}>{children}</MeetContext.Provider>
  );
};

export const useMeet = (): MeetContextData => {
  const context = useContext(MeetContext);

  if (!context) {
    throw new Error('useMeet must be used within a MeetProvider');
  }

  return context;
};
