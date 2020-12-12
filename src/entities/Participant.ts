import Meet from './Meet';
import Vote from './Vote';

/* eslint-disable camelcase */
interface Participant {
  id: string;
  name: string;
  meetId: string;
  meet: Meet;
  votes: Vote[];
  created_at: Date;
  updated_at: Date;
}

export default Participant;
