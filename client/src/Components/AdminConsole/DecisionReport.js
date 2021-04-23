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

  function studentsChoices(list, limit, type) {
    let arr = [];
    for (let i = 0; i < limit; i++) {
      let curr = list
        .map((student) =>
          type === 'tracks'
            ? student.selectedTracks[i].id
            : student.selectedUnits[i].id
        )
        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
      arr.push([...curr.entries()].sort());
    }
    return arr;
  }

  return (
    <div className={`${classes.root} decisionReportContainer`}>
      <Paper className='decisionReport' elevation={3}>
        <h2>This Is Your Decision Report!</h2>
        <br />
        <h2>Tracks</h2>
        <TracksChart trackChoices={studentsChoices(students, 3, 'tracks')} />
        <br />
        <br />
        <h2>Units</h2>
        <UnitsChart unitChoices={studentsChoices(students, 6, 'units')} />
      </Paper>
    </div>
  );
}
