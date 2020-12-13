import React, { createContext, useContext, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextData {
  socket: Socket;
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

export const SocketProvider: React.FC = ({ children }) => {
  const socket = useMemo(() => io('http://192.168.25.219:3333'), []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = (): SocketContextData => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }

  return context;
};
