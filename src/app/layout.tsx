useEffect(() => {
  let redirected = false;

  const redirect = () => {
    if (!redirected) {
      redirected = true;
      window.location.replace('about:blank');
    }
  };

  // ১. ইনস্পেক্ট / DevTools খোলা থাকলে ডিটেক্ট করার লজিক
  const detectInspect = () => {
    const threshold = 160;

    // DevTools ডক/যুক্ত অবস্থায় থাকলে (Width/Height Diff)
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;

    // আলাদা উইন্ডোতে (Undocked) DevTools খোলা থাকলে তা ডিটেক্ট করার জন্য
    const start = performance.now();
    // debugger কেবল কনসোল/ইনস্পেক্ট খোলা থাকলেই ব্রাউজারকে স্লো করে
    eval('debugger'); 
    const isUndockedOpen = performance.now() - start > 100;

    if (widthThreshold || heightThreshold || isUndockedOpen) {
      redirect();
    }
  };

  // ২. কী-বোর্ড শর্টকাট ব্লক (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S)
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

  // ইভেন্ট লিসেনারগুলো যুক্ত করা
  window.addEventListener('keydown', preventShortcuts);
  window.addEventListener('contextmenu', preventContextMenu);

  // ১ সেকেন্ড পরপর ডিটেক্ট করবে
  const interval = setInterval(detectInspect, 1000);

  return () => {
    clearInterval(interval);
    window.removeEventListener('keydown', preventShortcuts);
    window.removeEventListener('contextmenu', preventContextMenu);
  };
}, []);
