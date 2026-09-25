useEffect(() => {
  const widthThreshold = 160;
  const heightThreshold = 160;
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

  // পেজ লোডের ৩ সেকেন্ড পর থেকে চেক শুরু — শুরুতে ব্রাউজার সেটেল হওয়ার সময় দেওয়া
  const startTimeout = setTimeout(() => {
    checkSize();
  }, 3000);

  const interval = setInterval(checkSize, 1000);

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
    clearInterval(interval);
    window.removeEventListener('keydown', preventShortcuts);
  };
}, []);
