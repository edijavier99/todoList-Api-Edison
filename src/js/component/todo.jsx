import React, {useEffect,useState} from "react";

let Todo = () =>{
  
    const [username, setUsername] = useState("")
    const [list,setList] = useState([])
    const [newTask,setNewTask] = useState({})
    const [count,setCount] = useState(list.length)


    const newUser = () =>{
            fetch('https://assets.breatheco.de/apis/fake/todos/user/' + username, {
            method: 'POST', 
            body: JSON.stringify([]), // data can be a `string` or  an {object} which comes from somewhere further above in our application
            headers:{
                'Content-Type':'application/json'
            }
            }).then((res)=> res.json())
            .then(resAsJson => {
                console.log(resAsJson);
                getTask()
            }).catch((error)=>{
                console.log(error);
            })
    }

        useEffect(()=>{
            setCount(list.length)
        },[list])
        useEffect(()=>{
            getTask()
        },[])

    const getTask = () =>{
        if(username !== ""){
            fetch('https://assets.breatheco.de/apis/fake/todos/user/' + username, {
                method: 'get', 
                headers:{
                    'Content-Type': 'application/json'
                },
                }).then((res)=> res.json())
                .then(resAsJson => {
                    console.log(resAsJson);
                    setList(resAsJson)
                }).catch((error)=>{
                    console.log(error);
                })
        }
    }

    const updateTask = () =>{
        const newTaskss = [...list,newTask]
        setList(newTaskss)
            fetch('https://assets.breatheco.de/apis/fake/todos/user/' + username, {
                method: 'PUT', 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTaskss),
                }).then((res)=> res.json())
                .then(resAsJson => {
                    console.log(resAsJson);
                }).catch((error)=>{
                    console.log(error);
                })
    }

    const deleteTask = (deleteitem) =>{
        const updatedTask = list.filter((item)=> item.label !== deleteitem.label);
        setList(updatedTask);
        fetch('https://assets.breatheco.de/apis/fake/todos/user/' + username, {
                method: 'PUT',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask)
                }).then((res)=> res.json())
                .then(resAsJson => {
                    console.log(resAsJson);
                }).catch((error)=>{
                    console.log(error);
                })             
    }
    const deleteUser =() =>{
        fetch('https://assets.breatheco.de/apis/fake/todos/user/' + username, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            }
            }),
            setUsername("")
            setList([])
    } 

    return(
        <div className="container-fluid vh-100">
		<div className=" d-flex  justify-content-center align-items-center h-100 flex-column">
			<p className="title">todos</p>
		<div className="col-3 d-flex justify-content-center align-items-center bg-light todo-body flex-column">
               
                <input
					className="col-12 ps-4"
					placeholder="What needs to be done?"
					type="text"
					onChange={(e)=>{
                        setNewTask({label: e.target.value , done: false})
					}}
					value={newTask.label}
                    onKeyDown={(e)=>{
                        if(e.key === "Enter"){
                            updateTask() 
                            setNewTask({label:"", done:false})
                        }
                    }}
				/>

				<ul className="col-12">
					{list.map((item,index)=>{
					return <div>
                                <li className="ps-4 col-12" key={index}>{item.label}
                                    <div className="ms-auto me-2"><i className="fas fa-check" onClick={()=>{deleteTask(item)}}></i> </div>
                                </li>
						    </div>
					})}
				</ul>
				<div className="count-list col-12">
					<p className="ps-2">{count} item left</p>
				</div>	
				
		</div>
		<div className="page col-3"></div>	
		<div className="page second col-3"></div>	
        <div className="userBoard mt-5">
            <input
                className="username"
                value={username}
                onChange={(e)=>setUsername(e.target.value)}
                placeholder="Enter username"
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        newUser()
                    }
                }}
            />
            <h1 className="name mt-3">{username}</h1>
            <button onClick={()=>{
                deleteUser()
            }}>Delete User</button>
        </div>
		</div>
	</div>
    )
}
export default Todo;