import React, { useContext, useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { usePaperStyles } from '../../Hooks/StylesHook';
import StudentContext from '../../Context/Student/StudentContext';
import CampaignContext from '../../Context/Campaign/CampaignContext';
import ChartPanel from './ChartPanel';

export default function DecisionReport({ tracks, units }) {
  const studentContext = useContext(StudentContext);
  const campaignContext = useContext(CampaignContext);
  const { students, getStudents } = studentContext;
  const { currentCampaign } = campaignContext;
  const [filteredStudents, setFilteredStudents] = useState(students);
  const paperClasses = usePaperStyles();
  useEffect(() => {
    getStudents();
    // eslint-disable-next-line
  }, []);

  function produceChoicesData(studentList, limit, type) {
    let arr = [];
    for (let i = 0; i < limit; i++) {
      let curr = studentList
        .filter((student) => student.selectedTracks.length > 0)
        .map((student) =>
          student.selectedTracks.length > 0 &&
          student.selectedUnits.length > 0 &&
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

  function filterStudentsByCreditCount(minCreditCount) {
    setFilteredStudents(
      students.filter((student) => student.creditCount >= minCreditCount)
    );
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


  console.log(students);
  //console.log(students.filter((student) => student.creditCount >= 100));

  return (
    <div className={`${paperClasses.root} decisionReportContainer`}>
      <Paper className='decisionReport' elevation={3}>
        <h2>This Is Your Decision Report!</h2>
        <br />
        <ChartPanel
          minCreditCount={filterStudentsByCreditCount}
          datasets={produceDataSets(
            produceChoicesData(filteredStudents, currentCampaign && currentCampaign.tracks.length, 'tracks')
          )}
          elements={tracks}
          title={'Tracks'}
        />
        <br />
        <br />
        <ChartPanel
          minCreditCount={filterStudentsByCreditCount}
          datasets={produceDataSets(
            produceChoicesData(filteredStudents, currentCampaign && currentCampaign.units.length, 'units')
          )}
          elements={units}
          title={'Units'}
        />
      </Paper>
    </div>
  );
}
