import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from '../pages/index/index';
import { Registro } from '../pages/register/index';
import { Login } from '../pages/login/index';
import { Home } from '../pages/home/index';
import Wrapper from '../components/wrapper.js';
import { Discussao } from '../pages/discussao';
import { Assunto } from '../pages/assunto';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Index />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/registro" exact element={<Registro />} />
        <Route
          path="/home"
          exact
          element={
            <Wrapper>
              <Home />
            </Wrapper>
          }
        />
        <Route
          path="/discussao/:discussionId"
          exact
          element={
            <Wrapper>
              <Discussao />
            </Wrapper>
          }
        />
        <Route
          path="/assunto/:assuntoId"
          exact
          element={
            <Wrapper>
              <Assunto />
            </Wrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
