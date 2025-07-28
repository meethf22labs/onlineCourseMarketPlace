import { create } from "zustand";
import {persist} from "zustand/middleware";

// export const useUserStore  = create((set) => ({
//     loggedInUser: "",
//     setLoggedInUser: (user) => set({ loggedInUser: user }),
// }))


// using persist to save data in local storage even after refresh 
export const useUserStore = create(persist((set) => ({
      loggedInUser: null,
      setLoggedInUser: (user) => set({ loggedInUser: user }),
    }),
    { name: 'loggedInUser' } // will persist in local storage after refresh
  )
);