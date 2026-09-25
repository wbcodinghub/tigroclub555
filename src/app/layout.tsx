useEffect(() => {
  let redirected = false;
  const redirect = () => {
    if (!redirected) {
      redirected = true;
      window.location.replace('about:blank');
    }
  };

  // ১. শতভাগ কার্যকর DevTools ডিটেক্টর (Debugger Time Trap)
  const detectDevTools = () => {
    const start = performance.now();
    // DevTools খোলা থাকলে ব্রাউজার পজ হবে, ফলে সময় ১০ মিলি-সেকেন্ডের বেশি লেগে যাবে
    debugger; 
    const end = performance.now();

    if (end - start > 100) {
      redirect();
    }
  };

  // প্রতি ১ সেকেন্ড পরপর চেক করবে
  const interval = setInterval(detectDevTools, 1000);

  // ২. কী-বোর্ড শর্টকাট ব্লক
  const preventShortcuts = (e: KeyboardEvent) => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) ||
      (e.ctrlKey && ['U', 'u', 'S', 's'].includes(e.key))
    ) {
      e.preventDefault();
      redirect();
    }
  };

  // ৩. রাইট-ক্লিক (Inspect Element) ব্লক
  const preventContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  window.addEventListener('keydown', preventShortcuts);
  window.addEventListener('contextmenu', preventContextMenu);

  return () => {
    clearInterval(interval);
    window.removeEventListener('keydown', preventShortcuts);
    window.removeEventListener('contextmenu', preventContextMenu);
  };
}, []);
