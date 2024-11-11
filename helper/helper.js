import argon2 from "argon2";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (error) {
    console.log(error);
    return false;
  }
};