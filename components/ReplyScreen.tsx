"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Copy, Check, ThumbsUp, ThumbsDown } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Reply {
  id: number
  text: string
  tone: string
}

const sampleReplies: Reply[] = [
  {
    id: 1,
    text: "哈哈，你說得太有趣了！我們這週末要不要一起去那家新開的咖啡廳？聽說他們的拿鐵超級棒 ☕️😊",
    tone: "輕鬆自然",
  },
  {
    id: 2,
    text: "你的想法總是這麼獨特，我真的很喜歡和你聊天。要不要找個時間見面，親自告訴我更多有趣的事？😘",
    tone: "調情曖昧",
  },
  {
    id: 3,
    text: "聽你說這些，我感覺我們真的很有默契。謝謝你願意分享這麼多with我，你對我來說真的很特別 ❤️",
    tone: "浪漫深情",
  },
]

export function ReplyScreen({ onBack }: { onBack: () => void }) {
  const [selectedReply, setSelectedReply] = useState<number | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast({
      title: "已複製到剪貼板",
      description: "你可以直接貼上到聊天視窗中",
    })
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-sm shadow-xl">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" /> 返回
            </Button>
            <h2 className="text-2xl font-bold text-gray-900">精選回覆</h2>
            <div className="w-[64px]"></div>
          </div>

          <div className="space-y-4">
            {sampleReplies.map((reply) => (
              <Card
                key={reply.id}
                className={`border-2 transition-all duration-300 ${
                  selectedReply === reply.id ? "border-pink-500 bg-pink-50" : "border-transparent hover:border-pink-200"
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
                      {reply.tone}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2"
                      onClick={() => handleCopy(reply.text, reply.id)}
                    >
                      {copiedId === reply.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-gray-800 mb-4">{reply.text}</p>
                  <div className="flex justify-between items-center">
                    <Button
                      variant={selectedReply === reply.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedReply(reply.id)}
                      className={selectedReply === reply.id ? "bg-pink-500 hover:bg-pink-600" : ""}
                    >
                      {selectedReply === reply.id ? "已選擇" : "選擇此回覆"}
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ThumbsUp className="h-4 w-4 mr-1" /> 讚
                      </Button>
                      <Button variant="outline" size="sm">
                        <ThumbsDown className="h-4 w-4 mr-1" /> 不喜歡
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 px-4 rounded-full text-lg font-semibold"
            disabled={!selectedReply}
          >
            使用選擇的回覆
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

