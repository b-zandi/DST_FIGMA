import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, Shield, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function EducationalCalculator() {
  const [propertyValue, setPropertyValue] = useState(1000000);
  const [exchangeValue, setExchangeValue] = useState(800000);
  const [targetYield, setTargetYield] = useState(6);
  const [depreciationRate, setDepreciationRate] = useState(3.5);

  // Educational calculations
  const potentialAnnualIncome = (exchangeValue * targetYield) / 100;
  const potentialMonthlyIncome = potentialAnnualIncome / 12;
  const potentialDepreciation = (exchangeValue * depreciationRate) / 100;
  const capitalGainsDeferral = (propertyValue - exchangeValue) * 0.15; // Estimated capital gains tax

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg border-0">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calculator className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl text-gray-900">DST Educational Calculator</CardTitle>
          </div>
          <CardDescription className="text-gray-600 max-w-2xl mx-auto">
            Explore hypothetical scenarios to understand how Delaware Statutory Trusts work. 
            These are educational examples only and not investment advice.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Educational Disclaimer */}
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Educational Tool:</strong> This calculator provides hypothetical scenarios for learning purposes. 
              Actual DST performance varies and past performance doesn't guarantee future results. 
              Consult with qualified professionals for personalized advice.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Educational Scenario
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="propertyValue" className="text-sm font-medium text-gray-700">
                    Original Property Value
                  </Label>
                  <Input
                    id="propertyValue"
                    type="number"
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Value of property being sold in 1031 exchange</p>
                </div>

                <div>
                  <Label htmlFor="exchangeValue" className="text-sm font-medium text-gray-700">
                    DST Investment Amount
                  </Label>
                  <Input
                    id="exchangeValue"
                    type="number"
                    value={exchangeValue}
                    onChange={(e) => setExchangeValue(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Amount being invested in DST</p>
                </div>

                <div>
                  <Label htmlFor="targetYield" className="text-sm font-medium text-gray-700">
                    Hypothetical Annual Yield (%)
                  </Label>
                  <Input
                    id="targetYield"
                    type="number"
                    step="0.1"
                    value={targetYield}
                    onChange={(e) => setTargetYield(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Educational example yield for learning</p>
                </div>

                <div>
                  <Label htmlFor="depreciationRate" className="text-sm font-medium text-gray-700">
                    Estimated Depreciation Rate (%)
                  </Label>
                  <Input
                    id="depreciationRate"
                    type="number"
                    step="0.1"
                    value={depreciationRate}
                    onChange={(e) => setDepreciationRate(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical commercial real estate depreciation</p>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Educational Results
              </h3>
              
              <div className="space-y-4">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Potential Income (Hypothetical)</h4>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-blue-800">{formatCurrency(potentialAnnualIncome)}</p>
                      <p className="text-sm text-blue-600">Annual ({formatCurrency(potentialMonthlyIncome)}/month)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-green-900 mb-2">Tax Benefits (Educational)</h4>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-green-800">{formatCurrency(potentialDepreciation)}</p>
                      <p className="text-sm text-green-600">Annual depreciation deduction</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-purple-900 mb-2">1031 Exchange Benefit</h4>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-purple-800">{formatCurrency(capitalGainsDeferral)}</p>
                      <p className="text-sm text-purple-600">Estimated capital gains tax deferred</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Key Learning Points:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• DSTs provide passive real estate investment</li>
                  <li>• 1031 exchanges defer capital gains taxes</li>
                  <li>• Depreciation can offset taxable income</li>
                  <li>• Professional guidance is essential</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}