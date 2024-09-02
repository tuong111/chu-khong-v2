import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Dicionary, NotFound, DocumentEditor } from './pages'
import { HeaderMenu } from './components';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <HeaderMenu />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dictionary" element={<Dicionary />} />
                <Route path="/documentEditor" element={<DocumentEditor />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
