import { ClientVersionFlow, ClientVersionFlowRequirements } from './client-flow';

export * from './client-flow';

export enum VERSIONED_FUNCTIONALITY {
  GET_BONUS_TIME = 'GET_BONUS_TIME',
  TRIGGER_POST_ARCHIVE_SCHEDULED_POSTS_ON_DELETE_ORDER_ITEM = 'TRIGGER_POST_ARCHIVE_SCHEDULED_POSTS_ON_DELETE_ORDER_ITEM',
  TRIGGER_CONTENT_PROJECT_SEND_INVITATION = 'TRIGGER_CONTENT_PROJECT_SEND_INVITATION',
  CREATE_INITIAL_DATA = 'CREATE_INITIAL_DATA',
  VERIFY_SUBSCRIPTION = 'VERIFY_SUBSCRIPTION',
  ACTIVATE_PROMO_SUBSCRIPTION = 'ACTIVATE_PROMO_SUBSCRIPTION',
  IOS_PRODUCT_VERIFY_RECEIPT = 'IOS_PRODUCT_VERIFY_RECEIPT',
  POST_LIMITS_FOR_ARCHIVE = 'POST_LIMIT_FOR_ARCHIVE',
}

// REFFERRAL
// const postArchiveOnIsDeleteFlagVersion = triggerMinVersions.post_archive_on_is_delete_flag;

export const VERSIONS_REQUIREMENTS: Record<VERSIONED_FUNCTIONALITY, ClientVersionFlowRequirements> = {
  [VERSIONED_FUNCTIONALITY.GET_BONUS_TIME]: {
    ios: {
      [ClientVersionFlow.LATEST]: {
        min: '4.0.0',
      },
      [ClientVersionFlow.DEPRECATED]: {
        min: '3.0.0',
        max: '4.0.0',
      },
    },
    android: {
      [ClientVersionFlow.LATEST]: {
        min: '1.0.0',
      },
    },
  },
  [VERSIONED_FUNCTIONALITY.TRIGGER_POST_ARCHIVE_SCHEDULED_POSTS_ON_DELETE_ORDER_ITEM]: {
    ios: {
      [ClientVersionFlow.LATEST]: {
        min: '4.0.0',
      },
      [ClientVersionFlow.DEPRECATED]: {
        min: '2.5.0',
      },
    },
    android: {
      [ClientVersionFlow.LATEST]: {
        min: '0.9.3',
      },
    },
  },
  [VERSIONED_FUNCTIONALITY.TRIGGER_CONTENT_PROJECT_SEND_INVITATION]: {
    ios: {
      [ClientVersionFlow.LATEST]: {
        min: '3.0.0',
      },
    },
    android: {
      [ClientVersionFlow.LATEST]: {
        min: '1.0.0',
      },
    },
  },
  [VERSIONED_FUNCTIONALITY.CREATE_INITIAL_DATA]: {
    ios: {
      [ClientVersionFlow.LATEST]: {
        min: '4.0.0',
      },
      [ClientVersionFlow.DEPRECATED]: {
        max: '4.0.0',
      },
    },
    android: {
      [ClientVersionFlow.DEPRECATED]: {
        max: '1.0.0',
      },
    },
  },
  [VERSIONED_FUNCTIONALITY.VERIFY_SUBSCRIPTION]: {
    ios: {
      [ClientVersionFlow.DEPRECATED]: {
        max: '4.0.0',
      },
    },
    android: {
      [ClientVersionFlow.DEPRECATED]: {
        max: '1.0.0',
      },
    },
  },
  [VERSIONED_FUNCTIONALITY.ACTIVATE_PROMO_SUBSCRIPTION]: {
    ios: {
      [ClientVersionFlow.LATEST]: {
        min: '4.0.0',
      },
    },
    android: {
      [ClientVersionFlow.ERROR]: {
        min: '0.0.0',
      },
    },
  },
  [VERSIONED_FUNCTIONALITY.IOS_PRODUCT_VERIFY_RECEIPT]: {
    ios: {
      [ClientVersionFlow.LATEST]: {
        min: '4.0.0',
      },
    },
    android: {
      [ClientVersionFlow.ERROR]: {
        min: '0.0.0',
      },
    },
  },
  [VERSIONED_FUNCTIONALITY.POST_LIMITS_FOR_ARCHIVE]: {
    ios: {
      [ClientVersionFlow.LATEST]: {
        min: '4.0.0',
      },
      [ClientVersionFlow.DEPRECATED]: {
        max: '4.0.0',
      },
    },
  },
};
