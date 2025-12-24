"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { convex } from "@/convex/client";

export default function Home() {
  const todos = useQuery(api.todos.getTodos);
  const addTodo = useMutation(api.todos.addTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const [text, setText] = useState("");

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Enter todo..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          onClick={() => {
            if (!text) return;
            addTodo({ text });
            setText("");
          }}
        >
          Add
        </Button>
      </div>

      <ul className="space-y-2">
        {todos?.map((todo) => (
          <li
            key={todo._id}
            className="flex justify-between items-center border p-2 rounded"
          >
            {todo.text}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteTodo({ id: todo._id })}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
