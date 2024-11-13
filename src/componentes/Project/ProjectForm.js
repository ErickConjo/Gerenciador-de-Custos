import {useState, useEffect} from 'react'

import Input from '../Form/Input'
import Select from '../Form/Select'
import SubmitButton from '../Form/SubmitButon'

import styles from './ProjectForm.module.css'


function ProjectForm ({handleSubmit, btnText, projectData}) {

    const[categories, setCategories] = useState([])
    const[project, setProject] = useState(projectData || {})
    
    useEffect(()=> {
        fetch("http://localhost:5000/categories",{
            method: "GET",
            headers:  {
                'Content-type':'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

        const Submit = (e) => {
            e.preventDefault()
            handleSubmit(project)
        }

        const handleChange = (e) => {
            setProject({
                ...project,
                [e.target.name]: e.target.value, 
            });
        };

        const handleCategory = (e) => {
            const selectedCategory = categories.find(
                (category) => category.id === e.target.value
            );
            setProject({
                ...project,
                category: selectedCategory, 
            });
        };
        
        return(
        <form onSubmit={Submit} className= {styles.form}>
            <Input
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={project.name || ""}
        />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={project.budget || ""} 
/>
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ""} 
/>
            <SubmitButton text={btnText}
            />
        </form>
    )
}

export default ProjectForm