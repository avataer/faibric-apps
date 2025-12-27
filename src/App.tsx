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

interface NavHeaderProps {
  currentBoard: string;
  boards: Board[];
  onBoardChange: (boardId: string) => void;
  onNewBoard: () => void;
}

interface CardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

interface TaskFormProps {
  task?: Task;
  onSubmit: (task: Omit<Task, "id">) => void;
  onCancel: () => void;
}

interface ColumnComponentProps {
  column: Column;
  onAddTask: (columnId: string) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onMoveTask: (taskId: string, direction: "left" | "right") => void;
}

const sampleBoards: Board[] = [
  {
    id: "board-1",
    name: "Product Development",
    columns: [
      {
        id: "col-1",
        title: "To Do",
        tasks: [
          {
            id: "task-1",
            title: "Design new dashboard",
            description: "Create wireframes and mockups for the analytics dashboard",
            priority: "high",
            assignee: "Sarah Chen",
            dueDate: "2024-02-15"
          },
          {
            id: "task-2",
            title: "Write API documentation",
            description: "Document all REST endpoints for the public API",
            priority: "medium",
            assignee: "Mike Johnson",
            dueDate: "2024-02-20"
          }
        ]
      },
      {
        id: "col-2",
        title: "In Progress",
        tasks: [
          {
            id: "task-3",
            title: "Implement user authentication",
            description: "Add OAuth2 support for Google and GitHub login",
            priority: "high",
            assignee: "Alex Rivera",
            dueDate: "2024-02-10"
          }
        ]
      },
      {
        id: "col-3",
        title: "Review",
        tasks: [
          {
            id: "task-4",
            title: "Code review for payment module",
            description: "Review and approve the Stripe integration PR",
            priority: "medium",
            assignee: "Emily Watson",
            dueDate: "2024-02-08"
          }
        ]
      },
      {
        id: "col-4",
        title: "Done",
        tasks: [
          {
            id: "task-5",
            title: "Set up CI/CD pipeline",
            description: "Configure GitHub Actions for automated testing and deployment",
            priority: "low",
            assignee: "David Kim",
            dueDate: "2024-02-01"
          }
        ]
      }
    ]
  }
];

function NavigationHeader({ currentBoard, boards, onBoardChange, onNewBoard }: NavHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
              </svg>
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            <select
              value={currentBoard}
              onChange={(e) => onBoardChange(e.target.value)}
              className="bg-white/20 border border-white/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              {boards.map((board) => (
                <option key={board.id} value={board.id} className="text-gray-800">
                  {board.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={onNewBoard}
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>New Board</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
        <div className="fixed inset-0 bg-gray-900/75 transition-opacity" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full mx-auto transform transition-all">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="px-6 py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}

function TaskForm({ task, onSubmit, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "medium",
    assignee: task?.assignee || "",
    dueDate: task?.dueDate || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Task, "id">);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task["priority"] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
        <input
          type="text"
          value={formData.assignee}
          onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
          {task ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}

function TaskCard({ task, onEdit, onDelete }: CardProps) {
  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800"
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>{task.assignee}</span>
        </div>
        <div className="flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{task.dueDate}</span>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 mt-3 pt-3 border-t border-gray-100">
        <button onClick={() => onEdit(task)} className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="text-red-600 hover:text-red-800 text-xs font-medium">
          Delete
        </button>
      </div>
    </div>
  );
}

function ColumnComponent({ column, onAddTask, onEditTask, onDeleteTask }: ColumnComponentProps) {
  const columnColors: Record<string, string> = {
    "To Do": "border-t-gray-400",
    "In Progress": "border-t-blue-500",
    "Review": "border-t-yellow-500",
    "Done": "border-t-green-500"
  };

  return (
    <div className={`bg-gray-50 rounded-lg p-4 min-w-[300px] border-t-4 ${columnColors[column.title] || "border-t-indigo-500"}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="font-semibold text-gray-800">{column.title}</h3>
          <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
            {column.tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(column.id)}
          className="text-gray-400 hover:text-indigo-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <div className="space-y-3">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
        ))}
      </div>
    </div>
  );
}

function App() {
  const [boards, setBoards] = useState<Board[]>(sampleBoards);
  const [currentBoardId, setCurrentBoardId] = useState(sampleBoards[0].id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const currentBoard = boards.find((b) => b.id === currentBoardId) || boards[0];

  const handleAddTask = (columnId: string) => {
    setActiveColumnId(columnId);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    setBoards(boards.map((board) => ({
      ...board,
      columns: board.columns.map((col) => ({
        ...col,
        tasks: col.tasks.filter((t) => t.id !== taskId)
      }))
    })));
  };

  const handleSubmitTask = (taskData: Omit<Task, "id">) => {
    if (editingTask) {
      setBoards(boards.map((board) => ({
        ...board,
        columns: board.columns.map((col) => ({
          ...col,
          tasks: col.tasks.map((t) => t.id === editingTask.id ? { ...t, ...taskData } : t)
        }))
      })));
    } else if (activeColumnId) {
      const newTask: Task = { ...taskData, id: `task-${Date.now()}` };
      setBoards(boards.map((board) => ({
        ...board,
        columns: board.columns.map((col) =>
          col.id === activeColumnId ? { ...col, tasks: [...col.tasks, newTask] } : col
        )
      })));
    }
    setIsModalOpen(false);
    setEditingTask(null);
    setActiveColumnId(null);
  };

  const handleNewBoard = () => {
    const newBoard: Board = {
      id: `board-${Date.now()}`,
      name: "New Board",
      columns: [
        { id: `col-${Date.now()}-1`, title: "To Do", tasks: [] },
        { id: `col-${Date.now()}-2`, title: "In Progress", tasks: [] },
        { id: `col-${Date.now()}-3`, title: "Done", tasks: [] }
      ]
    };
    setBoards([...boards, newBoard]);
    setCurrentBoardId(newBoard.id);
  };

  const handleMoveTask = () => {};

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader
        currentBoard={currentBoardId}
        boards={boards}
        onBoardChange={setCurrentBoardId}
        onNewBoard={handleNewBoard}
      />
      <main className="p-6">
        <div className="flex space-x-6 overflow-x-auto pb-6">
          {currentBoard.columns.map((column) => (
            <ColumnComponent
              key={column.id}
              column={column}
              onAddTask={handleAddTask}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
            />
          ))}
        </div>
      </main>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
          setActiveColumnId(null);
        }}
        title={editingTask ? "Edit Task" : "Create New Task"}
      >
        <TaskForm
          task={editingTask || undefined}
          onSubmit={handleSubmitTask}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingTask(null);
            setActiveColumnId(null);
          }}
        />
      </Modal>
    </div>
  );
}

export default App;