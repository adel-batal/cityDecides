import React, { useContext, useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { usePaperStyles } from '../../Hooks/StylesHook';
import StudentContext from '../../Context/Student/StudentContext';
import CampaignContext from '../../Context/Campaign/CampaignContext';
import ChartPanel from './ChartPanel';
import randomColor from '../../Utils/randomRgbColor';

export default function DecisionReport() {
  const LOCAL_STORAGE_KEY_CHOICES = 'cityDecides.selections.choices';
  const studentContext = useContext(StudentContext);
  const campaignContext = useContext(CampaignContext);
  const { students, getStudents } = studentContext;
  const { currentCampaign, getCurrentCampaign } = campaignContext;
  const [filteredStudents, setFilteredStudents] = useState(students);
  const paperClasses = usePaperStyles();
  useEffect(() => {
    getStudents();
    getCurrentCampaign();
    // eslint-disable-next-line
  }, []);

  function produceChoicesData(studentList, limit, type, year) {
    let arr = [];
    for (let i = 0; i < limit; i++) {
      let curr = studentList
        .filter((student) => student.selectedTracks.length > 0)
        .filter((student) => student.academicYear === year)
        .map((student) =>
          type === 'tracks'
            ? parseInt(student.selectedTracks[i].id)
            : parseInt(student.selectedUnits[i].id)
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
  function filterStudentsByYear(year) {
    const filteredByYear = [...students];
    return filteredByYear.filter((student) => student.academicYear === year);
  }

  function produceDataSets(choicesList) {
    let label = 1;
    return choicesList.map((tc) => ({
      label: `#${label++} Choices`,
      data: tc,
      backgroundColor: randomColor(),
      borderWidth: 2,
    }));
  }

  /*   students.forEach((student) => {
    student.selectedTracks.forEach(function callback(value, index) {
      console.log(
        `student name: ${student.firstName} ${student.lastName}, track id: ${value.id}, track position: ${index}`
      );
    });
  }); */

  function getNumberOfStudentsSubmitted() {
    let count = 0;
    filterStudentsByYear(currentCampaign.academicYear).forEach(
      (student) => student.selectedTracks.length > 0 && (count += 1)
    );
    return count;
  }

  function getUnsubmittedStudents() {
    return filterStudentsByYear(currentCampaign.academicYear).filter(
      (student) => student.selectedTracks.length < 1
    );
  }
  return (
    <div className={`${paperClasses.root} decisionReportContainer`}>
      <Paper className='decisionReport' elevation={3}>
        <h2>This Is Your Decision Report!</h2>
        <br />
        <h4>
          Number of students who have already submitted preferences:{' '}
          {getNumberOfStudentsSubmitted()} out of{' '}
          {filterStudentsByYear(currentCampaign.academicYear).length}
        </h4>
        <br />

        <h4>
          Students who have not submitted yet:{' '}
          {getUnsubmittedStudents().map((student) => (
            <span>
              {student.firstName} {student.lastName},{' '}
            </span>
          ))}
        </h4>
        <br />
        <ChartPanel
          minCreditCount={filterStudentsByCreditCount}
          datasets={produceDataSets(
            produceChoicesData(
              filteredStudents,
              currentCampaign && currentCampaign.tracks.length,
              'tracks',
              currentCampaign.academicYear
            )
          )}
          elements={
            currentCampaign.tracks /* currentCampaign && currentCampaign.tracks */
          }
          title={'Tracks'}
        />
        <br />
        <br />
        <ChartPanel
          minCreditCount={filterStudentsByCreditCount}
          datasets={produceDataSets(
            produceChoicesData(
              filteredStudents,
              currentCampaign && currentCampaign.units.length,
              'units',
              currentCampaign.academicYear
            )
          )}
          elements={
            currentCampaign.units /* currentCampaign &&  currentCampaign.units */
          }
          title={'Units'}
        />
        <br />
      </Paper>
    </div>
  );
}
