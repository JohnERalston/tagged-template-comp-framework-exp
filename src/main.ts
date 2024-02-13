import "./style.css";
import { MyComp } from "./components/mycomp";
import { mount } from "./framework/tag";

const comp = MyComp({ name: "ONE" });
const comp2 = MyComp({ name: "TWO" });
mount("#app", `<div>${comp}${comp2}</div>`);
