import React from 'react';
import InlineCss from 'react-inline-css';
import { Col, Grid, Row, ControlLabel } from 'react-bootstrap';
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
  console.log('props.weightWeeklyEntriesArr:', props);
  let minWeight = 10000;
  const chartData = props.weightWeeklyEntriesArr.map((x) => {
    // Check which weight is the smallest weight.
    minWeight = (Number(x.weight) < Number(minWeight)) ? Number(x.weight) : Number(minWeight);
    return {
      week: Number(x.week),
      weight: Number(x.weight),
    };
  });
  console.log('minWeight:', minWeight);
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
        #client-weight-info-chart-email-template{
          background-color: #EEE7DB;
        }
        table.redTable {
          border: 2px solid #A40808;
          background-color: #EEE7DB;
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
          height: 50px;
        }
      }
    `}>
    <div id="client-weight-info-chart-email-template">
      <h1 className="underline center-item">Kallima Weight Info</h1>
      <h2 className="center-item">{moment(new Date).format('DD-MM-YYYY')}</h2>
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
        {/* <tfoot>
          <tr>
            <td colspan="9">
              <div className="links"><a href="#">&laquo;</a> <a className="active" href="#">1</a> <a href="#">2</a> <a href="#">3</a> <a href="#">4</a> <a href="#">&raquo;</a></div>
            </td>
          </tr>
        </tfoot> */}
        <tbody>
          {props.weightWeeklyEntriesArr.map((entry, i) => {
            console.log('entry.week:', entry.week)
            console.log('entry.weight:', entry.weight)
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
        <h1 className="underline center-item">Weight Graph</h1>
        <div></div>
        <VictoryChart
          theme={VictoryTheme.material}
          minDomain={{ y: minWeight - 2 }}
          width={700}
          height={400}
          style={{
            parent: {
              border: "2px solid #ccc",
              // padding: "0px",
              // margin: "0px",
              background: "#EBDFC8",
              maxHeight: "300px",
            }
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
      <div className="footer-spacing"></div>
    </div>
    </InlineCss>
  );
};

ClientWeightInfoChartEmailTemplate.propTypes = {
  // props: React.propTypes.shape.isRequired,
  // clientWeightInfoArr: React.propTypes.arrayOf.isRequired,
};

export default ClientWeightInfoChartEmailTemplate;
