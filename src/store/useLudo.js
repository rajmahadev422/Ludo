import { create } from "zustand";
import { plToken } from "./helper";

const useLudo = create((set, get) => ({
  playersData: null,
  value: 0,
  choice: 0,
  players: null,
  set: set,

  initializeToken: () => {
    const playersData =
      JSON.parse(localStorage.getItem("playerData")) || plToken;
    
    const players = Object.keys(playersData);
    set({ playersData: playersData, players: players });

    localStorage.setItem("pos", -1);
    localStorage.setItem("playersData", JSON.stringify(playersData));
  },

  moveToken: async (tokenId, steps, base) => {
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const { playersData } = get();

    const token = playersData[base].tokens.find((t) => t.id === tokenId);

    if (!token) return;

    // 🔥 Base exit
    if (token.pos === -1) {
      if (steps === 6)
        set((state) => ({
          playersData: {
            ...state.playersData,
            [base]: {
              ...state.playersData[base],
              tokens: state.playersData[base].tokens.map((t) =>
                t.id === tokenId ? { ...t, pos: 0 } : t,
              ),
            },
          },
        }));
        else set({ choice: get().choice + 1 })
      await sleep(200);
      steps--;
      set({ value: 0});
      return;
    }

    // 🚶 Step-by-step movement
    for (let i = 0; i < steps; i++) {
      set((state) => {
        const currentToken = state.playersData[base].tokens.find(
          (t) => t.id === tokenId,
        );

        const newPos = currentToken.pos + 1;

        return {
          playersData: {
            ...state.playersData,
            [base]: {
              ...state.playersData[base],
              tokens: state.playersData[base].tokens.map((t) =>
                t.id === tokenId ? { ...t, pos: newPos } : t,
              ),
            },
          },
        };
      });

      await sleep(180);
    }
    set({ value: 0, choice: get().choice + 1 });
  },

  handleClick: async (e, tokenRef, size) => {
    const canvas = tokenRef.current;
    const rect = canvas.getBoundingClientRect();
    const cell = size / 15;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cell);
    const row = Math.floor(y / cell);

    let base = "red";

    if (col < 6 && row < 6) base = "red";
    else if (col > 9 && row < 6) base = "green";
    else if (col < 6 && row > 9) base = "blue";
    else if (col > 9 && row > 9) base = "yellow";
    else return;
    const steps = get().value;

    if (!steps || steps === 0) return;

    get().moveToken(2, steps, base);
  },
}));

export default useLudo;
