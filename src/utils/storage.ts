import {PdfConversion} from '@/types';
import {v4 as uuidv4} from 'uuid';

const STORAGE_NAME = 'conversions';

export function saveConversion(text: string, pdfUrl: string): PdfConversion {
	const conversion: PdfConversion = {
		id: uuidv4(),
		text,
		pdfUrl,
		createdAt: new Date().toISOString(),
	};
	const conversions = [...getConversions(), conversion];
	localStorage.setItem(STORAGE_NAME, JSON.stringify(conversions));

	return conversion;
}

export function getConversions(): PdfConversion[] {
	const conversions = localStorage.getItem(STORAGE_NAME);

	return conversions ? JSON.parse(conversions) : [];
}

export function clearAllConversions() {
	localStorage.removeItem(STORAGE_NAME);
}
