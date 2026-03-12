import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Items from './Items';

function App() {
    const [currentPage, setCurrentPage] = useState<'items' | 'dashboard'>('items');

    return (
        <div className="App">
            <nav style={{
                padding: '10px 20px',
                backgroundColor: '#f8f9fa',
                borderBottom: '1px solid #dee2e6',
                marginBottom: '20px'
            }}>
                <button
                    onClick={() => setCurrentPage('items')}
                    style={{
                        padding: '8px 16px',
                        marginRight: '10px',
                        backgroundColor: currentPage === 'items' ? '#007bff' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Items
                </button>
                <button
                    onClick={() => setCurrentPage('dashboard')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: currentPage === 'dashboard' ? '#007bff' : '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Dashboard
                </button>
            </nav>

            <main>
                {currentPage === 'items' ? <Items /> : <Dashboard />}
            </main>
        </div>
    );
}

export default App;