import React, { useContext, useEffect, useState } from 'react';
import { Paper } from '@material-ui/core';
import { usePaperStyles } from '../../Hooks/StylesHook';
import StudentContext from '../../Context/Student/StudentContext';
import CampaignContext from '../../Context/Campaign/CampaignContext';
import ChartPanel from './ChartPanel';
import randomColor from '../../Utils/randomRgbColor';

export default function DecisionReport() {
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

  function producePreferenceData(studentList, limit, type, year) {
    // declare empty array
    let arr = [];
    //loop until the limit of elements (tracks or units)  
    for (let i = 0; i < limit; i++) {
      // In each loop create a new variable that has the student list to get
      // each student
      let curr = studentList
        // Filter out the students who have not submited prefrences yet
        .filter((student) => student.selectedTracks.length > 0)
        // Filter out the students who do not belong to the year put in the arguments
        .filter((student) => student.academicYear === year)
        // Map through each student
        .map((student) =>
        // If the argument type is tracks map through the tracks of the student
        // and get the id of each selection element
          type === 'tracks'
            ? parseInt(student.selectedTracks[i].id)
        // otherwise loops through units and do the same
            : parseInt(student.selectedUnits[i].id)
        )
        // create a map each time the loop loops once and insert the id of selections
        // as a key, and the times it was selected by students as a value
        .reduce((acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map());
        // if one of the tracks or units isn't chosen by any student in a certain
        // position, then add a map entry, set the key as the loop iterator
        // and the value as 0
        for (let j = 1; j <= limit; j++) {
          if (![...curr.keys()].includes(j)) {
            curr.set(j, 0);
          }
        }
      // Push the current entries in the array as an array and sort them
      arr.push([...curr.entries()].sort());
    }
    // Return an array of arrays of integers instead of array of arrays of pairs
    // by exluding the keys
    return arr.map((cs) => cs.map((c) => c[1]));
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
    let choiceNum = 1;
    return choicesList.map((c) => ({
      label: `#${choiceNum++} Choices`,
      data: c,
      backgroundColor: randomColor(),
      borderWidth: 2,
    }));
  }


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
            producePreferenceData(
              filteredStudents,
              currentCampaign && currentCampaign.tracks.length,
              'tracks',
              currentCampaign.academicYear
            )
          )}
          elements={
            currentCampaign.tracks 
          }
          title={'Tracks'}
        />
        <br />
        <br />
        <ChartPanel
          minCreditCount={filterStudentsByCreditCount}
          datasets={produceDataSets(
            producePreferenceData(
              filteredStudents,
              currentCampaign && currentCampaign.units.length,
              'units',
              currentCampaign.academicYear
            )
          )}
          elements={
            currentCampaign.units 
          }
          title={'Units'}
        />
        <br />
      </Paper>
    </div>
  );
}
