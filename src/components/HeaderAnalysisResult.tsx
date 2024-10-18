import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface HeaderAnalysisResultProps {
  result: {
    from: string;
    to: string;
    subject: string;
    date: string;
    receivedChain: string[];
    spamScore?: string;
    authenticationResults?: string;
  };
}

const HeaderAnalysisResult: React.FC<HeaderAnalysisResultProps> = ({ result }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Header Analysis</CardTitle>
        <CardDescription>Human-readable breakdown of the email header</CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold">From:</dt>
            <dd>{result.from}</dd>
          </div>
          <div>
            <dt className="font-semibold">To:</dt>
            <dd>{result.to}</dd>
          </div>
          <div>
            <dt className="font-semibold">Subject:</dt>
            <dd>{result.subject}</dd>
          </div>
          <div>
            <dt className="font-semibold">Date:</dt>
            <dd>{result.date}</dd>
          </div>
          <div>
            <dt className="font-semibold">Email Journey:</dt>
            <dd>
              <ol className="list-decimal list-inside">
                {result.receivedChain.map((hop, index) => (
                  <li key={index}>{hop}</li>
                ))}
              </ol>
            </dd>
          </div>
          {result.spamScore && (
            <div>
              <dt className="font-semibold">Spam Score:</dt>
              <dd>{result.spamScore}</dd>
            </div>
          )}
          {result.authenticationResults && (
            <div>
              <dt className="font-semibold">Authentication Results:</dt>
              <dd>{result.authenticationResults}</dd>
            </div>
          )}
        </dl>
      </CardContent>
    </Card>
  );
};

export default HeaderAnalysisResult;