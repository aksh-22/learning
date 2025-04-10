async function retryWrapper(data: any[]) {
	try {
		await updateStatuses(data);
	} catch (e) {
		console.error('Retrying batch...', e);
		return retryWrapper(data); // Recursive retry
	}
}

async function processWithHybrid() {
	let page = 0,
		limit = 100;
	while (true) {
		const batch = await fetchOrders(page, limit);
		if (!batch.length) break;
		await retryWrapper(batch);
		page++;
	}
}
