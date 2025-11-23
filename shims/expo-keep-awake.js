/**
 * No-op shim for `expo-keep-awake`.
 *
 * Some dependencies may call into the native keep-awake module at runtime
 * which can throw when the native side isn't available or can't be activated.
 * This shim provides harmless no-op implementations so those calls won't fail.
 */
const React = require("react");

function activateKeepAwake() {}
function deactivateKeepAwake() {}

function useKeepAwake() {
  // Keep API shape compatible with the real hook
  React.useEffect(() => {
    return () => {};
  }, []);
}

module.exports = {
  activateKeepAwake,
  deactivateKeepAwake,
  useKeepAwake,
};
