import { FirestoreModel } from '../../firestore-model';

interface ContentProjectsListModel extends FirestoreModel {
  // Id of selected ContentProject
  readonly selected?: string;
  // Ids of personal ContentProjects
  readonly personal?: string[] /** @todo: check if works with admin.firestore.FieldValue */;
  // Ids of ContentProjects shared with user
  readonly shared?: string[] /** @todo: check if works with admin.firestore.FieldValue */;
}

class ContentProjectsListWrapper {
  constructor(readonly model?: ContentProjectsListModel) {}

  get personalIds(): string[] {
    return (this.model?.personal as string[]) || [];
  }

  get sharedIds(): string[] {
    return (this.model?.shared as string[]) || [];
  }

  get allIds(): string[] {
    return [...this.personalIds, ...this.sharedIds];
  }

  get isEmpty(): boolean {
    return this.allIds.length === 0;
  }

  get hasPersonal(): boolean {
    return this.personalIds.length === 0;
  }

  get isNotExisted(): Boolean {
    return !this.model;
  }
}

class ContentProjectListFactory {
  private readonly wrapper: ContentProjectsListWrapper;

  constructor(model?: ContentProjectsListModel) {
    this.wrapper = ContentProjectsList.wrapper(model);
  }

  makeUpdatedWithNewPersonalProject(newProjectId: string): ContentProjectsList.Model {
    return {
      ...this.wrapper.model,
      personal: [...this.wrapper.personalIds, newProjectId],
      selected: newProjectId,
    };
  }

  makeUpdatedWithNewSharedProject(invitedProjectId: string): ContentProjectsList.Model {
    // Filtering logic is split on 2 steps:
    // 1. Adding new project to project list
    // 2. If isAccepted filter array on unique values, if not filter to remove invited project from array
    const shared = [...this.wrapper.sharedIds, invitedProjectId].filter(
      (id, index, self) => {
        return index === self.indexOf(id);
      }
    );

    return {
      ...this.wrapper.model,
      shared,
    };
  }

  makeUpdatedForOldOwnerAfterReassign(projectId: string): ContentProjectsList.Model {
    return {
      ...this.wrapper.model,
      personal: this.wrapper.personalIds.filter((id) => id !== projectId),
      shared: [...this.wrapper.sharedIds, projectId],
    };
  }

  makeUpdatedForNewOwnerAfterReassign(projectId: string): ContentProjectsList.Model {
    return {
      ...this.wrapper.model,
      personal: [...this.wrapper.personalIds, projectId],
      shared: this.wrapper.sharedIds.filter((id) => id !== projectId),
    };
  }
}

export namespace ContentProjectsList {
  export type Model = ContentProjectsListModel;

  export function wrapper(projectList?: Partial<Model>): ContentProjectsListWrapper {
    return new ContentProjectsListWrapper(projectList as Model);
  }

  export function factory(projectList?: Partial<Model>): ContentProjectListFactory {
    return new ContentProjectListFactory(projectList as Model);
  }
}