'use client';

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

/**
 * 通用的返回顶部按钮组件
 * 在所有需要此功能的页面中使用
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 当滚动超过 300px 时显示按钮
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 p-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-700 hover:scale-110 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}
