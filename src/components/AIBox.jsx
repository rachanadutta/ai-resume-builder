import React from "react";

function AIBox({ text, loading, onAccept, onDiscard }) {
  return (
    <div className="mt-4 p-4 border rounded-xl bg-gray-50 shadow-md">
      {loading ? (
        <p className="text-gray-500 italic">✨ Generating suggestion...</p>
      ) : (
        <p className="text-gray-800">{text}</p>
      )}

      <div className="flex gap-3 mt-3">
        <button
          onClick={onAccept}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 cursor-pointer text-white rounded-lg"
        >
          Use
        </button>
        <button
          onClick={onDiscard}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-lg"
        >
          Discard
        </button>
      </div>
    </div>
  );
}

export default AIBox;
