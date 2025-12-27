import React, { useState } from "react";

interface Question {
  id: string;
  type: "multiple-choice" | "rating" | "text";
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

interface ChartData {
  label: string;
  value: number;
}

const Header = ({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) => {
  const tabs = ["Builder", "Preview", "Responses"];
  
  return (
    <header className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Survey Builder</h1>
          <nav className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => onTabChange(tab)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab
                    ? "bg-white text-indigo-600 font-semibold"
                    : "hover:bg-indigo-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const QuestionForm = ({ onAdd }: { onAdd: (question: Question) => void }) => {
  const [type, setType] = useState<"multiple-choice" | "rating" | "text">("multiple-choice");
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState("Option 1, Option 2, Option 3");
  const [required, setRequired] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    const question: Question = {
      id: Date.now().toString(),
      type,
      title,
      required,
      options: type === "multiple-choice" ? options.split(",").map(o => o.trim()) : undefined,
    };
    
    onAdd(question);
    setTitle("");
    setOptions("Option 1, Option 2, Option 3");
    setRequired(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-lg font-semibold text-gray-800">Add Question</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "multiple-choice" | "rating" | "text")}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="multiple-choice">Multiple Choice</option>
          <option value="rating">Rating (1-5)</option>
          <option value="text">Text Response</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter your question"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      
      {type === "multiple-choice" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Options (comma-separated)</label>
          <input
            type="text"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      )}
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="required"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="required" className="ml-2 text-sm text-gray-700">Required</label>
      </div>
      
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Add Question
      </button>
    </form>
  );
};

const SurveyPreview = ({ survey }: { survey: Survey }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{survey.title}</h2>
      <p className="text-gray-600 mb-6">{survey.description}</p>
      
      {survey.questions.length === 0 ? (
        <p className="text-gray-500 italic">No questions added yet. Use the Builder to add questions.</p>
      ) : (
        <div className="space-y-6">
          {survey.questions.map((q, index) => (
            <div key={q.id} className="border-b border-gray-200 pb-4">
              <p className="font-medium text-gray-800 mb-2">
                {index + 1}. {q.title} {q.required && <span className="text-red-500">*</span>}
              </p>
              
              {q.type === "multiple-choice" && q.options && (
                <div className="space-y-2 ml-4">
                  {q.options.map((opt, i) => (
                    <label key={i} className="flex items-center">
                      <input type="radio" name={q.id} className="mr-2" disabled />
                      <span className="text-gray-700">{opt}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {q.type === "rating" && (
                <div className="flex space-x-2 ml-4">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} className="w-10 h-10 border border-gray-300 rounded-md hover:bg-indigo-100" disabled>
                      {n}
                    </button>
                  ))}
                </div>
              )}
              
              {q.type === "text" && (
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 ml-0"
                  rows={3}
                  placeholder="Your answer..."
                  disabled
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const BarChart = ({ data, title }: { data: ChartData[]; title: string }) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="w-24 text-sm text-gray-600 truncate">{item.label}</span>
            <div className="flex-1 mx-3">
              <div className="bg-gray-200 rounded-full h-6">
                <div
                  className="bg-indigo-600 rounded-full h-6 flex items-center justify-end pr-2"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  <span className="text-white text-xs font-medium">{item.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ResponseVisualization = ({ survey, responses }: { survey: Survey; responses: Response[] }) => {
  const getChartData = (question: Question): ChartData[] => {
    const questionResponses = responses.filter(r => r.questionId === question.id);
    
    if (question.type === "multiple-choice" && question.options) {
      return question.options.map(opt => ({
        label: opt,
        value: questionResponses.filter(r => r.answer === opt).length,
      }));
    }
    
    if (question.type === "rating") {
      return [1, 2, 3, 4, 5].map(n => ({
        label: `${n} Star${n > 1 ? "s" : ""}`,
        value: questionResponses.filter(r => r.answer === n).length,
      }));
    }
    
    return [{ label: "Text Responses", value: questionResponses.length }];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Response Summary</h2>
        <p className="text-gray-600">Total responses: {responses.length > 0 ? Math.ceil(responses.length / survey.questions.length) : 0}</p>
      </div>
      
      {survey.questions.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500 italic">No questions to visualize. Add questions in the Builder.</p>
        </div>
      ) : (
        survey.questions.map((q) => (
          <BarChart key={q.id} data={getChartData(q)} title={q.title} />
        ))
      )}
    </div>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("Builder");
  const [survey, setSurvey] = useState<Survey>({
    id: "1",
    title: "Customer Satisfaction Survey",
    description: "Help us improve our services by answering a few questions.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        title: "How did you hear about us?",
        options: ["Social Media", "Friend", "Search Engine", "Advertisement"],
        required: true,
      },
      {
        id: "q2",
        type: "rating",
        title: "How would you rate our service?",
        required: true,
      },
      {
        id: "q3",
        type: "text",
        title: "Any additional feedback?",
        required: false,
      },
    ],
  });

  const [responses] = useState<Response[]>([
    { questionId: "q1", answer: "Social Media" },
    { questionId: "q2", answer: 5 },
    { questionId: "q3", answer: "Great service!" },
    { questionId: "q1", answer: "Friend" },
    { questionId: "q2", answer: 4 },
    { questionId: "q3", answer: "Very helpful" },
    { questionId: "q1", answer: "Social Media" },
    { questionId: "q2", answer: 5 },
    { questionId: "q3", answer: "Will recommend" },
    { questionId: "q1", answer: "Search Engine" },
    { questionId: "q2", answer: 3 },
    { questionId: "q3", answer: "Good" },
    { questionId: "q1", answer: "Social Media" },
    { questionId: "q2", answer: 4 },
    { questionId: "q3", answer: "Nice experience" },
  ]);

  const addQuestion = (question: Question) => {
    setSurvey(prev => ({
      ...prev,
      questions: [...prev.questions, question],
    }));
  };

  const removeQuestion = (id: string) => {
    setSurvey(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "Builder" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <QuestionForm onAdd={addQuestion} />
            </div>
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions ({survey.questions.length})</h3>
                {survey.questions.length === 0 ? (
                  <p className="text-gray-500 italic">No questions yet.</p>
                ) : (
                  <ul className="space-y-3">
                    {survey.questions.map((q, index) => (
                      <li key={q.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                        <div>
                          <span className="font-medium">{index + 1}. {q.title}</span>
                          <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">{q.type}</span>
                        </div>
                        <button
                          onClick={() => removeQuestion(q.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === "Preview" && <SurveyPreview survey={survey} />}
        
        {activeTab === "Responses" && <ResponseVisualization survey={survey} responses={responses} />}
      </main>
    </div>
  );
};

export default App;