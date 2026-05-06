import { exp } from "three/tsl";
import { create } from "zustand";

export const useOnlineLudo = create((set) => ({
  roomId: null,
  setRoomId: (id) => set({ roomId: id }),
}));

export const useCreateRoom = create((set) => ({
  createRoom: async (title, players) => {
    const res = await fetch(`${'http://192.168.31.42:5000'}/create-room`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        maxPlayers: players,
      }),
    });

    const data = await res.json();
    console.log("Create Room Data:", data);
    if(!data.roomId) return;
    return data.roomId;
  },
}));
