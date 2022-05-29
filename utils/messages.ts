export const Messages = {
  UserPrivacyDataReport: {
    InProcess: (email: string) => `Your data report will be generated and sent on your email ${email}`,
    GeneratedRecently: (email: string) =>
      `You have recently requested your data report, please check your email ${email} for the same`,
    UserNotLoggedIn: 'You have not yet logged in Content Office',
  },
  UserSupportRequest: {
    Rating: {
      Subject: (value: number) => `Rate app with ${value}`,
      ArticleName: (value: number) => `${value}`,
      CategoryName: 'Rating',
    },
  },
};

export const LocalePath = {
  Notification: {
    GeneralTitle: 'notifications/collection/-notification_general_title',
    /** @deprecated */
    RefereeRewardAcquired: 'notifications/collection/-notification_referee_reward_acquired',
    /** @deprecated */
    ReferrerRefereeSignedUp: 'notifications/collection/-notification_referrer_referee_signed_up',
    /** @deprecated */
    ReferrerRefereeSignUpLimitReached:
      'notifications/collection/-notification_referrer_referee_signed_up_limit_reached',
    /** @deprecated */
    ReferrerRefereeSubscribed: 'notifications/collection/-notification_referrer_referee_subscribed',
    /** @deprecated */
    RefereeSubscription: 'notifications/collection/-notification_referee_subscription',
    /** @deprecated */
    UserSupportRequestTitle: 'notifications/collection/-notification_user_support_request_title',
    /** @deprecated */
    UserSupportRequestContent: 'notifications/collection/-notification_user_support_request_content',
    ContentProject: {
      Invites: {
        InvitedUserTitle: 'notifications/collection/-notification_content_project_invites_title',
        InvitedUserContent: 'notifications/collection/-notification_content_project_invites_content',
        AcceptInviteTitle: 'notifications/collection/-notification_content_project_accept_invites_title',
        AcceptInviteContent: 'notifications/collection/-notification_content_project_accept_invites_content',
        DeclineInviteTitle: 'notifications/collection/-notification_content_project_decline_invites_title',
        DeclineInviteContent: 'notifications/collection/-notification_content_project_decline_invites_content',
      },
    },
    UserSubscription: {
      /** @deprecated */
      Renewal: {
        OnSuccessTitle: 'notifications/collection/-notification_user_subscription_on_success_renewal_title',
        OnSuccessContent: 'notifications/collection/-notification_user_subscription_on_success_renewal_content',
      },
    },
    ContentPublishing: {
      SucceedPublishingTitle: 'notifications/collection/-notification_succeed_content_publishing',
      FailedPublishingTitle: 'notifications/collection/-notification_failed_content_publishing',
    },
  },
  /** @deprecated */
  UserData: {
    Subject: 'privacy/collection/export-email-subject',
    Body: 'privacy/collection/export-email-body',
  },
  /** @deprecated */
  DynamicLinks: {
    ContentProjectInvitation: {
      Subject: 'dynamiclinks/collection/content-project-invitation-email-subject',
      Body: 'dynamiclinks/collection/content-project-invitation-email-body',
    },
  },
};
