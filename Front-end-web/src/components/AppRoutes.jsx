import { Routes, Route } from "react-router-dom"
import App from "../templates/App/App"
import Home from "../templates/Home/Home"

import ForgotPass from "../templates/Login/ForgotPass"
import Login from "../templates/Login/Login"

import Mensagem from "../templates/Mensagem/Mensagem"
import MensagemLer from "../templates/Mensagem/MensagemLer"

import Usuario from "../templates/Usuario/Usuario"
import UsuarioEditar from "../templates/Usuario/UsuarioEditar"
import UsuarioNovo from "../templates/Usuario/UsuarioNovo"
import UsuariosLista from "../templates/Usuario/UsuariosLista"

import Grafico from "../templates/Graph/Grafico"
import AddCardapio from "../templates/Cardapio/AddCardapio"
import AlterarCardapio from "../templates/Cardapio/AlterarCardapio"
import Cardapio from "../templates/Cardapio/Cardapio"
import { ThemeProvider } from "../contexts/ThemeContext"
import CardapioLista from "../templates/Cardapio/CardapioLista"
import MensagemLista from "../templates/Mensagem/MensagemLista"
import LoginNewPass from "../templates/Login/LoginNewPass"
import UsuarioPerfil from "../templates/Usuario/UsuarioPerfil"
import UsuarioAlterarSenha from "../templates/Usuario/UsuarioAlterarSenha"
import RotaProtegida from "./Acesso/RotaProtegida"
import SendMessage from "../templates/Mensagem/SendMessage"
import AddCategoria from "../templates/Cardapio/AddCategoria"
import AddPrato from "../templates/Cardapio/AddPratos"
import AddProduto from "../templates/Cardapio/AddProdutos"
import AlterarPrato from "../templates/Cardapio/AlterarPrato"
import PratoLista from "../templates/Cardapio/Pratos"


const AppRoutes = () => {
  return (
    <ThemeProvider>
      <div>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<RotaProtegida><Home /></RotaProtegida>} />

          <Route path="/login" element={<Login />} />
          <Route path="/newpass/:id" element={<LoginNewPass />}></Route>

          <Route path="/forgotpass" element={<ForgotPass />} />

          <Route path="/mensagem" element={<RotaProtegida><Mensagem /></RotaProtegida>} />
          <Route path="/mensagemler/:id" element={<RotaProtegida><MensagemLer /></RotaProtegida>} />
          <Route path="/mensagemlista" element={<RotaProtegida><MensagemLista /></RotaProtegida>} />
          <Route path="/sendmessage" element={<RotaProtegida><SendMessage /></RotaProtegida>} />


          <Route path="/usuario" element={<RotaProtegida><Usuario /></RotaProtegida>} />
          <Route path="/usuarioperfil/:id" element={<RotaProtegida><UsuarioPerfil /></RotaProtegida>} />
          <Route path="/usuarioalterarsenha/:id" element={<RotaProtegida><UsuarioAlterarSenha /></RotaProtegida>} />
          <Route path="/usuarioslista" element={<RotaProtegida><UsuariosLista /></RotaProtegida>} />
          <Route path="/usuarionovo" element={<RotaProtegida><UsuarioNovo /></RotaProtegida>} />
          <Route path="/usuarioeditar/:id" element={<RotaProtegida><UsuarioEditar /></RotaProtegida>} />

          <Route path="/grafico" element={<RotaProtegida><Grafico /></RotaProtegida>} />

          <Route path="/addcardapio" element={<RotaProtegida><AddCardapio /></RotaProtegida>} />
          <Route path="/addcategoria" element={<RotaProtegida>< AddCategoria /></RotaProtegida>} />
          <Route path="/addprato" element={<RotaProtegida>< AddPrato /></RotaProtegida>} />
          <Route path="/addproduto" element={<RotaProtegida>< AddProduto /></RotaProtegida>} />
          <Route path="/alterarprato/:id" element={<RotaProtegida>< AlterarPrato /></RotaProtegida>} />
          <Route path="/alterarcardapio/:id" element={<RotaProtegida><AlterarCardapio /></RotaProtegida>} />
          <Route path="/cardapio" element={<RotaProtegida><Cardapio /></RotaProtegida>} />
          <Route path="/cardapiolista" element={<RotaProtegida><CardapioLista /></RotaProtegida>} />
          <Route path="/pratolista" element={<RotaProtegida><PratoLista /></RotaProtegida>} />
        </Routes>

      </div>
    </ThemeProvider>
  )
}
export default AppRoutes