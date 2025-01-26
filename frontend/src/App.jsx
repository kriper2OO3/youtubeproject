import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import VideoPage from "./pages/VideoPage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import VideoList from "./pages/VideoList";
import YourVideosPage from './pages/YourVideosPage';
import NewVideoPage from './pages/NewVideoPage';
import Sidebar from "./components/Sidebar";
import Header from "./components/Header"
import {observer} from "mobx-react-lite"

const App = observer(() => {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/video/:videoId' element={<VideoPage />}></Route>
                    <Route path='/videos' element={<VideoList />}></Route>
                    <Route path='/yourvideos' element={<YourVideosPage />}></Route>
                    <Route path='/newvideo' element={<NewVideoPage />}></Route>
                    <Route path='/register' element={<Registration />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
})

export default App