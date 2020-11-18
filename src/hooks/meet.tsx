import React, { createContext, useCallback, useContext, useState } from 'react';

interface MeetContextData {
  term: boolean;
  confirmTerms: () => void;
}

const MeetContext = createContext<MeetContextData>({} as MeetContextData);

export const MeetProvider: React.FC = ({ children }) => {
  const [term, setTerm] = useState(false);

  const confirmTerms = useCallback(() => {
    setTerm(true);
  }, []);

  return (
    <MeetContext.Provider value={{ term, confirmTerms }}>
      {children}
    </MeetContext.Provider>
  );
};

export const useMeet = (): MeetContextData => {
  const context = useContext(MeetContext);

  if (!context) {
    throw new Error('useMeet must be used within a MeetProvider');
  }

  return context;
};
