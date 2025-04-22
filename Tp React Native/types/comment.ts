import { DocumentReference, Timestamp } from "firebase/firestore";

export interface comment {
    id?:string,
    ticketId: DocumentReference;
    userId: DocumentReference;
    content: string;
    createdAt: Timestamp;
    attachmentUrl?: string;
}