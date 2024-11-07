import {parse, stringify, v4 as uuidv4} from 'uuid'

import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'

import styles from './Project.module.css'


import Loading from '../Layout/Loading'
import Container from "../Layout/Container"
import Message from "../Layout/Message"
import ProjectForm from "../Project/ProjectForm"
import ServiceForm from '../Service/ServiceForm'
import ServiceCard from '../Service/ServiceCard'

function Project (){
    
    const{id} = useParams()
    

    const[project, setProject] = useState([])
    const[services, setServices] = useState([])
    const[showProjectForm, setShowProjectForm] = useState(false)
    const[showServiceForm, setShowServiceForm] = useState(false)
    const[message, setMessage] = useState()
    const[type, setType] = useState()
    
    

    useEffect(() => {
        setTimeout(()=>{
            
        fetch(`http://localhost:5000/projects/${id}`, {
            method: "GET",
            headers: {
                "content-Type": "application/json",
            },
        }).then(resp => resp.json())
        .then((data) =>{
            setProject(data)
            setServices(data.services)
        })
        .catch((err)=> console.log(err))

        },300)
    },[id])


    function editPost(project){
        setMessage("")
        //budget validation
        if(project.budget < project.cost){
            setMessage("O orçamento não pode ser menor que o custo do projeto!")
            setType("error")
            return (false)
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project),
        }).then(resp => resp.json())
          .then((data) =>{
            setProject(data)
            setShowProjectForm(false)
            setMessage("Projeto atualizado!")
            setType("sucess")
            
          }) 
          .catch((err) => console.log(err))
          
    }

    function createService(project){
        setMessage("");
        setType("");
        //last Service
        const lastService = project.services[project.services.length -1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        //validação valor máximo
        if(newCost > parseFloat(project.budget)) {
            setTimeout(()=> {
                setMessage('Orçamento ultrapassado, verifique o custo do serviço.')
                setType('error')
            })
            project.services.pop()
            return false
        }

        //adicionando custo do serviço no total do custo do projeto
        project.cost = newCost

        //atualização do projeto
        fetch(`http://localhost:5000/projects/${project.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp)=> resp.json())
        .then((data) => {
            //exibir os serviços
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))
    }

    function removeService(id, cost) {
        setMessage("")
    
        // Filtra os serviços que não têm o ID passado e cria uma nova lista
        const servicesUpdated = project.services.filter(
            (service) => service.id !== id
        )
    
        // Cria uma cópia atualizada do projeto, incluindo o custo atualizado
        const projectUpdated = {
            ...project,
            services: servicesUpdated,
            cost: parseFloat(project.cost) - parseFloat(cost)
        }
    
        // Realiza a requisição para atualizar o projeto no servidor
        fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdated)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setProject(projectUpdated)
            setServices(servicesUpdated)
            setMessage('Serviço removido com sucesso!')
        })
        .catch(err => console.log(err))
    }
    
    function toggleProjectForm (){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm (){
        setShowServiceForm(!showServiceForm)
    }
    
    return (
        <>
          {project.name ? (
            <div  className={styles.project_details}>
              <Container customClass="column">
                {message && <Message type ={type} msg={message}/>}
                <div className={styles.details_container}>
                    <h1>Projeto: {project.name}</h1>
                    <button className={styles.btn} onClick = {toggleProjectForm}>
                    {!showProjectForm ? "Editar Projeto" : "Fechar"}
                    </button>
                    {!showProjectForm ? (
                        <div className ={styles.project_info}>
                        <p>
                            <span>Categoria:</span>{project.category.name}
                        </p>
                        <p>
                            <span>Total de Orçamento:</span> R${project.budget}
                        </p>
                        <p>
                            <span>Total Utilizado:</span> R${project.cost}
                        </p>
                        </div>
                    ) : (
                        <div className ={styles.project_info}>
                            <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                        </div>
                    )}
                </div>
                <div className={styles.service_form_container}>
                    <h2>Adicione um serviço</h2>
                    <button className={styles.btn} onClick =   {toggleServiceForm}>
                    {!showServiceForm ? "Adicionar serviço" : "Fechar"}
                    </button>
                    <div className ={styles.project_info}>
                        { showServiceForm && (
                            <ServiceForm handleSubmit={createService}
                            btnText="Adicionar Serviço"
                            projectData={project} />
                        )}
                    </div>
                </div>
                <h2>Serviços</h2>
                <Container customClass="start">
                { services.length > 0 && 
                    services.map((service)=> (
                        <ServiceCard
                        id={service.id}
                        name={service.name}
                        cost={service.cost}
                        description={service.description}
                        key={service.id}
                        handleRemove={removeService}               
                        />
                    ))
                   
                }
                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                </Container>
              </Container>
            </div>
          ) : (
            <Loading />
          )}
        </>
      );
      
      








}


export  default Project