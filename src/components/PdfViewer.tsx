import {Viewer, Worker} from '@react-pdf-viewer/core';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import {useState} from 'react';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const WORKER_URL =
	'https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js';

export default function PdfViewer({pdfUrl}: {pdfUrl: string}) {
	const [isLoading, setIsLoading] = useState(true);
	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	return (
		<div className="bg-card p-6 rounded-lg shadow-md mt-4">
			<h3 className="text-xl font-semibold text-primary mb-4">View PDF</h3>
			<div className=" h-[80vh]">
				{isLoading && (
					<div className="flex justify-center items-center h-full">
						<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
						<span className="ml-2 text-primary">Loading PDF...</span>
					</div>
				)}
				<Worker workerUrl={WORKER_URL}>
					<Viewer
						fileUrl={pdfUrl}
						plugins={[defaultLayoutPluginInstance]}
						onDocumentLoad={() => setIsLoading(false)}
						renderError={(error) => (
							<div className="text-red-500 text-center p-4">
								Failed to load PDF: {error.message}
							</div>
						)}
					/>
				</Worker>
			</div>
		</div>
	);
}
