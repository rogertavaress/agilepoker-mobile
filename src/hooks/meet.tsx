import { AxiosError } from 'axios';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { Alert } from 'react-native';
import CreateHistoryDTO from '../DTOs/CreateHistoryDTO';
import { CreateMeetDTO } from '../DTOs/CreateMeetDTO';
import { RunMeetDTO } from '../DTOs/RunMeetDTO';
import Meet from '../entities/Meet';
import Participant from '../entities/Participant';
import api from '../services/api';

interface MeetContextData {
  term: boolean;
  meet?: Meet;
  participant?: Participant;
  type?: 'participant' | 'admin';
  confirmTerms: () => Promise<void>;
  changeHistoryNow: (idHistory: number) => Promise<void>;
  changeMeetStatus: (
    status: 'awaiting_sign' | 'started' | 'paused' | 'finished',
  ) => Promise<void>;
  createHistory: (data: CreateHistoryDTO) => Promise<void>;
  createMeet: (data: CreateMeetDTO) => Promise<void>;
  runMeet: (data: RunMeetDTO) => Promise<void>;
}

const MeetContext = createContext<MeetContextData>({} as MeetContextData);

export const MeetProvider: React.FC = ({ children }) => {
  const [type, setType] = useState<'participant' | 'admin'>();
  const [term, setTerm] = useState(false);
  const [meet, setMeet] = useState<Meet>();
  const [participant, setParticipant] = useState<Participant>();

  const confirmTerms = useCallback(async () => {
    if (type === 'participant') {
      setTerm(true);
    } else {
      try {
        const { data } = await api.patch('/meets/status', {
          idMeet: meet?.id,
          statusMeet: 'paused',
        });

        setTerm(true);
        setMeet({
          ...data,
        });
      } catch (err: any) {
        Alert.alert('Erro', err.response.data.message);
      }
    }
  }, [meet, type]);

  const createHistory = useCallback(
    async ({ name, category }: CreateHistoryDTO) => {
      try {
        const { data } = await api.post('/histories', {
          meetId: meet?.id,
          name,
          category,
        });

        setMeet({ ...data });
      } catch (err: any) {
        Alert.alert('Erro', err.response.data.message);
      }
    },
    [meet],
  );

  const createMeet = useCallback(async ({ name, email }: CreateMeetDTO) => {
    try {
      const { data } = await api.post('/meets', {
        name,
        email,
      });

      setMeet({
        ...data,
      });

      setType('admin');
    } catch (err: any) {
      Alert.alert('Erro', err.response.data.message);
    }
  }, []);

  const runMeet = useCallback(async ({ name, cod }: RunMeetDTO) => {
    try {
      const { data } = await api.post('/participants', {
        idMeet: cod,
        name,
      });

      setMeet({
        ...data.meet,
      });

      setParticipant({
        ...data.participant,
      });

      setType('participant');
    } catch (err: any) {
      Alert.alert('Erro', err.response.data.message);
    }
  }, []);

  const changeHistoryNow = useCallback(
    async (idHistory: number) => {
      try {
        const { data } = await api.patch('/meets/historyNow', {
          idMeet: meet?.id,
          idHistoryNow: idHistory,
        });

        setMeet({ ...data });
      } catch (err: any) {
        Alert.alert('Erro', err.response.data.message);
      }
    },
    [meet],
  );

  const changeMeetStatus = useCallback(
    async (statusMeet: 'awaiting_sign' | 'started' | 'paused' | 'finished') => {
      try {
        const { data } = await api.patch('/meets/status', {
          idMeet: meet?.id,
          statusMeet,
        });

        setMeet({ ...data });
      } catch (err: any) {
        Alert.alert('Erro', err.response.data.message);
      }
    },
    [meet],
  );

  return (
    <MeetContext.Provider
      value={{
        term,
        type,
        meet,
        participant,
        changeHistoryNow,
        changeMeetStatus,
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
