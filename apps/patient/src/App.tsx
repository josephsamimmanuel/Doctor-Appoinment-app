import { BrowserRouter, Route, Routes } from 'react-router';

import { AppLayout } from './components/layout/AppLayout.js';
import { HomePage } from './pages/Home/HomePage.js';
import { NotFoundPage } from './pages/NotFound/NotFoundPage.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
