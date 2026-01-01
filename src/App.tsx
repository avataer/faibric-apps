import React, { useState } from "react";

// Interfaces
interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
}

interface NavItem {
  id: string;
  label: string;
}

interface CalculatorState {
  display: string;
  previousValue: string;
  operation: string | null;
  waitingForOperand: boolean;
}

// Calculator Component
const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: "0",
    previousValue: "",
    operation: null,
    waitingForOperand: false,
  });

  const inputDigit = (digit: string) => {
    if (state.waitingForOperand) {
      setState({
        ...state,
        display: digit,
        waitingForOperand: false,
      });
    } else {
      setState({
        ...state,
        display: state.display === "0" ? digit : state.display + digit,
      });
    }
  };

  const inputDecimal = () => {
    if (state.waitingForOperand) {
      setState({
        ...state,
        display: "0.",
        waitingForOperand: false,
      });
    } else if (state.display.indexOf(".") === -1) {
      setState({
        ...state,
        display: state.display + ".",
      });
    }
  };

  const clear = () => {
    setState({
      display: "0",
      previousValue: "",
      operation: null,
      waitingForOperand: false,
    });
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue === "") {
      setState({
        ...state,
        previousValue: state.display,
        operation: nextOperation,
        waitingForOperand: true,
      });
    } else if (state.operation) {
      const currentValue = parseFloat(state.previousValue);
      let result = 0;

      switch (state.operation) {
        case "+":
          result = currentValue + inputValue;
          break;
        case "-":
          result = currentValue - inputValue;
          break;
        case "*":
          result = currentValue * inputValue;
          break;
        case "/":
          result = inputValue !== 0 ? currentValue / inputValue : 0;
          break;
        default:
          result = inputValue;
      }

      const resultString = String(result);
      setState({
        display: resultString,
        previousValue: nextOperation === "=" ? "" : resultString,
        operation: nextOperation === "=" ? null : nextOperation,
        waitingForOperand: true,
      });
    }
  };

  const toggleSign = () => {
    const value = parseFloat(state.display);
    setState({
      ...state,
      display: String(value * -1),
    });
  };

  const percentage = () => {
    const value = parseFloat(state.display);
    setState({
      ...state,
      display: String(value / 100),
    });
  };

  const buttonClass = "w-16 h-16 text-xl font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const numberClass = `${buttonClass} bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500`;
  const operatorClass = `${buttonClass} bg-orange-500 hover:bg-orange-400 text-white focus:ring-orange-400`;
  const functionClass = `${buttonClass} bg-gray-400 hover:bg-gray-300 text-black focus:ring-gray-300`;

  return (
    <div className="bg-gray-900 p-6 rounded-3xl shadow-2xl max-w-xs mx-auto">
      <div className="bg-gray-800 rounded-xl p-4 mb-4">
        <div className="text-right text-4xl font-light text-white overflow-hidden">
          {state.display}
        </div>
        {state.operation && state.previousValue && (
          <div className="text-right text-sm text-gray-400 mt-1">
            {state.previousValue} {state.operation}
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-3">
        <button onClick={clear} className={functionClass}>
          AC
        </button>
        <button onClick={toggleSign} className={functionClass}>
          +/-
        </button>
        <button onClick={percentage} className={functionClass}>
          %
        </button>
        <button onClick={() => performOperation("/")} className={operatorClass}>
          /
        </button>

        <button onClick={() => inputDigit("7")} className={numberClass}>
          7
        </button>
        <button onClick={() => inputDigit("8")} className={numberClass}>
          8
        </button>
        <button onClick={() => inputDigit("9")} className={numberClass}>
          9
        </button>
        <button onClick={() => performOperation("*")} className={operatorClass}>
          x
        </button>

        <button onClick={() => inputDigit("4")} className={numberClass}>
          4
        </button>
        <button onClick={() => inputDigit("5")} className={numberClass}>
          5
        </button>
        <button onClick={() => inputDigit("6")} className={numberClass}>
          6
        </button>
        <button onClick={() => performOperation("-")} className={operatorClass}>
          -
        </button>

        <button onClick={() => inputDigit("1")} className={numberClass}>
          1
        </button>
        <button onClick={() => inputDigit("2")} className={numberClass}>
          2
        </button>
        <button onClick={() => inputDigit("3")} className={numberClass}>
          3
        </button>
        <button onClick={() => performOperation("+")} className={operatorClass}>
          +
        </button>

        <button onClick={() => inputDigit("0")} className={`${numberClass} col-span-2 w-full rounded-full`}>
          0
        </button>
        <button onClick={inputDecimal} className={numberClass}>
          .
        </button>
        <button onClick={() => performOperation("=")} className={operatorClass}>
          =
        </button>
      </div>
    </div>
  );
};

// History Component
const History: React.FC = () => {
  const [history] = useState<string[]>([
    "10 + 5 = 15",
    "100 / 4 = 25",
    "7 * 8 = 56",
    "50 - 23 = 27",
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Calculation History</h2>
      {history.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No calculations yet</p>
      ) : (
        <ul className="space-y-2">
          {history.map((item, index) => (
            <li
              key={index}
              className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200 font-mono"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Settings Component
const SettingsView: React.FC<{ apiKey: string; onApiKeyChange: (key: string) => void }> = ({
  apiKey,
  onApiKeyChange,
}) => {
  const [isConnected] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            API Connection Status
          </h3>
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-gray-700 dark:text-gray-300">
              {isConnected ? "Connected" : "Not Connected"}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            API Key Configuration
          </h3>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="Enter your API key"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Optional: Connect to external calculation services
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Calculator Settings
          </h3>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Enable sound effects
              </span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700 dark:text-gray-300">
                Save calculation history
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>("calculator");
  const [apiKey, setApiKey] = useState<string>("");

  const navItems: NavItem[] = [
    { id: "calculator", label: "Calculator" },
    { id: "history", label: "History" },
    { id: "settings", label: "Settings" },
  ];

  const handleLayoutThemeChange = (theme: Theme) => {
    console.log("onThemeChange", theme);
  };

  const handleNavigate = (viewId: string) => {
    setCurrentView(viewId);
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Calculator App</h1>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                  currentView === item.id
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
          <button
            onClick={() => handleLayoutThemeChange({ mode: "dark", primaryColor: "blue" })}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Toggle Theme
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white capitalize">
            {currentView}
          </h2>
        </header>

        <div className="p-8">
          {currentView === "calculator" && <Calculator />}
          {currentView === "history" && <History />}
          {currentView === "settings" && (
            <SettingsView apiKey={apiKey} onApiKeyChange={setApiKey} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;