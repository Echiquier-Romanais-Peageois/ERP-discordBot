import Discord from 'discord.js';
import fetch from 'node-fetch';
import { sortBy } from 'lodash';

export type LichessUser = {
  id: string;
  username: string;
  online: boolean;
}

export const fetchTeam = () => {
  const url = `https://lichess.org/api/team/${process.env.LICHESS_TEAM}/users`
  return fetch(url)
    .then(res => res.text())
    .then(body => {
      const lines = body.split('\n').filter((line) => line.indexOf('{') === 0);
      const users: LichessUser[] = lines.map((line) => JSON.parse(line));
      const sortedUsers: LichessUser[] = sortBy(users, (user) => user.username.toLowerCase());

      return sortedUsers;
    })
}