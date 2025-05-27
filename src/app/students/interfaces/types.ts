export type Students = {
    id:       string;
    name:     string;
    age:      number;
    email:    string;
    gender:   string;
    nickname: string;
    subjects: string[];
    grades: string[];
}

export type StudentStore = {
    students: Array<Students>;
    getStudents: (limit: number, oofset: number) => Promise<void>
}

export type StoreSet = 
    (partial: 
        StudentStore |
        Partial<StudentStore> |
        ((state: StudentStore) => StudentStore |
    Partial<StudentStore>),
    replace?: 
        boolean | undefined) => void
        
    
