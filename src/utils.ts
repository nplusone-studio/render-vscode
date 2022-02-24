export type ServiceType = 'static_site' | 'web_service' | 'private_service' | 'background_worker' | 'cron_job';

export const getServiceTypeDisplayName = (type: ServiceType) => {
  const typeDisplayMap = {
    background_worker: 'Background Worker',
    cron_job: 'Cron Job',
    private_service: 'Private Service',
    static_site: 'Static Site',
    web_service: 'Web Service',
  };

  return typeDisplayMap[type];
};
