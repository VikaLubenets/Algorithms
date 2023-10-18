function getRaceFinishingOrder(racers, overtaking, winner) {
    const validOrders = [];

    function generateValidOrders(currentOrder, remainingRacers) {
        if (currentOrder.length === racers.length) {
            if (isValidOrder(currentOrder, overtaking, winner)) {
                validOrders.push([...currentOrder]);
            }
            return;
        }

        for (let i = 0; i < remainingRacers.length; i++) {
            const racer = remainingRacers[i];
            const updatedOrder = [...currentOrder, racer];
            const updatedRemainingRacers = [...remainingRacers.slice(0, i), ...remainingRacers.slice(i + 1)];
            generateValidOrders(updatedOrder, updatedRemainingRacers);
        }
    }

    function isValidOrder(order, overtaking, winner) {
        const orderMap = {};
        for (let i = 0; i < order.length; i++) {
            orderMap[order[i]] = i;
        }

        for (const { leading, lagging } of overtaking) {
            if (orderMap[leading] > orderMap[lagging]) {
                return false;
            }
        }

        return order[0] === winner;
    }

    generateValidOrders([], racers);

    return validOrders;
}

module.exports = getRaceFinishingOrder;