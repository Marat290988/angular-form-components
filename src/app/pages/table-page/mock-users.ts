
export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  EDITOR = 'EDITOR',
  USER = 'USER',
  GUEST = 'GUEST'
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  role: UserRole; 
  createdAt: Date;
}

export const userRoles = [
  { label: 'Admin', value: UserRole.ADMIN },
  { label: 'Manager', value: UserRole.MANAGER },
  { label: 'Editor', value: UserRole.EDITOR },
  { label: 'User', value: UserRole.USER },
  { label: 'Guest', value: UserRole.GUEST }
];

export const users: IUser[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@mail.com',
    isActive: true,
    role: UserRole.ADMIN,
    createdAt: new Date('2024-01-10')
  },
  {
    id: 2,
    firstName: 'Anna',
    lastName: 'Smith',
    email: 'anna.smith@mail.com',
    isActive: true,
    role: UserRole.MANAGER,
    createdAt: new Date('2024-02-12')
  },
  {
    id: 3,
    firstName: 'Mike',
    lastName: 'Brown',
    email: 'mike.brown@mail.com',
    isActive: false,
    role: UserRole.USER,
    createdAt: new Date('2024-03-05')
  },
  {
    id: 4,
    firstName: 'Sara',
    lastName: 'Johnson',
    email: 'sara.johnson@mail.com',
    isActive: true,
    role: UserRole.EDITOR,
    createdAt: new Date('2024-04-01')
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@mail.com',
    isActive: true,
    role: UserRole.USER,
    createdAt: new Date('2024-05-15')
  },
  {
    id: 6,
    firstName: 'Emily',
    lastName: 'Taylor',
    email: 'emily.taylor@mail.com',
    isActive: false,
    role: UserRole.GUEST,
    createdAt: new Date('2024-06-20')
  },
  {
    id: 7,
    firstName: 'Daniel',
    lastName: 'Anderson',
    email: 'daniel.anderson@mail.com',
    isActive: true,
    role: UserRole.MANAGER,
    createdAt: new Date('2024-07-08')
  },
  {
    id: 8,
    firstName: 'Olivia',
    lastName: 'Thomas',
    email: 'olivia.thomas@mail.com',
    isActive: true,
    role: UserRole.USER,
    createdAt: new Date('2024-08-11')
  },
  {
    id: 9,
    firstName: 'James',
    lastName: 'Jackson',
    email: 'james.jackson@mail.com',
    isActive: false,
    role: UserRole.GUEST,
    createdAt: new Date('2024-09-03')
  },
  {
    id: 10,
    firstName: 'Sophia',
    lastName: 'White',
    email: 'sophia.white@mail.com',
    isActive: true,
    role: UserRole.ADMIN,
    createdAt: new Date('2024-10-18')
  }
];