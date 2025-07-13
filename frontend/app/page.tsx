"use client"

import type React from "react"
import { useState } from "react"
import { Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  sentiment: "positive" | "neutral" | "negative"
  timestamp: Date
}

function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case "positive":
      return "text-green-600"
    case "negative":
      return "text-red-600"
    default:
      return "text-gray-500"
  }
}

function getSentimentBg(sentiment: string) {
  switch (sentiment) {
    case "positive":
      return "bg-green-50"
    case "negative":
      return "bg-red-50"
    default:
      return "bg-gray-50"
  }
}

export default function MessengerMerpati() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      sentiment: "neutral",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputValue }),
      })

      const data = await res.json()

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: "bot",
        sentiment: data.sentiment,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Failed to send message:", error)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 text-center">MessengerMerpati</h1>
          <p className="text-sm text-gray-500 text-center mt-1">AI Chat Assistant with Sentiment Analysis, Created by aslich - KambingCoding</p>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 max-w-xs sm:max-w-md lg:max-w-lg ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {message.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col">
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-gray-100 text-gray-800 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>

                  {/* Sentiment Label */}
                  <div
                    className={`mt-1 px-2 py-1 rounded-full text-xs inline-flex items-center w-fit ${
                      message.sender === "user" ? "ml-auto" : ""
                    } ${getSentimentBg(message.sentiment)}`}
                  >
                    <span className={`font-medium ${getSentimentColor(message.sentiment)}`}>
                      {message.sentiment}
                    </span>
                  </div>

                  {/* Timestamp */}
                  <span
                    className={`text-xs text-gray-400 mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-2 bg-gray-50 rounded-full px-4 py-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              size="sm"
              className="rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 p-2"
            >
              <Send className="w-4 h-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">Messages are analyzed for sentiment in real-time</p>
        </div>
      </div>
    </div>
  )
}
