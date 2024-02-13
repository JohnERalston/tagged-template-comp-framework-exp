import { stateful } from "../framework/stateful";

interface MotherShip {
  count: number;
  dateStr: string;
}

export const motherShip = stateful<MotherShip>({
  count: 0,
  dateStr: new Date().toISOString(),
});
