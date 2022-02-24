/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { TreeDataProvider, TreeItemCollapsibleState } from 'vscode';
import Service from './Service';
import TokenStorage from './TokenStorage';
import { getServiceTypeDisplayName, ServiceType } from './utils';

export default class RenderServicesProvider implements TreeDataProvider<Service> {
  getTreeItem(element: Service): Service {
    return element;
  }

  async getServices() {
    const token = await TokenStorage.instance.getToken();

    const response = await axios.get('https://api.render.com/v1/services?limit=20', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const services: Service[] = response.data.map(
      (item: any) =>
        new Service(
          item.service.name,
          TreeItemCollapsibleState.Collapsed,
          getServiceTypeDisplayName(item.service.type as ServiceType),
          item.service,
        ),
    );
    return services;
  }

  getChildren(element?: Service): Thenable<Service[]> {
    return Promise.resolve(element ? element.getDescription() : this.getServices());
  }
}
