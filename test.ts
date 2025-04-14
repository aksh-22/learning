async function processOrdersRecursively(page = 0, limit = 100): Promise<void> {
	const orders = await fetchOrders(page, limit);
	if (!orders.length) return;

	await updateStatuses(orders);
	return processOrdersRecursively(page + 1, limit);
}
