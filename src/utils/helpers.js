export function smoothOutput(text, onData) {
	return new Promise((resolve) => {
		const chunkSize = 3; // Количество символов для вывода за один раз
		let index = 0;

		function outputNextChunk() {
			if (index < text.length) {
				const nextChunk = text.slice(index, index + chunkSize);
				onData(nextChunk);
				index += chunkSize;
				setTimeout(outputNextChunk, 10); // Задержка 50 мс между выводами
			} else {
				resolve();
			}
		}

		outputNextChunk();
	});
}

export const paginationModel = {page: 0, pageSize: 10};
