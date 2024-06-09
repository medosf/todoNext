'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  // need to add context
  // create hooks for the context

  const [todos, setTodos] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  

  const handleCheckboxChange = (id: number, isComplete: boolean) => {
    setTodos((prevTodos: any) => {
      return prevTodos.map((todo: any) => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete,
          };
        }
        return todo;
      });
    });

    //Todo add api call to update the todo
    // need to implement the call in the backend first

  }


 

  useEffect(() => {
    setIsLoading(true);
    const fetchTodos = async () => {
      try {
        setError(false)
        const response = await fetch('https://todoapp101.azurewebsites.net/todo');
        const data = await response.json();
          console.log("data >>>>", data);
        setTodos(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setIsLoading(false);
        setError(true);
      }
    };
     fetchTodos();

  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="">
      
      <h2>Welcome to my todo app</h2>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
     
            <Image
              src="/todo.svg"
              alt="Todo Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
        </div>


        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching todos, please try again later</p>}
          <ul>
            {todos.map((todo:any) => (
              
              <li key={todo.id} className="text-black">
                <div className="flex pt-2">
                <p className="w-4/5">{todo.name}</p>
                <input className="w-1/5" type="checkbox" checked={todo.isComplete} onClick={()=>handleCheckboxChange(todo.id, !todo.isComplete)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
 
    </main>
  );
}
