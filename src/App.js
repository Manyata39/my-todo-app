//import logo from './logo.svg';
import './App.css';
import Header from "./Mycomponents/Header";
import {Todos} from "./Mycomponents/Todos";
import {Footer} from "./Mycomponents/Footer";
import About from "./Mycomponents/About";
import {Addtodos} from "./Mycomponents/Addtodos";
import React,{useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";



function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo=[];
  }
  else{
    initTodo=JSON.parse(localStorage.getItem("todos"));
  }
  const onDelete =(todo) =>{
    console.log("Iam on delete",todo);
    setTodos(todos.filter((e)=>{
    return e!==todo;
  }));
  console.log("deleted",todos)
  localStorage.setItem("todos",JSON.stringify(todos))

  }
  const addTodo=(title,desc)=>{
    console.log("Iam adding this todo",title,desc)
    let sno;
    if(todos.length===0){
      sno=0;
    }
    else{
    sno= todos[todos.length-1].sno +1;
    }
    const myTodo ={
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos,myTodo]);
    console.log(myTodo);
    }

  const [todos,setTodos]=useState(initTodo);
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos));
  },[todos])
  return (
    
    <Router>
      <Header title="My Todos List" searchBar={false}/>
      <Routes>
          <Route path="/" element={
            <>
            <Addtodos addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} /> 
            </>
          }> 
          </Route>
          <Route path="/about" element={<About/>} />
          
        </Routes>
      
      <Footer/>
      </Router>
  );
}

export default App;
