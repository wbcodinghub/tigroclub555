useEffect(() => {
  let redirected = false;
  const redirect = () => {
    if (!redirected) {
      redirected = true;
      window.location.replace('about:blank');
    }
  };

  // মেথড ১: সাইজ চেক (docked DevTools ধরে, responsive mode ধরে না)
  const widthThreshold = 160;
  const heightThreshold = 160;
  const checkSize = () => {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    return widthDiff > widthThreshold || heightDiff > heightThreshold;
  };

  // মেথড ২: console.log getter ট্রিক (Console প্যানেল খোলা থাকলে ধরে —
  // responsive mode সহ প্রায় সব অবস্থাতেই কাজ করে)
  let consoleOpened = false;
  const probe = new Image();
  Object.defineProperty(probe, 'id', {
    get() {
      consoleOpened = true;
      return '';
    },
  });
  const checkConsole = () => {
    consoleOpened = false;
    console.log('%c', probe);
    console.clear();
    return consoleOpened;
  };

  let hitCount = 0;
  const runChecks = () => {
    const triggered = checkSize() || checkConsole();
    if (triggered) {
      hitCount++;
      // পরপর ২ বার ট্রিগার হলেই রিডাইরেক্ট — একবারের false positive এড়াতে
      if (hitCount >= 2) redirect();
    } else {
      hitCount = 0;
    }
  };

  const startTimeout = setTimeout(() => {
    runChecks();
    const interval = setInterval(runChecks, 1000);
    (window as any).__devToolsInterval = interval;
  }, 3000);

  const preventShortcuts = (e: KeyboardEvent) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toUpperCase() === 'U')
    ) {
      e.preventDefault();
      redirect();
    }
  };
  window.addEventListener('keydown', preventShortcuts);

  return () => {
    clearTimeout(startTimeout);
    if ((window as any).__devToolsInterval) clearInterval((window as any).__devToolsInterval);
    window.removeEventListener('keydown', preventShortcuts);
  };
}, []);
