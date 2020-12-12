import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import CreateHistoryDTO from '../DTOs/CreateHistoryDTO';
import { CreateMeetDTO } from '../DTOs/CreateMeetDTO';
import { RunMeetDTO } from '../DTOs/RunMeetDTO';
import History from '../entities/History';
import Meet from '../entities/Meet';
import api from '../services/api';

interface MeetContextData {
  term: boolean;
  meet?: Meet;
  type?: 'participant' | 'admin';
  histories?: History[];
  confirmTerms: () => void;
  createHistory: (data: CreateHistoryDTO) => void;
  createMeet: (data: CreateMeetDTO) => Promise<void>;
  runMeet: (data: RunMeetDTO) => Promise<void>;
}

const MeetContext = createContext<MeetContextData>({} as MeetContextData);

export const MeetProvider: React.FC = ({ children }) => {
  const [type, setType] = useState<'participant' | 'admin'>();
  const [term, setTerm] = useState(false);
  const [meet, setMeet] = useState<Meet>();
  const [histories, setHistories] = useState<History[]>([]);

  const confirmTerms = useCallback(() => {
    setTerm(true);
  }, []);

  const createHistory = useCallback((data: CreateHistoryDTO) => {
    // setHistories((state) => [...state, { ...data }]);
  }, []);

  const createMeet = useCallback(async ({ name, email }: CreateMeetDTO) => {
    const { data } = await api.post('/meets', {
      name,
      email,
    });

    setMeet({
      ...data,
    });

    setType('admin');
  }, []);

  const runMeet = useCallback(async ({ name, cod }: RunMeetDTO) => {
    const { data } = await api.post('/participants', {
      idMeet: cod,
      name,
    });

    setMeet({
      ...data,
    });

    setType('participant');
  }, []);

  return (
    <MeetContext.Provider
      value={{
        term,
        type,
        meet,
        histories,
        confirmTerms,
        createHistory,
        createMeet,
        runMeet,
      }}
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
