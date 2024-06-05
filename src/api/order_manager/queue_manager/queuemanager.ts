import { Order } from "../../model/order.js";
import { matchingAlgo } from "../matching_engine/matchineengine.js";
import { postProcessor } from "../post_process/postprocessor.js";

export class QueueManager {
    private orderList: Order[];
    private liveConnections: any;
  
    constructor(initialOrders: Order[] ,liveConnections : any) {
      this.orderList = initialOrders;
      this.liveConnections = liveConnections;
    }
  
    addOrder(newOrder: Order): void {
      for (let i = 0; i < this.orderList.length; i++) {
        const existingOrder = this.orderList[i];
        const result = matchingAlgo(newOrder, existingOrder);
        
        if (result !== null) {
          
          if(result.existing.filled){this.orderList.splice(i,1) }
          else{this.orderList[i] = result.existing; }


          postProcessor(result.existing , this.liveConnections);

          newOrder = result.processing;  
          if (newOrder.filled) {
            postProcessor(newOrder ,this.liveConnections);
            return;
          }
        }
      }
  
      if (!newOrder.filled) {
        postProcessor(newOrder ,this.liveConnections);
        this.orderList.push(newOrder);
      }
    }
  }