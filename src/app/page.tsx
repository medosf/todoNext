'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  // need to add context
  // create hooks for the context

  const [todos, setTodos] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTodos = async () => {
    try {
      setError(false)
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/todo`);
      const data = await response.json();
      setTodos(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching todos:', error);
      setIsLoading(false);
      setError(true);
    }
  };
  

  const handleDelete = async (id: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URI}/todo/${id}`, { 
    method: 'DELETE',
    })

  if (res.status === 204) {
    fetchTodos();
  }

 }

  useEffect(() => {
    setIsLoading(true);

      fetchTodos();

  }, []);

  return (
    <main className="flex min-h-100 min-w-60 flex-col items-center gap-10 p-12">
      
      <h2>Welcome to my todo app</h2>
     
            <Image
              src="/todo.svg"
              alt="Todo Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />


          {isLoading && <p>Loading...</p>}
          {error && <p>Error fetching todos, please try again later</p>}
          <ul className="min-w-[280px]">
            {todos.map((todo:any) => (
              
              <li key={todo.id} className="text-black">
                <div className="flex pt-2">
                <p className="w-4/5">{todo.name}</p>
                <button className="w-1/5" onClick={()=>handleDelete(todo.id)}>
                  <Image
                    src="/delete.svg"
                    alt="delete icon"
                    className="dark:invert"
                    width={24}
                    height={24}
                  priority
                />
                </button>
            
                </div>
              </li>
            ))}
          </ul>
        <button className="bg-black text-white rounded-md p-2 px-12">Add Todo</button>
 
    </main>
  );
}
