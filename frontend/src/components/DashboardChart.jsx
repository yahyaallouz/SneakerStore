import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardChart = ({ data }) => {
    return (
        <div style={{ width: '100%', height: 300, background: 'var(--card-bg)', borderRadius: '20px', padding: '1rem', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Sales Revenue</h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 10,
                        bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis
                        dataKey="date"
                        stroke="var(--text-secondary)"
                        tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                        tickLine={false}
                        axisLine={false}
                        minTickGap={30}
                        tickFormatter={(str) => {
                            const date = new Date(str);
                            return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                        }}
                    />
                    <YAxis
                        stroke="var(--text-secondary)"
                        tick={{ fill: 'var(--text-secondary)' }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'var(--card-bg)',
                            border: '1px solid var(--border)',
                            borderRadius: '10px',
                            color: 'var(--text-primary)'
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="sales"
                        stroke="var(--accent-color)"
                        fill="var(--accent-color)"
                        fillOpacity={0.2}
                        strokeWidth={3}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default DashboardChart;
