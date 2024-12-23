# EventConnect

EventConnect is a social application designed to make event organization easy and fun. Whether it's a birthday, gaming session, or movie night, EventConnect helps users seamlessly organize and manage events while keeping guests informed.

## Software Development Patterns:

#### 1. Singleton pattern:

The **Singleton pattern** is used in EventConnect to maintain a single database connection throughout a user's session. By ensuring that only one instance of the database connection exists, we reduce the overhead of repeatedly creating and destroying connections, which leads to improved performance and resource management. This pattern helps ensure consistency and efficiency while interacting with the database.

#### 2. Builder pattern:

The **Builder pattern** is employed for handling different event types in EventConnect. When creating an event, users can choose the event type (birthday, gaming, or movie). Each type has different potential details with it. The Builder pattern allows us to easily construct these event objects, ensuring flexibility and scalability as new event types and attributes may be added in the future. This pattern helps manage complexity in event creation and ensures that all necessary data is included.

#### 3. lazy loading:

**Lazy Loading** is utilized in EventConnect to optimize the performance of the application. Specifically, it is used to delay the loading of event forms until they are actually needed by the user. This reduces the initial loading time and ensures that only the necessary parts of the application are loaded, which improves the overall user experience.

## Functionalities

- **User Authentication**: Simple Sign up and log in using Clerk. The app is designed around email & email codes authentication.
- **Event Creation**: Users can create events by filling out simple forms with event details based on the event type.
- **Friends**: Users can add friends via usernames on the platform to invite them to future events.
- **Invite Friends**: After creating an event, the event creator can choose friends to invite.
- **RSVP System**: Invitees receive an email where they can accept or decline event invitations with just a click.
- **Event Reminders**: Participants receive a reminder email 1 day before the event.

## Tech Stack

- [Next.js](https://nextjs.org/): React framework for building the app.
- [TypeScript](https://www.typescriptlang.org/): Ensures type safety in development.
- [Resend](https://resend.com/): For email sending and management.
- [Tailwind CSS](https://tailwindcss.com/): For building responsive and modern layouts.
- [Neon PostgreSQL](https://neon.tech/): Cloud-based database for secure data storage.
- [Clerk](https://clerk.com/): For user authentication and secure account management.
- **[ShadCN UI](https://ui.shadcn.dev/)**: A set of high-quality UI components built for React and Tailwind CSS, used to create modern and accessible interfaces.