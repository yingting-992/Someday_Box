import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; //npm install react-router react-router-dom
import { DreamProvider } from "./context/DreamContext"; // 提供夢想資料的 Context
import Navbar from "./components//Navbar/Navbar";
import HomePage from "./pages/HomePage";
import SomedayListPage from "./pages/SomedayListPage";
import DreamDetailPage from "./pages/DreamDetailPage";
import AddDreamPage from "./pages/AddDreamPage";
import GardenPage from "./pages/GardenPage";
import CompletedDreamsPage from "./pages/CompletedDreamsPage ";

function App() {
  return (
    <div className="App">
      <DreamProvider>  {/* 所有子元件都能透過 useContext 使用夢想資料 */}
        <Router>
          <Navbar/> {/* 導航列 */}
          <Routes>
            <Route path="/home" element={<HomePage />}/>{/* 首頁 */}
            <Route path="/someday" element={<SomedayListPage/>}/> {/* 夢想列表頁 */}
            <Route path="/dream/:id" element={<DreamDetailPage/>}/> {/* 夢想詳細頁, 顯示特定夢想 */}
            <Route path="/add" element={<AddDreamPage/>}/> 新增夢想頁
            <Route path="/completed" element={<CompletedDreamsPage/>}/> {/* 已完成的夢想頁 */}
            <Route path="/dream/:id" element={<DreamDetailPage />} />
            <Route path="/garden" element={<GardenPage/>}/>

            {/* <Route path="/mood" element={<MoodPage />} />
            <Route path="/garden" element={<GardenPage />} /> */}
            <Route path="*" element={<HomePage />} /> {/* fallback route */}
          </Routes>
        </Router>
      </DreamProvider>
    </div>
  );
}

export default App;
