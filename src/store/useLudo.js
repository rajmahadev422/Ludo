import { create } from "zustand";
import { boardData, plToken } from "./helper";
import { step } from "three/tsl";

const useLudo = create((set, get) => ({
  playersData: null,
  value: 0,
  choice: 0,
  players: null,
  set: set,

  initializeToken: () => {
    const playersData =
      JSON.parse(localStorage.getItem("playersData")) || plToken;

    const players = Object.keys(playersData);
    set({ playersData: playersData, players: players });

    localStorage.setItem("pos", -1);
  },

  moveToken: async (tokenId, steps, base) => {
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const { playersData } = get();

    const token = playersData[base].tokens.find((t) => t.id === tokenId);

    if (!token) return;

    // 🔥 Base exit
    if (token.pos === -1) {
      if (steps === 6) {
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
        console.log(tokenId, steps, base)
      }
      else set({ choice: get().choice + 1 });
      await sleep(200);
      steps--;
      set({ value: 0 });
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
    if (steps !== 6) set({ choice: get().choice + 1 });
    set({ value: 0 });
  },

  handleClick: async (e, tokenRef, size) => {
    const canvas = tokenRef.current;
    const rect = canvas.getBoundingClientRect();
    const cell = size / 15;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cell);
    const row = Math.floor(y / cell);

    let steps = get().value;
    //  steps = 6;

    if (!steps || steps === 0) return;
    let base = get().players[get().choice % 4];
    // base = "red";
    let token = boardData[base].path.findIndex(
      ([r, c]) => c === col && r === row,
    );

    token = plToken[base].tokens.filter((t) => t.pos === token);
    console.log(token)

    if (token !== 0 && !token)
      token = plToken[base].tokens.filter((token) => {
        if (
          row - 0.5 <= token.initial[0] <= row + 0.5 &&
          col - 0.5 <= token.initial[1] <= col + 0.5
        )
          return token;
      });
    // console.log(token, row, col);

    get().moveToken(2, steps, base);
  },
}));

export default useLudo;
