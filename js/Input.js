function createKeyboardKeys(scene) {
  const keys = {};
  for (let i = 0; i <= 256; i++) {
    const key = String.fromCharCode(i);
    keys[key] = scene.input.keyboard.addKey(i);
  }
  return keys;
}