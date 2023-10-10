import styles from './App.module.scss';
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dasboard';
import api from '../../utils/api';

import { Layout } from '../Layout/Layout';
import SignInPage from '../../pages/SignInPage/SignInPage';
import ForecastPage from '../../pages/ForecastPage/ForecastPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import InternetErrorPage from '../../pages/InternetErrorPage/InternetErrorPage';
import DataErrorPage from '../../pages/DataErrorPage/DataErrorPage';
import ExportErrorPage from '../../pages/ExportErrorPage/ExportErrorPage';
import PrintErrorPage from '../../pages/PrintErrorPage/PrintErrorPage';
import ForecastChartPage from '../../pages/ForecastChartPage/ForecastChartPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  useEffect(() => {
    handleGetSalesData();
    handleGetForecastData();
    handleGetStoresData();
    handleGetCategoriesData();
  }, []);

  const handleGetSalesData = () => {
    const salesData = api.getSalesData();
    console.log(salesData, 'salesData');
  };

  const handleGetForecastData = () => {
    const foreCastData = api.forecastData();
    console.log(foreCastData, 'foreCastData');
  };

  const handleGetStoresData = () => {
    const storesData = api.storesData();
    console.log(storesData, 'storesData');
  };

  const handleGetCategoriesData = () => {
    const categoriesData = api.categoriesData();
    console.log(categoriesData, 'categoriesData');
  };

  return (
    <div className={styles.page}>
      <Routes>
        <Route
          path='/'
          element={<Layout />}>
          <Route
            index
            element={<ProtectedRoute children={<Dashboard />} />}
          />
          <Route
            path='/forecast'
            element={<ProtectedRoute children={<ForecastPage />} />}
          />
          <Route
            path='/forecast/chart'
            element={<ProtectedRoute children={<ForecastChartPage />} />}
          />

          <Route
            path='/signin'
            element={<SignInPage />}
          />

          <Route
            path='*'
            element={<NotFoundPage />}
          />
          {/** Тестовые страницы с ошибками */}
          <Route
            path='internet'
            element={<InternetErrorPage />}
          />
          <Route
            path='data'
            element={<DataErrorPage />}
          />
          <Route
            path='print'
            element={<PrintErrorPage />}
          />
          <Route
            path='export'
            element={<ExportErrorPage />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
