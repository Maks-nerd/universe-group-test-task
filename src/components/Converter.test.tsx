import Converter from '@/components/Converter';
import {convertToPdf} from '@/utils/api';
import {saveConversion} from '@/utils/storage';
import {beforeEach, describe, expect, it, jest} from '@jest/globals';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';

jest.mock('@/utils/api', () => ({
	convertToPdf: jest.fn(),
}));

jest.mock('@/utils/storage', () => ({
	saveConversion: jest.fn(),
}));

const mockedConvertToPdf = convertToPdf as jest.MockedFunction<
	typeof convertToPdf
>;

describe('Converter', () => {
	const mockOnConvert = jest.fn();
	const mockRefreshHistory = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('shows error if input is empty', async () => {
		render(
			<Converter
				onConvert={mockOnConvert}
				refreshHistory={mockRefreshHistory}
			/>,
		);

		fireEvent.click(screen.getByText(/convert to pdf/i));

		expect(
			await screen.findByText(/enter text to convert/i),
		).toBeInTheDocument();
		expect(mockOnConvert).not.toHaveBeenCalled();
		expect(mockRefreshHistory).not.toHaveBeenCalled();
	});

	it('converts text and calls callbacks', async () => {
		mockedConvertToPdf.mockResolvedValue('fake-base64');
		(saveConversion as jest.Mock).mockReturnValue({
			text: 'example',
			pdfUrl: 'data:application/pdf;base64,fake-base64',
		});

		render(
			<Converter
				onConvert={mockOnConvert}
				refreshHistory={mockRefreshHistory}
			/>,
		);

		fireEvent.change(screen.getByPlaceholderText(/enter text/i), {
			target: {value: 'example'},
		});

		fireEvent.click(screen.getByText(/convert to pdf/i));

		await waitFor(() => {
			expect(convertToPdf).toHaveBeenCalledWith('example');
			expect(mockOnConvert).toHaveBeenCalledWith(
				'data:application/pdf;base64,fake-base64',
			);
			expect(mockRefreshHistory).toHaveBeenCalled();
			expect(screen.getByPlaceholderText(/enter text/i)).toHaveValue('');
		});
	});

	it('shows error on conversion failure', async () => {
		mockedConvertToPdf.mockRejectedValue(new Error('Conversion failed'));

		render(
			<Converter
				onConvert={mockOnConvert}
				refreshHistory={mockRefreshHistory}
			/>,
		);

		fireEvent.change(screen.getByPlaceholderText(/enter text/i), {
			target: {value: 'some text'},
		});

		fireEvent.click(screen.getByText(/convert to pdf/i));

		expect(
			await screen.findByText(/failed to convert text to pdf/i),
		).toBeInTheDocument();
		expect(mockOnConvert).not.toHaveBeenCalled();
		expect(mockRefreshHistory).not.toHaveBeenCalled();
	});
});
