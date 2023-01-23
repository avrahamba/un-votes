import data from "./data_votes.json";


const types = data.votes.map(v=>v.meta.descrition), tl1 = [], tl2 = []

types.forEach(t => {
  if(tl1.includes(t)){
    if(!tl2.includes(t))tl2.push(t)
  }
  else tl1.push(t)
});

export const filterDescritionList = tl2

export const goodBad = (filterDescrition) => {
  return data.votes.filter(v=>v.meta.descrition === filterDescrition).map((vote) => {
    const israel = vote.meta.israel;
    const antiIsrael = vote.meta.israel === "Y" ? "N" : "Y";
    const good = Object.keys(vote.votes)
      .map((i) => vote.votes[i] === israel)
      .filter((v) => v).length;
    const neutral = Object.keys(vote.votes)
      .map((i) => vote.votes[i] === "A")
      .filter((v) => v).length;
    const bad = Object.keys(vote.votes)
      .map((i) => vote.votes[i] === antiIsrael)
      .filter((v) => v).length;
    const date = vote.meta.date
    return { good, neutral, bad, date };
  });
};

export const countryList = Object.keys(data.countries)

export function countryDataFn(countryCode){
  const votes = data.votes.map(v=>({...v.meta,vote: v.votes[countryCode]})).filter(v=>v.vote)
  votes.sort((a,b)=>a.date>b.date?1:-1)
  console.log('votes', votes)
  const res = []
  votes.forEach(v=>{
    const index = res.map(r=>r.descrition).indexOf(v.descrition)
    const status = v.vote === 'A' ? 'A' : v.vote === v.israel ? 'G': 'B'
    if(index === -1){
      res.push({descrition:v.descrition,
      countG: status ==='G' ? 1 : 0,
      countB: status ==='B' ? 1 : 0,
      countA: status ==='A' ? 1 : 0,
      last: status,
      lastDate: v.date
      })
    }
    else{
      res[index].last = status
      res[index].lastDate = v.date
      switch (status){
        case 'A': res[index].countA++; break;
        case 'G': res[index].countG++; break;
        case 'B': res[index].countB++; break;
      }
    }
  })
  return res
}