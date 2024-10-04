
export default function generateUsername(email: string) {

  let username = email.split('@')[0];  
  username = username.replace(/[._]/g, '');  
  return username;
}