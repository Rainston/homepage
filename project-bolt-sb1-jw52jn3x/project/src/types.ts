export interface Question {
  id: string;
  text: string;
  type: 'technical' | 'non-technical';
}

export interface Course {
  id: number;
  name: string;
  description: string;
  videoUrl: string;
  courseUrl: string;
  backgroundVideo: string;
}

export interface UserResponses {
  [key: string]: number;
}

export interface CourseAllocations {
  [key: number]: {
    A: string[];
    B: string[];
    C: string[];
    D: string[];
  };
}