export function analyzeEmailHeader(headerText: string) {
  const lines = headerText.split('\n');
  const result: any = {
    from: '',
    to: '',
    subject: '',
    date: '',
    receivedChain: [],
    spamScore: '',
    authenticationResults: {
      server: '',
      dkim: '',
      spf: '',
      dmarc: '',
    },
    senderMessageId: '',
    recipientMessageId: '',
    returnPath: '',
    envelopeFrom: '',
  };

  lines.forEach(line => {
    if (line.startsWith('From:')) result.from = line.substring(5).trim();
    if (line.startsWith('To:')) result.to = line.substring(3).trim();
    if (line.startsWith('Subject:')) result.subject = line.substring(8).trim();
    if (line.startsWith('Date:')) result.date = line.substring(5).trim();
    if (line.startsWith('Received:')) result.receivedChain.push(line.substring(9).trim());
    if (line.includes('X-Spam-Score:')) result.spamScore = line.split(':')[1].trim();
    if (line.startsWith('Authentication-Results:')) {
      const authParts = line.split(':');
      result.authenticationResults.server = authParts[1].trim();
      const authDetails = authParts.slice(2).join(':').trim();
      
      const dkimMatch = authDetails.match(/dkim=([^;\s]+)/);
      if (dkimMatch) {
        result.authenticationResults.dkim = dkimMatch[1];
      }
      
      const spfMatch = authDetails.match(/spf=([^;\s]+)/);
      if (spfMatch) {
        result.authenticationResults.spf = spfMatch[1];
      }
      
      const dmarcMatch = authDetails.match(/dmarc=([^;\s]+)/);
      if (dmarcMatch) {
        result.authenticationResults.dmarc = dmarcMatch[1];
      }
    }
    if (line.startsWith('DKIM-Signature:')) {
      result.authenticationResults.dkim = 'present';
    }
    if (line.startsWith('Received-SPF:')) {
      const spfParts = line.split(' ');
      result.authenticationResults.spf = spfParts[1];
    }
    if (line.startsWith('Message-ID:') && !result.senderMessageId) result.senderMessageId = line.substring(11).trim();
    if (line.startsWith('Return-Path:')) result.returnPath = line.substring(12).trim();
    if (line.startsWith('X-Envelope-From:')) result.envelopeFrom = line.substring(16).trim();
  });

  // Find the last Message-ID in the header, which is likely from the recipient server
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith('Message-ID:')) {
      result.recipientMessageId = lines[i].substring(11).trim();
      break;
    }
  }

  return result;
}