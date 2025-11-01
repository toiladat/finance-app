'use client';

import TextType from '@/components/TextType';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from 'recharts';

export default function TechChartPage() {
  const [timeRange, setTimeRange] = useState('90d');

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://tdat9663.app.n8n.cloud/webhook/webhook-2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'statistic',

        }),
      });
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [timeRange]);

  const chartConfig = {
    income: { color: 'hsl(190 90% 60%)', label: 'Khoản chi' },
    outcome: { color: 'hsl(260 90% 65%)', label: 'Khoản thu' },
  };
  const statistic = data.filter((item) => {
    const date = new Date(item?.date);
    const referenceDate = new Date('2025-09-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '7d') {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <div
      className={cn(
        'relative min-h-screen w-full flex flex-col items-center justify-center',
        'bg-gradient-to-br from-[#050b18] via-[#081e2e] to-[#0b2035] text-white p-6'
      )}
    >
      {/* Card vùng biểu đồ */}
      <Card
        className={cn(
          'w-full max-w-5xl h-[90vh]',
          'bg-gradient-to-br from-[#0c1b2a]/60 to-[#081a28]/30',
          'border border-cyan-400/30 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.1)]',
          'flex flex-col'
        )}
      >
        <CardHeader className="flex items-center gap-2 border-b border-cyan-400/20 py-6 sm:flex-row">
          <div className="grid flex-1 gap-1">
            <CardTitle className="text-cyan-300 text-xl font-semibold tracking-wide">
              <TextType
                text={[
                  '📊 Tổng quan thu – chi tài chính',
                  'Tiêu tiền ít thôi',
                  'Phân tích xu hướng chi tiêu và nguồn thu của bạn'
                ]}
                typingSpeed={70}
                pauseDuration={1800}
                showCursor={true}
                cursorCharacter="|"
              />
            </CardTitle>
          </div>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="hidden w-[180px] rounded-md border-cyan-400/40 bg-transparent text-cyan-200 hover:bg-cyan-400/10 sm:flex"
              aria-label="Select a value"
            >
              <SelectValue placeholder="90 ngày gần nhất" />
            </SelectTrigger>
            <SelectContent className="rounded-xl bg-[#081a28] text-cyan-100 border-cyan-400/30">
              <SelectItem value="90d" className="hover:bg-cyan-400/10">
                90 ngày gần nhất
              </SelectItem>
              <SelectItem value="30d" className="hover:bg-cyan-400/10">
                30 ngày gần nhất
              </SelectItem>
              <SelectItem value="7d" className="hover:bg-cyan-400/10">
                7 ngày gần nhất
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>

        {/* Biểu đồ */}
        <CardContent className="flex-1 px-4 sm:px-8 py-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-full w-full"
          >
            <AreaChart data={statistic}>
              <defs>
                <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(190 90% 60%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(190 90% 60%)" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="fillOutcome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(260 90% 65%)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(260 90% 65%)" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(0,255,255,0.15)"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tick={{ fill: '#8efcff', fontSize: 12 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  });
                }}
              />

              <ChartTooltip
                cursor={false}
                content={(
                  <ChartTooltipContent
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });
                    }}
                    indicator="dot"
                  />
                )}
              />

              <Area
                dataKey="income"
                type="natural"
                fill="url(#fillMobile)"
                stroke="hsl(260 90% 65%)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="outcome"
                type="natural"
                fill="url(#fillDesktop)"
                stroke="hsl(190 90% 60%)"
                strokeWidth={2}
                stackId="a"
              />

              <ChartLegend
                content={<ChartLegendContent payload={chartConfig} />}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
