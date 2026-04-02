import './WeightChart.css';
import { weightRecords } from '../data/mediaData';
import EmptyState from './EmptyState';
import { formatDate } from '../utils/date';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Dot,
} from 'recharts';

interface TooltipPayload {
  value: number;
  payload: { date: string; kg: number };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const { date, kg } = payload[0].payload;
  return (
    <div className="weight-chart-tooltip">
      <span className="weight-chart-tooltip-date">{formatDate(date)}</span>
      <span className="weight-chart-tooltip-value">{kg} kg</span>
    </div>
  );
}

interface CustomDotProps {
  cx?: number;
  cy?: number;
  index?: number;
  dataLength?: number;
}

function CustomDot({ cx, cy, index, dataLength }: CustomDotProps) {
  const isLast = index === (dataLength ?? 0) - 1;
  if (!isLast) return <Dot cx={cx} cy={cy} r={3} fill="rgba(255,210,180,0.5)" stroke="none" />;
  return (
    <g>
      <circle cx={cx} cy={cy} r={7} fill="rgba(255,180,120,0.25)" />
      <circle cx={cx} cy={cy} r={4} fill="#ffb878" />
    </g>
  );
}

function WeightChart() {
  if (weightRecords.length === 0) {
    return (
      <section className="weight-chart-section">
        <div className="weight-chart-inner">
          <div className="section-header">
            <span className="section-label">체중 성장</span>
            <div className="section-line" />
          </div>
          <EmptyState dark />
        </div>
      </section>
    );
  }

  const first = weightRecords[0];
  const last = weightRecords[weightRecords.length - 1];

  const chartData = weightRecords;
  const kgValues = weightRecords.map((r) => r.kg);
  const minKg = Math.min(...kgValues);
  const maxKg = Math.max(...kgValues);
  const yMin = Math.max(0, Math.floor(minKg - 1));
  const yMax = Math.ceil(maxKg + 1);

  return (
    <section className="weight-chart-section">
      <div className="weight-chart-inner">
        <div className="section-header">
          <span className="section-label">체중 성장</span>
          <div className="section-line" />
          <span className="section-count">{weightRecords.length}</span>
        </div>

        <div className="weight-summary-cards">
          <div className="weight-summary-card">
            <span className="weight-summary-label">첫 기록</span>
            <span className="weight-summary-value">{first.kg} kg</span>
            <span className="weight-summary-date">{formatDate(first.date)}</span>
          </div>
          <div className="weight-summary-arrow">→</div>
          <div className="weight-summary-card weight-summary-card--current">
            <span className="weight-summary-label">현재</span>
            <span className="weight-summary-value">{last.kg} kg</span>
            <span className="weight-summary-date">{formatDate(last.date)}</span>
          </div>
        </div>

        <div className="weight-chart-wrap">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={chartData} margin={{ top: 16, right: 24, left: 0, bottom: 8 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,220,190,0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fill: 'rgba(255,230,210,0.4)', fontSize: 11 }}
                axisLine={{ stroke: 'rgba(255,220,190,0.15)' }}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={[yMin, yMax]}
                tickFormatter={(v: number) => `${v}kg`}
                tick={{ fill: 'rgba(255,230,210,0.4)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={44}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,200,150,0.2)' }} isAnimationActive={false} />
              <ReferenceLine
                y={last.kg}
                stroke="rgba(255,184,120,0.25)"
                strokeDasharray="4 4"
              />
              <Line
                type="monotone"
                dataKey="kg"
                stroke="#ffb878"
                strokeWidth={2}
                dot={(props) => (
                  <CustomDot
                    key={props.index}
                    cx={props.cx}
                    cy={props.cy}
                    index={props.index}
                    dataLength={chartData.length}
                  />
                )}
                activeDot={{ r: 5, fill: '#ffb878', stroke: 'rgba(255,184,120,0.4)', strokeWidth: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default WeightChart;
