"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Sparkles, Heart } from "lucide-react"

export function LandingModal({ onGetStarted }: { onGetStarted: () => void }) {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] lg:max-w-[800px] p-0">
        <div className="p-6 bg-gradient-to-b from-pink-50 to-purple-100">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-900">
            讓 AI 為你的對話
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              {" "}
              增添魔力
            </span>
          </h2>
          <p className="mb-6 text-center text-gray-600">
            上傳對話截圖，立即獲得富有魅力的回覆建議。讓每一次交流都成為難忘的瞬間。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center p-4">
                <MessageCircle className="h-8 w-8 text-pink-500 mb-2" />
                <h3 className="text-lg font-semibold mb-1">智能分析</h3>
                <p className="text-sm text-gray-600 text-center">AI 深度解讀對話情境</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center p-4">
                <Sparkles className="h-8 w-8 text-purple-500 mb-2" />
                <h3 className="text-lg font-semibold mb-1">多樣風格</h3>
                <p className="text-sm text-gray-600 text-center">滿足各種對話需求</p>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center p-4">
                <Heart className="h-8 w-8 text-red-500 mb-2" />
                <h3 className="text-lg font-semibold mb-1">增進關係</h3>
                <p className="text-sm text-gray-600 text-center">拉近你們的距離</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => {
                setOpen(false)
                onGetStarted()
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 px-6 rounded-full text-lg font-semibold"
            >
              開始使用 <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

