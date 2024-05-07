/**
 * Displays card shape with a number on it indicating how many cards are in the pile.
 * @param size, a number that represents number of cards in pile
 * @returns returns markup displaying what i wrote just above
 */
export function DiscardPile({ size }: { size: number; }) {
  return (
    <div className="card_shape flex h-screen hover:border-yellow-800">
      <div className="text-center text-7xl m-auto">
        <div className="">{size}</div>
      </div>
    </div>
  );
}
