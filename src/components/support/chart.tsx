import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SupportUs() {
  return <CostOfHackingSection />;
}

function CostOfHackingSection() {
  const costs = [
    { label: 'Rent', value: 2700, color: 'rgb(255, 99, 132)' },
    { label: 'Accounting', value: 60, color: 'rgb(54, 162, 235)' },
    { label: 'Utilities', value: 250, color: 'rgb(255, 206, 86)' },
  ];

  const total = costs.reduce((sum, cost) => sum + cost.value, 0);

  return (
    <section
      id="cost-of-hacking"
      className="bg-gray-100 py-20 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold dark:text-white">
          Cost of Hacking
        </h2>
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Monthly Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center md:flex-row">
              <div className="relative mb-8 h-64 w-64 md:mb-0 md:mr-8">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {costs.map((cost, index) => {
                    const startAngle = costs
                      .slice(0, index)
                      .reduce((sum, c) => sum + (c.value / total) * 360, 0);
                    const endAngle = startAngle + (cost.value / total) * 360;
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                    const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                    const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);
                    const largeArcFlag =
                      endAngle - startAngle <= 180 ? '0' : '1';

                    return (
                      <path
                        key={cost.label}
                        d={`M50,50 L${x1},${y1} A40,40 0 ${largeArcFlag},1 ${x2},${y2} Z`}
                        fill={cost.color}
                      />
                    );
                  })}
                  <circle cx="50" cy="50" r="25" fill="white" />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="8"
                    fill="#333">
                    ${total}
                  </text>
                </svg>
              </div>
              <div className="space-y-4">
                {costs.map((cost) => (
                  <div key={cost.label} className="flex items-center">
                    <div
                      className="mr-2 h-4 w-4"
                      style={{ backgroundColor: cost.color }}></div>
                    <span className="text-lg dark:text-white">
                      {cost.label}: ${cost.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
