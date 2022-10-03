import { configureStore } from "@reduxjs/toolkit";
import { user } from "../modules/user";
import cardlist from "../modules/cardlist";
import detail from "../modules/detail";
import gatheringlist from "../modules/gatheringlist"
import wishlist from "../modules/wishlist";
import application from "../modules/application"
import myinfo from "../modules/myinfo"



const store = configureStore({
    reducer: { 
       user: user.reducer,
       cardlist,
       gatheringlist,
       detail,
       wishlist,
       application,
       myinfo
    },
        
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ serializableCheck: false, }),
    
    
});

export default store;