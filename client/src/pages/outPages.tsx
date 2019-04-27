import React, { Fragment } from 'react';
import DynamicImport from '../utils/DynamicImport';
import Preloader from '../atoms/preloader/Preloader';

export const Reservation = (props: any) => (
  <DynamicImport load={() => import('./outPages/reservation/Reservation')}>
    {(DNcompoent: any) => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const ReservationCheck = (props: any) => (
  <DynamicImport load={() => import('./outPages/checkReservation/CheckReservation')}>
    {(DNcompoent: any) => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const ReservationInfo = (props: any) => (
  <DynamicImport load={() => import('./outPages/infoReservation/InfoReservation')}>
    {(DNcompoent: any) => (DNcompoent === null ? <Preloader page /> : <DNcompoent {...props} />)}
  </DynamicImport>
);

export const temp = () => {};