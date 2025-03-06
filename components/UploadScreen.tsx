"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { Upload, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const replyModes = [
	{ value: "casual", label: "輕鬆自然", icon: "😊" },
	{ value: "flirty", label: "調情曖昧", icon: "😘" },
	{ value: "romantic", label: "浪漫深情", icon: "❤️" },
	{ value: "witty", label: "機智幽默", icon: "😎" },
	{ value: "caring", label: "關懷體貼", icon: "🤗" },
];

export function UploadScreen({
	onBack,
	onSubmit,
}: {
	onBack: () => void;
	onSubmit: () => void;
}) {
	const [selectedFile, setSelectedFile] = useState<string | null>(null);
	const [replyMode, setReplyMode] = useState("casual");
	const [intimacy, setIntimacy] = useState(50);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelectedFile(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const Content = (
		<div className="flex flex-col items-center justify-center space-y-6">
			<div className="w-full flex justify-between items-center">
				<Button variant="ghost" size="sm" onClick={onBack}>
					<ArrowLeft className="h-4 w-4 mr-2" /> 返回
				</Button>
				<h2 className="text-2xl font-bold text-gray-900">
					上傳對話截圖
				</h2>
				<div className="w-[64px]"></div>
			</div>

			{selectedFile ? (
				<div className="relative w-full max-w-sm aspect-[3/4]">
					<Image
						src={selectedFile || "/placeholder.svg"}
						alt="Preview"
						fill
						className="object-cover rounded-lg"
					/>
					<Button
						variant="outline"
						size="sm"
						className="absolute bottom-2 right-2 bg-white/80"
						onClick={() => setSelectedFile(null)}
					>
						重新上傳
					</Button>
				</div>
			) : (
				<label className="flex flex-col items-center justify-center cursor-pointer w-full max-w-sm aspect-[3/4] rounded-lg bg-pink-50 border-2 border-dashed border-pink-200 hover:bg-pink-100 transition-colors duration-300">
					<Upload className="h-12 w-12 text-pink-400 mb-2" />
					<span className="text-lg font-medium text-pink-600">
						點擊上傳對話截圖
					</span>
					<span className="text-sm text-gray-500 mt-1">
						或拖放圖片到此處
					</span>
					<input
						type="file"
						className="hidden"
						accept="image/*"
						onChange={handleFileChange}
					/>
				</label>
			)}

			<div className="w-full space-y-4">
				<h3 className="text-lg font-semibold text-gray-900">
					選擇回覆語氣
				</h3>
				<RadioGroup
					defaultValue="casual"
					value={replyMode}
					onValueChange={setReplyMode}
					className="flex flex-wrap gap-2 justify-center"
				>
					{replyModes.map((mode) => (
						<div key={mode.value} className="flex items-center">
							<RadioGroupItem
								value={mode.value}
								id={mode.value}
								className="peer sr-only"
							/>
							<Label
								htmlFor={mode.value}
								className="flex items-center space-x-2 rounded-full px-3 py-1 bg-pink-100 text-pink-700 cursor-pointer transition-colors peer-checked:bg-pink-500 peer-checked:text-white"
							>
								<span>{mode.icon}</span>
								<span>{mode.label}</span>
							</Label>
						</div>
					))}
				</RadioGroup>
			</div>

			<div className="w-full space-y-4">
				<h3 className="text-lg font-semibold text-gray-900">
					選擇親密程度
				</h3>
				<Slider
					defaultValue={[50]}
					max={100}
					step={1}
					className="w-full"
					onValueChange={(value) => setIntimacy(value[0])}
				/>
				<div className="flex justify-between text-sm text-gray-500">
					<span>初識</span>
					<span>熟悉</span>
					<span>親密</span>
				</div>
			</div>

			<Button
				className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 px-4 rounded-full text-lg font-semibold"
				disabled={!selectedFile}
				onClick={onSubmit}
			>
				獲取魔法回覆 <Sparkles className="ml-2 h-5 w-5" />
			</Button>
		</div>
	);

	return (
		<>
			{/* 手機版：填滿螢幕 */}
			<div className="md:hidden w-full min-h-screen bg-white p-6">
				{Content}
			</div>

			{/* 桌面版：使用 Card */}
			<div className="hidden md:block">
				<Card className="w-full max-w-lg mx-auto bg-white/90 backdrop-blur-sm shadow-xl p-6">
					<CardContent>{Content}</CardContent>
				</Card>
			</div>
		</>
	);
}
