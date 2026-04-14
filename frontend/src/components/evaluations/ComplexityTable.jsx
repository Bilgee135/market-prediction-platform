/*
 * components/evaluations/ComplexityTable.jsx
 *
 * What this is:
 *   The secondary table on EvaluationsPage showing training speed and
 *   model complexity for all six models.
 *
 * Where it is used:
 *   EvaluationsPage.jsx, right column, below AccuracyTable.
 *
 * What it should contain:
 *   - Columns: Model, Training Time (with pip bar visual), Complexity
 *   - Training time rendered as filled pip bars (1 to 4) not raw numbers
 *   - Complexity rendered as filled dots (1 to 4)
 *   - One row per model
 *
 * Props:
 *   models   array of model objects with complexity and training metadata
 *
 * Development order:
 *   Build alongside AccuracyTable as part of the EvaluationsPage work.
 */
