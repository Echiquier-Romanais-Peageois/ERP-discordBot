
import fetch from 'node-fetch';
import { sortBy } from 'lodash';

type FFEMember = {
  id: string
  firstName: string;
  lastName: string;
}

export const fetchFFEData = async () => {
  let dataFFE = []
  const urlOfClub = `http://admin.echecs.asso.fr/GetData.aspx?Action=joueursduclub&ClubId=${process.env.FFE_CLUB_ID}`
  const response = await fetch(urlOfClub).then(res => res.text())
  const ids = response.split(";")
  ids.shift();

  const membersFetchers = ids.map((id) => {
    const urlForUser = `http://admin.echecs.asso.fr/GetData.aspx?Action=joueur&NrFFE=${id}`;
    return fetch(urlForUser)
      .then(res => res.text())
      .then((str: string) => {
        console.log(str);
        const [lastName, firstName] = str.split(';');
        const member: FFEMember = {
          id,
          lastName,
          firstName,
        }

        return member;
      })
  })

  const members = await Promise.all(membersFetchers);
  return members;
}