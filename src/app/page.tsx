import Image from "next/image";

export default function Home() {
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
      </div>
 
    </main>
  );
}
