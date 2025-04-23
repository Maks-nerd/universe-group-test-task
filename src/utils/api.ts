import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL as string;
const API_KEY = import.meta.env.VITE_APP_API_KEY as string;
enum ApiPaths {
	CREATE_PDF = '/create-pdf',
}

export async function convertToPdf(text: string): Promise<string> {
	try {
		if (!API_URL || !API_KEY) {
			throw new Error(
				'VITE_APP_API_URL or VITE_APP_API_KEY is not defined in .env',
			);
		}

		const response = await axios.post(
			`${API_URL}${ApiPaths.CREATE_PDF}?apiKey=${API_KEY}`,
			{text},
			{
				headers: {
					'Content-Type': 'application/json',
				},
				responseType: 'arraybuffer',
			},
		);

		const uint8Array = new Uint8Array(response.data as ArrayBuffer);
		const binary = uint8Array.reduce(
			(acc, byte) => acc + String.fromCharCode(byte),
			'',
		);
		const base64 = btoa(binary);

		return base64;
	} catch (error) {
		console.error('PDF conversion failed:', error);
		throw new Error('Error converting to PDF');
	}
}
