import { mutation } from "convex/server";
import { v4 as uuidv4 } from "uuid";

// Mutation to handle user login
export default mutation(async ({ db }, { provider, userId, userInfo }) => {
  // Check if user already exists in the database
  let user = await db.query('users').filter(q => q.eq('userId', userId)).first();
  
  // If user doesn't exist, create a new one
  if (!user) {
    user = {
      id: uuidv4(),
      userId,
      provider,
      name: userInfo.name,
      email: userInfo.email,
      createdAt: new Date(),
    };
    await db.insert('users', user);
  }
  
  // Return user info (this can be used to update the frontend state)
  return user;
});
