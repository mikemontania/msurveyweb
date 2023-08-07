export class User {
    id: number;
    username: string | null;
    name: string | null;
    password: string | null;
    role: string | null;
    admin: string | null;
    attempts: number | null;
    active: boolean | null;
    blocked: boolean | null;
  
    constructor(
      id: number,
      username: string | null,
      name: string | null,
      password: string | null,
      role: string | null,
      admin: string | null,
      attempts: number | null,
      active: boolean | null,
      blocked: boolean | null
    ) {
      this.id = id;
      this.username = username;
      this.name = name;
      this.password = password;
      this.role = role;
      this.admin = admin;
      this.attempts = attempts;
      this.active = active;
      this.blocked = blocked;
    }
  }