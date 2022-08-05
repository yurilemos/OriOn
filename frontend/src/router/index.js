import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from '../pages/index';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Index />} />
      </Routes>
    </BrowserRouter>
  );
};
