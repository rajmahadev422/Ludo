import { create } from "zustand";
import { boardData, plToken, starCells } from "./helper";

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
    const choice = JSON.parse(localStorage.getItem("choice")) || 0;
    set({ choice: Number(choice) });
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
      } else set({ choice: get().choice + 1 });
      await sleep(200);
      steps--;
      set({ value: 0 });
      return;
    }
    const home = get().playersData[base].tokens.find(t => t.id === tokenId).pos + steps;
    if(home > 56) return;
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
    const kill = get().findTokenPos(
      get().playersData[base].tokens.find((t) => t.id === tokenId).pos,
      base,
    );
    
    if (steps === 6 || kill || home === 56) {
      set({ value: 0 });
    } else {
      const updateChoice = get().choice + 1;
      set({ choice: updateChoice, value: 0 });
      localStorage.setItem("choice", updateChoice);
    }
  },

  killToken: async (tokenId, pos, base) => {
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    const { playersData } = get();

    const token = playersData[base].tokens.find((t) => t.id === tokenId);

    if (!token) return;

    get().playSound("/ludo/kill-path.wav");
    // 🚶 Step-by-step movement
    for (let i = pos; i >= -1; i--) {
      set((state) => {
        
        const newPos = i;

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

      await sleep(90);
    }
  },

  findTokenId: (x, y, base, steps) => {
    const [row, col] = boardData[base].origin;
    let id = null;
    if (
      steps === 6 &&
      x <= row + 5 &&
      x >= row + 1 &&
      y <= col + 5 &&
      y >= col + 1
    ) {
      id = get().playersData[base].tokens.find((t) => t.pos === -1)?.id || null;
    } else {
      const pos = boardData[base].path.findIndex(
        ([r, c]) => r === y && c === x,
      );
      if (pos !== -1)
        id =
          get().playersData[base].tokens.find((t) => t.pos === pos)?.id || null;
    }
    return id;
  },

  findTokenPos: (pos, base) => {
    const [y, x] = boardData[base].path[pos];
    if (starCells.find(([r, c]) => r === x && c === y)) {
      get().playSound("/ludo/kill.wav");
      return false;
    }

    let index = null;
    let kill = false;
    get().players.forEach((pl) => {
      if (pl === base) return;
      index = boardData[pl].path.findIndex(([r, c]) => r === y && c === x);
      if (index === -1) return;

      const id =
        get().playersData[pl].tokens.find((t) => t.pos === index)?.id || null;
      if (id) {
        get().killToken(id, index, pl);
        console.log("kill");
        kill = true;
      }
    });
    return kill;
  },

  handleClick: async (e, tokenRef, size) => {
    const canvas = tokenRef.current;
    const rect = canvas.getBoundingClientRect();
    const cell = size / 15;

    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    x = Math.floor(x / cell);
    y = Math.floor(y / cell);

    let steps = get().value;
    //  steps = 6;

    if (!steps || steps === 0) return;
    const base = get().players[get().choice % 4];

    let id = get().findTokenId(x, y, base, steps);

    if (id) get().moveToken(id, steps, base);
  },

  tokenOut: (base) => {
    return get().playersData[base].tokens.some((t) => t.pos !== -1);
  },

  skip: () => {
    set({ value: 0, choice: get().choice + 1 });
  },
  playSound: (filePath) => {
    const audio = new Audio(filePath);
    audio.play().catch(err => {
      console.error("Audio play failed:", err);
    });
}
}));

export default useLudo;
