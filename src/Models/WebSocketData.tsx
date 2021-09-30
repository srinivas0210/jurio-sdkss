export default interface WebSocketData {
    id: number;
    sender_id: number
    sender_name: string;
    created_at: string;
    updated_at: string;
    contact_ids: [];
    content: string;
    conversation_id: number
}
