import { ContentProjectsList } from "../model";

describe('ContentProjectList', () => {
  describe('Factory', () => {
    describe('makeUpdatedWithNewPersonalProject', () => {
      it('correctly generates updated project list with empty list', async () => {
        const projectList = {} as ContentProjectsList.Model;
        const updateProjectList = ContentProjectsList.factory(projectList).makeUpdatedWithNewPersonalProject('newProjectId');

        expect(updateProjectList.personal).toEqual(['newProjectId']);
        expect(updateProjectList.selected).toEqual('newProjectId');
        expect(updateProjectList.shared).toBeUndefined();
      });

      it('correctly generates updated project list with existing list', async () => {
        const projectList = {
          personal: ['projectId'],
          selected: 'projectId',
        } as ContentProjectsList.Model;

        const updateProjectList = ContentProjectsList.factory(projectList).makeUpdatedWithNewPersonalProject('newProjectId');

        expect(updateProjectList.personal).toEqual(['projectId', 'newProjectId']);
        expect(updateProjectList.selected).toEqual('newProjectId');
        expect(updateProjectList.shared).toBeUndefined();
      });
    });
    describe('makeUpdatedWithNewSharedProject', () => {
      it('correctly generates updated project list with empty list', async () => {
        const projectList = {} as ContentProjectsList.Model;
        const updateProjectList = ContentProjectsList.factory(projectList).makeUpdatedWithNewSharedProject('invitedProjectId');

        expect(updateProjectList.personal).toBeUndefined();
        expect(updateProjectList.selected).toBeUndefined();
        expect(updateProjectList.shared).toEqual(['invitedProjectId']);
      });

      it('correctly generates updated project list with existing list', async () => {
        const projectList = {
          shared:['projectId']
        } as ContentProjectsList.Model;

        const updateProjectList = ContentProjectsList.factory(projectList).makeUpdatedWithNewSharedProject('invitedProjectId');

        expect(updateProjectList.personal).toBeUndefined();
        expect(updateProjectList.selected).toBeUndefined();
        expect(updateProjectList.shared).toEqual(['projectId', 'invitedProjectId']);
      });
    });
    describe('makeUpdatedForOldOwnerAfterReassign', () => {
      it('correctly generates updated project list with empty list', async () => {
        const projectList = {} as ContentProjectsList.Model;
        const updateProjectList = ContentProjectsList.factory(projectList).makeUpdatedForOldOwnerAfterReassign('ProjectId');

        expect(updateProjectList.personal).toEqual([]);
        expect(updateProjectList.selected).toBeUndefined();
        expect(updateProjectList.shared).toEqual(['ProjectId']);
      });

      it('correctly generates updated project list with existing list', async () => {
        const projectList = {
          personal:[],
          shared:['projectId']
        } as ContentProjectsList.Model;

        const updateProjectList = ContentProjectsList.factory(projectList).makeUpdatedForOldOwnerAfterReassign('newProjectId');

        expect(updateProjectList.personal).toEqual([]);
        expect(updateProjectList.selected).toBeUndefined();
        expect(updateProjectList.shared).toEqual(['projectId', 'newProjectId']);
      });
    });
    describe('makeUpdatedForNewOwnerAfterReassign', () => {
      it('correctly generates updated project list with empty list', async () => {
        const projectList = {} as ContentProjectsList.Model;
        const updateProjectList = ContentProjectsList.factory(projectList).makeUpdatedForNewOwnerAfterReassign('ProjectId');

        expect(updateProjectList.personal).toEqual(['ProjectId']);
        expect(updateProjectList.selected).toBeUndefined();
        expect(updateProjectList.shared).toEqual([]);
      });

      it('correctly generates updated project list with existing list', async () => {
        const projectList = {
          personal:['projectId'],
          shared:[]
        } as ContentProjectsList.Model;

        const updateProjectList = ContentProjectsList.factory(projectList).makeUpdatedForNewOwnerAfterReassign('newProjectId');

        expect(updateProjectList.personal).toEqual(['projectId', 'newProjectId']);
        expect(updateProjectList.selected).toBeUndefined();
        expect(updateProjectList.shared).toEqual([]);
      });
    });
  });

  describe('Wrapper', () => {
    describe('personalIds', () => {
      it('correctly generates personalIds list with empty list', async () => {
        const projectList = {} as ContentProjectsList.Model;
        const personalIds = ContentProjectsList.wrapper(projectList).personalIds;

        expect(personalIds).toEqual([]);
      });

      it('correctly generates personalIds list with existing list', async () => {
        const projectList_for_personalIds = {personal:['personalIds']} as ContentProjectsList.Model;
        const personalIds = ContentProjectsList.wrapper(projectList_for_personalIds).personalIds;
        
        expect(personalIds).toEqual(['personalIds']);

      });
    });
    describe('sharedIds', () => {
      it('correctly generates sharedIds list with empty list', async () => {
        const projectList = {} as ContentProjectsList.Model;
        const sharedIds = ContentProjectsList.wrapper(projectList).sharedIds;

        expect(sharedIds).toEqual([]);
      });

      it('correctly generates personalIds list with existing list', async () => {
        const projectList_for_sharedIds = {shared:['sharedIds']} as ContentProjectsList.Model;
        const sharedIds = ContentProjectsList.wrapper(projectList_for_sharedIds).sharedIds;
        
        expect(sharedIds).toEqual(['sharedIds']);

      });
    });
    describe('allIds', () => {
      it('correctly generates allIds list with empty list', async () => {
        const projectList = {} as ContentProjectsList.Model;
        const allIds = ContentProjectsList.wrapper(projectList).allIds;

        expect(allIds).toEqual([]);
      });

      it('correctly generates allIds list with existing list', async () => {
        const projectList_for_allIds = {personal:['personalIds'], shared:['sharedIds']} as ContentProjectsList.Model;
        const allIds = ContentProjectsList.wrapper(projectList_for_allIds).allIds;
        
        expect(allIds).toEqual(['personalIds','sharedIds']);

      });
    });
    describe('isEmpty', () => {
      it('expecting is Empty to be true', async () => {
        const projectList = {} as ContentProjectsList.Model;
        const isEmpty = ContentProjectsList.wrapper(projectList).isEmpty;

        expect(isEmpty).toEqual(true);
      });

      it('expecting is Empty to be false', async () => {
        const projectList_for_allIds = {personal:['personalIds'], shared:['sharedIds']} as ContentProjectsList.Model;
        const isEmpty = ContentProjectsList.wrapper(projectList_for_allIds).isEmpty;
        
        expect(isEmpty).toEqual(false);
      });
    });
    describe('hasPersonal', () => {
      it('expecting hasPersonal to be true', async () => {
        const projectList = {} as ContentProjectsList.Model;
        const hasPersonal = ContentProjectsList.wrapper(projectList).hasPersonal;

        expect(hasPersonal).toEqual(true);
      });

      it('expecting hasPersonal to be false', async () => {
        const projectList_for_personalIds = {personal:['personalIds']} as ContentProjectsList.Model;
        const hasPersonal = ContentProjectsList.wrapper(projectList_for_personalIds).hasPersonal;
        
        expect(hasPersonal).toEqual(false);
      });
    });
    describe('isNotExisted', () => {
      it('expecting isNotExisted to be true', async () => {
        const isNotExisted = ContentProjectsList.wrapper().isNotExisted;

        expect(isNotExisted).toEqual(true);
      });

      it('expecting isNotExisted to be false', async () => {
        const projectList_for_personalIds = {personal:['personalIds']} as ContentProjectsList.Model;
        const isNotExisted = ContentProjectsList.wrapper(projectList_for_personalIds).isNotExisted;
        
        expect(isNotExisted).toEqual(false);
      });
    });
  });
});
