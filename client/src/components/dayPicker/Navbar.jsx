/* --------------------------------- NAV_BAR --------------------------------- */
// http://react-day-picker.js.org/examples/elements-navbar
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/button/Buttons';
import { JDMonthTextChanger } from '../../utils/utils';

const Navbar = ({
  nextMonth, previousMonth, onPreviousClick, onNextClick, className, localeUtils,
}) => {
  const months = localeUtils.getMonths();
  const prev = months[previousMonth.getMonth()];
  const next = months[nextMonth.getMonth()];

  return (
    <div className={className}>
      <Button
        label={JDMonthTextChanger(prev)}
        icon="arrow_left"
        mode="flat"
        float="left"
        iconClasses={['JDbtn__icon--left']}
        onClick={() => onPreviousClick()}
      />
      <Button
        label={JDMonthTextChanger(next)}
        icon="arrow_right"
        mode="flat"
        float="right"
        onClick={() => onNextClick()}
      />
    </div>
  );
};

Navbar.propTypes = {
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  nextMonth: PropTypes.instanceOf(Date),
  previousMonth: PropTypes.instanceOf(Date),
  className: PropTypes.string,
  localeUtils: PropTypes.object,
};

Navbar.defaultProps = {
  onPreviousClick: () => {},
  onNextClick: () => {},
  nextMonth: new Date(),
  previousMonth: new Date(),
  className: '',
  localeUtils: {},
};

export default Navbar;
