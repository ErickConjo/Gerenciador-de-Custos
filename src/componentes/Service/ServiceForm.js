import styles from  '../Project/ProjectForm.module.css'

import { useState } from 'react'
import Input from '../Form/Input'
import SubmitButton from '../Form/SubmitButon'




function ServiceForm({handleSubmit, projectData, btnText}){
    
    const [service, setService] = useState([])
    
    function submit(e){
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
           <Input
            type='text'
            text=" nome do serviço"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange}
           />
            <Input
            type='number'
            text=" Custo do serviço"
            name="cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}
           />
           <Input
            type='text'
            text=" Descrição do serviço"
            name="description"
            placeholder="Descreva o serviço"
            handleOnChange={handleChange}
           />
           <SubmitButton  text={btnText}/>
        </form>
    )
}

export default ServiceForm