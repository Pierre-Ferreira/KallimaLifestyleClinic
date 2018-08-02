import React, { Component } from 'react';
// import { Col, Popover, Tooltip, Button, Modal, OverlayTrigger, Alert } from 'react-bootstrap';
// import moment from 'moment/moment';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryScatter,
  VictoryAxis,
} from 'victory';
import './ClientWeightChartComp.less';

export default class ClientWeightChartComp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  render() {
    console.log('this.props.clientWeightInfoArr:', this.props.clientWeightInfoArr);
    const chartData = this.props.clientWeightInfoArr.map(x => ({
      week: Number(x.week),
      weight: Number(x.weight),
    }));
    const tickValuesX = this.props.clientWeightInfoArr.map(x => (
      Number(x.week)
    ));
    console.log('chartData:', chartData);
    return (
      <div id="client-weight-chart-comp">
        {/* <div className="top-tier-area">
          <div className="client-details">{this.props.clientName} {this.props.clientSurname}</div>
        </div> */}
        <div className="lower-tier-area">
          <VictoryChart
            theme={VictoryTheme.material}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            minDomain={{ y: 0 }}
            width={700}
            height={400}
          >
            <VictoryLine
              style={{
                data: { stroke: '#000000' },
                parent: { border: '1px solid #ccc' },
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
      </div>
    );
  }
}
