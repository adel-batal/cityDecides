import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function TracksChart({ datasets, elements }) {
  return (
    <div>
      <Bar
        data={{
          labels: elements.map(element => (element.name)),
          datasets: datasets,
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
