import History from './History';
import Participant from './Participant';

/* eslint-disable camelcase */
interface Vote {
  id: string;
  number: number;
  historyId: string;
  history: History;
  participantId: string;
  participant: Participant;
  created_at: Date;
  updated_at: Date;
}

export default Vote;
