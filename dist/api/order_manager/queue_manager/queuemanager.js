import { matchingAlgo } from "../matching_engine/matchineengine.js";
import { postProcessor } from "../post_process/postprocessor.js";
export class QueueManager {
    constructor(initialOrders, liveConnections) {
        this.orderList = initialOrders;
        this.liveConnections = liveConnections;
    }
    addOrder(newOrder) {
        for (let i = 0; i < this.orderList.length; i++) {
            const existingOrder = this.orderList[i];
            const result = matchingAlgo(newOrder, existingOrder);
            if (result !== null) {
                if (result.existing.filled) {
                    this.orderList.splice(i, 1);
                }
                else {
                    this.orderList[i] = result.existing;
                }
                postProcessor(result.existing, this.liveConnections);
                newOrder = result.processing; // Update the new order
                if (newOrder.filled) {
                    postProcessor(newOrder, this.liveConnections);
                    return;
                }
            }
        }
        // Add the new order to the list if it is not fully filled
        if (!newOrder.filled) {
            postProcessor(newOrder, this.liveConnections);
            this.orderList.push(newOrder);
        }
    }
}
//# sourceMappingURL=queuemanager.js.map