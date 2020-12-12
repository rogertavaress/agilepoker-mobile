import History from './History';
import Participant from './Participant';

/* eslint-disable camelcase */
interface Meet {
  id: string;
  name: string;
  email: string;
  status: string;
  histories: History[];
  participants: Participant[];
  created_at: Date;
  updated_at: Date;
}

export default Meet;
