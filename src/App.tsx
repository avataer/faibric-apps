import React, { useState } from "react";

interface NavItem {
  id: string;
  label: string;
  active: boolean;
}

interface NavigationHeaderProps {
  title: string;
  items: NavItem[];
  onItemClick: (id: string) => void;
}

interface ChartDataPoint {
  label: string;
  value: number;
}

interface ChartLineProps {
  data: ChartDataPoint[];
  title: string;
  color?: string;
}

interface FormField {
  id: string;
  type: "text" | "select" | "radio";
  label: string;
  options?: string[];
  value: string;
}

interface FormDefaultProps {
  fields: FormField[];
  onSubmit: (values: Record<string, string>) => void;
  submitLabel: string;
}

interface Question {
  id: string;
  type: "multiple_choice" | "rating" | "text";
  title: string;
  options?: string[];
  required: boolean;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Response {
  questionId: string;
  answer: string | number;
}

function NavigationHeader({ title, items, onItemClick }: NavigationHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <nav className="flex space-x-1">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  item.active
                    ? "bg-white text-indigo-600 shadow-md"
                    : "text-white hover:bg-white/20"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function ChartLine({ data, title, color = "#6366f1" }: ChartLineProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const chartHeight = 200;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="relative" style={{ height: chartHeight }}>
        <svg width="100%" height={chartHeight} className="overflow-visible">
          {data.map((point, index) => {
            const x = (index / (data.length - 1 || 1)) * 100;
            const y = chartHeight - (point.value / maxValue) * (chartHeight - 20);
            return (
              <g key={point.label}>
                {index > 0 && (
                  <line
                    x1={`${((index - 1) / (data.length - 1 || 1)) * 100}%`}
                    y1={chartHeight - (data[index - 1].value / maxValue) * (chartHeight - 20)}
                    x2={`${x}%`}
                    y2={y}
                    stroke={color}
                    strokeWidth="3"
                  />
                )}
                <circle cx={`${x}%`} cy={y} r="6" fill={color} />
                <text
                  x={`${x}%`}
                  y={chartHeight + 16}
                  textAnchor="middle"
                  className="text-xs fill-gray-500"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function FormDefault({ fields, onSubmit, submitLabel }: FormDefaultProps) {
  const [values, setValues] = useState<Record<string, string>(
    fields.reduce((acc, field) => ({ ...acc, [field.id]: field.value }), {})
  );

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">{field.label}</label>
          {field.type === "text" && (
            <input
              type="text"
              value={values[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          )}
          {field.type === "select" && (
            <select
              value={values[field.id] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Select an option</option>
              {field.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
          {field.type === "radio" && (
            <div className="flex flex-wrap gap-4">
              {field.options?.map((opt) => (
                <label key={opt} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={field.id}
                    value={opt}
                    checked={values[field.id] === opt}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function QuestionBuilder({ onAddQuestion }: { onAddQuestion: (q: Question) => void }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<Question["type"]>("text");
  const [options, setOptions] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    const newQuestion: Question = {
      id: Date.now().toString(),
      type,
      title,
      options: type === "multiple_choice" ? options.split(",").map((o) => o.trim()).filter(Boolean) : 
               type === "rating" ? ["1", "2", "3", "4", "5"] : undefined,
      required: true,
    };
    onAddQuestion(newQuestion);
    setTitle("");
    setOptions("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Add New Question</h3>
      <input
        type="text"
        placeholder="Question title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as Question["type"])}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
      >
        <option value="text">Text Answer</option>
        <option value="multiple_choice">Multiple Choice</option>
        <option value="rating">Rating (1-5)</option>
      </select>
      {type === "multiple_choice" && (
        <input
          type="text"
          placeholder="Options (comma-separated)"
          value={options}
          onChange={(e) => setOptions(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      )}
      <button
        onClick={handleAdd}
        className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
      >
        Add Question
      </button>
    </div>
  );
}

function SurveyPreview({ survey, onSubmit }: { survey: Survey; onSubmit: (responses: Response[]) => void }) {
  const [responses, setResponses] = useState<Record<string, string>({});

  const handleSubmit = () => {
    const formattedResponses = Object.entries(responses).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
    onSubmit(formattedResponses);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800">{survey.title}</h2>
        <p className="text-gray-600 mt-1">{survey.description}</p>
      </div>
      {survey.questions.map((q, idx) => (
        <div key={q.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {idx + 1}. {q.title} {q.required && <span className="text-red-500">*</span>}
          </label>
          {q.type === "text" && (
            <textarea
              value={responses[q.id] || ""}
              onChange={(e) => setResponses((prev) => ({ ...prev, [q.id]: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          )}
          {q.type === "multiple_choice" && (
            <div className="space-y-2">
              {q.options?.map((opt) => (
                <label key={opt} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={responses[q.id] === opt}
                    onChange={(e) => setResponses((prev) => ({ ...prev, [q.id]: e.target.value }))}
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          )}
          {q.type === "rating" && (
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setResponses((prev) => ({ ...prev, [q.id]: num.toString() }))}
                  className={`w-12 h-12 rounded-full font-semibold transition-all ${
                    responses[q.id] === num.toString()
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
      >
        Submit Response
      </button>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("builder");
  const [survey, setSurvey] = useState<Survey>({
    id: "1",
    title: "Customer Satisfaction Survey",
    description: "Please help us improve our service by answering a few questions.",
    questions: [
      { id: "q1", type: "rating", title: "How satisfied are you with our service?", required: true },
      { id: "q2", type: "multiple_choice", title: "How did you find us?", options: ["Social Media", "Search Engine", "Friend Referral", "Advertisement"], required: true },
      { id: "q3", type: "text", title: "Any additional feedback?", required: false },
    ],
  });
  const [allResponses, setAllResponses] = useState<Response[][]>([
    [{ questionId: "q1", answer: "4" }, { questionId: "q2", answer: "Social Media" }],
    [{ questionId: "q1", answer: "5" }, { questionId: "q2", answer: "Search Engine" }],
    [{ questionId: "q1", answer: "3" }, { questionId: "q2", answer: "Friend Referral" }],
  ]);

  const navItems: NavItem[] = [
    { id: "builder", label: "Builder", active: activeTab === "builder" },
    { id: "preview", label: "Preview", active: activeTab === "preview" },
    { id: "results", label: "Results", active: activeTab === "results" },
  ];

  const handleAddQuestion = (question: Question) => {
    setSurvey((prev) => ({ ...prev, questions: [...prev.questions, question] }));
  };

  const handleRemoveQuestion = (id: string) => {
    setSurvey((prev) => ({ ...prev, questions: prev.questions.filter((q) => q.id !== id) }));
  };

  const handleSubmitResponse = (responses: Response[]) => {
    setAllResponses((prev) => [...prev, responses]);
    setActiveTab("results");
  };

  const getChartData = (): ChartDataPoint[] => {
    const ratingQuestion = survey.questions.find((q) => q.type === "rating");
    if (!ratingQuestion) return [];
    const ratings = allResponses
      .map((r) => r.find((resp) => resp.questionId === ratingQuestion.id)?.answer)
      .filter((a): a is string | number => a !== undefined)
      .map((a) => Number(a));
    const counts = [1, 2, 3, 4, 5].map((num) => ({
      label: `${num} Star`,
      value: ratings.filter((r) => r === num).length,
    }));
    return counts;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader title="Survey Builder" items={navItems} onItemClick={setActiveTab} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        {activeTab === "builder" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Survey Details</h2>
              <input
                type="text"
                value={survey.title}
                onChange={(e) => setSurvey((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Survey Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <textarea
                value={survey.description}
                onChange={(e) => setSurvey((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Survey Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                rows={2}
              />
            </div>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions ({survey.questions.length})</h3>
              <div className="space-y-3">
                {survey.questions.map((q, idx) => (
                  <div key={q.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="text-sm text-indigo-600 font-medium">{q.type.replace("_", " ")}</span>
                      <p className="text-gray-800">{idx + 1}. {q.title}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <QuestionBuilder onAddQuestion={handleAddQuestion} />
          </div>
        )}
        {activeTab === "preview" && <SurveyPreview survey={survey} onSubmit={handleSubmitResponse} />}
        {activeTab === "results" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800">Response Summary</h2>
              <p className="text-gray-600 mt-1">Total responses: {allResponses.length}</p>
            </div>
            <ChartLine data={getChartData()} title="Rating Distribution" color="#6366f1" />
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Responses</h3>
              <div className="space-y-4">
                {allResponses.slice(-5).map((resp, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500 mb-2">Response #{allResponses.length - 4 + idx}</p>
                    {resp.map((r) => {
                      const question = survey.questions.find((q) => q.id === r.questionId);
                      return (
                        <p key={r.questionId} className="text-gray-700">
                          <span className="font-medium">{question?.title}:</span> {r.answer}
                        </p>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;