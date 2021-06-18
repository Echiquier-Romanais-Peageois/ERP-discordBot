module.exports.getDataLichessTeam = async () => {
    teamId = 'erp-echiquier-romanais-peageois';
    url = `https://lichess.org/api/team/${teamId}/users`;
    const stream = StringStream.from(async () => (await fetch(url)).body).JSONParse();
    for await (const item of stream) {
        const { username, online } = item;
        let result = [username,online]
        return result
    }
    
}