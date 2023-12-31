import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { HouseRoutes } from '../modules/house/house.route';
import { BookingRoutes } from '../modules/booking/booking.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/houses',
    route: HouseRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
