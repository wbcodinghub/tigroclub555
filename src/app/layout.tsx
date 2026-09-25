useEffect(() => {
  const widthThreshold = 50;   // width devtools ছাড়া প্রায় অপরিবর্তিত থাকে
  const heightThreshold = 200; // height-এ ব্রাউজার chrome (address bar, tabs) নিজেই ৭০-১০০px নেয়, তাই বেশি রাখা লাগবে
  let redirected = false;

  const redirect = () => {
    if (!redirected) {
      redirected = true;
      window.location.replace('about:blank');
    }
  };

  const checkSize = () => {
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;
    if (widthDiff > widthThreshold || heightDiff > heightThreshold) {
      redirect();
    }
  };

  const checkTiming = () => {
    const start = performance.now();
    // eslint-disable-next-line no-debugger
    debugger;
    const end = performance.now();
    if (end - start > 100) {
      redirect();
    }
  };

  // পেজ লোডের সাথে সাথে চেক না করে ২ সেকেন্ড পর থেকে চেক শুরু
  const startTimeout = setTimeout(() => {
    checkSize();
    checkTiming();

    const interval = setInterval(() => {
      checkSize();
      checkTiming();
    }, 1000);

    // cleanup-এর জন্য interval রেফারেন্স বাইরে রাখা লাগবে
    (window as any).__devToolsInterval = interval;
  }, 2000);

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
    if ((window as any).__devToolsInterval) {
      clearInterval((window as any).__devToolsInterval);
    }
    window.removeEventListener('keydown', preventShortcuts);
  };
}, []);
