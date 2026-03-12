export interface TutorResponse {
  concept_explanation: string;
  step_by_step_solution: string[];
  key_concepts: string[];
  practice_question: string;
}

export interface TutorState {
  input: string;
  loading: boolean;
  result: TutorResponse | null;
  error: string | null;
}
