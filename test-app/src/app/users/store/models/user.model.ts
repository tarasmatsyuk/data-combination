import {PlatformShared} from './platform-shared.enum';

export interface User {
  first_name: 'string';
  last_name: 'string';
  email: 'string';
  gender: 'string';
  ip_address: 'string';
  username: 'string';
  profile_shared: PlatformShared;
}
