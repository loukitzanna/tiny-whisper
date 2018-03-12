import React from 'react';
import { View, Text } from 'react-native';
import { Audio, LinearGradient } from 'expo';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import DevscreensButton from '../../../ignite/DevScreens/DevscreensButton.js';
import Colors from '../../Themes/Colors';
import FullButton from '../../Components/FullButton';

import styles from './TimerScreenStyles';
import src from '../../../'

// const MAX_POINTS = (60 * 25);
const MAX_POINTS = 5;
// const REST_TIMER = (60 * 5);
const REST_TIMER = 5;
const DEFAULT_STATE = {
  points: 0,
  minutes: 0,
  seconds: 0,
  inner: {
    points: 0,
    minutes: 0,
    seconds: 0,
  },
  useRestTimer: false,
  isTimerOn: false,
  isFinished: false,
};

class TimerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  componentWillMount() {
    // this.ping = new Sound('ping.wav', Sound.MAIN_BUNDLE, (error) => {});
    this.mountSound();
  }

  componentWillUnmount() {
    this.stopTimer();
    this.ping.unloadAsync();
    // this.ping.release();
  }

  mountSound = async () => {
    const source = require('../../assets/alert_ping.wav');
    // console.warn(source);
    const { sound, status } = await Audio.Sound.create(source);
    // console.warn(status);
    this.ping = sound;

    await this.ping.setVolumeAsync(1);
    console.log('set volume waaaaay up');
  }

  stopTimer = (timer) => {
    clearTimeout(timer);
  }

  handleStopTimers = (e) => {
    this.stopTimer(this.timer);
    this.stopTimer(this.innerTimer);
  }

  handlePlaySound = async () => {
    if (this.ping) {
      await this.ping.playFromPositionAsync(0);
    } else {
      console.warn('couldnt ping');
    }
  }

  startTimer = async (e) => {
    const { minutes, seconds } = this.state;
    const points = this.state.points + 1;
    if (this.state.points === MAX_POINTS) {
      this.stopTimer(this.timer);
      await this.ping.playFromPositionAsync(0);
      this.setState({
        useRestTimer: true,
      }, this.startInnerTimer)
    } else {
      this.timer = setTimeout(() => {
        this.setState({
          points,
          minutes: Math.floor(points / 60),
          seconds: (points % 60),
          isTimerOn: true,
        }, this.startTimer);
      }, 1000);
    }
  }

  startInnerTimer =  async () => {
    const { minutes, seconds } = this.state.inner;
    const points = this.state.inner.points + 1;
    if (this.state.inner.points === REST_TIMER) {
      this.stopTimer(this.innerTimer);
      await this.ping.playFromPositionAsync(0);
      this.setState({
        isFinished: true,
      });
    } else {
      this.innerTimer = setTimeout(() => {
        this.setState({
          inner: {
            points,
            minutes: Math.floor(points / 60),
            seconds: (points % 60),
          }
        }, this.startInnerTimer);
      }, 1000);
    }
  }

  resetTimer = () => {
    this.setState(DEFAULT_STATE);
  }

  renderText = () => {
    const { useRestTimer, isTimerOn, isFinished } = this.state;
    if (isFinished){
      return 'Great job! You did it!';
    } else if (isTimerOn && !useRestTimer) {
      return 'You got this!';
    } else if (isTimerOn && useRestTimer) {
      return 'Time to take a break :)';
    } else {
      return 'Let\'s get started!';
    }
  }

  render() {
    const { minutes, seconds, points, inner, useRestTimer, isTimerOn } = this.state;
    const fill = points / MAX_POINTS * 100;
    const innerFill = inner.points / REST_TIMER * 100;

    return (
      <View
        style={styles.container}
      >
        
        <AnimatedCircularProgress
          size={200}
          width={3}
          fill={fill}
          tintColor={Colors.violet}
          backgroundColor={Colors.blush}
          rotation={0}
        >
          {
            (fill) => (
              <AnimatedCircularProgress
                size={150}
                width={4}
                fill={innerFill}
                tintColor={Colors.lightClementine}
                backgroundColor={Colors.dawn}
                rotation={0}
              >
                {(innerFill) => {
                  if (fill === 100) {
                    return (
                      <Text style={styles.points}>
                        {inner.minutes}:{inner.seconds < 10 ? 0 : ''}{inner.seconds}
                      </Text>
                      );
                    } else {
                      return (
                        <Text style={styles.points}>
                          {minutes}:{seconds < 10 ? 0 : ''}{seconds}
                        </Text>
                        );
                  }
                }
                }
              </AnimatedCircularProgress>
            )
          }
        </AnimatedCircularProgress>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>{this.renderText()}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <FullButton
            onPress={this.startTimer}
            text={'Start Timer'}
          />
          <FullButton
            onPress={this.handleStopTimers}
            text={'Stop Timer'}
          />
          <FullButton
            onPress={this.resetTimer}
            text={'Reset Timer'}
          />
          <FullButton
            onPress={this.handlePlaySound}
            text={'Play Sound'}
          />
        </View>

      </View>
    );
  }
};

export default TimerScreen;
