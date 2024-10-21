import React from "react";

const MyReact = (function MyReact() {
  const memorizedStates = [];
  let deps = [];
  const isInitialized = [];
  let cursor = 0;

  function useState(initialValue = "") {
    const { forceUpdate } = useForceUpdate();

    if (!isInitialized[cursor]) {
      memorizedStates[cursor] = initialValue;
      isInitialized[cursor] = true;
    }

    const state = memorizedStates[cursor];

    const setStateAt = (_cursor) => (nextState) => {
      if (state === nextState) return;
      memorizedStates[_cursor] = nextState;
      forceUpdate();
    };

    const setState = setStateAt(cursor);

    cursor = cursor + 1;

    return [state, setState];
  }

  function useForceUpdate() {
    const [value, setValue] = React.useState(1);
    const forceUpdate = () => {
      setValue(value + 1);
      cursor = 0;
    };
    return { forceUpdate };
  }

  function useEffect(effect, nextDeps) {
    function runDedeferedEffect() {
      const ENOUGH_TIME_TO_RENDER = 1;
      setTimeout(effect, ENOUGH_TIME_TO_RENDER);
    }

    if (!isInitialized[cursor]) {
      isInitialized[cursor] = true;
      deps[cursor] = nextDeps;
      cursor = cursor + 1;
      runDedeferedEffect();
      return;
    }
    const prevDeps = deps[cursor];
    const depsSame = prevDeps.every(
      (prevDep, index) => prevDep === nextDeps[index]
    );
    if (depsSame) {
      cursor = cursor + 1;
      return;
    }
    deps[cursor] = nextDeps;
    cursor = cursor + 1;
    runDedeferedEffect();
  }

  function resetCursor() {
    cursor = 0;
  }

  return { useState, useEffect, resetCursor };
})();

export default MyReact;
