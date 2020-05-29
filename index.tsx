import 'react-native-gesture-handler';

import * as Stores from './src/stores';

import { AppRegistry, SafeAreaView } from 'react-native';
import { dark as lightTheme, mapping } from '@eva-design/eva';

import { ApplicationProvider } from '@ui-kitten/components';
import { Provider } from 'mobx-react';
import React from 'react';
import Routes from './src/routes';
import { name as appName } from './app.json';

const ProviderConfigured = () => (
    <Provider {...Stores}>
        <ApplicationProvider mapping={mapping} theme={lightTheme}>
            <SafeAreaView style={{ flex: 1 }}>
                <Routes />
            </SafeAreaView>
        </ApplicationProvider>
    </Provider>
)

AppRegistry.registerComponent(appName, () => ProviderConfigured);
