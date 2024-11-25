import * as ROSLIB from "roslib";
import { IParam } from "@/types/types";
import { toast } from "sonner";
function getDetailedParams(ros: ROSLIB.Ros): Promise<IParam[]> {
  return new Promise((resolve, reject) => {
    ros.getParams((paramNames) => {
      const detailedParams: IParam[] = [];
      let processedParams = 0;

      if (paramNames.length === 0) {
        resolve(detailedParams);
        return;
      }

      paramNames.forEach((paramName) => {
        const param = new ROSLIB.Param({ ros: ros, name: paramName });
        param.get((value) => {
          detailedParams.push({
            name: paramName,
            value: JSON.stringify(value) // Convert value to string
          });
          processedParams++;

          if (processedParams === paramNames.length) {
            resolve(detailedParams);
          }
        });
      });
    }, (error) => {
      console.error('Error getting params:', error);
      reject(error);
    });
  });
}


function editParam(ros: ROSLIB.Ros, paramName: string, value: unknown): Promise<void> {
  return new Promise((resolve, reject) => {
    const param = new ROSLIB.Param({ ros: ros, name: paramName });
    param.set(value, (callback) => {
      if (callback) {
        toast.success(`Successfully set ${paramName} to ${value}`);
      }
      resolve();
    });
  });
}

function deleteParam(ros: ROSLIB.Ros, paramName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const param = new ROSLIB.Param({ ros: ros, name: paramName });
    param.delete((callback) => {
      if (callback) {
        toast.success(`Successfully deleted ${paramName}`);
      }
      resolve();
    });
  });
}

const paramAPI = {
  getDetailedParams,
  editParam,
  deleteParam,
};
export default paramAPI;
