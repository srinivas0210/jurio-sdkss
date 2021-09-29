export default interface Notification {
    id: number;
    sender_id: number;
    sender_name: string;
    content: string;
    contact_ids: number[];
    created_at: string;
    updated_at: string;
}
