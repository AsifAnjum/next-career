import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Building2 } from "lucide-react";

interface CompanyInfoProps {
  companyName: string;
  companyDetails: string;
}

export function CompanyInfo({ companyName, companyDetails }: CompanyInfoProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white flex items-center">
          <Building2 className="h-5 w-5 mr-2" />
          {companyName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 mb-4">{companyDetails}</p>
      </CardContent>
    </Card>
  );
}
