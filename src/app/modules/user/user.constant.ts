export const USER_ROLE = {
  student: 'student',
  faculty: 'faculty',
  admin: 'admin',
} as const; // we used as const here to make it readonly

export const UserStatus = ['in-progress', 'blocked'];
