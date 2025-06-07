export interface ChatMessage {
    id: string;
    user_id: string;
    message: string;
    response: string;
    type: 'text' | 'image';
    created_at: string;
} 