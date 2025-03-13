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
  LoginForm: undefined;
  ProfileDashboard: undefined;
  RegisterForm: undefined;
  ProfileScreen: undefined;
  AuthScreen: { authType: 'login' | 'register' };
};

export interface AuthFormProps {
  type: 'login' | 'register';
  setError: (error: string) => void;
  navigation: any;
  toggleAuthType: () => void;
}

export interface ImagePickerComponentProps {
  profileImage: { uri: string } | null;
  setProfileImage: (image: { uri: string } | null) => void;
  setError: (error: string) => void;
  isEditMode: boolean;
}