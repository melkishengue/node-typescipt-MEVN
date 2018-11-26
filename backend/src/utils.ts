// Promise based wait function 
export function wait (seconds: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, seconds);
    })
}

// load the env configuration 
export function loadEnvFile(): void {
    let config_file = process.env.NODE_ENV === 'PROD' ? '../.env' : '../.env_dev';
    require('dotenv').config({ path: config_file });
}

// basic credential check for the basic auth
export function check(login: string, password: string): boolean {
    return (login === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASSWORD);
}