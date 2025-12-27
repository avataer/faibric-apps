import React, { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: string;
  dueDate: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

interface Board {
  id: string;
  name: string;
  columns: Column[];
}

interface NavigationHeaderProps {
  currentBoard: string;
  boards: Board[];
  onBoardChange: (boardId: string) => void;
  onAddTask: () => void;
}

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string, columnId: string) => void;
  columnId: string;
}

interface KanbanColumnProps {
  column: Column;
  onDragStart: (e: React.DragEvent, taskId: string, columnId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
}

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (task: Omit<Task, "id">, columnId: string) => void;
  columns: Column[];
}

const sampleBoards: Board[] = [
  {
    id: "board-1",
    name: "Product Development",
    columns: [
      {
        id: "todo",
        title: "To Do",
        tasks: [
          {
            id: "task-1",
            title: "Design new landing page",
            description: "Create wireframes and mockups for the new landing page redesign",
            priority: "high",
            assignee: "Sarah Chen",
            dueDate: "2024-02-15"
          },
          {
            id: "task-2",
            title: "Update documentation",
            description: "Review and update API documentation for version 2.0",
            priority: "low",
            assignee: "Mike Johnson",
            dueDate: "2024-02-20"
          }
        ]
      },
      {
        id: "in-progress",
        title: "In Progress",
        tasks: [
          {
            id: "task-3",
            title: "Implement user authentication",
            description: "Add OAuth 2.0 support for Google and GitHub login",
            priority: "high",
            assignee: "Alex Rivera",
            dueDate: "2024-02-10"
          },
          {
            id: "task-4",
            title: "Fix mobile responsiveness",
            description: "Address layout issues on smaller screen sizes",
            priority: "medium",
            assignee: "Sarah Chen",
            dueDate: "2024-02-12"
          }
        ]
      },
      {
        id: "review",
        title: "In Review",
        tasks: [
          {
            id: "task-5",
            title: "Database optimization",
            description: "Optimize queries and add proper indexing",
            priority: "medium",
            assignee: "Jordan Lee",
            dueDate: "2024-02-08"
          }
        ]
      },
      {
        id: "done",
        title: "Done",
        tasks: [
          {
            id: "task-6",
            title: "Setup CI/CD pipeline",
            description: "Configure automated testing and deployment",
            priority: "high",
            assignee: "Alex Rivera",
            dueDate: "2024-02-01"
          }
        ]
      }
    ]
  },
  {
    id: "board-2",
    name: "Marketing Campaign",
    columns: [
      { id: "todo", title: "To Do", tasks: [] },
      { id: "in-progress", title: "In Progress", tasks: [] },
      { id: "review", title: "In Review", tasks: [] },
      { id: "done", title: "Done", tasks: [] }
    ]
  }
];

function NavigationHeader({ currentBoard, boards, onBoardChange, onAddTask }: NavigationHeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentBoardData = boards.find(b => b.id === currentBoard);

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
              </svg>
              <span className="text-white text-xl font-bold">TaskFlow</span>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <span>{currentBoardData?.name || "Select Board"}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 py-2">
                  {boards.map(board => (
                    <button
                      key={board.id}
                      onClick={() => {
                        onBoardChange(board.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
                        board.id === currentBoard ? "bg-indigo-50 text-indigo-600" : "text-gray-700"
                      }`}
                    >
                      {board.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onAddTask}
              className="flex items-center space-x-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Task</span>
            </button>
            
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function TaskCard({ task, onDragStart, columnId }: TaskCardProps) {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id, columnId)}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab hover:shadow-md transition-shadow active:cursor-grabbing"
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-gray-500 text-xs mb-3 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-indigo-600 text-xs font-medium">
              {task.assignee.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <span className="text-xs text-gray-500">{task.assignee}</span>
        </div>
        <span className="text-xs text-gray-400">{task.dueDate}</span>
      </div>
    </div>
  );
}

function KanbanColumn({ column, onDragStart, onDragOver, onDrop }: KanbanColumnProps) {
  const columnColors: Record<string, string> = {
    "todo": "border-t-gray-400",
    "in-progress": "border-t-blue-500",
    "review": "border-t-yellow-500",
    "done": "border-t-green-500"
  };

  return (
    <div
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, column.id)}
      className={`bg-gray-100 rounded-lg p-4 min-w-[300px] max-w-[300px] border-t-4 ${columnColors[column.id] || "border-t-gray-400"}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-700">{column.title}</h3>
        <span className="bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-full">
          {column.tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {column.tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onDragStart={onDragStart}
            columnId={column.id}
          />
        ))}
        {column.tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-300 rounded-lg">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}

function AddTaskModal({ isOpen, onClose, onAddTask, columns }: AddTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(columns[0]?.id || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && assignee && dueDate) {
      onAddTask({ title, description, priority, assignee, dueDate }, selectedColumn);
      setTitle("");
      setDescription("");
      setPriority("medium");
      setAssignee("");
      setDueDate("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Column</label>
              <select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {columns.map(col => (
                  <option key={col.id} value={col.id}>{col.title}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [boards, setBoards] = useState<Board[]>(sampleBoards);
  const [currentBoardId, setCurrentBoardId] = useState(sampleBoards[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedTask, setDraggedTask] = useState<{ taskId: string; fromColumnId: string } | null>(null);

  const currentBoard = boards.find(b => b.id === currentBoardId);

  const handleDragStart = (e: React.DragEvent, taskId: string, columnId: string) => {
    setDraggedTask({ taskId, fromColumnId: columnId });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    if (!draggedTask || !currentBoard) return;

    const { taskId, fromColumnId } = draggedTask;
    if (fromColumnId === toColumnId) return;

    setBoards(prevBoards => {
      return prevBoards.map(board => {
        if (board.id !== currentBoardId) return board;

        const fromColumn = board.columns.find(c => c.id === fromColumnId);
        const task = fromColumn?.tasks.find(t => t.id === taskId);
        if (!task) return board;

        return {
          ...board,
          columns: board.columns.map(column => {
            if (column.id === fromColumnId) {
              return { ...column, tasks: column.tasks.filter(t => t.id !== taskId) };
            }
            if (column.id === toColumnId) {
              return { ...column, tasks: [...column.tasks, task] };
            }
            return column;
          })
        };
      });
    });

    setDraggedTask(null);
  };

  const handleAddTask = (task: Omit<Task, "id">, columnId: string) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`
    };

    setBoards(prevBoards => {
      return prevBoards.map(board => {
        if (board.id !== currentBoardId) return board;
        return {
          ...board,
          columns: board.columns.map(column => {
            if (column.id === columnId) {
              return { ...column, tasks: [...column.tasks, newTask] };
            }
            return column;
          })
        };
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationHeader
        currentBoard={currentBoardId}
        boards={boards}
        onBoardChange={setCurrentBoardId}
        onAddTask={() => setIsModalOpen(true)}
      />
      
      <main className="max-w-full mx-auto px-6 py-8">
        <div className="flex space-x-6 overflow-x-auto pb-4">
          {currentBoard?.columns.map(column => (
            <KanbanColumn
              key={column.id}
              column={column}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </main>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
        columns={currentBoard?.columns || []}
      />
    </div>
  );
}

export default App;