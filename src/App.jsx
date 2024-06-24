//import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import GlobalStyles from "./styles/GlobalStyles";
import Students from "./pages/Students";
import Account from "./pages/Account";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Classes from "./pages/Classes";
import Schedule from "./pages/Schedule";
import Teachers from "./pages/Teachers";
import Class from "./pages/Class";
import ProtectedRoute from "./ui/ProtectedRoute";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
            <Route index element={<Homepage />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/classes" element={<Classes/>} />
            <Route path="/classes/:classId" element={<Class/>} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />}/>
            <Route path="/schedule/:filter" element={<Schedule/>}/>
            <Route path="/courses" />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>

    </QueryClientProvider>


    </>
  );
}

export default App;
