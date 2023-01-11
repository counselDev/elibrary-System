import AreaGraphStyles from "./AreaGraph.css";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useAppContext } from "../../../context/AppContext";
import { TailSpin } from "react-loader-spinner";


const AreaGraph = ({ aspect }) => {
  const { monthlyStats } = useAppContext();

  return (
    <div className="chart">
      <div className="title">Monthly Overview</div>
      {monthlyStats ? (
        monthlyStats.length > 0 ? (
          <ResponsiveContainer width="99%" aspect={aspect}>
            <AreaChart
              width={300}
              height={350}
              data={monthlyStats}
              margin={{ top: 10, right: 10, left: 10, bottom: 40 }}
            >
              <defs>
                <linearGradient
                  name="Total Saved"
                  id="count"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#1352b9" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#1352b9" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="blue" />

              <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
              <Tooltip />
              <Legend />

              <Area
                type="monotone"
                name="Total Bookings"
                dataKey="count"
                stroke="#1352b9"
                fillOpacity={1}
                fill="url(#count)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <h3>No Booking Made Yet</h3>
        )
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default AreaGraph;
