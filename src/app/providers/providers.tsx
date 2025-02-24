import store, { persistor } from '../store.ts';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import { ConfigProvider } from 'antd';

interface IProviders {
  readonly children: JSX.Element;
}

export const Providers: React.FC<IProviders> = ({ children }) => {
  return (
    <ConfigProvider theme={{
      token: {
        fontFamily: '\'Open Sans\', sans-serif',
      },
    }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
};