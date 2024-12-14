/* eslint-disable react/prop-types */
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ title, data, lines }) => {
  return (
    <div className="w-full bg-white border border-blue-500 rounded-md p-4 shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-blue-900">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(date) => new Date(date).getDate()} // Menampilkan hanya tanggal (angka hari)
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey} // Gunakan `username` sebagai dataKey
              stroke={line.color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;