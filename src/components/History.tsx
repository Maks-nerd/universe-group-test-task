import {PdfConversion} from '@/types';

interface HistoryProps {
	onSelect: (conversion: PdfConversion) => void;
	selectedConversion: PdfConversion | null;
	conversions: PdfConversion[];
	onClearAll: () => void;
}

export default function History({
	onSelect,
	selectedConversion,
	conversions,
	onClearAll,
}: HistoryProps) {
	return (
		<div className="bg-card p-6 rounded-lg shadow-md">
			<div className="flex items-center justify-between gap-2 mb-4">
				<h2 className="text-2xl font-bold text-primary">Conversion history</h2>
				<button
					className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-opacity-90 disabled:bg-gray-400 transition-all duration-300"
					onClick={onClearAll}
					disabled={conversions.length === 0}
				>
					Clear All
				</button>
			</div>
			{conversions.length === 0 ? (
				<p className="text-gray-500">No saved conversions</p>
			) : (
				<ul className="space-y-2">
					{conversions.map((conversion) => (
						<li
							key={conversion.id}
							className={`p-3 rounded-md cursor-pointer ${
								selectedConversion?.id === conversion.id
									? 'bg-primary text-white pointer-events-none'
									: 'bg-background hover:bg-blue-200 transition-all duration-300'
							}`}
							onClick={() => onSelect(conversion)}
						>
							<p className="font-medium">{conversion.text.slice(0, 35)}...</p>
							<p className="text-sm text-gray-500">
								{new Date(conversion.createdAt).toLocaleString()}
							</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
