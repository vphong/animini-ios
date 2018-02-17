import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Picker, List, WhiteSpace } from 'antd-mobile';


const SORT_OPTIONS = [
    { label: 'Popularity',  value: 'POPULARITY', children: [] },
    { label: 'Score', value: 'SCORE', children: [] },
    { label: 'Date Added', value: 'UPDATED_AT', children: [] },
    { label: 'Start Date', value: 'START_DATE', children: [] },
    { label: 'End Date', value: 'END_DATE', }
]

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
const SEASONS_YEARS = [[
    { label: 'Spring', value: 'SPRING' },
    { label: 'Summer', value: 'SUMMER' },
    { label: 'Fall', value: 'FALL' },
    { label: 'Winter', value: 'WINTER' },
  ], YEARS()
]

var _determineSeason = () => {
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


function Filters({ data }) {

}

const MEDIA_ENUMS_QUERY = gql`
query {
    __type(name: "MediaStatus") {
       enumValues {
           name
       }
    }
}
`
export default graphql(MEDIA_STATUS_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true,
  },
  props: ({ ownProps, data }) => ({
    'data': data,
    'value': ownProps.value
  })
})(Filters);
