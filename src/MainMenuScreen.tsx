import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { FormEvent, PropsWithChildren, ReactNode, useState } from "react"

export function DeckDropdownMenu({ buttonContent, onChange }: { buttonContent: ReactNode, onChange?: React.FormEventHandler<HTMLDivElement> | undefined }) {
return  <DropdownMenu>
  <DropdownMenuTrigger asChild >
    <Button className="text-black-400 hover:text-gray-500" variant="outline">
      {buttonContent}
      <ChevronDownIcon className="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-48" onChange={onChange}>
    <DropdownMenuLabel>Select Deck</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Deck 1</DropdownMenuItem>
    <DropdownMenuItem>Deck 2</DropdownMenuItem>
    <DropdownMenuItem>Deck 3</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
}

export default function MainMenuScreen({ onChoose }: { onChoose: (p1: string, p2: string) => void }) {
    const [p1, setP1] = useState("")
    const [p2, setP2] = useState("")

    function handleClick() {
        onChoose(p1, p2)
    }

    function handleChangeP1(event: FormEvent<HTMLDivElement>) {
        setP1(event.)
    }

    function handleChangeP2() {
        setP2()
    }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6 gap-1">
          <DeckDropdownMenu buttonContent="Player 1 Deck" onChange={handleChangeP1} />
          <Button
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
            onClick={handleClick}
          >
            Play
          </Button>
          <DeckDropdownMenu buttonContent="Player 2 Deck" onChange={handleChangeP2} />
        </div>
      </div>
    </div>
  )
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}