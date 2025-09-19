
'use client';
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const agents = [
  { id: "god", name: "👑 God Agent" },
  { id: "memory", name: "🧠 Memory Agent" },
  { id: "researcher", name: "🔎 Researcher Agent" },
  { id: "executor", name: "⚙️ Execution Agent" },
  { id: "voice", name: "🎙️ Voice Agent" },
];

export default function FreeGPTGodmode() {
  const [selectedAgent, setSelectedAgent] = useState("god");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const res = await fetch("/api/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ agent: selectedAgent, prompt: input }),
    });
    const data = await res.json();
    const aiMsg = { sender: selectedAgent, text: data.reply };
    setMessages((prev) => [...prev, aiMsg]);
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-4">🧬 FreeGPT Godmode</h1>

      <div className="flex gap-2 mb-2">
        {agents.map((agent) => (
          <Button
            key={agent.id}
            onClick={() => setSelectedAgent(agent.id)}
            variant={selectedAgent === agent.id ? "default" : "outline"}
          >
            {agent.name}
          </Button>
        ))}
      </div>

      <Card className="mb-4 h-[400px]">
        <CardContent>
          <ScrollArea className="h-[360px] pr-2">
            <div className="space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`text-sm p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-gray-200 text-black text-right"
                      : "bg-black text-white text-left"
                  }`}
                >
                  <strong>{msg.sender === "user" ? "You" : agents.find((a) => a.id === msg.sender)?.name}:</strong> {msg.text}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your command, mission, or question..."
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
