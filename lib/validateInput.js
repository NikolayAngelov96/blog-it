const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validateUserData = (userData) => {
  const { email, username, password, rePass } = userData;

  if (!email || !username || !password || !rePass) {
    throw new Error("All fields are required");
  }

  if (!emailRegex.test(email)) {
    throw new Error("Please enter a valid email address");
  }

  if (password !== rePass) {
    throw new Error("Passwords do not match");
  }
};
