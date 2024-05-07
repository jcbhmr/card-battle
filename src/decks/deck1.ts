import { Card } from "../engine/game";
import darkAngelPngUrl from "../assets/dark-angel.png";
// make sure you do this ^
export default [
  new Card(
    "name",
    "flavorText",
    1,
    1,
    "some landspace type",
    Ability,
    () => {},
    darkAngelPngUrl,
  ),
] satisfies Card[];
