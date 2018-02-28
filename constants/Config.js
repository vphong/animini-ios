export const Anilist = {
  api: 'https://graphql.anilist.co',
  auth: "https://anilist.co/api/v2/oauth/authorize",
  clientId: "278",
  clientSecret: "kl7EmU2w3PMPNP6tMlFEus9rmwe7Cku5vBtrUOMt",
}

const THIS_YEAR = new Date().getFullYear();
const YEARS = function() {
  let years = []
  var yearStart = 1924, yearEnd = THIS_YEAR;
  while (yearEnd >= yearStart ) {
    years.push({label: yearEnd.toString(), value: yearEnd.toString()});
    yearEnd--;
  }
  return years
}

const CURRENT_SEASON = () => {
  let thisMonth = new Date().getMonth(), season;

  if (thisMonth == 11 || thisMonth <= 1) {
    season = "WINTER";
  }
  else if (thisMonth >= 2 && thisMonth <= 4) {
    season = "SPRING";
  }
  else if (thisMonth >= 5 && thisMonth <= 7) {
    season = "SUMMER";
  }
  else {
    season = "FALL";
  }

  return season
}


export const labelFormat = (str) => {
  var formatted = str.replace(/[_]/g, " ")

  return formatted.replace(/\B\w/g, function(c) { return c.toLowerCase() })
}

export const Media = {
  sortOptions: [
      { label: 'Popularity',  value: 'POPULARITY_DESC', children: [] },
      { label: 'Score', value: 'SCORE_DESC', children: [] },
      { label: 'Date Added', value: 'UPDATED_AT', children: [] },
  ],
  seasons: [
      { label: 'Spring', value: 'SPRING' },
      { label: 'Summer', value: 'SUMMER' },
      { label: 'Fall', value: 'FALL' },
      { label: 'Winter', value: 'WINTER' },
    ],
  years: YEARS(),
  currSeason: CURRENT_SEASON(),
  currYear: THIS_YEAR.toString()
}
