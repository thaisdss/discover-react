import React, {useState, useEffect} from "react"
import './style.css'
import {Card, CardProps} from '../../components/Card'

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {
  const [studentName, setStudentName] = useState("")
  const [students, setStudents] = useState<CardProps[]>([])
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: Number(new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })),
    };

    setStudents(prevState => [...prevState, newStudent])
  }

  /*useEffect(() => {
    fetch("https://api.github.com/users/thaisdss")
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
    .catch(err => console.error(err))
  }, [user])*/

  useEffect(() => {
    async function fetchData(){
      const response = await fetch("https://api.github.com/users/thaisdss")
      const data = await response.json() as ProfileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    }

    fetchData()
  }, [user])

  return (
    <div className='container'>
      <header>
      <h1>Lista de Presença</h1>

      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto de perfil" />
      </div>
      </header>

      <input type="text" placeholder="Digite seu Nome" onChange={e => setStudentName(e.target.value)}/>
      <button type="button" onClick={handleAddStudent}>Adicionar</button>

      {
        students.map((students) => (
          <Card 
          key={students.time} 
          name={students.name} 
          time={students.time} 
          />
        ))
      }
    </div>
  )
}
