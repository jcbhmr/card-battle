import { FormEvent, ReactNode, useState } from "react";
import { exportDecks } from "./engine/CardMap";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./components/ui/dropdown-menu";
import { Button } from "./components/ui/button";
import { ChevronDownIcon } from "./components/ChevronDownIcon";

export function DeckDropdownMenu({
    buttonContent,
    onChange,
    deckNames
  }: {
    buttonContent: ReactNode;
    onChange: (deckName: string) => void;
    deckNames: string[];
  }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="text-black-400 hover:text-gray-500"
            variant="outline"
          >
            {buttonContent}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
            {deckNames.map((deckName, i) => (
                <DropdownMenuItem key={i} onSelect={() => onChange(deckName)}>{deckName}</DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

export function DeckSelectScreen({ onChoose, deckNames }: { onChoose: (a: string, b:string) => void, deckNames: string[] }) {

    const [p1, setP1] = useState(deckNames[0]);
    const [p2, setP2] = useState(deckNames[0]);
  
    function handleClick() {
        // dont trigger choose if not valid
        if (deckNames.includes(p1) && deckNames.includes(p2)) {
            onChoose(p1, p2);
        }
    }

    
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6 gap-1">
          <DeckDropdownMenu
            buttonContent={p1}
            deckNames={deckNames}
            onChange={setP1}
          />
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
            onClick={handleClick}
          >
            Play
          </Button>
          <DeckDropdownMenu
            buttonContent={p2}
            deckNames={deckNames}
            onChange={setP2}
          />
        </div>
      </div>
    </div>
  );
}

