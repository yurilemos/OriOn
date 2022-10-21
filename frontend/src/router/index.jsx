import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Index } from '../pages/index/index';
import { Registro } from '../pages/register/index';
import { Login } from '../pages/login/index';
import { Home } from '../pages/home/index';
import Wrapper from '../components/wrapper.js';
import { Discussao } from '../pages/discussao';
import { Assunto } from '../pages/assunto';
import { MeusGrupos } from '../pages/meusGrupos';
import { GruposArquivados } from '../pages/gruposArquivados';
import { Perfil } from '../pages/perfil';

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
        <Route
          path="/meus-grupos/:visibilidade"
          exact
          element={
            <Wrapper>
              <MeusGrupos />
            </Wrapper>
          }
        />
        <Route
          path="/meus-grupos-arquivados/:visibilidade"
          exact
          element={
            <Wrapper>
              <GruposArquivados />
            </Wrapper>
          }
        />
        <Route
          path="/perfil"
          exact
          element={
            <Wrapper>
              <Perfil />
            </Wrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
