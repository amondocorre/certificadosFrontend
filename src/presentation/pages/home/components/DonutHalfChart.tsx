import { PieChart, Pie, Cell, ResponsiveContainer, Label, LabelList } from 'recharts';

interface DonutProps {
  total:number;
  enUso:number;
  stock:number;
}
const DonutHalfChart = ({total,enUso,stock}:DonutProps) => {
  const data = [
    { name: 'En uso', value: enUso },
    { name: 'Stock', value: stock },
  ];

  const COLORS = ['#FF6384', '#1a3e72'];

  return (
    <div style={{ width: '100%', maxWidth: 300,minHeight:100, height: '100%', position: 'relative' }}>
      {/* Etiquetas debajo del gráfico */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          padding: '0 0',
        }}
      >
        <div style={{ color: COLORS[0], fontWeight: 'bold',fontSize: '80%',marginRight:'2%' }}>En uso</div>
        <div style={{ color: '', fontWeight: 'bold',fontSize: '80%',marginLeft:'2%' }}> Total</div>
        <div style={{ color: COLORS[1], fontWeight: 'bold',fontSize: '80%',marginLeft:'4%' }}>Stock</div>
      </div>

      {/* Gráfico responsivo */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%' }}>
        <ResponsiveContainer width="100%" height="150%">
          <PieChart>
            <Pie
              data={data}
              startAngle={180}
              endAngle={0}
              innerRadius="45%"
              outerRadius="100%"
              paddingAngle={1}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
              <Label
                value={`${total}`}
                position="center"
                
                style={{
                  //fontFamily: 'fantasy',
                  fontWeight: 'bold',
                  fontSize: '80%',
                  fill: '#333',
                }}
              />
              <LabelList
                position="inside"
                dataKey="value"
                formatter={(value: string) => `${value}`}
                style={{ fill: '#fff', fontSize: '90%' }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonutHalfChart;
