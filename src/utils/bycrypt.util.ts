import bcrypt from 'bcrypt';

// generate salt
export async function generateSalt(): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.genSalt(saltRounds);
}

// hash password với salt
export async function hashPasswordWithSalt(
    password: string,
    salt: string,
): Promise<string> {
    return await bcrypt.hash(password, salt);
}

// so sánh password với hashed password đã được hash với salt
export async function comparePasswordWithSalt(
    password: string,
    salt: string,
    hashedPassword: string,
): Promise<boolean> {
    const hashedInputPassword = await bcrypt.hash(password, salt);
    return hashedInputPassword === hashedPassword;
}
