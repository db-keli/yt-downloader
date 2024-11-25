import { useState, useEffect } from "react";
import { Youtube, Download, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../components/ui/select";

export default function YouTubeDownloader() {
	const [url, setUrl] = useState("");
	const [resolution, setResolution] = useState("360p");
	const [loading, setLoading] = useState(false);
	const [downloading, setDownloading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [preview, setPreview] = useState<{
		thumbnailLink: string;
		title: string;
	} | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		// Simulating API call
		setTimeout(() => {
			setPreview({
				thumbnailLink: "https://picsum.photos/seed/picsum/200/300",
				title: "Sample YouTube Video Title",
			});
			setLoading(false);
		}, 1500);
	};

	const handleDownload = () => {
		setDownloading(true);
		setProgress(0);
	};

	useEffect(() => {
		if (downloading && progress < 100) {
			const timer = setTimeout(() => setProgress(progress + 1), 50);
			return () => clearTimeout(timer);
		}
		if (progress === 100) {
			setDownloading(false);
			// Here you would typically trigger the actual file download
			console.log("Download completed");
		}
	}, [downloading, progress]);

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
			<div className="max-w-3xl mx-auto">
				<div className="text-center mb-12">
					<h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
						YouTube <span className="text-blue-600">Downloader</span>
					</h1>
					<p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
						Download your favorite YouTube videos in just a few clicks!
					</p>
				</div>

				<div className="bg-white shadow-xl rounded-lg overflow-hidden">
					<div className="p-6 sm:p-10">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div className="flex items-center space-x-4">
								<Youtube className="text-red-500 w-8 h-8" />
								<Input
									type="text"
									placeholder="Paste YouTube URL here"
									value={url}
									onChange={(e) => setUrl(e.target.value)}
									className="flex-grow"
								/>
							</div>

							<div className="flex items-center space-x-4">
								<Select value={resolution} onValueChange={setResolution}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Select quality" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="1080p">1080p</SelectItem>
										<SelectItem value="720p">720p</SelectItem>
										<SelectItem value="480p">480p</SelectItem>
										<SelectItem value="360p">360p</SelectItem>
										<SelectItem value="240p">240p</SelectItem>
										<SelectItem value="144p">144p</SelectItem>
									</SelectContent>
								</Select>

								<Button type="submit" className="flex-grow">
									{loading ? (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									) : (
										"Get Video Info"
									)}
								</Button>
							</div>
						</form>

						{preview && (
							<div className="mt-8 bg-gray-50 p-4 rounded-lg">
								<div className="flex items-center space-x-4">
									<img
										src={preview.thumbnailLink}
										alt="Video thumbnail"
										className="w-24 h-24 object-cover rounded"
									/>
									<div className="flex-grow">
										<h3 className="text-lg font-semibold text-gray-900">
											{preview.title}
										</h3>
										<p className="text-sm text-gray-500">Ready to download</p>
									</div>
									<Button
										onClick={handleDownload}
										className="flex items-center"
										disabled={downloading}
									>
										{downloading ? (
											<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										) : (
											<Download className="mr-2 h-4 w-4" />
										)}
										{downloading ? "Downloading..." : "Download"}
									</Button>
								</div>
								{downloading && (
									<div className="mt-4">
										<Progress value={progress} className="w-full" />
										<p className="text-sm text-gray-500 mt-2">
											Downloading: {progress}%
										</p>
									</div>
								)}
							</div>
						)}
					</div>

					<div className="bg-gray-50 px-6 py-4 sm:px-10">
						<h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
							How to use:
						</h2>
						<ol className="mt-2 text-sm text-gray-600 list-decimal list-inside space-y-1">
							<li>Copy the URL of the YouTube video you want to download</li>
							<li>Paste the URL into the input field above</li>
							<li>Select your desired video quality</li>
							<li>Click "Get Video Info" to fetch the video details</li>
							<li>Click "Download" to start the download process</li>
						</ol>
					</div>
				</div>

				<div className="mt-8 text-center text-xs text-gray-500">
					<p>
						<strong>Disclaimer:</strong> This tool is for educational purposes
						only. Please respect copyright laws and YouTube's terms of service.
					</p>
				</div>
			</div>
		</div>
	);
}
