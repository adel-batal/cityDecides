import React from 'react';
import {useChartHeaderStyles } from '../../Hooks/StylesHook';
import { ButtonGroup, Button } from '@material-ui/core';
import BarChart from './Charts/BarChart';

export default function ChartPanel({minCreditCount, datasets, elements, title}) {
  const chartHeaderClasses = useChartHeaderStyles();
  return (
    <>
      <div
        className={`${chartHeaderClasses.chartHeader} ${chartHeaderClasses.mb2}`}
      >
        <h2>{title}</h2>
        <div className={chartHeaderClasses.chartHeader}>
          <h3 className={chartHeaderClasses.mr2}>Credit Count:</h3>
          <ButtonGroup
            color='primary'
            aria-label='outlined primary button group'
          >
            <Button onClick={() => minCreditCount(50)}>
              {'50 <='}
            </Button>
            <Button onClick={() => minCreditCount(70)}>
              {'70 <='}
            </Button>
            <Button onClick={() => minCreditCount(100)}>
              {'100 <='}
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <BarChart
        datasets={datasets}
        elements={elements}
      />
    </>
  );
}

