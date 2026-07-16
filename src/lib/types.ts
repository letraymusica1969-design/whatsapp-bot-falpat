interface WhatsAppMessage {
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: { body: string };
}

interface WhatsAppWebhookBody {
  object: string;
  entry: {
    changes: {
      value: {
        messages: WhatsAppMessage[];
      };
    }[];
  }[];
}

export type { WhatsAppMessage, WhatsAppWebhookBody };
