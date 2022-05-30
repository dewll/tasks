import * as admin from 'firebase-admin';

// Firestore model

export interface BaseId {
  readonly id: string;
}

/**
 * Base interface for any Firestore model in collection
 */
export interface FirestoreModel extends BaseId {
  readonly createdAt: admin.firestore.Timestamp;
  readonly updatedAt: admin.firestore.Timestamptamp;
}
