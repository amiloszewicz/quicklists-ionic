export interface Checklist {
  id: string;
  title: string;
  date: number;
}

export type AddChecklist = Pick<Checklist, 'title'>;
