export default function validateForm(name) {
  const minLength = 3;
  if (name.length < minLength) {
    return true;
  }
  return false;
}
