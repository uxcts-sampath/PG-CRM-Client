import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import { useRoutes, Route, Outlet } from 'react-router-dom';
import Home from '../components/Home';
import PgSetup from './PgSetup';
import PgUsers from './pgusers/PgUsers';
import Profile from '../components/Profile';
import Billing from './Billing';
import Department from './department';
import UpcomingFeeList from './pgusers/UpcomingFeeList';
import Staff from './Staff';
import Income from '../pages/finance/Income';
import Expenses from '../pages/finance/Expenses';
import AddUsers from './pgusers/AddUsers';

const Dashboard = () => {
  const routes = [
    { path: '/', element: <Home /> },
    { path: 'pgsetup', element: <PgSetup /> },
    {path:'pgusers', element:<PgUsers/>},
    {path:'profile',element:<Profile/>},
    {path:'billing', element:<Billing/>},
    {path:'department',element:<Department/>},
    {path:'upcomingfeelist',element:<UpcomingFeeList/>},
    {path:'staff', element:<Staff/>},
    {path:'incomes',element:<Income/>},
    {path:'expenses',element:<Expenses/>},
    {path:'pgusers/addusers',element:<AddUsers/>}
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
