import * as bcrypt from "bcrypt";

export const hashed = async (data: any) => {
  const salt = 10;
  
  return bcrypt.hash(data, salt);
};

export const compare = async (data: any, hashData: any) => {
  return await bcrypt.compare(data, hashData);
};
