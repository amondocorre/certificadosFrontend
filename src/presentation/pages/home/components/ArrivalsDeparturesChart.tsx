import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

interface ArrivalDepartureData {
  sexo: string;     // "M" o "F"
  cantidad: number; // cantidad correspondiente
}

interface ArrivalsDeparturesChartProps {
  data: ArrivalDepartureData[];
}

const ArrivalsDeparturesChart: React.FC<ArrivalsDeparturesChartProps> = ({ data }) => {
  // Opcional: convertir "M" y "F" a "Varones" y "Mujeres"
  const formattedData = data.map(item => ({
    ...item,
    sexo: item.sexo === 'M' ? 'Varones' : 'Mujeres'
  }));

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Cantidad por Sexo
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sexo" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="cantidad" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ArrivalsDeparturesChart;
