export function analyzeEmailHeader(headerText: string) {
  const lines = headerText.split('\n');
  const result: any = {
    from: '',
    to: '',
    subject: '',
    date: '',
    receivedChain: [],
    spamScore: '',
    authenticationResults: '',
  };

  lines.forEach(line => {
    if (line.startsWith('From:')) result.from = line.substring(5).trim();
    if (line.startsWith('To:')) result.to = line.substring(3).trim();
    if (line.startsWith('Subject:')) result.subject = line.substring(8).trim();
    if (line.startsWith('Date:')) result.date = line.substring(5).trim();
    if (line.startsWith('Received:')) result.receivedChain.push(line.substring(9).trim());
    if (line.includes('X-Spam-Score:')) result.spamScore = line.split(':')[1].trim();
    if (line.startsWith('Authentication-Results:')) result.authenticationResults = line.substring(24).trim();
  });

  return result;
}