import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/edit/:id" element={<TodoListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
