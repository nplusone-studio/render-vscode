import { TreeItem, TreeItemCollapsibleState } from 'vscode';

export default class Service extends TreeItem {
  constructor(
    public override readonly label: string,
    public override readonly collapsibleState: TreeItemCollapsibleState,
    public override readonly description: string | boolean = false,
    private readonly data?: any,
  ) {
    super(label, collapsibleState);
    this.tooltip = label;
    this.description = description;
    this.data = data;
  }

  getDescription() {
    const details = [
      new Service('ID:', TreeItemCollapsibleState.None, this.data.id),
      new Service('Repo:', TreeItemCollapsibleState.None, this.data.repo.split('https://')[1]),
      new Service('Auto deploy:', TreeItemCollapsibleState.None, this.data.autoDeploy),
      new Service('Branch:', TreeItemCollapsibleState.None, this.data.branch),
      new Service('Created at:', TreeItemCollapsibleState.None, this.data.createdAt),
      new Service('Updated at:', TreeItemCollapsibleState.None, this.data.updatedAt),
    ];
    if (this.data.type === 'cron_job') {
      return details.concat([
        new Service('Schedule:', TreeItemCollapsibleState.None, this.data.serviceDetails.schedule),
        new Service('Region:', TreeItemCollapsibleState.None, this.data.serviceDetails.region),
        new Service('Plan:', TreeItemCollapsibleState.None, this.data.serviceDetails.plan),
      ]);
    }
    return details;
  }
}
