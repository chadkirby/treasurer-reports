import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import TitleSlide from './slides/TitleSlide';
import ExecutiveSummary from './slides/ExecutiveSummary';
import FinancialPosition from './slides/FinancialPosition';
import IncomeAnalysis from './slides/IncomeAnalysis';
import SpendingAnalysis from './slides/SpendingAnalysis';
import ReserveStudy from './slides/ReserveStudy';
import Methodology from './slides/Methodology';
import './index.css';

function App() {
  // Use HashRouter for GitHub Pages compatibility
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<TitleSlide />} />
          <Route path="executive-summary" element={<ExecutiveSummary />} />
          <Route path="financial-position" element={<FinancialPosition />} />
          <Route path="income" element={<IncomeAnalysis />} />
          <Route path="spending" element={<SpendingAnalysis />} />
          <Route path="reserves" element={<ReserveStudy />} />
          <Route path="methodology" element={<Methodology />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
