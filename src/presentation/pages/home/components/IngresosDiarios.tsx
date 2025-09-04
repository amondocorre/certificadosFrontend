import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import { IngresosDiarios as IngresosDiarios2 } from '../../../../domain/models/DashboardModel';
interface IngresosDiariosProps {
  data: IngresosDiarios2[];
}

const IngresosDiarios: React.FC<IngresosDiariosProps> = ({ data }) => {
  const maxY = Math.max(...data.map((d:IngresosDiarios2) => Math.max(d.egresos ?? 0, d.ingresos ?? 0)));
  return (
    <Card>
      <Card  sx={{p:1,pb:1}}>
        <Typography variant="h6" gutterBottom sx={{m:0}}>
          Movimiento Caja
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ bottom: 0 }}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="dia" />
            <YAxis domain={[0, Math.ceil(maxY / 100) * 100]} />
            <Tooltip />
            <Legend wrapperStyle={{ /*top: -30, left:90 */}} />
            <ReferenceLine y={0} stroke="#ccc" strokeDasharray="1 1" /> {/* Línea horizontal */}
            <Line type="monotone" dataKey="ingresos" stroke="#21d47f" name="Ingresos" strokeWidth={2} />
            <Line type="monotone" dataKey="egresos" stroke="#ff5e00" name="Egresos" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </Card>
  );
};

export default IngresosDiarios;