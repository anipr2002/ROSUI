import * as ROSLIB from "roslib";
import { IService } from "../types/types";

// Services to ignore
const IGNORED_SERVICES = [
  'rosapi',
  'rosout',
  '/rosapi',
  '/rosout',
  'rosapi/',
  'rosout/',
  '/rosbridge`'
];

function shouldIncludeService(serviceName: string): boolean {
  return !IGNORED_SERVICES.some(ignored =>
    serviceName.toLowerCase().includes(ignored.toLowerCase())
  );
}

function getDetailedServices(ros: ROSLIB.Ros): Promise<IService[]> {

  return new Promise((resolve, reject) => {
    ros.getServices((result) => {
      // Filter out ignored services
      const filteredServices = result.filter(shouldIncludeService);

      const detailedServices: IService[] = [];
      const servicePromises = filteredServices.map((serviceName) => {
        return new Promise<void>((resolveService) => {
          ros.getServiceType(serviceName, (serviceType) => {
            ros.getServiceRequestDetails(serviceType, (requestDetails) => {
              ros.getServiceResponseDetails(serviceType, (responseDetails) => {
                const serviceInfo: IService = {
                  name: serviceName,
                  serviceType: serviceType,
                  serviceArgs: ros.decodeTypeDefs(requestDetails.typedefs) || null,
                  serviceReturns: ros.decodeTypeDefs(responseDetails.typedefs) || null,
                };
                detailedServices.push(serviceInfo);
                resolveService();
              }, (error) => {
                console.error(`Error getting response details for ${serviceName}:`, error);
                resolveService();
              });
            }, (error) => {
              console.error(`Error getting request details for ${serviceName}:`, error);
              resolveService();
            });
          }, (error) => {
            console.error(`Error getting service type for ${serviceName}:`, error);
            resolveService();
          });
        });
      });

      Promise.all(servicePromises).then(() => {
        resolve(detailedServices);
      }).catch(reject);
    });
  });
}

export default getDetailedServices;
