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
  });

  describe('Wrapper', () => {

  });
});
