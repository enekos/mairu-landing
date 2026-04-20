export class AuthService {
    private token: string;
    
    constructor() {
        this.token = '';
    }
    
    async login(username: string, password: string):Promise<boolean> {
        // Authenticate user
        return true;
    }
    
    async logout():Promise<void> {
        // Logout user
        this.token = '';
    }
    
    private validateToken():boolean {
        return this.token.length > 0;
    }
}

export function getCurrentUser() {
    return { id: 1, name: 'Admin' };
}
