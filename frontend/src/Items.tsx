import React, { useState, useEffect } from 'react';

interface Item {
    id: string;
    name: string;
    description: string;
}

const Items: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const token = localStorage.getItem('api_key');
                if (!token) {
                    throw new Error('No API key found');
                }

                const response = await fetch('/items/', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }

                const data = await response.json();
                setItems(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    if (loading) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Loading items...</div>;
    }

    if (error) {
        return <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Items List</h2>
            {items.length === 0 ? (
                <p>No items found. Try running the ETL pipeline first.</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={item.id} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9' }}>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.id}</td>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.name}</td>
                                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Items;