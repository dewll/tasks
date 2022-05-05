import * as admin from 'firebase-admin';
import { isNullOrUndefined } from './utils2';
import { MAX_ALLOWED_SECONDS_FOR_USER_ACTIVITY } from '../../routes/legacy/http/get-remaining-time-for-deactivation.f';

export function getThresholdFilteredArrayFromCollectionRef<T>(
  collectionRef: admin.database.Reference | admin.database.Query
): Promise<T[]> {
  const query = collectionRef.orderByChild('createdTime').startAt(MAX_ALLOWED_SECONDS_FOR_USER_ACTIVITY);
  return getArrayFromCollectionRef<T>(query);
}

export function getArrayFromCollectionRef<T>(
  collectionRef: admin.database.Reference | admin.database.Query
): Promise<T[]> {
  return collectionRef.once('value').then((snapshot) => {
    const o: object = snapshot.val();
    if (isNullOrUndefined(o)) return [];

    return Object.keys(o).map((x) => (o as any)[x]);
  });
}
