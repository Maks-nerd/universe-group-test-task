import {PdfConversion} from '@/types';
import {convertToPdf} from '@/utils/api';
import {saveConversion} from '@/utils/storage';
import {useState} from 'react';

interface ConverterProps {
	onConvert: (pdfUrl: string) => void;
	refreshHistory: (conversion: PdfConversion) => void;
}

export default function Converter({onConvert, refreshHistory}: ConverterProps) {
	const [text, setText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleConvert = async () => {
		if (!text.trim()) {
			setError('Enter text to convert');
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const pdfBase64 = await convertToPdf(text);
			const pdfUrl = `data:application/pdf;base64,${pdfBase64}`;
			const conversion = saveConversion(text, pdfUrl);

			onConvert(pdfUrl);
			setText('');
			refreshHistory(conversion);
		} catch (err) {
			console.error('Failed to convert text to PDF', err);
			setError('Failed to convert text to PDF');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="bg-card p-6 rounded-lg shadow-md">
			<h2 className="text-2xl font-bold text-primary mb-4">
				Text to PDF Converter
			</h2>
			<textarea
				className="w-full p-3 border border-borderColor rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all duration-300"
				rows={6}
				placeholder="Enter text..."
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			{error && <p className="text-red-500 mt-2">{error}</p>}
			<button
				className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 disabled:bg-gray-400 transition-all duration-300"
				onClick={handleConvert}
				disabled={isLoading}
			>
				{isLoading ? 'Conversion...' : 'Convert to PDF'}
			</button>
		</div>
	);
}
