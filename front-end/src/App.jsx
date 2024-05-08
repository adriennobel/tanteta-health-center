import { useState } from 'react';
import HomePage from './pages/home/HomePage';
import MainLayout from './layouts/main/MainLayout';
import './App.css';

function App() {

  return (
    <>
      <MainLayout><HomePage /></MainLayout>
    </>
  )
}

export default App
