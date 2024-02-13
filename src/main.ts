import "./style.css";
import { MyComp } from "./components/mycomp";
import { mount } from "./framework/tag";

const comp = MyComp();
const comp2 = MyComp();
mount("#app", `<div>${comp}${comp2}</div>`);
