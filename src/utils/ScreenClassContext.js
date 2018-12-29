import React, { Component } from 'react';
import { breakpoints } from './breakpoints';
export const ScreenClassContext = React.createContext('xl');

/** Helper Methods */
export const isXl = screenClass => screenClass === 'xl';
export const isLg = screenClass => screenClass === 'lg';
export const isMd = screenClass => screenClass === 'md';
export const isSm = screenClass => screenClass === 'sm';
export const isXs = screenClass => screenClass === 'xs';

export const isLessThanXl = screenClass =>
  ['sm', 'md', 'lg'].includes(screenClass);
export const isLessThanLg = screenClass =>
  ['xs', 'sm', 'md'].includes(screenClass);
export const isLessThanMd = screenClass => ['xs', 'sm'].includes(screenClass);
export const isLessThanSm = screenClass => ['xs'].includes(screenClass);

const getViewPort = () => {
  if (typeof window !== 'undefined' && window.innerWidth) {
    return window.innerWidth;
  }
  return null;
};

const getScreenClass = () => {
  let screenClass = 'xl';

  const viewport = getViewPort();
  if (viewport) {
    screenClass = 'xs';
    if (breakpoints[0] && viewport >= breakpoints[0]) screenClass = 'sm';
    if (breakpoints[1] && viewport >= breakpoints[1]) screenClass = 'md';
    if (breakpoints[2] && viewport >= breakpoints[2]) screenClass = 'lg';
    if (breakpoints[3] && viewport >= breakpoints[3]) screenClass = 'xl';
  }

  return screenClass;
};

export default class ScreenClassProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateScreenClass: 'xl',
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    const { stateScreenClass } = this.state;
    const screenClass = getScreenClass();
    if (stateScreenClass !== screenClass) {
      this.setState({ stateScreenClass: screenClass });
    }
  }

  render() {
    const { children } = this.props;
    const { stateScreenClass } = this.state;
    return (
      <ScreenClassContext.Provider value={stateScreenClass}>
        {children}
      </ScreenClassContext.Provider>
    );
  }
}
