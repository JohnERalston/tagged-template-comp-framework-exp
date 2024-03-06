export type HTML = string;
export type ATTR = string;
export type ReactiveFnProps = (id: string) => HTML;
export type ReactiveFn = () => void;
export interface Renderable {
  fn: ReactiveFn;
  ran: boolean;
}
