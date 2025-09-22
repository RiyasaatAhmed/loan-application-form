import { Card, Text } from "@salt-ds/core";

type IconColor = "blue" | "green" | "yellow" | "red";

interface LoanCardProps {
  value: number;
  title: string;
  icon: React.ReactNode;
  iconColor: IconColor;
}

function getIconColor(icon: IconColor) {
  if (!icon) {
    return "bg-gray-100";
  }
  switch (icon) {
    case "blue":
      return "bg-blue-100";
    case "green":
      return "bg-green-100";
    case "yellow":
      return "bg-yellow-100";
    case "red":
      return "bg-red-100";
  }
}

export function LoanCard({ value, title, icon, iconColor }: LoanCardProps) {
  return (
    <Card className="rounded-md! border-l-0! border-r-0! border-t-0! border-black! text-center shadow-none!">
      <div
        className={`w-12 h-12 rounded-xl  flex items-center justify-center mx-auto mb-4 ${getIconColor(
          iconColor
        )}`}
      >
        {icon}
      </div>
      <Text styleAs="h2">{value}</Text>
      <Text styleAs="label" className="font-medium!">
        {title}
      </Text>
    </Card>
  );
}
