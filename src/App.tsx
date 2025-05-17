import React from 'react';
import { Layout } from './components/Layout';

import './App.css';
import DataService from './screens/DatabaseService';

function App() {
    return (
        <Layout>
            <DataService />
        </Layout>
    );
}

export default App;
