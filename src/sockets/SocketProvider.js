import React, {useEffect} from 'react';

import {useSelector} from 'react-redux';
import SocketSingleton from './SocketSingleton';

const SocketContext = React.createContext();

export const useSocket = () => {
  return React.useContext(SocketContext)?.socket;
};

export const SocketProvider = ({children}) => {
  const [socketInstance, setSocketInstance] = React.useState(null);
  const {
    adminInfo: {adminEmail},
  } = useSelector(state => state.initReducer);

  useEffect(() => {
    if (adminEmail) {
      const socketSingleton = new SocketSingleton();

      console.log({socketSingleton: adminEmail});
      socketSingleton.initializeSocket();
      setSocketInstance(socketSingleton);
    }

    return () => {
      if (socketInstance) {
        socketInstance?.closeSocket();
      }
    };
  }, [adminEmail]);

  return (
    <SocketContext.Provider value={socketInstance}>
      {children}
    </SocketContext.Provider>
  );
};
