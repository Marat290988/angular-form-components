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
	messageQty: number;
	rating: number;
}

export const userRoles = [
	{label: 'Admin', value: UserRole.ADMIN},
	{label: 'Manager', value: UserRole.MANAGER},
	{label: 'Editor', value: UserRole.EDITOR},
	{label: 'User', value: UserRole.USER},
	{label: 'Guest', value: UserRole.GUEST}
];

export const users: IUser[] = Array.from({length: 100}, (_, index) => {
	const id = index + 1;

	const firstNames = [
		'John',
		'Anna',
		'Mike',
		'Sara',
		'David',
		'Emily',
		'Daniel',
		'Olivia',
		'James',
		'Sophia',
		'Liam',
		'Emma',
		'Noah',
		'Ava',
		'Lucas',
		'Mia',
		'Ethan',
		'Amelia',
		'Logan',
		'Harper'
	];

	const lastNames = [
		'Doe',
		'Smith',
		'Brown',
		'Johnson',
		'Wilson',
		'Taylor',
		'Anderson',
		'Thomas',
		'Jackson',
		'White',
		'Harris',
		'Martin',
		'Thompson',
		'Garcia',
		'Martinez',
		'Robinson',
		'Clark',
		'Rodriguez',
		'Lewis',
		'Lee'
	];

	const roles = [UserRole.ADMIN, UserRole.MANAGER, UserRole.USER, UserRole.EDITOR, UserRole.GUEST];

	return {
		id,
		firstName: firstNames[id % firstNames.length],
		lastName: lastNames[id % lastNames.length],
		email: `user${id}@mail.com`,
		isActive: id % 3 !== 0,
		role: roles[id % roles.length],
		createdAt: new Date(2024, id % 12, (id % 28) + 1),
		messageQty: Math.floor(Math.random() * 100000),
		rating: Number((Math.random() * 5).toFixed(2))
	};
});
