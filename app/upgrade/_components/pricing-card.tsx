"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Diamond, Crown } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  subtitle?: string;
  features: string[];
  buttonText: string;
  buttonVariant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  isCurrent?: boolean;
  isHighlighted?: boolean;
  badge?: string;
  icon: "diamond" | "crown";
  onButtonClick: () => void;
}

export function PricingCard({
  title,
  price,
  subtitle,
  features,
  buttonText,
  buttonVariant = "default",
  isCurrent = false,
  isHighlighted = false,
  badge,
  icon,
  onButtonClick,
}: PricingCardProps) {
  const IconComponent = icon === "diamond" ? Diamond : Crown;

  return (
    <Card className={`relative ${isHighlighted ? "border-blue-500" : ""}`}>
      {badge && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white">
          {badge}
        </Badge>
      )}

      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-2">
          <IconComponent className="h-6 w-6 text-gray-600" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="space-y-1">
          <div className="text-3xl font-bold">{price}</div>
          {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          onClick={onButtonClick}
          variant={buttonVariant}
          className="w-full"
          disabled={isCurrent}
        >
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
}
