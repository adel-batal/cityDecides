import React, { useContext } from 'react';
import { Paper } from '@material-ui/core';
import { usePaperStyles } from '../../Hooks/StylesHook';
import BarChart from './Charts/BarChart';
import StudentContext from '../../Context/Student/StudentContext';
import AuthContext from '../../Context/Auth/AuthContext';

export default function DecisionReport({ tracks, units }) {
  const studentContext = useContext(StudentContext);
  const { students } = studentContext;
  const classes = usePaperStyles();

  function produceChoicesData(studentList, limit, type) {
    let arr = [];
    for (let i = 0; i < limit; i++) {
      let curr = studentList
        .map((student) =>
          type === 'tracks'
            ? student.selectedTracks[i].id
            : student.selectedUnits[i].id
        )
        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
      for (let j = 1; j <= limit; j++) {
        if (![...curr.keys()].includes(j)) {
          curr.set(j, 0);
        }
      }
      arr.push([...curr.entries()].sort());
    }
    return arr.map((tcs) => tcs.map((tc) => tc[1]));
  }

  function produceDataSets(choicesList) {
    let label = 1;
    const datasets = choicesList.map((tc) => ({
      label: `#${label++} Choices`,
      data: tc,
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 100
      )}, ${Math.floor(Math.random() * 153)}, 0.3)`,

      borderWidth: 2,
    }));
    return datasets;
  }

  console.log(produceChoicesData(students, 6, 'units'));

  return (
    <div className={`${classes.root} decisionReportContainer`}>
      <Paper className='decisionReport' elevation={3}>
        <h2>This Is Your Decision Report!</h2>
        <br />
        <h2>Tracks</h2>
        <BarChart
          datasets={produceDataSets(produceChoicesData(students, 3, 'tracks'))}
          elements={tracks}
        />
        <br />
        <br />
        <h2>Units</h2>
        <BarChart
          datasets={produceDataSets(produceChoicesData(students, 6, 'units'))}
          elements={units}
        />
      </Paper>
    </div>
  );
}
