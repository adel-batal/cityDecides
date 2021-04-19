import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { usePaperStyles } from '../../Hooks/StylesHook';
import TracksChart from './Charts/TracksChart';
import UnitsChart from './Charts/UnitsChart';
import StudentContext from '../../Context/Student/StudentContext';

export default function DecisionReport() {
  const studentContext = useContext(StudentContext);
  const { students } = studentContext;
  const classes = usePaperStyles();

  function trackChoices(list, limit) {
    let arr = [];
    for (let i = 0; i < limit; i++) {
      let curr = list
        .map((student) => student.selectedTracks[i].id)
        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
      arr.push([...curr.entries()].sort());
      
    }
    return arr;
  }
  function unitChoices(list, limit) {
    let arr = [];
    for (let i = 0; i < limit; i++) {
      let curr = list
        .map((student) => student.selectedUnits[i].id)
        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
      arr.push([...curr.entries()].sort());
      
    }
    return arr;
  }

  console.log(unitChoices(students, 6));
  return (
    <div className={`${classes.root} decisionReportContainer`}>
      <Paper className='decisionReport' elevation={3}>
        <h2>This Is Your Decisioin Report</h2>
        <br/>
        <h3>Tracks</h3>
        <TracksChart
          trackChoices={trackChoices(students, 3)}
        />
        <br/>
        <br/>
        <br/>
        <h3>Units</h3>
        <UnitsChart
          unitChoices={unitChoices(students, 6)}
        />
      </Paper>
    </div>
  );
}
