import React, { useState } from "react";
import { FaSyncAlt, FaMagic } from "react-icons/fa";

const TaskSuggestions = () => {
  const [tasks, setTasks] = useState([
    {
      title: "Review monthly budget",
      description:
        "Analyze your spending patterns for the month and adjust your budget for next month accordingly",
      priority: "high",
      category: "finance",
    },
    {
      title: "Schedule health checkup appointment",
      description:
        "Book your annual health checkup with Dr. Smith - it’s been almost a year since your last visit",
      priority: "high",
      category: "health",
    },
    {
      title: "Update project documentation",
      description:
        "Review and update the project documentation to reflect recent changes and decisions",
      priority: "medium",
      category: "work",
    },
  ]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <FaMagic className="mr-2 text-purple-400" /> AI Task Suggestions
        </h2>
        <button className="text-gray-400 hover:text-white">
          <FaSyncAlt />
        </button>
      </div>
      <p className="text-gray-400 mb-4">
        Smart task recommendations based on your current tasks and priorities
      </p>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p className="text-gray-300 text-sm">{task.description}</p>
            <div className="mt-2 flex gap-2">
              <span className={`px-2 py-1 text-xs rounded bg-$
                {task.priority === "high" ? "red" : "yellow"}-500 text-black`}
              >
                {task.priority}
              </span>
              <span className="px-2 py-1 text-xs rounded bg-blue-500 text-black">
                {task.category}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="text-gray-500 text-sm mt-4">
        Suggestions are generated based on your task history and productivity patterns
      </p>
    </div>
  );
};

export default TaskSuggestions;
