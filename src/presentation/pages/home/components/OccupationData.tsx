import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

// Definición de la interfaz para los datos
interface OccupationData {
  date: string;
  total: number;
  entities: number;
  groups: number;
  individuals: number;
}

// Interfaz para las props del componente
interface MonthlyOccupationChartProps {
  data: OccupationData[];
}

const MonthlyOccupationChart: React.FC<MonthlyOccupationChartProps> = ({ data }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          % Ocupación mensual
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ bottom: 0 }}>
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend wrapperStyle={{ top: -35, left:90 }} />
            <ReferenceLine y={0} stroke="#ccc" strokeDasharray="3 3" /> {/* Línea horizontal */}
            <Line type="monotone" dataKey="total" stroke="#020005" name="Total" strokeWidth={2} />
            <Line type="monotone" dataKey="entities" stroke="#21d47f" name="Entidades" strokeWidth={2} />
            <Line type="monotone" dataKey="groups" stroke="#c873ce" name="Grupos" strokeWidth={2} />
            <Line type="monotone" dataKey="individuals" stroke="#f4780f" name="Individuales" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MonthlyOccupationChart;