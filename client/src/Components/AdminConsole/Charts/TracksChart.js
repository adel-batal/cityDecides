import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function TracksChart({
  trackChoices,
}) {
  return (
    <div>
      <Bar
        data={{
          labels: ['General', 'Internet Computing', 'Business Infromatics'],
          datasets: [
            {
              label: 'First choices of students',
              data: [
                  //the first wrapping array notation is for getting the heirarchy (first, second, or third choice)
                  //the second one is where it is in the order of choices
                  //the third wrapped lowest level array is just getting the frequency from pair of map entries
                trackChoices[0][0][1],
                trackChoices[0][1][1],
                trackChoices[0][2][1],
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 99, 132, 0.3)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
            {
              label: 'Second choices of students',
              data: [
                trackChoices[1][0][1],
                trackChoices[1][1][1],
                trackChoices[1][2][1],
              ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(54, 162, 235, 0.3)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            },
            {
              label: 'Third choices of students',
              data: [
                trackChoices[2][0][1],
                trackChoices[2][1][1],
                trackChoices[2][2][1],
              ],
              backgroundColor: [
                'rgba(255, 206, 86, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(255, 206, 86, 0.3)',
              ],
              borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1,
            },
          ],
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
