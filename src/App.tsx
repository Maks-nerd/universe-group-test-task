import Converter from '@/components/Converter';
import History from '@/components/History';
import PdfViewer from '@/components/PdfViewer';
import {PdfConversion} from '@/types';
import {useState} from 'react';
import {clearAllConversions, getConversions} from './utils/storage';

export default function App() {
	const [currentPdf, setCurrentPdf] = useState<string | null>(null);
	const [selectedConversion, setSelectedConversion] =
		useState<PdfConversion | null>(null);
	const [conversions, setConversions] = useState<PdfConversion[]>(
		getConversions(),
	);

	const refreshHistory = (conversion: PdfConversion) => {
		setConversions(getConversions());
		setSelectedConversion(conversion);
	};

	const onSelect = (conversion: PdfConversion) => {
		setSelectedConversion(conversion);
		setCurrentPdf(conversion.pdfUrl);
	};

	const onClearAll = () => {
		setConversions([]);
		clearAllConversions();
		setCurrentPdf(null);
	};

	return (
		<div className="min-h-screen bg-background p-4">
			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="col-span-2">
					<Converter
						onConvert={setCurrentPdf}
						refreshHistory={refreshHistory}
					/>
					{currentPdf && <PdfViewer pdfUrl={currentPdf} />}
				</div>
				<History
					onSelect={onSelect}
					selectedConversion={selectedConversion}
					conversions={conversions}
					onClearAll={onClearAll}
				/>
			</div>
		</div>
	);
}
