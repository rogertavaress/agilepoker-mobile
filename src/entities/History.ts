import Meet from './Meet';
import Vote from './Vote';

/* eslint-disable camelcase */
interface History {
  id: string;
  name: string;
  category: string;
  votes: Vote[];
  meetId: string;
  meet: Meet;
  created_at: Date;
  updated_at: Date;
}

export default History;
