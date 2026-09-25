useEffect(() => {
  let redirected = false;

  const redirect = () => {
    if (!redirected) {
      redirected = true;
      window.location.replace('about:blank');
    }
  };

  // ১. কেবল Inspect / DevTools খোলা থাকলে ডিটেক্ট করবে
  const detectInspect = () => {
    const threshold = 160;
    
    // ব্রাউজারের সাথে DevTools ডক/যুক্ত থাকলে
    const widthDiff = window.outerWidth - window.innerWidth;
    const heightDiff = window.outerHeight - window.innerHeight;

    if (widthDiff > threshold || heightDiff > threshold) {
      redirect();
    }
  };

  // ২. শর্টকাট কী (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S) চাপলে ব্লক করবে
  const preventShortcuts = (e: KeyboardEvent) => {
    const key = e.key.toUpperCase();
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(key)) ||
      (e.ctrlKey && ['U', 'S'].includes(key))
    ) {
      e.preventDefault();
      redirect();
    }
  };

  // ৩. মাউসের রাইট ক্লিক (Inspect Element) বন্ধ করা
  const preventContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  // ইভেন্ট লিসেনার যোগ করা
  window.addEventListener('keydown', preventShortcuts);
  window.addEventListener('contextmenu', preventContextMenu);
  
  // ১ সেকেন্ড পরপর সাইজ চেক করবে
  const interval = setInterval(detectInspect, 1000);

  return () => {
    clearInterval(interval);
    window.removeEventListener('keydown', preventShortcuts);
    window.removeEventListener('contextmenu', preventContextMenu);
  };
}, []);
