import { create } from "zustand";
import { plToken } from "./helper";

const useLudo = create((set, get) => ({
  playersData: null,
  value: 0,

  set: set,

  initializeToken: () => {
    set({ playersData: plToken });
    localStorage.setItem("pos", -1);
  },
  rollDice: () => {},

  moveToken: (id, no, base) => {
    const { playersData } = get();

    const updatedPlayers = {
      ...playersData,
      [base]: {
        ...playersData[base],
        tokens: playersData[base].tokens.map((token, i) =>
          i === 0
            ? { ...token, pos: Number(localStorage.getItem("pos")) || 0 } // ✅ new object
            : token,
        ),
      },
    };
    localStorage.setItem("pos", Number(localStorage.getItem("pos")) + 1 || 0);
    set({ playersData: updatedPlayers });
  },
  handleClick: (e, tokenRef, size) => {
    const canvas = tokenRef.current;
    const rect = canvas.getBoundingClientRect();
    const cell = size / 15;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cell);
    const row = Math.floor(y / cell);

    let base = 'red';

    if(col < 6 && row < 6) base = 'red';
    else if(col > 9 && row < 6) base = 'green';
    else if(col < 6 && row > 9) base = 'blue';
    else if(col > 9 && row > 9) base = 'yellow';
    else return;
    console.log(base)
    get().moveToken(1, 1, base)
    console.log(`Clicked cell: Row ${row}, Col ${col}`);
  },
}));

export default useLudo;
