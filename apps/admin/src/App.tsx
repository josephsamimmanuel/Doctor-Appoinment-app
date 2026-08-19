import { BrowserRouter, Route, Routes } from 'react-router';

import { AdminLayout } from './components/layout/AdminLayout.js';
import { DashboardPage } from './pages/Dashboard/DashboardPage.js';
import { NotFoundPage } from './pages/NotFound/NotFoundPage.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
