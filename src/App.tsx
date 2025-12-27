import React, { useState } from "react";

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

interface NavigationHeaderProps {
  logo: string;
  items: NavItem[];
  onSearch?: (query: string) => void;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  servings: number;
  difficulty: string;
  ingredients: Ingredient[];
  author: string;
}

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

interface CardProps {
  recipe: Recipe;
  onView: (id: number) => void;
}

interface TableColumn {
  key: string;
  header: string;
}

interface TableProps {
  columns: TableColumn[];
  data: Ingredient[];
}

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel: string;
}

interface ListItem {
  id: number;
  primary: string;
  secondary?: string;
  icon?: string;
}

interface ListProps {
  items: ListItem[];
  title: string;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ logo, items, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(searchQuery);
  };

  return (
    <header className="bg-orange-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">{logo}</h1>
            <nav className="hidden md:flex space-x-6">
              {items.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`hover:text-orange-200 transition-colors ${
                    item.active ? "border-b-2 border-white pb-1" : ""
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-orange-800 px-4 py-2 rounded-r-lg hover:bg-orange-900 transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

const RecipeCard: React.FC<CardProps> = ({ recipe, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
        <span className="text-6xl">{recipe.image}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-orange-600 font-medium">{recipe.difficulty}</span>
          <span className="text-sm text-gray-500">{recipe.cookTime}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">By {recipe.author}</span>
          <button
            onClick={() => onView(recipe.id)}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};

const IngredientTable: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-orange-100">
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-3 text-left text-orange-800 font-semibold">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((ingredient, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-orange-50">
              <td className="px-4 py-3">{ingredient.name}</td>
              <td className="px-4 py-3">{ingredient.amount}</td>
              <td className="px-4 py-3">{ingredient.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RecipeForm: React.FC<FormProps> = ({ fields, onSubmit, submitLabel }) => {
  const [formData, setFormData] = useState<Record<string, string>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-medium mb-2">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={4}
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
      >
        {submitLabel}
      </button>
    </form>
  );
};

const CategoryList: React.FC<ListProps> = ({ items, title }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-medium text-gray-800">{item.primary}</p>
              {item.secondary && <p className="text-sm text-gray-500">{item.secondary}</p>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const navItems: NavItem[] = [
    { label: "Home", href: "#", active: true },
    { label: "Recipes", href: "#" },
    { label: "Categories", href: "#" },
    { label: "Submit Recipe", href: "#" },
  ];

  const recipes: Recipe[] = [
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      description: "A creamy Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
      image: "🍝",
      cookTime: "30 mins",
      servings: 4,
      difficulty: "Medium",
      author: "Chef Maria",
      ingredients: [
        { name: "Spaghetti", amount: "400", unit: "g" },
        { name: "Eggs", amount: "4", unit: "whole" },
        { name: "Pancetta", amount: "200", unit: "g" },
        { name: "Parmesan", amount: "100", unit: "g" },
      ],
    },
    {
      id: 2,
      title: "Homemade Pizza Margherita",
      description: "Traditional Neapolitan pizza with fresh tomatoes, mozzarella, and basil.",
      image: "🍕",
      cookTime: "45 mins",
      servings: 2,
      difficulty: "Easy",
      author: "Chef Giovanni",
      ingredients: [
        { name: "Pizza Dough", amount: "500", unit: "g" },
        { name: "Tomato Sauce", amount: "200", unit: "ml" },
        { name: "Mozzarella", amount: "250", unit: "g" },
        { name: "Fresh Basil", amount: "10", unit: "leaves" },
      ],
    },
    {
      id: 3,
      title: "Chicken Tikka Masala",
      description: "Tender chicken pieces in a rich, creamy tomato-based curry sauce.",
      image: "🍛",
      cookTime: "50 mins",
      servings: 4,
      difficulty: "Medium",
      author: "Chef Priya",
      ingredients: [
        { name: "Chicken Breast", amount: "600", unit: "g" },
        { name: "Yogurt", amount: "200", unit: "ml" },
        { name: "Tomatoes", amount: "400", unit: "g" },
        { name: "Heavy Cream", amount: "150", unit: "ml" },
      ],
    },
  ];

  const categories: ListItem[] = [
    { id: 1, primary: "Italian", secondary: "25 recipes", icon: "🇮🇹" },
    { id: 2, primary: "Asian", secondary: "32 recipes", icon: "🥢" },
    { id: 3, primary: "Mexican", secondary: "18 recipes", icon: "🌮" },
    { id: 4, primary: "Desserts", secondary: "45 recipes", icon: "🍰" },
    { id: 5, primary: "Healthy", secondary: "28 recipes", icon: "🥗" },
  ];

  const formFields: FormField[] = [
    { name: "title", label: "Recipe Title", type: "text", placeholder: "Enter recipe name", required: true },
    { name: "cookTime", label: "Cook Time", type: "text", placeholder: "e.g., 30 mins", required: true },
    { name: "description", label: "Description", type: "textarea", placeholder: "Describe your recipe...", required: true },
  ];

  const tableColumns: TableColumn[] = [
    { key: "name", header: "Ingredient" },
    { key: "amount", header: "Amount" },
    { key: "unit", header: "Unit" },
  ];

  const handleViewRecipe = (id: number) => {
    const recipe = recipes.find((r) => r.id === id);
    setSelectedRecipe(recipe || null);
  };

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("New recipe submitted:", data);
    alert("Recipe submitted successfully!");
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationHeader logo="🍳 RecipeShare" items={navItems} onSearch={handleSearch} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onView={handleViewRecipe} />
              ))}
            </div>
            {selectedRecipe && (
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedRecipe.title}</h3>
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
                <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                  <span>⏱️ {selectedRecipe.cookTime}</span>
                  <span>👥 {selectedRecipe.servings} servings</span>
                  <span>📊 {selectedRecipe.difficulty}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h4>
                <IngredientTable columns={tableColumns} data={selectedRecipe.ingredients} />
              </div>
            )}
            <div className="bg-orange-50 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Share Your Recipe</h3>
              <RecipeForm fields={formFields} onSubmit={handleFormSubmit} submitLabel="Submit Recipe" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <CategoryList items={categories} title="Browse Categories" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;