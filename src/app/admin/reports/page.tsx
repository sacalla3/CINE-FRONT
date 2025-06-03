'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  Legend
} from 'recharts';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#FFBB28', '#00C49F'];

const ReportsDashboard = () => {
  const [sales, setSales] = useState([]);
  const [topViewed, setTopViewed] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [topTimeSlots, setTopTimeSlots] = useState([]);
    const reportRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token no encontrado');
          return;
        }
        
        const [salesRes, viewedRes, sellingRes, timeSlotsRes] = await Promise.all([
          axios.get('http://localhost:3000/api/reports/sales'),
          axios.get('http://localhost:3000/api/reports/top-viewed'),
          axios.get('http://localhost:3000/api/reports/top-selling'),
          axios.get('http://localhost:3000/api/reports/top-selling-timeslots'), {headers: {
            Authorization: `Bearer ${token}`},
          },
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

const generatePDF = async () => {
  console.log('Intentando generar PDF...'); // 👈 para test
  if (!reportRef.current) {
    console.log('Ref no existe');
    return;
  }

  try {
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      backgroundColor: '#000',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('reporte.pdf');
  } catch (err) {
    console.error('Error generando PDF:', err);
  }
};


  return (
    <div className="p-6 space-y-10" style={{ backgroundColor: '#000', color: '#eee', minHeight: '100vh' }}>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Panel de Reportes</h1>
        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Exportar PDF
        </button>
      </div>

      {/* Ventas por película */}
        <div ref={reportRef} className="space-y-12 p-4 rounded-lg shadow-md">
            <section>
    <h2 className="text-xl font-semibold mt-8 mb-2">Resumen General</h2>
    <p className="text-sm">
        Este reporte incluye el análisis de ventas y vistas por película, junto con los horarios con mayor cantidad de tickets vendidos.
        Los datos fueron generados por el sistema de reportes en tiempo real a partir de la actividad registrada en la plataforma.
    </p>
    </section>

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
    </div>
  );
};

export default ReportsDashboard;
