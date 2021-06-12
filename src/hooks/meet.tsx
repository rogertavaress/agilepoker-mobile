import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import CreateHistoryDTO from '../DTOs/CreateHistoryDTO';
import { CreateMeetDTO } from '../DTOs/CreateMeetDTO';
import { RunMeetDTO } from '../DTOs/RunMeetDTO';
import SendVoteDTO from '../DTOs/SendVoteDTO';
import Meet from '../entities/Meet';
import Participant from '../entities/Participant';
import api from '../services/api';
import { useSocket } from './socket';

interface MeetContextData {
  term: boolean;
  meet?: Meet;
  participant?: Participant;
  type?: 'participant' | 'admin';
  confirmTerms: (callback?: () => Promise<void>) => Promise<void>;
  changeHistoryNow: (
    historyId: string,
    callback?: () => Promise<void>,
  ) => Promise<void>;
  changeMeetStatus: (
    status: 'awaiting_sign' | 'started' | 'played' | 'paused' | 'finished',
    callback?: () => Promise<void>,
  ) => Promise<void>;
  createHistory: (
    data: CreateHistoryDTO,
    callback?: () => Promise<void>,
  ) => Promise<void>;
  createMeet: (
    data: CreateMeetDTO,
    callback?: () => Promise<void>,
    error?: () => Promise<void>,
  ) => Promise<void>;
  runMeet: (
    data: RunMeetDTO,
    callback?: () => Promise<void>,
    error?: () => Promise<void>,
  ) => Promise<void>;
  sendVote: (
    data: SendVoteDTO,
    callback?: () => Promise<void>,
  ) => Promise<void>;
}

const MeetContext = createContext<MeetContextData>({} as MeetContextData);

export const MeetProvider: React.FC = ({ children }) => {
  const { socket } = useSocket();
  const [type, setType] = useState<'participant' | 'admin'>();
  const [term, setTerm] = useState(false);
  const [meet, setMeet] = useState<Meet>();
  const [participant, setParticipant] = useState<Participant>();

  const confirmTerms = useCallback(
    async (callback?: () => Promise<void>) => {
      if (type === 'participant') {
        setTerm(true);
        if (callback) {
          await callback();
        }
      } else {
        try {
          const { data } = await api.patch('/meets/status', {
            meet_id: meet?.id,
            status_meet: 'started',
          });

          socket.emit('sync-request', data);

          setTerm(true);
          setMeet({
            ...data,
          });

          if (callback) {
            await callback();
          }
        } catch (err: any) {
          Alert.alert('Erro', err.response.data.message);
        }
      }
    },
    [meet, socket, type],
  );

  const createHistory = useCallback(
    async (
      { name, category }: CreateHistoryDTO,
      callback?: () => Promise<void>,
    ) => {
      try {
        const { data } = await api.post('/histories', {
          meet_id: meet?.id,
          name,
          category,
        });

        socket.emit('sync-request', data);

        setMeet({ ...data });

        if (callback) {
          await callback();
        }
      } catch (err: any) {
        Alert.alert('Erro', err.response.data.message);
      }
    },
    [meet, socket],
  );

  const createMeet = useCallback(
    async (
      { name, email }: CreateMeetDTO,
      callback?: () => Promise<void>,
      error?: () => Promise<void>,
    ) => {
      try {
        const { data } = await api.post('/meets', {
          name,
          email,
        });

        setMeet({
          ...data,
        });

        socket.emit('join-meet', data);

        setType('admin');

        if (callback) {
          await callback();
        }
      } catch (err: any) {
        if (error) {
          await error();
        }
        Alert.alert('Erro', err.response.data.message);
      }
    },
    [socket],
  );

  const runMeet = useCallback(
    async (
      { name, cod }: RunMeetDTO,
      callback?: () => Promise<void>,
      error?: () => Promise<void>,
    ) => {
      try {
        const { data } = await api.post('/participants', {
          meet_id: cod,
          name,
        });

        socket.emit('join-meet', data.meet);

        setMeet({
          ...data.meet,
        });

        setParticipant({
          ...data.participant,
        });

        setType('participant');

        if (callback) {
          await callback();
        }
      } catch (err: any) {
        if (error) {
          await error();
        }
        Alert.alert('Erro', err.response.data.message);
      }
    },
    [socket],
  );

  const changeHistoryNow = useCallback(
    async (historyId: string, callback?: () => Promise<void>) => {
      try {
        const { data } = await api.patch('/meets/historyNow', {
          meet_id: meet?.id,
          history_now_id: historyId,
        });

        socket.emit('sync-request', data);

        setMeet({ ...data });

        if (callback) {
          await callback();
        }
      } catch (err: any) {
        Alert.alert('Erro', err.response.data.message);
      }
    },
    [meet, socket],
  );

  const changeMeetStatus = useCallback(
    async (
      statusMeet:
        | 'awaiting_sign'
        | 'started'
        | 'played'
        | 'paused'
        | 'finished',
      callback?: () => Promise<void>,
    ) => {
      try {
        const { data } = await api.patch('/meets/status', {
          meet_id: meet?.id,
          status_meet: statusMeet,
        });

        socket.emit('sync-request', data);

        setMeet({ ...data });

        if (callback) {
          await callback();
        }
      } catch (err: any) {
        Alert.alert('Erro', err.response.data.message);
      }
    },
    [meet, socket],
  );

  const sendVote = useCallback(
    async (sendVoteDTO: SendVoteDTO, callback?: () => Promise<void>) => {
      try {
        const { data } = await api.post('/votes', {
          ...sendVoteDTO,
          participant_id: participant?.id,
          history_id: meet?.history_now_id,
          meet_id: meet?.id,
        });

        socket.emit('sync-request', data);

        setMeet({ ...data });

        if (callback) {
          await callback();
        }
      } catch (err: any) {
        Alert.alert('Erro', err.response.data.message);
      }
    },
    [meet, participant, socket],
  );

  useEffect(() => {
    socket.on('sync', (data: any) => {
      setMeet({ ...data });
    });
  }, [socket]);

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
        sendVote,
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
