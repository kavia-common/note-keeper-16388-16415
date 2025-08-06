export interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  folder?: string;
  created_at?: string;
  updated_at?: string;
}
