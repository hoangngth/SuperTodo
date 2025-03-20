export interface Todo {
    id: string;
    title: string;
    isCompleted: boolean;
    createdAt: Date;
    notes?: string;
}
  
export type UserRole = 'free' | 'paid';