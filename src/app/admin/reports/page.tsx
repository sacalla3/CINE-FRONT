'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  Legend
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#FFBB28', '#00C49F'];

const ReportsDashboard = () => {
  const [sales, setSales] = useState([]);
  const [topViewed, setTopViewed] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [topTimeSlots, setTopTimeSlots] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [salesRes, viewedRes, sellingRes, timeSlotsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/reports/sales'),
          axios.get('http://localhost:3000/api/reports/top-viewed'),
          axios.get('http://localhost:3000/api/reports/top-selling'),
          axios.get('http://localhost:3000/api/reports/top-selling-timeslots')
        ]);
        setSales(salesRes.data);

        
        setTopViewed(
        viewedRes.data.map((item: { title: string; views: string }) => ({
          ...item,
          views: Number(item.views),
        }))
      );

        setTopSelling(sellingRes.data);
        setTopTimeSlots(timeSlotsRes.data);
      } catch (err) {
        console.error('Error fetching reports:', err);
      }
    };

    fetchReports();
  }, []);

  // Colores para texto y líneas en las gráficas (blanco y tonos claros)
  const axisStyle = { stroke: '#ddd', fontSize: 14, fill: '#ddd' };
  const gridStroke = '#444';
  const tooltipStyle = { backgroundColor: '#222', borderColor: '#555', color: '#fff' };

  return (
    <div className="p-6 space-y-10" style={{ backgroundColor: '#000', color: '#eee', minHeight: '100vh' }}>
      <h1 className="text-3xl font-bold mb-6" style={{ color: '#fff' }}>Panel de Reportes</h1>

      {/* Ventas por película */}
      <div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#bbb' }}>Ventas por Película</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sales}>
            <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" />
            <XAxis dataKey="title" stroke={axisStyle.stroke} tick={{ fill: axisStyle.fill, fontSize: axisStyle.fontSize }} />
            <YAxis stroke={axisStyle.stroke} tick={{ fill: axisStyle.fill, fontSize: axisStyle.fontSize }} />
            <Tooltip 
              contentStyle={tooltipStyle} 
              itemStyle={{ color: '#fff' }} 
              labelStyle={{ color: '#aaa' }}
            />
            <Bar dataKey="totalSalesValue" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Películas más vistas */}
      <div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#bbb' }}>Películas más Vistas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={topViewed}
              dataKey="views"
              nameKey="title"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={{ fill: '#eee', fontSize: 12 }}
            >
              {topViewed.map((entry, index) => (
                <Cell key={`view-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={tooltipStyle} 
              itemStyle={{ color: '#fff' }} 
              labelStyle={{ color: '#aaa' }}
            />
            <Legend wrapperStyle={{ color: '#ddd' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Películas más vendidas */}
      <div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#bbb' }}>Películas con Más Ingresos</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topSelling}>
            <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" />
            <XAxis dataKey="title" stroke={axisStyle.stroke} tick={{ fill: axisStyle.fill, fontSize: axisStyle.fontSize }} />
            <YAxis stroke={axisStyle.stroke} tick={{ fill: axisStyle.fill, fontSize: axisStyle.fontSize }} />
            <Tooltip 
              contentStyle={tooltipStyle} 
              itemStyle={{ color: '#fff' }} 
              labelStyle={{ color: '#aaa' }}
            />
            <Bar dataKey="totalSales" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Horarios con más ventas */}
      <div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#bbb' }}>Horarios con Más Ventas</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topTimeSlots}>
            <CartesianGrid stroke={gridStroke} strokeDasharray="3 3" />
            <XAxis dataKey="timeSlot" stroke={axisStyle.stroke} tick={{ fill: axisStyle.fill, fontSize: axisStyle.fontSize }} />
            <YAxis stroke={axisStyle.stroke} tick={{ fill: axisStyle.fill, fontSize: axisStyle.fontSize }} />
            <Tooltip 
              contentStyle={tooltipStyle} 
              itemStyle={{ color: '#fff' }} 
              labelStyle={{ color: '#aaa' }}
            />
            <Bar dataKey="ticketsSold" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReportsDashboard;
