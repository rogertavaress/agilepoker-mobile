import Meet from './Meet';
import Vote from './Vote';

/* eslint-disable camelcase */
interface Participant {
  id: string;
  name: string;
  meet_id: string;
  longitude?: number;
  latitude?: number;
  meet: Meet;
  votes: Vote[];
  created_at: Date;
  updated_at: Date;
}

export default Participant;
