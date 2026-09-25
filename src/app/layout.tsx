useEffect(() => {
  let redirected = false;
  const redirect = () => {
    if (!redirected) {
      redirected = true;
      window.location.replace('about:blank');
    }
  };

  // ১. কেবল ইনস্পেক্ট ওপেন হলে ডিটেক্ট করার জন্য
  const detectInspect = () => {
    const threshold = 160;
    
    // DevTools ডক করা থাকলে
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    // পিসিতে F12/Inspect দিয়ে আলাদা উইন্ডোতে DevTools খুললে
    const isConsoleOpen = () => {
      const startTime = performance.now();
      // debugger কেবল কনসোল/ইনস্পেক্ট খোলা থাকলেই কাজ করবে
      debugger; 
      return performance.now() - startTime > 100;
    };

    if (widthThreshold || heightThreshold) {
      redirect();
    }
  };

  // ২. শর্টকাট কী ব্লক (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U)
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

  // ৩. মাউসের রাইট ক্লিক (Inspect Element) বন্ধ করা
  const preventContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  // ইভেন্ট লিসেনার যুক্ত করা
  window.addEventListener('keydown', preventShortcuts);
  window.addEventListener('contextmenu', preventContextMenu);
  
  // ১ সেকেন্ড পর পর চেক করবে (যাতে সাইট লোড হতে কোনো সমস্যা না হয়)
  const interval = setInterval(detectInspect, 1000);

  return () => {
    clearInterval(interval);
    window.removeEventListener('keydown', preventShortcuts);
    window.removeEventListener('contextmenu', preventContextMenu);
  };
}, []);
