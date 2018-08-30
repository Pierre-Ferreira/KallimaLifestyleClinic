import React from 'react';
import InlineCss from 'react-inline-css';
// import { Col, Grid, Row, ControlLabel } from 'react-bootstrap';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from 'victory';
import moment from 'moment/moment';
// import './ClientWeightChartComp.less';

const ClientWeightInfoChartEmailTemplate = (props) => {
  let minWeight = 10000;
  const chartData = props.weightWeeklyEntriesArr.map((x) => {
    // Check which weight is the smallest weight.
    minWeight = (Number(x.weight) < Number(minWeight)) ? Number(x.weight) : Number(minWeight);
    return {
      week: Number(x.week),
      weight: Number(x.weight),
    };
  });
  const tickValuesX = props.weightWeeklyEntriesArr.map(x => (
    Number(x.week)
  ));

  return (
    <InlineCss stylesheet={`
      .Document {
        font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
      }

      @media print {
        .underline {
          text-decoration: underline;
        }
        .center-item {
          margin: auto auto;
        }
        table.redTable {
          border: 2px solid #A40808;
          background-color: #EBDFC8;
          width: 100%;
          text-align: center;
          border-collapse: collapse;
          margin: auto auto;
          max-width: 90%;
        }
        table.redTable td, table.redTable th {
          border: 2px solid #AAAAAA;
          padding: 3px 2px;
        }
        table.redTable tbody td {
          font-size: 13px;
        }
        table.redTable tr:nth-child(even) {
          background: #F5C8BF;
        }
        table.redTable thead {
          background: #A40808;
        }
        table.redTable thead th {
          font-size: 12px;
          font-weight: bold;
          color: #FFFFFF;
          text-align: center;
          border-left: 2px solid #A40808;
        }
        table.redTable thead th:first-child {
          border-left: none;
        }

        table.redTable tfoot {
          font-size: 13px;
          font-weight: bold;
          color: #FFFFFF;
          background: #A40808;
        }
        table.redTable tfoot td {
          font-size: 13px;
        }
        table.redTable tfoot .links {
          text-align: right;
        }
        table.redTable tfoot .links a{
          display: inline-block;
          background: #FFFFFF;
          color: #A40808;
          padding: 2px 8px;
          border-radius: 5px;
        }
        .client-weight-chart-comp {
          background-color: #EEE7DB;
          text-align: center;
          border-collapse: collapse;
          margin: 20px auto;
          max-width: 90%;
        }
        .footer-spacing {
          height: 20px;
        }
      }
  `}>
      <div id="client-weight-info-chart-email-template">
        <table className="redTable">
          <thead>
            <tr>
              <th>Week</th>
              <th>Date</th>
              <th>Weight</th>
              <th>Chest</th>
              <th>Middle</th>
              <th>Bum</th>
              <th>Leg(U)</th>
              <th>Leg(L)</th>
              <th>Arm</th>
            </tr>
          </thead>
          <tbody>
            {props.weightWeeklyEntriesArr.map((entry) => {
              return (
                <tr key={entry.week}>
                  <td>{entry.week}.</td>
                  <td>{moment(entry.date).format('DD-MM-YYYY')}</td>
                  <td>{entry.weight || '-'}</td>
                  <td>{entry.chest || '-'}</td>
                  <td>{entry.middle || '-'}</td>
                  <td>{entry.bum || '-'}</td>
                  <td>{entry.legUp || '-'}</td>
                  <td>{entry.legLow || '-'}</td>
                  <td>{entry.arm || '-'}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
        <div className="client-weight-chart-comp">
          <VictoryChart
            theme={VictoryTheme.material}
            minDomain={{ y: minWeight - 2 }}
            width={700}
            height={400}
            style={{
              parent: {
                border: '2px solid #ccc',
                background: '#EBDFC8',
                maxHeight: '300px',
              },
            }}
          >
            <VictoryLine
              style={{
                data: { stroke: 'red' },
                // parent: { border: '1px solid #ccc' },
              }}
              data={chartData}
              y="weight"
              x="week"
            />
            <VictoryScatter
              style={{ data: { fill: '#c43a31' } }}
              size={4}
              data={chartData}
              labels={datum => datum.weight}
              y="weight"
              x="week"
            />
            <VictoryAxis
              label="Weeks"
              tickValues={tickValuesX}
              style={{ axisLabel: { fontSize: 20, padding: 30 } }}
            />
            <VictoryAxis
              dependentAxis
              label="Weight"
              style={{ axisLabel: { fontSize: 20, padding: 30 } }}
            />
          </VictoryChart>
        </div>
        {/* <div className="footer-spacing"></div> */}
      </div>
    </InlineCss>
  );
};

ClientWeightInfoChartEmailTemplate.propTypes = {
  // props: React.propTypes.shape.isRequired,
  // clientWeightInfoArr: React.propTypes.arrayOf.isRequired,
};

export default ClientWeightInfoChartEmailTemplate;
