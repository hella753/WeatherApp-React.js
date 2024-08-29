import { BrowserRouter, Route, Routes } from "react-router-dom";
import { WeatherProvider } from "./contexts/WeatherContext";
import { Suspense, lazy } from "react";
// import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const WeatherToday = lazy(() => import("./pages/WeatherToday"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const WeatherThisWeek = lazy(() => import("./pages/WeatherThisWeek"));

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter basename="/">
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            <Route path="/week" element={<WeatherThisWeek />} />
            <Route path="/today" element={<WeatherToday />} />
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
