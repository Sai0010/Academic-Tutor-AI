package com.example.academictutor.model

data class TutorResponse(
    val concept_explanation: string,
    val step_by_step_solution: List<String>,
    val key_concepts: List<String>,
    val practice_question: String
)
