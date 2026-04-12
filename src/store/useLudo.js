import { create } from "zustand";
import { plToken } from "./helper";

const useLudo = create((set, get) => ({
  playersData: null,

  initializeToken: () => {
    set({ playersData: plToken });
    localStorage.setItem('pos', -1);
  },
  rollDice: () => {},

  moveToken: (id, no) => {},
  handleClick: (e, tokenRef, size) => {
    const canvas = tokenRef.current;
    const rect = canvas.getBoundingClientRect();
    const cell = size / 15;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cell);
    const row = Math.floor(y / cell);

    const { playersData } = get();

    const updatedPlayers = {
      ...playersData,
      red: {
        ...playersData['red'],
        tokens: playersData.red.tokens.map((token, i) =>
          i === 0
            ? { ...token, pos: Number(localStorage.getItem('pos')) || 0} // ✅ new object
            : token,
        ),
      },
    };
    localStorage.setItem('pos', Number(localStorage.getItem('pos')) + 1 || 0);
    set({ playersData: updatedPlayers });

    console.log(`Clicked cell: Row ${row}, Col ${col}`);
  },
}));

export default useLudo;
