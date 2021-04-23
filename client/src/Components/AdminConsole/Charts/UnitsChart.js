import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function UnitsChart({ unitChoices }) {
    
  return (
    <div>
      <Bar
        data={{
          labels: [
            'Software Engineering',
            'Data Structures and Algorithms',
            'Web Development',
            'Operating Systems',
            'Network Security',
            'Object Oriented Programming',
          ],
          datasets: [
            {
              label: 'First choices of students',
              data: [
                //the first wrapping array notation is for getting the heirarchy (first, second, or third choice)
                //the second one is where it is in the order of choices
                //the third wrapped lowest level array is just getting the frequency from pair of map entries
                unitChoices[0][0][1],
                unitChoices[0][1][1],
                unitChoices[0][2][1],
                unitChoices[0][3][1],
                unitChoices[0][4][1],
                unitChoices[0][5][1],
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 99, 132, 0.3)',
                'rgba(255, 99, 132, 0.3)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1,
            },
            {
              label: 'Second choices of students',
              data: [
                unitChoices[1][0][1],
                unitChoices[1][1][1],
                unitChoices[1][2][1],
                unitChoices[1][3][1],
                unitChoices[1][4][1],
                0,//unitChoices[1][5][1],
              ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(54, 162, 235, 0.3)',
                'rgba(54, 162, 235, 0.3)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            },
            {
              label: 'Third choices of students',
              data: [
                unitChoices[2][0][1],
                unitChoices[2][1][1],
                unitChoices[2][2][1],
                unitChoices[2][3][1],
                0,//unitChoices[2][4][1],
                0,//unitChoices[2][5][1],
              ],
              backgroundColor: [
                'rgba(255, 206, 86, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(255, 206, 86, 0.3)',
                'rgba(255, 206, 86, 0.3)',
              ],
              borderColor: [
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1,
            },
            {
              label: 'Fourth choices of students',
              data: [
                //the first wrapping array notation is for getting the heirarchy (first, second, or third choice)
                //the second one is where it is in the order of choices
                //the third wrapped lowest level array is just getting the frequency from pair of map entries
                unitChoices[3][0][1],
                unitChoices[3][1][1],
                unitChoices[3][2][1],
                unitChoices[3][3][1],
                unitChoices[3][4][1],
                0,//unitChoices[3][5][1],
              ],
              backgroundColor: [
                'rgba(254, 45, 254, 0.3)',
                'rgba(254, 45, 254, 0.3)',
                'rgba(254, 45, 254, 0.3)',
                'rgba(254, 45, 254, 0.3)',
                'rgba(254, 45, 254, 0.3)',
                'rgba(254, 45, 254, 0.3)',
              ],
              borderColor: [
                'rgba(254, 45, 254, 1)',
                'rgba(254, 45, 254, 1)',
                'rgba(254, 45, 254, 1)',
                'rgba(254, 45, 254, 1)',
                'rgba(254, 45, 254, 1)',
                'rgba(254, 45, 254, 1)',
              ],
              borderWidth: 1,
            },
            {
              label: 'Fifth choices of students',
              data: [
                unitChoices[4][0][1],
                unitChoices[4][1][1],
                unitChoices[4][2][1],
                unitChoices[4][3][1],
                0,//unitChoices[4][4][1],
                0,//unitChoices[4][5][1],
              ],
              backgroundColor: [
                'rgba(8, 255, 28, 0.3)',
                'rgba(8, 255, 28, 0.3)',
                'rgba(8, 255, 28, 0.3)',
                'rgba(8, 255, 28, 0.3)',
                'rgba(8, 255, 28, 0.3)',
                'rgba(8, 255, 28, 0.3)',
              ],
              borderColor: [
                'rgba(8, 255, 28, 1)',
                'rgba(8, 255, 28, 1)',
                'rgba(8, 255, 28, 1)',
                'rgba(8, 255, 28, 1)',
                'rgba(8, 255, 28, 1)',
                'rgba(8, 255, 28, 1)',
              ],
              borderWidth: 1,
            },
            {
              label: 'Sixth choices of students',
              data: [
                unitChoices[5][0][1],
                unitChoices[5][1][1],
                unitChoices[5][2][1],
                unitChoices[5][3][1],
                unitChoices[5][4][1],
                unitChoices[5][5][1],
              ],
              backgroundColor: [
                'rgba(228, 102, 28, 0.3)',
                'rgba(228, 102, 28, 0.3)',
                'rgba(228, 102, 28, 0.3)',
                'rgba(228, 102, 28, 0.3)',
                'rgba(228, 102, 28, 0.3)',
                'rgba(228, 102, 28, 0.3)',
              ],
              borderColor: [
                'rgba(228, 102, 28, 1)',
                'rgba(228, 102, 28, 1)',
                'rgba(228, 102, 28, 1)',
                'rgba(228, 102, 28, 1)',
                'rgba(228, 102, 28, 1)',
                'rgba(228, 102, 28, 1)',
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
