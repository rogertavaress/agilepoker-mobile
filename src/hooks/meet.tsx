import React, { createContext, useCallback, useContext, useState } from 'react';

export interface CreateMeetProps {
  name: string;
  email?: string;
}

export interface RunMeetProps {
  name: string;
  cod?: string;
}

interface MeetContextData {
  term: boolean;
  name?: string;
  confirmTerms: () => void;
  createMeet: (data: CreateMeetProps) => void;
  runMeet: (data: RunMeetProps) => void;
}

const MeetContext = createContext<MeetContextData>({} as MeetContextData);

export const MeetProvider: React.FC = ({ children }) => {
  const [type, setType] = useState<'participant' | 'admin'>();
  const [term, setTerm] = useState(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [cod, setCod] = useState<string>();

  const confirmTerms = useCallback(() => {
    setTerm(true);
  }, []);

  const createMeet = useCallback((data: CreateMeetProps) => {
    if (data.name) {
      setName(data.name);
    }
    if (data.email) {
      setEmail(data.email);
    }
    setType('admin');
  }, []);

  const runMeet = useCallback((data: RunMeetProps) => {
    if (data.name) {
      setName(data.name);
    }
    if (data.cod) {
      setCod(data.cod);
    }
    setType('participant');
  }, []);

  return (
    <MeetContext.Provider
      value={{ term, name, confirmTerms, createMeet, runMeet }}
    >
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
