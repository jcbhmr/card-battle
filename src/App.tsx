import { useState } from "react";

function AppBoard() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 1"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src="/placeholder.svg"
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 2"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src="/placeholder.svg"
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 3"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src="/placeholder.svg"
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 4"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src="/placeholder.svg"
                width={150}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="grid grid-cols-4 items-start gap-4">
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 1"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src="/placeholder.svg"
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 2"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src="/placeholder.svg"
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 3"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src="/placeholder.svg"
                width={150}
              />
            </div>
            <div className="w-full aspect-[1.4] rounded-lg overflow-hidden">
              <img
                alt="Card 4"
                className="aspect-[1.4] object-cover border border-gray-100 dark:border-gray-800"
                height={150}
                src="/placeholder.svg"
                width={150}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



function App() {
  return (
    <div className="flex justify-center items-center h-screen p-4">
      <AppBoard />
    </div>
  );
}

export default App;
