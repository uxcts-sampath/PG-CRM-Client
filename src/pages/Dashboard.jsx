import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useRoutes, Route, Outlet } from 'react-router-dom';
import Home from '../components/Home';
import PgSetup from './PgSetup';
import PgUsers from './pgusers/PgUsers';
import Profile from '../components/Profile';
import Department from './department';
import UpcomingFeeList from './pgusers/UpcomingFeeList';
import PgStaff from './pgstaff/pgStaff'
import Income from '../pages/finance/Income';
import Expenses from '../pages/finance/Expenses';
import AddUsers from './pgusers/AddUsers';
import AddStaff from './pgstaff/AddStaff';
import MemberShip from './MemberShip';
import CalendarPage from './CalendarPage';

const Dashboard = () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: 'pgsetup', element: <PgSetup /> },
    {path:'pgusers', element:<PgUsers/>},
    {path:'profile',element:<Profile/>},
    {path:'membership', element:<MemberShip/>},
    {path:'department',element:<Department/>},
    {path:'upcomingfeelist',element:<UpcomingFeeList/>},
    {path:'pgstaff', element:<PgStaff/>},
    {path:'incomes',element:<Income/>},
    {path:'expenses',element:<Expenses/>},
    {path:'pgusers/addusers',element:<AddUsers/>},
    {path:'pgstaff/addstaff', element:<AddStaff/>},
    {path:'calender', element:<CalendarPage/>}
  ];

  const element = useRoutes(routes);

  return (
    <>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Outlet />
              {element}
              {/* <Footer /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
