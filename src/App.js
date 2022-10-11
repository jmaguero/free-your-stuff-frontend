import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserWithStoredToken } from "./store/user/thunks";
import { Routes, Route } from "react-router-dom";
import { Navigation, MessageBox } from "./components";
import { Homepage, Login, SignUp, ProductPage, UserPage, CreateProductPage, ResultsPage } from "./pages"


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div>
      <Navigation />
      <MessageBox />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/post" element={<CreateProductPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/me" element={<UserPage />} />
        <Route path="/results/:searchTerm" element={<ResultsPage />} />
      </Routes>
    </div>
  );
}

export default App;