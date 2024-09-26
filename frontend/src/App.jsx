import React from 'react';
import './App.css'; 
import { BrowserRouter as Router } from 'react-router-dom'; 
import AppRouter from './routes/AppRouter';
import AppLayout from './components/AppLayout';

function App() {
  return (
    <Router>
       <AppLayout>
      <AppRouter />
      </AppLayout>

    </Router>
  );
};

export default App;
