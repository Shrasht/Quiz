const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Load questions
const questions = JSON.parse(fs.readFileSync("questions.json", "utf-8"));

// Get all questions (without answers)
app.get("/quiz", (req, res) => {
  const quiz = questions.map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options,
  }));
  res.json(quiz);
});

// Submit answer
app.post("/quiz/:id/answer", (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;
  const question = questions.find((q) => q.id == id);

  if (!question) return res.status(404).json({ message: "Question not found" });
  const isCorrect = question.answer === answer;
  res.json({ correct: isCorrect });
});

app.listen(PORT, () => console.log(`Quiz API running on port ${PORT}`));
