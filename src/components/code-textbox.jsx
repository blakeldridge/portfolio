import React from "react";

const CodeTextBox = ({ title, content }) => {
  const renderContent = (data, indent = 1) => {
    return Object.entries(data).map(([key, value]) => {
      const padding = " ".repeat(indent * 2);

      if (Array.isArray(value)) {
        return (
          <div key={key} className="mb-2">
            <div className="text-sky-400">{padding}{key}: [</div>
            {value.map((item, i) => (
              <div key={i} className="ml-8">
                <span className="text-green-400">
                  {padding}"{item}"
                </span>
                {i < value.length - 1 ? "," : ""}
              </div>
            ))}
            <div className="text-sky-400">{padding}]</div>
          </div>
        );
      }

      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="mb-2">
            <div className="text-sky-400">{padding}{key}: {"{"}</div>
            <div className="ml-6">{renderContent(value, indent + 1)}</div>
            <div className="text-sky-400">{padding}{"}"}</div>
          </div>
        );
      }

      return (
        <div key={key} className="text-gray-300">
          {padding}
          <span className="text-sky-400">{key}</span>
          <span className="text-white">: </span>
          <span className="text-green-400">"{value}"</span>
          <span className="text-white">,</span>
        </div>
      );
    });
  };

  return (
    <div className="bg-gray-900 text-sm font-mono rounded-lg border border-gray-700 p-4 overflow-auto">
      <div className="mb-2">
        <span className="text-blue-400">const </span>
        <span className="text-white">{title}</span>
        <span className="text-white"> = {"{"}</span>
      </div>

      <div className="ml-4">{renderContent(content)}</div>

      <div className="text-white">{"}"}</div>
    </div>
  );
};

export default CodeTextBox;
