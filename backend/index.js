const express = require('express'); 
const app = express();

app.use(express.json());
const { uuid, isUuid } = require('uuidv4');

const projects = [];

function logRequests(request, response, next) {

  const{method, url} = request;
  const logLabel = `[${method.toUpperCase()}] ${url}`;  

  console.log(logLabel);
  return next();
}

function validateProjectId(request, response, next) {

 const { id } = request.params ;   

if(!isUuid(id)){

return response.status(400).json({ error: 'Invalid project Id.' });

}
return next();

}


app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {  // request guarda as informaçoes dos usuários
    
    const {title} = request.query;
    
    const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;
    return response.json(results); // array ou objeto
});
app.post('/projects', (request, response) => {  // request guarda as informaçoes dos usuários
    
       
        const {title, owner} = request.body;
       
        const project  = { id: uuid(), title, owner};

        projects.push(project);
        
        return response.json(project); // array ou objeto
});
app.put('/projects/:id', (request, response) => {  // request guarda as informaçoes dos usuários
    
    const {id} = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id); 

    if(projectIndex < 0){
     
     return response.status(400).json({Error: 'Project not found.'})
        
    }
    const project = {
    id,
    title,
    owner
    };
    
    projects[projectIndex] = project;

    
    return response.json(project); // array ou objeto
});
app.delete('/projects/:id', (request, response) => {  // request guarda as informaçoes dos usuários
   
    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id === id); 

    if(projectIndex < 0){
     
     return response.status(400).json({Error: 'Project not found.'})
        
    }

    projects.splice(projectIndex, 1);
    return response.status(204).send(); // array ou objeto
});

app.listen(3333, () => {
    console.log("Back-end Started");  // toda vez que eu atualizar vai aparecer no terminal (mao na roda)
});

/**
 * metodos http
 * 
 * get: buscar informaçoes do usuário (back-end)
 * post: criar uma informação no back-end
 * put/patch: alterar uma informaçao no back-ende   (patch - uma unica informação)
 * 
 *tipos de parametros:
 * 
 * Query Params: filtros e paginação;
 * Route Params: identificar recursos (atualizar/deletar);
 * Request body: Conteudo na hora de criar ou editar um recurso(JSON);
 * 
 *
 * 
 * * Middlewares : 
 * 
 * Interceptador de requisição que interrompe ou altera dados das requisições.
 * 
 */