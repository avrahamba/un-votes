import data from "./data_votes.json";

const types = data.votes.map((v) => v.meta.descrition),
  tl1 = [],
  tl2 = [];

types.forEach((t) => {
  if (tl1.includes(t)) {
    if (!tl2.includes(t)) tl2.push(t);
  } else tl1.push(t);
});

export const filterDescritionList = tl2;

export const goodBad = (filterDescrition) => {
  return data.votes
    .filter((v) => v.meta.descrition === filterDescrition)
    .map((vote) => {
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
      const date = vote.meta.date;
      return { good, neutral, bad, date };
    });
};

export const countryList = Object.keys(data.countries);

export function countryDataFn(countryCode) {
  const votes = data.votes
    .map((v) => ({ ...v.meta, vote: v.votes[countryCode] }))
    .filter((v) => v.vote);
  votes.sort((a, b) => (a.date > b.date ? 1 : -1));
  const votesByDescrition = [];
  const votesByDate = [];
  votes.forEach((v) => {
    {
      const index = votesByDescrition
        .map((r) => r.descrition)
        .indexOf(v.descrition);
      const status = v.vote === "A" ? "A" : v.vote === v.israel ? "G" : "B";
      if (index === -1) {
        votesByDescrition.push({
          descrition: v.descrition,
          countG: status === "G" ? 1 : 0,
          countB: status === "B" ? 1 : 0,
          countA: status === "A" ? 1 : 0,
          last: status,
          lastDate: v.date,
        });
      } else {
        votesByDescrition[index].last = status;
        votesByDescrition[index].lastDate = v.date;
        switch (status) {
          case "A":
            votesByDescrition[index].countA++;
            break;
          case "G":
            votesByDescrition[index].countG++;
            break;
          case "B":
            votesByDescrition[index].countB++;
            break;
        }
      }
    }
    {
      const index = votesByDate.map((r) => r.date).indexOf(v.date);
      const status = v.vote === "A" ? "A" : v.vote === v.israel ? "G" : "B";
      if (index === -1) {
        votesByDate.push({
          countG: status === "G" ? 1 : 0,
          countB: status === "B" ? 1 : 0,
          countA: status === "A" ? 1 : 0,
          date: v.date,
        });
      } else {
        switch (status) {
          case "A":
            votesByDate[index].countA++;
            break;
          case "G":
            votesByDate[index].countG++;
            break;
          case "B":
            votesByDate[index].countB++;
            break;
        }
      }
    }
  });
  return { votesByDescrition, votesByDate };
}

export function countriesStatus() {
  const countryObject = countryList.reduce((obj, name) => {
    obj[name] = {
      good: 0,
      neutral: 0,
      bad: 0,
    };
    return obj;
  }, {});
  data.votes.forEach((vote) => {
    const isr = vote.meta.israel;
    Object.keys(vote.votes).forEach((country) => {
      if (vote.votes[country] === isr) countryObject[country].good++;
      else if (vote.votes[country] === "A") countryObject[country].neutral++;
      else if (vote.votes[country] === "Y" || vote.votes[country] === "N")
        countryObject[country].bad++;
    });
  });
  return Object.keys(countryObject).map((name) => ({
    name,
    ...countryObject[name],
  }));
}
