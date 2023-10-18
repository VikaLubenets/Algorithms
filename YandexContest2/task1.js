module.exports = function processOrders (orders) {
    if (!Array.isArray(orders)) {
        return;
    }
    const validOrders = orders.filter(order =>
        typeof order.executionTime === 'number' &&
        typeof order.expiredAt === 'number' &&
        order.executionTime >= 0 &&
        order.expiredAt >= 0 
    );

    const arrOrders = validOrders.sort((a, b) => {
        if (a.expiredAt === b.expiredAt) {
            return a.executionTime - b.executionTime;
        }
        return a.expiredAt - b.expiredAt;
    });

    let totalTime = 0;
    let ordersDone = 0;
    const setOrders = new Set(arrOrders);

    for (const order of setOrders) {
        if (order.expiredAt >= totalTime + order.executionTime) {
            totalTime += order.executionTime;
            ordersDone += 1;
        }
    }

    return ordersDone;
}

function processOrders (orders) {
    if (!Array.isArray(orders)) {
        return;
    }
    const validOrders = orders.filter(order =>
        typeof order.executionTime === 'number' &&
        typeof order.expiredAt === 'number' &&
        order.executionTime >= 0 &&
        order.expiredAt >= 0 
    );

    const arrOrders = validOrders.sort((a, b) => {
        if (a.expiredAt === b.expiredAt) {
            return a.executionTime - b.executionTime;
        }
        return a.expiredAt - b.expiredAt;
    });

    let totalTime = 0;
    let ordersDone = 0;
    const setOrders = new Set(arrOrders);

    for (const order of setOrders) {
        if (order.expiredAt >= totalTime + order.executionTime) {
            totalTime += order.executionTime;
            ordersDone += 1;
        }
    }

    return ordersDone;
}
    
    const orders = [
        {"index":"0000","executionTime":1,"expiredAt":2}
    ];

    const orders4 = [];
      

    const orders2 = [
        {"index":"0000","executionTime":3,"expiredAt":2},
        {"index":"0001","executionTime":4,"expiredAt":3}
    ]

    const orders3 = [
        {"index":"0000","executionTime":100,"expiredAt":200},
        {"index":"0001","executionTime":1000,"expiredAt":1250},
        {"index":"0002","executionTime":200,"expiredAt":1300},
        {"index":"0003","executionTime":2000,"expiredAt":3200}
    ]

      const result = processOrders(orders2);
      console.log(result);