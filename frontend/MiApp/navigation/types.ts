// navigation/types.ts
export type RootStackParamList = {
  Home: undefined; 
  Dashboard: undefined;  
  ChatDashboard: {  
    userId: number;
    userName: string;
    userImage: string;
  };  
  ChatScreen: {  
    userId: number;
    userName: string;
    userImage: string;
  };
};
