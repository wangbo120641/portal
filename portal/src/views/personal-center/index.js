const personalCenter = () => import('./personal-center');
const accountPersonalInfo = () => import('./account-personal-info');
const accountModifyPassword = () => import('./account-modify-password');
const myApply = () => import('./my-apply/my-apply');
const myCollection = () => import('./my-collection/my-collection');
const myHandle = () => import('./my-handle');
const myMessage = () => import('./my-message');
const mySubscription = () => import('./my-subscription/my-subscription');
const myApplications = () => import('./my-applications/my-applications');

export {
  personalCenter,
  mySubscription,
  myCollection,
  myApply,
  myHandle,
  myMessage,
  myApplications,
  accountPersonalInfo,
  accountModifyPassword
};
