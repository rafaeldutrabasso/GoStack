import React, {useState} from "react";
import Header from "./components/Header";
import './App.css';

import backgroundImage from './assets/background.jpg';

function App() {
 const [projects, setProjects] = useState(['Desemvolvimento de app', 'Front-end web']);
// useState retorna um array com 2 posições
//1. Variavel com seu valor inicial 
//2. Função para atualizarmos este valor  

function handleAddProject() {

 setProjects([...projects,`Novo projeto ${Date.now()}`]);
 console.log(projects);
} 
 
 return (
  <>
  
  <Header title="Projects"/> 
  
  <img  src = {backgroundImage} />
  
  <ul>
   {projects.map(project => <li key={project}>{project}</li>)}   
  </ul>
  
  <button type="button" onClick={handleAddProject}>Adicionar Projeto </button>
  
  </>
  );
}

export default App;