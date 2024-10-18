import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import HeaderAnalysisResult from './HeaderAnalysisResult';
import { analyzeEmailHeader } from '../utils/emailHeaderAnalyzer';

const EmailHeaderAnalyzer: React.FC = () => {
  const [headerText, setHeaderText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!headerText.trim()) {
      toast({
        title: "Error",
        description: "Please enter email header information.",
        variant: "destructive",
      });
      return;
    }

    const result = analyzeEmailHeader(headerText);
    setAnalysisResult(result);
    toast({
      title: "Analysis Complete",
      description: "Email header has been analyzed successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="Paste your email header here..."
        value={headerText}
        onChange={(e) => setHeaderText(e.target.value)}
        className="min-h-[200px]"
      />
      <Button onClick={handleAnalyze} className="w-full">
        Analyze Header
      </Button>
      {analysisResult && <HeaderAnalysisResult result={analysisResult} />}
    </div>
  );
};

export default EmailHeaderAnalyzer;