import React from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';

export default class Timer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTimestamp: 0,
      myTime: 55,
      isTimerOn: false
    };
    this.startCounter = this.startCounter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.tick = this.tick.bind(this);
    this.displayTimer = this.displayTimer.bind(this);
  }

  componentDidMount() {
    // fetch('/api/get-timer')
    // .then((response) => {
    //   console.log(response);
    //   // console.log(response.json());
    //   return response.json();
    // })
    // .then((data) => {
    //   console.log(data[0].time);
    //   this.setState({ myTime: data[0].time })
    // });
    window.addEventListener("beforeunload", this.onUnload);
  }

  onUnload(event) { 
    fetch('/api/get-timer2')
    .then((response) => {
      console.log(response);
      // console.log(response.json());
      return response.json();
    })
    .then((data) => {
      console.log(data[0].time);
      // this.setState({ myTime: data[0].time })
    });
  }
  
  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload)
  }
  
  componentWillUnmount() {
     window.removeEventListener("beforeunload", this.onUnload)
  }

  tick() {
    console.log(this.state.myTime);
    this.setState(prevState => ({
      myTime: (new Date().getTime() - this.state.currentTimestamp) / 1000
    }));
  }

  startCounter() {
    if (this.state.isTimerOn) {
      clearInterval(this.interval);
      this.setState({
        isTimerOn: false 
      });
    } else {
      this.setState({
        currentTimestamp: new Date().getTime() - (this.state.myTime * 1000),
        isTimerOn: true 
      })
      this.interval = setInterval(() => this.tick(), 1000);
    }
  }

  resetCounter() {
    clearInterval(this.interval);
      this.setState({
        isTimerOn: false,
        myTime: 0,
        currentTimestamp: 0
      })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTime(number) {
    if (number <= 9) {
      return `${0}${number}`
    }
    return number;
  }

  displayTimer() {
    const { myTime } = this.state;
    const hours = myTime >= 3600 ? this.formatTime(Math.floor(myTime / 3600)) : '00';
    const minutes = myTime >= 60 ? this.formatTime(Math.floor((myTime % 3600) / 60)) : '00';
    const seconds = this.formatTime(Math.floor((myTime % 60)));
    return `${hours}:${minutes}:${seconds}`;
  }

  render() {
    return (
    <div style={{color: "#333", width: '300px', margin: 'auto', marginTop: '15px'}}>
      <Card>
        <CardBody>
          <CardTitle><span style={{color: "#333"}}>Stopwatch</span></CardTitle>
          <h2>{this.displayTimer()}</h2>
          <Button size="sm" outline color="primary" onClick={this.startCounter}>Start/Stop</Button>
          <Button size="sm" outline color="danger" onClick={this.resetCounter}>Reset</Button>
          <Button size="sm" outline color="info" >Edit</Button>
        </CardBody>
      </Card>
    </div>
    );
  }
}