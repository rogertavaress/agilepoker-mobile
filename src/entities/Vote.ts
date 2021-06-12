import History from './History';
import Participant from './Participant';

/* eslint-disable camelcase */
interface Vote {
  id: string;
  number: number;
  history_id: string;
  history: History;
  participant_id: string;
  participant: Participant;
  created_at: Date;
  updated_at: Date;
}

export default Vote;
